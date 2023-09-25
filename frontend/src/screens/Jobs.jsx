import React, { useContext, useEffect, useState } from 'react'
import { HiOutlineShare } from 'react-icons/hi'
import { CiShare1 } from 'react-icons/ci'
import JobsDetailsBox from '../components/JobsDetailsBox'
import { base_url } from '../base_url'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { MyContext } from '../MyContext'
import Loading from '../components/Loading';
import penHold from '../assets/Hand holding pen.gif'
import { errorToast, notifyToast } from '../Toastify'
const SkillBox = ({ name }) => {
    return (
        <div className='bg-beige   text-another-green px-3 py-2 text-md  rounded-lg tracking-wider' >

            {name}
        </div>
    )
}

const ConvertDate = (str) => {
    let date = new Date(str);

    let data = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    return data
}

const Jobs = ({ share }) => {
    const { id } = useParams();
    const [job, setJob] = useState();
    const { user } = useContext(MyContext);
    const [isApplied, setisApplied] = useState(false);
    const [msg, setMsg] = useState("");
    const [open, setOpen] = useState(false)
    const fetchData = () => {
        axios.get(`${base_url}/jobs/${id}`).then((res) => {
            console.log(res.data.data);
            setJob(res.data.data)

        }).catch((err) => {
            console.log(err)
        })
    }

    const checkIfapplied = async () => {
        try {
            console.log(user)
            if (!(user?.id)) {
                setisApplied(false);
                return;
            }
            axios.post(`${base_url}/jobs/isapplicant`, {
                jid: id,
                aid: user.id
            }).then((res) => setisApplied(res.data.data)).catch((err) => {
                console.log(err)
                setisApplied(res.data.data)
            })
        }
        catch (err) {
            console.log(err)
        }
    }
    const apply = async (data) => {
        try {
            console.log(user)
            if (!(user?.id)) {
                setisApplied(false);
                return;
            }
            let res = await axios.post(`${base_url}/jobs/apply`, {
                jid: id,
                aid: user.id, data
            })
            // console.log(res?.data?.data, res?.data?.status, res?.status)
            if (res.status == 202) {
                setisApplied(true);
                setOpen(false)
                let tempp = job.applicants + 1;
                setJob({ ...job, applicants: tempp, applicantsCount: tempp })
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    const remove = async () => {
        try {
            console.log(user)
            if (!(user?.id)) {
                setisApplied(false);
                return;
            }
            let res = await axios.post(`${base_url}/jobs/removeapplication`, {
                jid: id,
                aid: user.id
            })
            if (res.status == 202) {
                setisApplied(false)
                let tempp = job.applicantsCount - 1;
                setJob({ ...job, applicants: tempp, applicantsCount: tempp })
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        fetchData();
        checkIfapplied();
        // setJob({
        //     "_id": "64e4dba8036b4df2b8c32742",
        //     "name": "MERN",
        //     "description": "100000",
        //     "tags": [],
        //     "recruiter": {
        //         "_id": "64ca8b463805a5dafc2be64d",
        //         "name": "12",
        //         "email": "12@gmail.com",
        //         "company": {
        //             "_id": "64ca8b423805a5dafc2be64a",
        //             "name": "12345678901234567890",
        //             "city": "",
        //             "state": "",
        //             "country": "The Bahamas",
        //             "type": "1234567890",
        //             "description": "1234567890",
        //             "link": "1234567890",
        //             "date": "2023-08-02T16:58:42.858Z",
        //             "__v": 0
        //         }
        //     },
        //     "salary": [
        //         {
        //             "from": "100",
        //             "_id": "64e4dba8036b4df2b8c32743"
        //         },
        //         {
        //             "to": "1000",
        //             "_id": "64e4dba8036b4df2b8c32744"
        //         }
        //     ],
        //     "applyBy": "2023-08-31",
        //     "experience": "1000",
        //     "skills": "[\"ReactJS\"]",
        //     "optSkills": "[\"NodeJS\"]",
        //     "companyname": "12345678901234567890",
        //     "type": "Internship",
        //     "openings": "100",
        //     "duration": "1000",
        //     "wrkHrs": "{\"min\":\"10\",\"max\":\"100\"}",
        //     "mode": "inoffice",
        //     "startDate": "2023-08-26",
        //     "date": "2023-08-22T16:00:40.317Z",
        //     "__v": 0
        // })

    }, [])
    const copyToClipBoard = async copyMe => {
        let text = `${window.location.origin}/jobs/${job._id}/share`
        try {
            await navigator.clipboard.writeText(text);
            notifyToast('Link copied!');
        } catch (err) {
            errorToast('Failed to copy!');
        }
    };
    const navigate = useNavigate()

    return (
        <>


            {job && <div className=' p-4 relative' >
                {
                    share && <div className='bg-pale-green text-dark-green text-center text-xl py-3 uppercase font-bold mb-2 ' >
                        <p>
                            Hirey
                        </p>
                    </div>
                }
                {open && <div className='absolute border lg:w-[70rem] lg:h-[40rem] border-green transform -translate-x-1/2 lg:translate-y-1/2  lg:-top-[30%] -lg:top-1/2 -lg:translate-y-1/2    left-1/2 p-3 rounded-lg shadow-lg  pt-7 flex flex-row gap-3  bg-white' >
                    <div className='flex-1 -lg:hidden' >
                        <img src={penHold} className=' min-w-full h-auto' />
                    </div>
                    <div className='flex flex-col gap-2 flex-1'>

                        <p className=' text-dark-green text-center text-xl'>
                            What makes you better than others..?
                        </p>
                        <textarea className=' border-2 outline-none w-full rounded-xl border-green  h-full p-3 ' onChange={(e) => setMsg(e.target.value)} placeholder='   Enter text Here' >

                        </textarea>
                        <div className='flex flex-row gap-4 justify-end' >
                            <button className='lg:w-[8rem] w-[5rem] lg:px-10 lg:py-4 -lg:text-sm -lg:p-2 bg-red-500 rounded text-white' onClick={() => apply("N/A")} >Skip</button>
                            <button className='lg:w-[8rem]  w-[5rem] lg:px-10 lg:py-4 -lg:text-sm -lg:p-2 bg-green rounded text-white ' onClick={() => apply(msg)} >
                                Proceed
                            </button>
                            <button className='lg:w-[8rem] w-[5rem] lg:px-10 lg:py-4 -lg:text-sm -lg:p-2 bg-white border-2 active:bg-dark-green active:text-white border-green text-green rounded ' onClick={() => setOpen(false)} >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>}
                <div className='flex flex-col  border border-green   rounded gap-3 p-3   ' >
                    <div className=' flex flex-row gap-8  ' >
                        <img className=' rounded-full w-16 h-16 ' alt='logo' src={job.recruiter.company.logo} />
                        <div className='flex flex-col px-2 place-content-center   '>

                            <p className=' text-lg  ' >
                                {job.name}
                            </p>
                            <div className='flex flex-row gap-3 -lg:hidden' >
                                <div className=''>
                                    {job?.recruiter?.company?.city}
                                </div>
                                <div className='border border-black w-0 ' >

                                </div>
                                <div className=''>
                                    {job?.recruiter?.company?.country}
                                </div>
                                <div className='border border-black w-0 ' >

                                </div>
                                <div className=''>
                                    {`  Date Posted : ${ConvertDate(job.date)}`}
                                </div>
                            </div>

                        </div>
                        <div className='self-center   ml-auto mr-5'>
                            <button className='acive:bg-slate-300  p-2 rounded-full' onClick={() => copyToClipBoard()} >
                                <HiOutlineShare className='text-3xl' />
                            </button>
                        </div>

                    </div>
                    <div className='flex flex-row justify-between ' >
                        {<div className={` ${job.applicants == 0 && "scale-0"}  bg-dark-green  text-white px-5 py-2  rounded-md `}>
                            {job.applicantsCount} Applicant{job.applicantsCount > 1 && "s"}
                        </div>}

                        {user?.type == "seeker" && <div className='flex flex-row  gap-3'>
                            {!isApplied ? <>

                                <button className='bg-green text-white active:bg-red-800 rounded px-4 py-2 mr-10' onClick={() => setOpen(true)} >
                                    Apply
                                </button>

                            </> :
                                <>
                                    <button className='bg-red-600 text-white active:bg-red-800 rounded px-4 py-2' onClick={remove} >
                                        Withdraw
                                    </button>
                                    {/* <button className=' bg-pale-green text-white active:bg-red-800 rounded px-4 py-2 ' >
                                        Modify Application
                                    </button> */}
                                </>
                            }

                        </div>}

                        {
                            share && <button className='bg-green text-white active:bg-red-800 rounded px-4 py-2 mr-10' onClick={() => navigate('../')} >
                                Apply
                            </button>
                        }
                    </div>

                    {/* {<p className='text-red-500 font-bold ' >
                        Applied On 25/12/2001
                    </p>} */}
                </div>
                <div className='grid grid-cols-5 -lg:grid-cols-2 divide-x p-2 my-2 border border-green   rounded  justify-around bg-white-green ' >
                    <JobsDetailsBox name={"Stipend"} details={`${parseFloat(job.salary[0].from) / 1000}K - ${parseFloat(job.salary[1].to) / 1000}K`} />
                    <JobsDetailsBox name={"Duration"} details={`${job.duration} Months`} />
                    <JobsDetailsBox name={"Working Hrs"} details={`${JSON.parse(job.wrkHrs).min} - ${JSON.parse(job.wrkHrs).max}`} />
                    <JobsDetailsBox name={"Start Date"} details={`${job.startDate}`} />
                    <JobsDetailsBox name={"Mode"} details={(job.mode == "inoffice") ? "In Office" : (job.mode == "remote") ? "Remote" : "Hybrid"} />


                </div>
                <div className='flex lg:flex-row -lg:flex-col w-[100%] gap-1' >

                    <div className='flex flex-col gap-3 lg:w-[80%]'>

                        <div className='border border-green rounded p-3' >
                            <p className='text-lg  text-dark-green mb-2' >
                                Skill Requirements <span className='text-red-400'>**</span>

                            </p>
                            <div className='flex flex-row gap-2 ' >
                                {
                                    job.skills && JSON.parse(job.skills).map((item) => {
                                        return (
                                            <SkillBox name={item} />
                                        )
                                    })
                                }

                            </div>

                        </div>
                        <div className='border border-green rounded p-3' >
                            <p className='text-lg  text-dark-green mb-2' >
                                Optional Skills

                            </p>
                            <div className='flex flex-row gap-2 ' >
                                {
                                    job.optSkills && JSON.parse(job.optSkills).map((item) => {
                                        return (
                                            <SkillBox name={item} />
                                        )
                                    })
                                }
                            </div>



                        </div>
                        <div className='border border-green rounded p-3' >
                            <p className='text-lg  text-dark-green mb-2' >
                                Job Description

                            </p>
                            <p>
                                {job.description}

                            </p>



                        </div>
                    </div>
                    <div className='flex flex-col  flex-1 lg:w-[50%] border border-green rounded p-3 gap-3 '>
                        <p>
                            About the company
                        </p>
                        <div className='flex flex-row gap-3 place-items-center' >
                            <img className=' rounded-full w-10 h-10 ' src={job.recruiter.company.logo} />


                            <p className='text-xl flex flex-row place-items-center gap-3'>
                                {job.recruiter.company.name} <span className='text-lg text-dark-blue ' >
                                    <CiShare1 />
                                </span>
                            </p>


                        </div>
                        <p className='bg-green px-2 w-fit rounded-sm'>
                            Team Size <span> 100-500</span>
                        </p>

                        <p>
                            {job.recruiter.company.description}
                        </p>

                    </div>
                </div>
            </div>}
            {
                !job &&
                <div className='w-full h-full flex flex-row justify-center place-items-center' >

                    <Loading />
                </div>
            }
        </>
    )
}

export default Jobs