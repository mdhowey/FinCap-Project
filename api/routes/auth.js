const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

/* Register */
router.post('/register', async(req, res) => {
  try{

    const foundUser = await User.exists({ email: req.body.email });

    if (foundUser) return console.log('User already exists');

    const salt = await bcrypt.genSalt(12);
    const hashed = await bcrypt.hash(req.body.password, salt);
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashed,
    });
    
    const user = await newUser.save();

    const {password, ...otherData} = user._doc;
    res.status(200);
    console.log(otherData);

  } catch(err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;