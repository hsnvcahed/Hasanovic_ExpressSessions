const express = require('express');
const router = express.Router();
const users = require('../model/users');
// enter your code here

router.post('/login', (req, res) => {
  // enter your code here

  let email = req.body.email;
  let password = req.body.password;

  if (email && password) {
    const user = users.find((el) => el.email === email && el.password === password);
    if (user) {
      req.session.userId = user.id;
      res.status(200).json({ id: user.id, name: user.name });
    } else res.status(401).send('Wrong email or password');
  } else res.status(400).send('Login failed');
});

router.get('/logout', redirectLogin, (req, res) => {
  // enter your code here
  req.session.destroy();
  res.clearCookie(process.env.SESSION_NAME);
});

router.post('/register', (req, res) => {
  // enter your code here
  let { email, password, name } = req.body;
  if (email != '' && name != '' && password != '') {
    let temp = users.find((el) => el.email == email);
    if (temp) {
      res.status(409).send('E-Mail already registered');
    } else {
      let highestInData = 0;
      for (let i of users) {
        if (i.id > highestInData) highestInData = i.id;
      }
      highestInData++;
      users.push({
        id: highestInData,
        email: email,
        name: name,
        password: password,
      });
      res.status(200).send('OK');
    }
  } else res.status(400).send('Registration failed');
});

router.get('/secretdata', (req, res) => {
  // enter your code here
});

function redirectLogin() {}
module.exports = router;
