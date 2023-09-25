var express = require('express');
const { login, register, logout } = require("../controller/Recruiter/recruiterLogin")
const authcheck = require('../controller/authcheck');
const auth = require('../middleware/auth');
const { updatePassword, getRecruiter } = require('../controller/Recruiter/Recruiter');

var router = express.Router();

// /* GET home page. */
// router.get('/', function (req, res, next) {
//   res.render('index', { title: 'Express' });
// });


router.post('/login', login)
router.post("/register", register)
router.post("/logout", logout);
router.get('/:id', getRecruiter);
router.put("/update/password/", updatePassword)
module.exports = router;
