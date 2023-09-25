import React from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from './Loading';

const MyJobComponent = ({ job, recruiter, status }) => {
    // const 
    const { name, tags, type, applyBy, startDate, endDate, companyname, _id } = job;
    // console.log(job, recruiter, status)
    const navigate = useNavigate();
    return (<>


        {
            job &&

            <div className='flex flex-row  gap-5 m-2 p-3 border-2 border-green rounded-lg bg-pale-green  cursor-pointer   place-items-center ' onClick={() => {
                if (!recruiter) { navigate(`../jobs/${_id}`) }
            }}  >

                <div>
                    <img className='h-10 w-10 rounded-full' src={job?.recruiter?.company?.logo} alt='img' />

                </div>
                <div className='flex-col flex-1' >
                    <p className='text-xl'>
                        {name}
                    </p>
                    <div className='flex lg:flex-row flex-col lg:gap-3 justify-between pr-10'>

                        <p className='text-lg'>
                            {type}
                        </p>
                        <p>
                            {recruiter ? <>
                                <div className='flex flex-row gap-2 '>
                                    <button className='border text-ultra-dark-green bg-white rounded lg:px-3 lg:py-2 -lg:p-1   hover:shadow-lg  active:bg-green active:text-white ' onClick={() => navigate(`../jobs/${job._id}`)}>
                                        View
                                    </button>
                                    <button className='border text-ultra-dark-green bg-white rounded lg:px-3 lg:py-2 -lg:p-1   hover:shadow-lg  active:bg-green active:text-white ' onClick={() => navigate(`./${job._id}`)} >
                                        Applicants
                                    </button>

                                </div>
                            </> :

                                <div>

                                    {status}
                                </div>

                            }
                        </p>
                    </div>
                    <p className=''>
                        {job.applyBy}
                    </p>
                </div>

            </div>
        }

    </>
    )
}

export default MyJobComponent


