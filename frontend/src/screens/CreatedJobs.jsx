import React, { useContext, useEffect, useState } from 'react'
import { base_url } from '../base_url'
import { MyContext } from '../MyContext'
import axios from 'axios'
import MyJobComponent from '../components/MyJobComponent'
import Loading from '../components/Loading'

const CreatedJobs = () => {
    const [jobs, setJobs] = useState()
    const { user } = useContext(MyContext);
    const fetchJobs = () => {
        axios.get(`${base_url}/jobs/findbyRec/${user.id}`).then((res) => {
            console.log(res);
            setJobs(res.data.data);
        }).catch((err) => {
            console.log(err);
            setJobs();
        })
    }
    useEffect(() => {
        fetchJobs();


    }, [])

    return (
        <div>
            <p className='text-lg mt-4 ml-4'>
                Jobs Created
            </p>
            <div className='flex flex-col'>


                {
                    jobs?.map((item) => {
                        return (<MyJobComponent job={item} recruiter />)
                    })
                }
                {
                    !jobs && <Loading />
                }
            </div>


        </div>
    )
}

export default CreatedJobs