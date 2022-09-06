const db = require("../models");

const register = (req, res) => {
  // validate the POSTed data - making sure we have a name, an email, a pw
  const body = JSON.parse(req.body.body);
  const { email, password, name } = body;
  console.log("body");
  if (!name || !email || !password) {
    return res.json({
      message: "Please enter a name, an email, and a password",
    });
  }

  // make sure the user doesn't already exist
  db.User.findOne({ email: email }, (err, foundUser) => {
    if (err)
      return res.json({
        message: "Something went wrong",
      });

    if (foundUser)
      return res.json({
        message: "A user with that email already exists",
      });

    // if the user doesnt exist, create and save a user to the DB
    const newUser = new db.User({
      _id: email,
      name: name,
      email: email,
      password: password,
    });

    newUser.save((err, savedUser) => {
      if (err) res.json(err);
      res.json(savedUser);
    });
  });
};

const login = (req, res) => {
  res.json({ user: req.user });
};

const logout = (req, res) => {
  if (!req.user)
    return res.json({
      message: "No User to log out",
    });
  req.logout();
  res.json({ message: "User logged out" });
};

module.exports = {
  login,
  register,
  logout,
};
