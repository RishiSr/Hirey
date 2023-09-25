import React, { useEffect, useState } from 'react'
import { base_url } from '../base_url'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import ApplicantsDisplayComponent from '../components/ApplicantsDisplayComponent'

const JobApplicants = () => {
    const [Applicants, setApplicants] = useState([])
    const { id } = useParams();
    const navigate = useNavigate();
    const fetchApplicants = () => {
        axios.get(`${base_url}/jobs/all/applicant/${id}`).then((res) => {
            console.log(res.data)
            setApplicants(res.data.data);
        }).catch((err) => {
            console.log(err);
        })
    }
    useEffect(() => {
        fetchApplicants();

    }, [])

    const ConvertDate = (str) => {
        let date = new Date(str);

        let data = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
        return data
    }
    return (
        <div>
            <p className='text-lg mt-4 ml-4'>
                Applicants
            </p>
            <div className=' flex flex-col m-5 lg:border border-dark-green ' >
                <div className='-lg:hidden'>


                    <div className='grid grid-cols-5 bg-pale-green px-2 text-lg' >
                        <p>
                            Date Applied
                        </p>
                        <p>
                            Name
                        </p>
                        <p>
                            Skills
                        </p>
                        <p>
                            Message
                        </p>
                        <p>

                        </p>
                    </div>

                    <div className='grid grid-cols-5 px-2 text-md gap-y-2  mt-2 mb-2  '>
                        {
                            Applicants?.map((item) => {
                                console.log(item, "joo")
                                return (
                                    <>
                                        <p>
                                            {ConvertDate(item.date)}
                                        </p>
                                        <p>
                                            {item?.applicant?.name}
                                        </p><div className='flex flex-row gap-2 overflow-auto  '>
                                            {item?.applicant?.skills && JSON.parse((item?.applicant?.skills))?.map((item) => {
                                                return (
                                                    <>
                                                        <div className='bg-green px-2 py-1 rounded'>
                                                            {item?.label}
                                                        </div>

                                                    </>
                                                )
                                            })}
                                        </div><p>
                                            {ConvertDate(item.date)}
                                        </p>
                                        <div className=''>

                                            <button className='border-2 border-green text-another-green rounded py-1 px-4  active:bg-green active:text-white' onClick={() => navigate(`./${item.applicant._id}`)} >
                                                View
                                            </button>
                                        </div>
                                    </>
                                )
                            })
                        }

                    </div>
                </div>
                <div className='grid grid-cols-2 lg:hidden  p-4 rounded-xl text-md gap-y-2  mt-2 mb-2 border-2 border-green '>
                    {
                        Applicants?.map((item) => {
                            console.log(item, "joo")
                            return (
                                <>
                                    <p className=' font-bold text-another-green '>
                                        Date Applied :
                                    </p>
                                    <p>
                                        {ConvertDate(item.date)}
                                    </p>
                                    <p className=' font-bold text-another-green '>
                                        Name :
                                    </p>
                                    <p>
                                        {item?.applicant?.name}
                                    </p>
                                    <p className=' font-bold text-another-green '>
                                        Skills :
                                    </p>
                                    <div className='flex flex-row gap-2 overflow-auto  '>
                                        {item?.applicant?.skills && JSON.parse((item?.applicant?.skills))?.map((item) => {
                                            return (
                                                <>
                                                    <div className='bg-green px-2 py-1 rounded'>
                                                        {item?.label}
                                                    </div>

                                                </>
                                            )
                                        })}
                                    </div>
                                    <p className=' font-bold text-another-green '>
                                        Message :
                                    </p>
                                    <p>
                                        {item.message}
                                    </p>
                                    <div className=' col-span-2  '>

                                        <button className='border-2  a w-full border-green text-another-green rounded py-1 px-4  active:bg-green active:text-white' onClick={() => navigate(`./${item.applicant._id}`)} >
                                            View
                                        </button>
                                    </div>
                                </>
                            )
                        })
                    }

                </div>

            </div>


        </div>
    )
}

export default JobApplicants