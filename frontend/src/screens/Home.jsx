import React, { useEffect, useState } from 'react'
import MyJobComponent from '../components/MyJobComponent'
import axios from 'axios';
import { base_url } from '../base_url';
import { BiSearch } from 'react-icons/bi';
import Loading from '../components/Loading';
import { RxCross2 } from 'react-icons/rx';
import NoData from '../components/NoData';

const Home = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [jobs, setJobs] = useState([]);
    const fetchJobs = () => {
        setIsLoading(true);
        setSearch()
        axios.get(`${base_url}/jobs`).then((res) => {

            setJobs(res.data.data)
            setIsLoading(false);
        }).catch((err) => console.log(err));

    }
    const [skills, setSkills] = useState([])
    useEffect(() => {
        fetchJobs();
        fetchSkills();

    }, [])
    const [search, setSearch] = useState("")

    const searchJob = () => {
        setIsLoading(true);
        axios.post(`${base_url}/jobs/search`, {
            name: search
        }).then((res) => {
            setJobs(res.data.data);
            setIsLoading(false);
        }).catch((err) => {
            console.log(err);
            fetchJobs();

        })
    }
    const fetchSkills = () => {
        axios.get(`${base_url}/skills/`).then((res) => {
            // console.log(res)
            setSkills(res?.data.data)
        }).catch((err) => {
            console.log(err)
            setSkills(["Something went wrong"]);
        })
    }
    return (
        <>


            <div className='h-screen flex-1 flex flex-col overflow-y-scroll '>
                <div className='flex -lg:flex-col lg:flex-row justify-between place-items-center relative' >

                    <div className=' border-2 lg:w-[30rem] self-center my-3 mx-auto rounded-lg py-3 relative  px-4 border-pale-green  shadow-md shadow-light-green ' >

                        <input className=' outline-none w-full ' value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search Jobs' />
                        <div className='absolute  top-1/2 -translate-y-1/2 right-2 flex flex-row place-items-center gap-5 '>
                            <button className='text-xl    justify-center ' onClick={() => searchJob()}>

                                <BiSearch />
                            </button>
                            {search && search.length > 0 && <button className='text-xl    justify-center ' onClick={() => fetchJobs()}>

                                <RxCross2 />
                            </button>
                            }
                        </div>




                    </div>
                    {skills && <>
                        <div>
                            <select className='rounded-lg border-2 border-green px-5 py-2 bg-white lg:mr-10 ' >
                                <option value={""}>
                                    Apply Filters
                                </option>
                                {
                                    skills?.map((item) => {
                                        return (
                                            <option value={item} >
                                                {item}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </>
                    }
                </div>
                <>
                    {isLoading ? <Loading /> : <div className='flex flex-col' >
                        {/* <MyJobComponent job={job} /> */}
                        <div className='flex flex-col' >
                            {jobs.map((item, index) => {
                                return (<>
                                    <MyJobComponent job={item} key={index} />

                                </>
                                )
                            })}
                        </div>
                    </div>}

                    {
                        !isLoading &&
                        jobs.length == 0 && <NoData />
                    }

                </>
            </div>
        </>
    )
}

export default Home

