const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const hashPassword = require('./functions/hashPassword');
const verifyPassword = require('./functions/verifyPassword');

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    required: true
  },
  university: {
    type: String, 
    required: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  profilePhoto: {
    type: String,
    default: "/res/images/defaultUserPicture.png"
  },
  phone: {
    type: String
  },
  completed: {
    type: Boolean,
    default: false
  }
});

UserSchema.pre('save', hashPassword);

UserSchema.statics.findUser = function (email, password, callback) {
  let User = this;

  User.findOne({email}).then(user => { 
    if (!user) {
        return callback(true);
    }

    verifyPassword(password, user.password, (res) => {
      if (!res) return callback(null, user);
       
      return callback(true);
    });
  });
};

module.exports = mongoose.model('User', UserSchema);
