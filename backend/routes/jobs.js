var express = require('express');
const { create, getJobs, updateJob, deleteJob, findJobbyRecruiter, getJob, searchJobs, apply, isApplicant, removeApplication, getJobsbyApplicant, getapplicants, updateStatus, getapplicant, filter } = require('../controller/jobs');
const authRecruiter = require('../middleware/authRecruiter');
const auth = require('../middleware/auth');
var router = express.Router();

router.post('/create', create);
router.get('/', getJobs);
router.put('/update', authRecruiter, updateJob);
router.put('/delete', authRecruiter, deleteJob);
router.post('/apply', apply)
router.post('/isapplicant', isApplicant);
router.post('/removeapplication', removeApplication);
router.get('/applicant/:aid', getJobsbyApplicant);
router.get('/all/applicant/:id', getapplicants);
router.put('/updatestatus', updateStatus);
router.get("/applicant/:jid/:aid", getapplicant);
router.post("/filter", filter);
// router.post('/findbyRec',authRecruiter,findJobbyRecruiter)
router.get('/findbyRec/:id', findJobbyRecruiter);

router.get('/:id', getJob);
router.post('/search', searchJobs);


module.exports = router;
