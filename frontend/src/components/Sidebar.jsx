import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MyContext } from '../MyContext';
import { base_url } from '../base_url';
import { errorToast, successToast } from '../Toastify';
import axios from 'axios'

const Sidebar = () => {
    const navigate = useNavigate();
    const { user, setUser, hide } = useContext(MyContext);
    const [val, setVal] = useState(1);
    const logoutUser = async () => {

        await axios.post(`${base_url}/users/logout`, {
            id: user.id || user._id,
            token: user.token
        }).then((res) => {
            console.log(res)


            successToast("Logged out");
            navigate("/")
            localStorage.clear();
            setUser(null);

        }).catch((err) => {
            console.log(err);
            errorToast("Unable to logout");

        })





    }
    const logoutRecruiter = async () => {

        await axios.post(`${base_url}/recruiter/logout`, {
            id: user.id || user._id,
            token: user.token
        }).then((res) => {
            console.log(res)


            successToast("Logged out");
            navigate("/")
            localStorage.clear();
            setUser(null);

        }).catch((err) => {
            console.log(err);
            errorToast("Unable to logout");

        })
    }

    return (
        <div className={`h-screen ${hide ? "w-0" : " w-[22rem]"}  duration-300 bg-another-green relative`}>

            {!hide && <>

                <div className='my-10  w-full flex flex-col place-items-center text-5xl text-pale-green  font-bold tracking-wider'>
                    <p>Hirey</p>
                </div>

                <div className='w-full px-4   '>
                    <ul className='flex flex-col gap-3 '>
                        <li className={` ${val == 1 ? "bg-dark-green text-white-green" : "bg-white"} rounded py-3 px-2 text-lg`} onClick={() => { setVal(1); navigate("/home/all") }}>
                            <p>
                                Jobs
                            </p>
                        </li>

                        {user?.type == "seeker" && <li className={` ${val == 2 ? "bg-dark-green text-white-green" : "bg-white"} rounded py-3 px-2 text-lg`} onClick={() => { setVal(2); navigate("/home/jobs") }}>
                            <p>
                                Applied
                            </p>
                        </li>}
                        {user?.type == "seeker" &&

                            <li className={` ${val == 3 ? "bg-dark-green text-white-green" : "bg-white"} rounded py-3 px-2 text-lg`} onClick={() => { setVal(3); navigate("/home/profile") }}>
                                <p>
                                    Profile
                                </p>
                            </li>
                        }
                        {user?.type != "seeker" && <li className={` ${val == 4 ? "bg-dark-green text-white-green" : "bg-white"} rounded py-3 px-2 text-lg`} onClick={() => { setVal(4); navigate("/home/create ") }}>
                            <p>
                                Create
                            </p>
                        </li>}
                        {user?.type != "seeker" && <li className={` ${val == 6 ? "bg-dark-green text-white-green" : "bg-white"} rounded py-3 px-2 text-lg`} onClick={() => { setVal(6); navigate("/home/jobs/my ") }}>
                            <p>
                                My Jobs
                            </p>
                        </li>}
                        <li className={` ${val == 5 ? "bg-dark-green text-white-green" : "bg-white"} rounded py-3 px-2 text-lg`} onClick={() => { setVal(5); navigate("/home/settings") }}>
                            <p>
                                Settings
                            </p>
                        </li>





                    </ul>


                </div>
                <button className='absolute  mx-3 right-0 left-0   bottom-0  my-5 border rounded   bg-dark-green text-white py-4 border-x-green active:bg-light-green active:text-dark-green active:shadow-lg    ' onClick={() => {
                    if (user.type == "seeker") {
                        logoutUser();
                    } else {
                        logoutRecruiter();
                    }
                }}>
                    Log Out
                </button>
            </>}
        </div >
    )

}
export default Sidebar