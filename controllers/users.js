const User = require("../modules/users");
const bcrypt = require("bcrypt");

// POST REQUEST
const createUser = async (req, res) => {
  console.log("I am here");
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
      gender: req.body.gender,
      createdAt: new Date(),
    });

    console.log(user);

    user
      .save()
      .then((createdUser) => {
        res.status(201).json(createdUser);
      })
      .catch((error) => {
        console.log("The error is from here");
        res.status(500).json({ message: "Error creating user", error });
      });
  } catch (error) {
    console.log("the error is located here");
    res.status(500).json({ error: error });
  }
};

module.exports = {
  createUser,
};
