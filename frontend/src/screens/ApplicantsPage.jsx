import React, { useEffect, useState } from 'react'
import { base_url } from '../base_url'
import { BsChevronDown } from "react-icons/bs";
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import axios from 'axios';
import { errorToast, successToast } from '../Toastify';

const ApplicantsPage = () => {
    const { id, sid } = useParams();
    const [status, setStatus] = useState()
    const [data, setData] = useState()
    const getApplicantsData = () => {
        // console.log(id, sid)
        axios.get(`${base_url}/jobs/applicant/${id}/${sid}`).then((res) => {
            setData(res.data.data);
            setStatus(res.data.data.status)
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })


    }
    useEffect(() => {
        if (data?._id && status != data.status) {
            axios.put(`${base_url}/jobs/updatestatus`, {
                id: data._id,
                status: status
            }).then((res) => {
                successToast("Status Updated");
                setData({ ...data, status: status });
            }).catch((err) => {
                errorToast("Unable to update Status");
                setStatus(data.status);
            })
        }
    }, [status])

    useEffect(() => {
        getApplicantsData();

    }, [])

    const [openResume, setOpenResume] = useState(false)
    return (
        <div className='px-4 my-2 overflow-auto flex flex-col gap-3 '  >
            <div className='flex flex-row place-items-center justify-between mx-10' >
                <p className='' >
                    Applicant Info
                </p>
                <select className='bg-white px-4 py-2  outline-none border-2 border-green rounded-lg' value={status} onChange={(e) => setStatus(e.target.value)} >
                    <option value={"Applied"} >
                        Applied
                    </option>
                    <option value={"In Review"} >
                        In Review
                    </option>
                    <option value={"Accepted"}  >
                        Accepted
                    </option>
                    <option value={"Rejected"}>
                        Rejected
                    </option>

                </select>
            </div>
            {data ? <>
                <p className=' text-lg  text-center uppercase' >
                    {data.applicant.name}
                </p>
                <div className='border rounded-lg p-2 border-green flex flex-col gap-2' >

                    <p className='bg-green rounded px-2' >
                        Bio
                    </p>
                    <p>
                        {data.applicant.bio}
                    </p>
                </div>
                <div className='border rounded-lg p-2 border-green flex flex-col gap-2' >

                    <p className='bg-green rounded px-2' >
                        Skills
                    </p>
                    <div className='flex flex-row gap-2'>
                        {
                            JSON.parse(data.applicant.skills).map((item) => {
                                return (
                                    <div className='bg-light-green text-dark-green px-2 py-1 rounded'>
                                        {item.label}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='border rounded-lg p-2 border-green flex flex-col gap-2' >

                    <p className='bg-green rounded px-2' >
                        Message
                    </p>
                    <p className='px-2'>
                        {
                            data?.message ? data.message : "N/A"
                        }
                    </p>
                </div>
                <div className={`border rounded-lg p-2 border-green flex flex-col gap-2 duration-300   ${openResume ? " h-fit" : "h-[2.5rem]"} cursor-pointer    `} onClick={() => setOpenResume(!openResume)}   >

                    <div className={`bg-green rounded px-2 flex flex-row justify-between `} >
                        Resume
                        <button >

                            <span  >
                                <BsChevronDown className={`${openResume && " rotate-180 "}  duration-500 `} />
                            </span>
                        </button>
                    </div>

                    {openResume && <img className=' max-w-full h-auto lg:w-[50rem] lg:h-[65rem] self-center border-2 rounded border-black' src='https://res.cloudinary.com/dv33wtve1/image/upload/v1694438347/nbmrdpvdmtc6b2quhmbo.jpg' />}
                </div>
            </> : <Loading />}
        </div>
    )
}

export default ApplicantsPage