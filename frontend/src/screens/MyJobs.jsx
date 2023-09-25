import React, { useContext, useEffect, useState } from 'react'
import MyJobComponent from '../components/MyJobComponent'
import { base_url } from '../base_url';
import axios from 'axios';
import { MyContext } from '../MyContext';
import Loading from '../components/Loading';
import NoData from '../components/NoData';

const MyJobs = () => {
    const [jobs, setJobs] = useState();
    const { user } = useContext(MyContext);
    const [isLoading, setIsLoading] = useState(false)
    // console.log(user)
    const fetchdata = () => {
        axios.get(`${base_url}/jobs/applicant/${user.id || user._id}`).then((res) => {
            console.log(res.data.data);
            setJobs(res.data.data)
        }).catch((err) => console.log(err));

    }
    useEffect(() => {
        fetchdata();


    }, [])



    return (
        <div className='flex flex-col   ' >
            <p className='text-2xl pt-8 pl-8 '>
                Applied
            </p>

            <div className='flex flex-col' >

                {
                    !jobs && <Loading />
                }
                {jobs?.map((item, index) => {
                    // console.log(item, "kdkd")
                    return (
                        <MyJobComponent job={item.job} status={item.status} key={index} />
                    )
                })}
            </div>

            {
                jobs?.length == 0 && <NoData />
            }
        </div>
    )
}

export default MyJobs