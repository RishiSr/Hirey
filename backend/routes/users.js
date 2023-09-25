var express = require('express');
const { resume, logout, update, getUser, updatePassword } = require('../controller/user');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/resume', resume);
router.post('/logout', logout);
router.put('/update/:id', update)
router.get('/:id', getUser);

router.put('/update/password', updatePassword)

module.exports = router;
