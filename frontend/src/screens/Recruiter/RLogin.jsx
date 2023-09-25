import React, { useContext } from 'react'
import LoginIllus from '../../assets/login-illus.png'
import { useState } from 'react'
import { base_url } from '../../base_url'
import { errorToast } from '../../Toastify'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { MyContext } from '../../MyContext'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
const RLogin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [showPW, setShowPW] = useState(false)
    const [error, setError] = useState({});
    const { user, setUser } = useContext(MyContext)
    const submit = () => {
        if (password.length < 8) {
            setError({ password: "Password Must be atleast 8 characters" })

            return;
        } else {
            setError({ ...error, password: null })
        }

        // if (confirmPassword != password) {
        //     setError({ ...error, cnfpassword: "Passwords do not match" });
        //     return;
        // } else {
        //     setError({ ...error, cnfpassword: null })
        // }

        let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
        if (!regex.test(email)) {
            setError({ ...error, email: "Invalid email" });
            return;
        } else {
            setError({ ...error, email: null })
        }

        axios.post(`${base_url}/recruiter/login`, {
            email, password
        }).then((res) => {
            console.log(res)
            setUser({ ...res.data.data, type: "recruiter" })
            localStorage.setItem("userHRM", JSON.stringify({ ...res.data.data, type: "recruiter" }));
            navigate("../home/all")
        }).catch((err) => {
            console.log(err);
            errorToast("Something went wrong");
        })
    }
    return (
        <div className='w-full   flex flex-row'>
            {/* <div className='h-screen w-[40%] flex place-items-center bg-grey px-16  '>
                <img src={LoginIllus} className='h-auto max-w-full ' />
            </div> */}
            {/* <div className='h-screen w-[60%] bg-pale-green px-10 flex flex-col   justify-center  ' > */}
            <div className='b-2 rounded flex flex-col justify-center   gap-8  w-full  place-items-center' >
                {/* <div className='bg-white h-[50%] b-2 rounded shadow-lg flex flex-col  gap-8 ' > */}
                {/* <p className='px-10 my-10  text-5xl font-light' >
                        Login
                    </p> */}

                <input className='m-2 mx-10 border-2 rounded py-2 shadow-sm px-2 lg:text-lg  lg:w-[40rem] ' onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Enter Email' />
                {
                    error.email && <p className='text-red-600 text-bold  mx-10' >{error.email}</p>
                }
                <div className='relative self-center'>

                    <input className='m-2 mx-10 border-2 rounded py-2 shadow-sm px-2 lg:text-lg  lg:w-[40rem]' type={showPW ? "text" : "password"} onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Enter Password' />
                    <div className='absolute top-1/2 -translate-y-1/2 right-3 mx-10 text-2xl cursor-pointer'>
                        {showPW ? <AiOutlineEyeInvisible onClick={() => setShowPW(false)} /> : <AiOutlineEye onClick={() => setShowPW(true)} />}
                    </div>
                    {
                        error.password && <p className='text-red-600 text-bold  mx-10' >{error.password}</p>
                    }
                </div>

                <div className='flex flex-row justify-center gap-5'>

                    <button className='bg-green text-white  lg:px-10 lg:py-4 -lg:text-sm -lg:p-2 rounded w-fit  self-center active:bg-dark-green' onClick={() => submit()} >
                        Login
                    </button>
                    <button className='bg-dark-green text-white  lg:px-10 lg:py-4 -lg:text-sm -lg:p-2 rounded w-fit  self-center active:bg-green' onClick={() => navigate("../recruiter/register")} >
                        Register
                    </button>
                </div>

            </div>
        </div>

    )
}

export default RLogin