import React, { useState } from 'react'
import Entry from '../assets/Login-Entry.png'
import Logo from '../assets/HireyLogo.png'
import { useNavigate } from 'react-router-dom'
import Login from './Login';
import RLogin from './Recruiter/RLogin';
// import { EntryWallpaper } from '../assets/EntryWP.jpg'
const EntryPage = () => {
    const navigate = useNavigate();

    const [option, setOption] = useState("")
    return (
        // bg-[url('/EntryWP.jpg')] 
        <div className="flex flex-row w-screen  h-screen   bg-dark-green  overflow-hidden "  >


            <img className='h-auto w-[50%] -lg:hidden px-2 flex-1 self-center rounded-xl' src={Entry} />
            <div className='bg-[#15B588] place-items-center -lg:w-full  h-[100%] justify-center  text-lg flex flex-col gap-5 w-[50%]  self-center shadow-xl rounded       '  >

                <div className='flex flex-col w-full gap-4 ' >
                    {/* <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800" onClick={() => setOption("RS")}>
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            Recruiter
                        </span>
                    </button> */}
                    <img className='h-auto max-w-full lg:w-[50%] flex-1 self-center rounded-xl border-2 ' src={Logo} />

                    {option == 'RS' ? <RLogin /> : <button className='bg-[#3b8549] text-white w-[25rem] py-4 text-xl self-center rounded ' onClick={() => setOption("RS")}  >
                        Recruiter Portal
                    </button>}
                    {/* <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800" onClick={() => setOption("JS")}>
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            Job Seeker
                        </span>
                    </button> */}
                    {option == 'JS' ? <Login /> : <button className='bg-[#3b8549] text-white w-[25rem] py-4 text-xl self-center rounded ' onClick={() => setOption("JS")} >
                        Job Seeker Portal
                    </button>}
                </div>
                {/* <p className='text-center uppercase text-dark-green text-xl font-bold   '>
                    {
                        option === "JS" ? "job seeker" : "Recruiter"
                    }
                </p> */}
                {/* {
                    option === "JS" ? <Login /> : <RLogin />
                } */}
                {/* <Login />
                <RLogin /> */}
            </div>

        </div>
    )
}

export default EntryPage