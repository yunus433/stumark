// require external npm files
const express = require('express');
const enforce = require('express-sslify');
const http = require('http');
const path = require('path');
const dotenv = require('dotenv');
const favicon = require('serve-favicon');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const cloudinary = require('cloudinary');
const socketIO = require('socket.io');
const i18n = require('i18n');

const sockets = require('./sockets/sockets');

// create server
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// configure i18n
i18n.configure({
  locales:['de', 'en'],
  directory: __dirname + '/translations',
  queryParameter: 'lang',
  defaultLocale: 'de'
});

// define local variables
const PORT = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/sellingplatform";

// require local route controllers
const indexRouteController = require('./routes/indexRoute');
const adminRouteController = require('./routes/adminRoute');
const authRouteController = require('./routes/authRoute');
const buyRouteController = require('./routes/buyRoute');
const sellRouteController = require('./routes/sellRoute');
const messagesRouteController = require('./routes/messagesRoute');
const editRouteController = require('./routes/editRoute');

// config dotenv files
dotenv.config({ path: path.join(__dirname, ".env") });

// require variables from dotenv file
const {
  SESSION_SECRET,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET
} = process.env;

// config cloudinary upload route
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
});

// add pug as views to server
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// connect mongoose to server
mongoose.connect(mongoUri, { useNewUrlParser: true, auto_reconnect: true });
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

// add public folder to server
app.use(express.static(path.join(__dirname, "public")));

// Force application to use https route
if (process.env.PORT) app.use(enforce.HTTPS({ trustProtoHeader: true }));

// add favicon
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

// set body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// set express session
const session = expressSession({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
});

// use express session
app.use(session);

// add request object for controllers
app.use((req, res, next) => {
  req.io = io;
  req.cloudinary = cloudinary;
  next();
});

app.use(i18n.init);

// use helmet
app.use(helmet());

// add route controllers
app.use('/', indexRouteController);
app.use('/admin', adminRouteController);
app.use('/auth', authRouteController);
app.use('/buy', buyRouteController);
app.use('/sell', sellRouteController);
app.use('/messages', messagesRouteController);
app.use('/edit', editRouteController);

// listen for socket.io connection
io.on('connection', (socket) => {
  sockets(socket, io);
});

// start server
server.listen(PORT, () => {
  console.log(`Server is on port ${PORT}`);
});
