import React, { useContext, useEffect } from 'react'
import LoginIllus from '../assets/login-illus.png'
import { useState } from 'react'
import { base_url } from '../base_url'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { errorToast, successToast } from '../Toastify'
import { MyContext } from '../MyContext'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const { setUser } = useContext(MyContext);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState({})
    const [showPW, setShowPW] = useState(false)
    const [showCPW, setShowCPW] = useState(false)
    useEffect(() => {
        setError({ password: null })
    }, [password])

    const register = () => {

        if (password.length < 8) {
            setError({ password: "Password Must be atleast 8 characters" })

            return;
        } else {
            setError({ ...error, password: null })
        }

        if (confirmPassword != password) {
            setError({ ...error, cnfpassword: "Passwords do not match" });
            return;
        } else {
            setError({ ...error, cnfpassword: null })
        }

        let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
        if (!regex.test(email)) {
            setError({ ...error, email: "Invalid email" });
            return;
        } else {
            setError({ ...error, email: null })
        }
        axios.post(`${base_url}/register`, {
            name: name,
            email,
            password
        }).then((res) => {
            console.log(res);
            setUser({ ...res.data.data, id: res.data.data._id });
            localStorage.setItem("userHRM", JSON.stringify({ ...res.data.data, id: res.data.data._id }))

            navigate("/add/info");

        }).catch((err) => {
            console.log(err);
            errorToast("Something went wrong")

        });
    }

    return (
        <div className='w-screen h-screen  flex flex-row'>
            <div className='h-full -lg:hidden w-[40%] flex place-items-center bg-grey px-16  '>
                <img src={LoginIllus} className='h-auto max-w-full ' />
            </div>
            <div className='h-full lg:w-[60%] bg-pale-green lg:px-10 flex flex-col -lg:w-full -lg:h-full    lg:justify-center  ' >
                <div className='bg-white py-7 b-2 rounded shadow-lg flex flex-col  gap-6 lg:h-fit -lg:h-full ' >
                    <p className='px-10 my-10  text-5xl font-light' >
                        Register
                    </p>

                    <input className='m-1 mx-10 border-2 rounded py-4 shadow-sm px-2 lg:text-lg ' onChange={(e) => setName(e.target.value)} value={name} placeholder='Enter Name' />
                    <input className='m-1 mx-10 border-2 rounded py-4 shadow-sm px-2 lg:text-lg ' onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Enter Email' />
                    <div className='relative mx-10'>

                        <input className={`m-1 w-full rounded py-4 shadow-sm px-2 lg:text-lg outline-none ${!error.password ? "border-2" : "border-2 border-red-700 "} `} type={showPW ? "text" : "password"} onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Enter Password' />
                        <div className='absolute top-1/2 -translate-y-1/2 right-3 text-2xl cursor-pointer' >

                            {showPW ? <AiOutlineEyeInvisible onClick={() => setShowPW(false)} /> : <AiOutlineEye onClick={() => setShowPW(true)} />}
                        </div>
                        {
                            error.password && <p className='text-red-600 text-bold  mx-10' >{error.password}</p>
                        }
                    </div>
                    <div className='mx-10 relative'>

                        <input className='m-1  border-2 rounded py-4 shadow-sm px-2 lg:text-lg w-full ' onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} type={showCPW ? "text" : "password"} placeholder='Confirm Password' />
                        <div className='absolute top-1/2 -translate-y-1/2 right-3 text-2xl cursor-pointer' >

                            {showCPW ? <AiOutlineEyeInvisible onClick={() => setShowCPW(false)} /> : <AiOutlineEye onClick={() => setShowCPW(true)} />}
                        </div>
                        {
                            error.cnfpassword && <p className='text-red-600 text-bold  mx-10' >{error.cnfpassword}</p>
                        }
                    </div>

                    <button className='bg-green text-white px-10 py-4 rounded w-fit  self-center active:bg-dark-green' onClick={() => register()} >
                        Register
                    </button>

                </div>
            </div>

        </div>
    )
}

export default Register