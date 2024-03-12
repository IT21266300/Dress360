const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const admins = await Admin.find().sort('Name');
  res.send(admins);
});

router.get("/me", async (req, res) => {
  const admin = await Admin.findById(req.user._id).select("password");
  res.send(admin);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let admin = await Admin.findOne({ email: req.body.email });
  if (admin) return res.status(400).send("User already registered.");

  admin = new Admin(_.pick(req.body, ['Name', 'email', 'password', 'confirmPassword', 'key']));

  const salt = await bcrypt.genSalt(10);
  admin.password = await bcrypt.hash(admin.password, salt);
  
  await admin.save();
  res.send(_.pick(admin, ['_id', 'email']));
});

module.exports = router;