const { applicationModel } = require("../models/ApplicationModel");
const { jobModel } = require("../models/jobModel");
const { recruiterModel } = require("../models/recruiterModel");
const { userModel } = require("../models/userModel");
const resp = require("../utils/response");

const findCompany = async (rec) => {
    try {

        const recruiter = await recruiterModel.find({ _id: rec }).populate('company', ['name', 'link']);
        console.log(recruiter[0], rec)
        return recruiter[0].company;
    }
    catch (err) {
        console.log(err);
        return null
    }



}

const create = async (req, res) => {
    try {

        const { name, description, tags, type, recruiter, salaryfrom, salaryto, applyBy, experience, skills, optSkills, startDate,
            mode,
            wrkHrs,
            duration,
            openings, } = req.body;

        const companyObj = await findCompany(recruiter);
        // console.log(companyObj);numquam perspiciatis ipsam. Molestias sit, adipisci optio neque ratione placeat dolorem, natus quidem ex libero tempore! Odio facilis labore debitis, laudantium sit ab eaque dolore quidem voluptatum. Voluptatibus quisquam ips
        // return

        const jobNew = new jobModel({
            name: name,
            description: description,
            tags: tags,

            recruiter: recruiter
            ,


            salary: [
                { from: salaryfrom }
                ,
                { to: salaryto }
            ],
            applyBy: applyBy,
            experience: experience,
            skills: skills,
            optSkills: optSkills,
            startDate,
            mode,
            wrkHrs,
            duration,
            openings,
            companyname: companyObj.name,
            type: type



        })

        let response = await jobNew.save();

        resp(res, response, 201, "Jobs Created")
    } catch (err) {
        console.log(err)
    }
}


const getJobs = async (req, res) => {
    try {
        const allJobs = await jobModel.find().populate({
            path: 'recruiter',
            select: ['name', 'email', 'company'],
            populate: {
                path: "company",
                select: ['logo']

            }
        }).select({ applicants: 0 });
        resp(res, allJobs, 201, "All Jobs")

    } catch (err) {
        resp(res, err, 500, "Internal Server Error")
    }
}

const updateJob = async (req, res) => {
    try {
        const { id, name, description, tags, salaryfrom, salaryto, applyBy, experience } = req.body;

        const updatedObj = {
            ...(name ? { name: name } : {}),
            ...(description ? { description: description } : {}),
            ...(tags ? { tags: tags } : {}),

            ...(salaryfrom ? { salaryfrom: salaryfrom } : {}),
            ...(salaryto ? { salaryto: salaryto } : {}),
            ...(applyBy ? { applyBy: applyBy } : {}),
            ...(experience ? { experience: experience } : {}),

        }
        console.log(updatedObj)
        let response = await jobModel.updateOne({ _id: id }, updatedObj)

        resp(res, response, 201, "Job updated")
    } catch (err) {
        console.log(err)
        resp(res, err, 500, "Internal Server Error")
    }
}

const deleteJob = async (req, res) => {
    try {
        const { id } = req.body;
        let response = await jobModel.deleteById({ _id: id })

        resp(res, response, 202, "Job Deleted")
    } catch (err) {
        console.log(err)
        resp(res, err, 500, "Internal Server Error")
    }
}

const findJobbyRecruiter = async (req, res) => {
    try {
        const { id } = req.params;
        let response = await jobModel.find({ recruiter: id }).select({ applicants: 0 }).populate({
            path: 'recruiter',
            select: ['name', 'email', 'company'],
            populate: {
                path: "company",

            }
        }).exec();;
        resp(res, response, 202, "Job Found")
    } catch (err) {
        console.log(err);
        resp(res, err, 500, "Internal Server Error")

    }
}

const getJob = async (req, res) => {
    try {
        const { id } = req.params;
        let response = await jobModel.findOne({ _id: id }).populate({
            path: 'recruiter',
            select: ['name', 'email', 'company'],
            populate: {
                path: "company",

            }
        }).exec();
        // console.log(response.applicants.length)


        // console.log(temp)
        resp(res, response, 202, "Job Found")
    } catch (err) {
        console.log(err);
        resp(res, err, 500, "Internal Server Error")

    }
}

const searchJobs = async (req, res) => {
    try {
        const searchObj = req.body;
        let response = await jobModel.find({ name: new RegExp(req.body.name, 'i') }).populate({
            path: 'recruiter',
            select: ['name', 'email', 'company'],
            populate: {
                path: "company",

            }
        }).exec();
        resp(res, response, 202, "Job Found")
    } catch (err) {
        console.log(err);
        resp(res, err, 500, "Internal Server Error")

    }
}
const filter = async (req, res) => {
    try {
        let response = await jobModel.find({ skills: new RegExp(req.body.skill, 'i') });
        resp(res, response, 201, "Job Fetched");
    } catch (err) {
        console.log(err);
        resp(res, err, 500, "Something wen wrong");
    }
}
const apply = async (req, res) => {
    try {
        const { jid, aid, data } = req.body;
        let job = await jobModel.findOne({ _id: jid });
        let user = await userModel.findOne({ _id: aid });

        let applicant = new applicationModel(
            {
                status: "Applied",
                applicant: aid,
                message: data,
                name: user?.name ? user.name : "N/A",
                date: new Date(),
                job: jid
            })

        let response = await applicant.save();
        // { applicantsCount: job.applicantsCount + 1 }
        let response1 = await jobModel.updateOne({ _id: jid }, { applicantsCount: job.applicantsCount + 1 });

        resp(res, {
            status: "Applied",
            applicant: aid
        }, 202, "Applied to the Job")
    }
    catch (err) {
        console.log(err);
        resp(res, err, 500, "Something went wrong");
    }

}
const isApplicant = async (req, res) => {
    try {
        const { jid, aid } = req.body;
        let applicant = await applicationModel.findOne({ job: jid, applicant: aid });
        if (applicant) {

            resp(res, true, 202, "Given aid has applied to this JOB")
        } else {
            resp(res, false, 202, "Not applied")
        }
    }
    catch (err) {
        console.log(err);
        resp(res, err, 500, "Something went wrong");
    }
}


const removeApplication = async (req, res) => {
    try {
        const { jid, aid } = req.body;
        let job = await applicationModel.deleteOne({ job: jid, applicant: aid });

        // console.log(job.applicants, temp)
        // let response = await job.save();
        resp(res, {
            status: 202,
            applicant: aid
        }, 202, "Application Removed")
    }
    catch (err) {
        console.log(err);
        resp(res, err, 500, "Something went wrong");
    }
}
const getJobsbyApplicant = async (req, res) => {
    try {
        const { aid } = req.params;
        console.log(aid)

        const jobs = await applicationModel.find({ applicant: aid }).populate("job");
        // let temp = [...jobs];
        // temp = temp.map((item) => ({ ...item, applicants: item.applicants.length }))
        // console.log(jobs)
        resp(res, jobs, 202, "jobs Found")
    }
    catch (err) {
        console.log(err);
        resp(res, err, 500, "Something went wrong");
    }
}
const getapplicants = async (req, res) => {
    try {
        const { id } = req.params;

        let applicants = await applicationModel.find({ job: id }).populate("applicant")
        // console.log(job)

        // const applicants = job.applicants;
        resp(res, applicants, 202, "Applicants");
    } catch (err) {
        console.log(err);
        resp(res, err, 500, "Something went wrong");
    }



}
const getapplicant = async (req, res) => {
    try {
        const { jid, aid } = req.params;

        let applicant = await applicationModel.findOne({ job: jid, applicant: aid }).populate("applicant")
        // console.log(job)

        // const applicants = job.applicants;
        resp(res, applicant, 202, "Applicant");
    } catch (err) {
        console.log(err);
        resp(res, err, 500, "Something went wrong");
    }



}
const updateStatus = async (req, res) => {
    try {
        const { id, status } = req.body;
        let response = await applicationModel.updateOne({ _id: id }, { status: status });
        resp(res, response, 202, "Status Updated");
    }
    catch (err) {
        console.log(err);

        resp(res, err, 500, "Something went wrong")
    }
}


module.exports = { create, getJobs, updateJob, deleteJob, updateStatus, findJobbyRecruiter, getJob, searchJobs, apply, isApplicant, removeApplication, getJobsbyApplicant, getapplicants, getapplicant, filter }
