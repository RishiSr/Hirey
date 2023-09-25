var express = require('express');
const { login } = require('../controller/login');
const { register } = require('../controller/register');
const authcheck = require('../controller/authcheck');
const auth = require('../middleware/auth');
const uploader = require("../controller/multer");
const { uploadFile, deleteFile } = require('../controller/upload');
const { resume, getResume } = require('../controller/user');

var router = express.Router();

// /* GET home page. */
// router.get('/', function (req, res, next) {
//   res.render('index', { title: 'Express' });
// });


router.post('/login', login)
router.post("/register", register)
router.get("/authcheck", auth, authcheck);
router.post("/upload", uploader.single("file"), uploadFile);
router.delete("/deletefile/:id", deleteFile);
router.put('/resume', resume);
router.get('/resume/:id', getResume)
module.exports = router;
