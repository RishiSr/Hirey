import React, { useState } from 'react'
import HireyLogo from '../assets/HireyLogo.png'
import { useNavigate } from 'react-router-dom'
import Login from './Login';
import RLogin from './Recruiter/RLogin';
// import { EntryWallpaper } from '../assets/EntryWP.jpg'
const EntryPage = () => {
    const navigate = useNavigate();

    const [option, setOption] = useState("JS")
    return (
        <div className="flex flex-col w-full h-screen   bg-[url('/EntryWP.jpg')]   "  >


            <img className='h-auto max-w-full rounded-lg px-2 mt-2 self-center' src={HireyLogo} />
            <div className='bg-light-green place-items-center  text-lg flex flex-col gap-5 w-full flex-1  self-center shadow-xl rounded  mt-4 pt-2     '  >

                <div className='flex flex-row gap-10' >
                    <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800" onClick={() => setOption("RS")}>
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            Recruiter
                        </span>
                    </button>
                    <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800" onClick={() => setOption("JS")}>
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            Job Seeker
                        </span>
                    </button>
                </div>
                <p className='text-center uppercase text-dark-green text-xl font-bold   '>
                    {
                        option === "JS" ? "job seeker" : "Recruiter"
                    }
                </p>
                {
                    option === "JS" ? <Login /> : <RLogin />
                }
                {/* <Login />
                <RLogin /> */}
            </div>

        </div>
    )
}

export default EntryPage