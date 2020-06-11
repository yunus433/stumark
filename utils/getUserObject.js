const mongoose = require('mongoose');

const School = require('../models/school/School');

const getUserAge = (month, year) => {
  if (!month || !year)
    return 0;

  const curr_year = new Date().getFullYear();
  const curr_month = new Date().getMonth() + 1;

  return (curr_year - year - 1) + parseInt((12 - month + curr_month) / 12);
};

module.exports = (user) => {
  
  School.findById(mongoose.Types.ObjectId(user.school), (err, school) => {
    if (err) return {};

    return {
      _id: user._id,
      email: user.email,
      name: user.name,
      age: getUserAge(user.birth_time.month, user.birth_time.year),
      birth_day: user.birth_time.day + "." + user.birth_time.month + "." + user.birth_time.year,
      school: school.name,
      profilePhoto: user.profilePhoto,
      favorites: user.favorites
    }
  });
}
