import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { GiHamburgerMenu } from 'react-icons/gi'
import { MyContext } from '../MyContext'
const HomeMng = () => {
    const { hide, setHide, user } = useContext(MyContext)
    return (
        <div className='flex flex-row h-screen '>
            <Sidebar />
            <div className='flex flex-col flex-1'>
                <div className='border-b-2 py-3 px-5 text-xl flex flex-row gap-3'>
                    <button onClick={() => setHide(!hide)}>
                        <GiHamburgerMenu />
                    </button>
                    <p className='text-center'>
                        {
                            user.type == "seeker" ? "Job Seeker Portal" : "Recruiter Portal"
                        }
                    </p>
                </div>
                <Outlet />
            </div>
        </div>
    )
}

export default HomeMng