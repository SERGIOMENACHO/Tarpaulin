const express = require("express");
const router = express.Router();
const passport = require("passport");
const controller = require("../controllers/users");

router.get("/home", (req, res, next) => {
  let form;
  console.log("this is the user" + req.user);
  if (req.user !== undefined) {
    form =
      '<h1>Logged in</h1>\
            <br><a href="/enrollments">Enrollments</a>\
            <br><a href="/courses">Courses</a>\
            <br><a href="/lessons">Lessons</a>\
            <br><br><a href="/logout">Log Out</a>';
  } else {
    form =
      '<h1>Please log in before accessing any information</h1>\
    <br><br><a href="/login">Log in</a>';
  }
  res.send(form);
});

router.get("/login", (req, res, next) => {
  const form =
    '<h1>Login Page</h1><form method="POST" action="/login">\
    Enter Email:<br><input type="email" name="email">\
    <br>Enter Password:<br><input type="password" name="password">\
    <br><br><input type="submit" value="Submit"></form>';
  res.send(form);
});

router.get("/register", (req, res, next) => {
  const form =
    '<h1>Register Page</h1><form method="post" action="/register">\
    Enter name:<br><input type="text" name="name">\
    <br>Enter Email:<br><input type="email" name="email">\
    <br>Enter Password:<br><input type="password" name="password">\
    <br>Enter Role (Teacher or Student):<br><input type="text" name="role">\
    <br>Enter Gender:<br><input type="text" name="gender">\
    <br><br><input type="submit" value="Submit"></form>';
  res.send(form);
});

router.post("/register", controller.createUser);

router.get("/test", (req, res, next) => {
  console.log(req.user);
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return res.status(400).json({ errors: err });
    }
    if (!user) {
      return res.status(400).json({ errors: "Username or Password Incorrect" });
    }
    req.logIn(user, function (err) {
      if (err) {
        return res.status(400).json({ errors: "Here is the " + err });
      }
      res.redirect("/home");
    });
  })(req, res, next);
});

router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});

module.exports = router;
