const router = require("express").Router();
const { User } = require("../../models");
const isAuth = require("../../utils/auth");

const handleSession = (req, res, userData) => {
  req.session.save(() => {
    req.session.user_id = userData.id;
    req.session.loggedIn = true;
    res.status(200).json(userData);
  });
};

router.post("/", async (req, res) => {
  try {
    const userData = await User.create({
      name: req.body.name,
      password: req.body.password
    });
    console.log(userData);
    handleSession(req, res, userData);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Failed to create user." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { name: req.body.name } });

    if (!userData) {
      return res.status(400).json({ message: "Incorrect username, please try again" });
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Incorrect password, please try again" });
    }

    handleSession(req, res, userData);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Login failed." });
  }
});

router.post("/logout", (req, res) => {
  console.log(req.session);
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
