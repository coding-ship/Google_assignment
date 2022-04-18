var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var cookieSession = require("cookie-session");
var passport = require("passport");
var bp = require("body-parser");

var userRouter = require("./app_server/routes/user");

require("./config/google-auth2");
require("./app_server/models/db");

var app = express();

app.use(bp.json());
app.use(bp.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  cookieSession({
    name: "tuto-session",
    keys: ["key1", "key2"],
  })
);

// view engine setup
app.set("views", path.join(__dirname, "app_server", "views"));
app.set("view engine", "jade");

app.use(passport.initialize());
app.use(passport.session());

app.use("/", userRouter);

module.exports = app;
