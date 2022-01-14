const router = require("express").Router();
let User = require("./details.model");

router.route("/").get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const name = req.body.username;
  const number = req.body.username;
  const email = req.body.username;
  const start = req.body.username;
  const end = req.body.username;

  const newUser = new User({ name, number, email, start, end });

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
