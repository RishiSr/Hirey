import React, { useEffect, useRef } from 'react'
import LoginIllus from '../../assets/login-illus.png'
import { useState } from 'react'
import { base_url } from '../../base_url'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { errorToast, successToast, warnToast } from '../../Toastify';
import { Country } from 'country-state-city';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import SmallerLoader from '../../components/SmallerLoader'

const InputComponent = ({ label, value, setvalue, error, name }) => {
    return (<>
        <input className='m-1 lg:mx-10 border-2 rounded py-4 shadow-sm px-2 -lg:py-1  -lg:px-2 lg:text-lg ' onChange={(e) => setvalue({ ...value, [label]: e.target.value })} value={value[label]} placeholder={`Enter ${name}`} />
        {
            error[label] && <p className='text-red-600 text-bold  lg:mx-10' >{error[label]}</p>
        }
    </>

    )
}
const RRegister = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [form, setForm] = useState({})
    const [showPW, setShowPW] = useState(false)
    const [showCPW, setShowCPW] = useState(false)
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
    const inpC = useRef(null)
    const [File, setFile] = useState();
    const [FileUrl, setFileUrl] = useState()
    const [error, setError] = useState({})
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setError({ password: null })
    }, [password])

    const register = () => {
        console.log({
            name: name,
            email,
            password
        })
        if (!FileUrl) {
            warnToast("Please Upload Logo First!!")
            return;
        }
        let objErr = {};
        if (password.length < 8) {
            objErr = { ...objErr, password: "Password Must be atleast 8 characters" }


        } else {
            objErr = { ...objErr, password: null }
        }

        if (confirmPassword != password) {
            objErr = { ...objErr, cnfpassword: "Passwords do not match" }

        } else {
            objErr = { ...objErr, cnfpassword: null }
        }

        let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
        if (!regex.test(email)) {
            objErr = { ...objErr, email: "Invalid email" };

        } else {
            objErr = { ...objErr, email: null }
        }
        // console.log("Rishi")

        [{ label: "companyName", name: "Company Name" }, { label: "companyDesc", name: "Company Description" }, { label: "companyLink", name: "Company Link" }, { label: "type", name: "Company Name" }].map((item) => {
            if (form[item.label]?.length == 0) {
                objErr = { ...objErr, [item.label]: `Fill the ${item.name}` }
            } else {
                objErr = { ...objErr, [item.label]: null }
            }
        })


        if (Object.keys(objErr).filter((item) => {
            if (objErr[item]) {
                return item
            }
        }).length != 0) {
            setError({ ...objErr })
            return;
        } else {
            setError({})
        }
        console.log(form)


        axios.post(`${base_url}/recruiter/register`, {
            name: name,
            email,
            password,
            ...form,
            logo: FileUrl
        }).then((res) => {
            console.log(res);

            navigate(-1)

        }).catch((err) => {
            console.log(err);
            errorToast("Something went wrong")

        });
    }

    const uploadFile = async () => {
        setIsLoading(true)
        const form = new FormData();
        if (!File) {
            return;
        }
        let fileSize = File.size / 1000;
        if (fileSize > 200) {
            setIsLoading(false)
            warnToast("File Size greater the 200KB")
            return;
        }
        form.append("file", File);

        // return
        axios.post(`${base_url}/upload`, form).then((res) => {
            successToast("Logo Uploaded");
            // console.log(res)
            setFileUrl(res.data.file)
            setIsLoading(false)
        }).catch((err) => {
            console.log(err);
            errorToast("Something went wrong")
            setIsLoading(false)

        })
    }

    return (
        <div className='  flex flex-row'>
            <div className='flex flex-row    '>

                <div className='h-full -lg:hidden w-[40%] flex place-items-center bg-grey px-16  '>
                    <img src={LoginIllus} className='h-auto max-w-full ' />
                </div>
                <div className='-lg:w-full  lg:w-[60%] bg-pale-green lg:px-10 flex flex-col   lg:h-screen   lg:justify-center  ' >
                    <div className='bg-white  py-7 b-2 rounded shadow-lg flex flex-col  gap-6 lg:h-full -lg:w-screen ' >
                        <p className='px-10 my-10  text-5xl font-light' >
                            Register
                        </p>
                        <div className='flex flex-col  overflow-y-scroll '>

                            <input className='m-1 lg:lg:mx-10 border-2 rounded py-4 shadow-sm px-2 -lg:py-1  -lg:px-2 lg:text-lg ' onChange={(e) => setName(e.target.value)} value={name} placeholder='Enter Name' />
                            <input className='m-1 lg:mx-10 border-2 rounded py-4 shadow-sm px-2 -lg:py-1  -lg:px-2 lg:text-lg ' onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Enter Email' />
                            {
                                error.email && <p className='text-red-600 text-bold  lg:mx-10' >{error.email}</p>
                            }
                            <div className='relative lg:mx-10'>

                                <input className={`m-1 w-full rounded py-4 shadow-sm px-2 -lg:py-1  -lg:px-2 lg:text-lg outline-none ${!error.password ? "border-2" : "border-2 border-red-700 "} `} type={showPW ? "text" : "password"} onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Enter Password' />
                                <div className='absolute top-1/2 -translate-y-1/2 right-3 text-2xl cursor-pointer' >

                                    {showPW ? <AiOutlineEyeInvisible onClick={() => setShowPW(false)} /> : <AiOutlineEye onClick={() => setShowPW(true)} />}
                                </div>
                                {
                                    error.password && <p className='text-red-600 text-bold  lg:mx-10' >{error.password}</p>
                                }
                            </div>
                            <div className='lg:mx-10 relative'>

                                <input className='m-1  border-2 rounded py-4 shadow-sm px-2 -lg:py-1  -lg:px-2 lg:text-lg w-full ' onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} type={showCPW ? "text" : "password"} placeholder='Confirm Password' />
                                <div className='absolute top-1/2 -translate-y-1/2 right-3 text-2xl cursor-pointer' >

                                    {showCPW ? <AiOutlineEyeInvisible onClick={() => setShowCPW(false)} /> : <AiOutlineEye onClick={() => setShowCPW(true)} />}
                                </div>
                                {
                                    error.cnfpassword && <p className='text-red-600 text-bold  lg:mx-10' >{error.cnfpassword}</p>
                                }
                            </div>
                            {/*  "companySize", "location", */}
                            {
                                [{ label: "companyName", name: "Company Name" }, { label: "companyDesc", name: "Company Description" }, { label: "companyLink", name: "Company Link" }, { label: "type", name: "Type" }].map((item) => {
                                    return (
                                        <InputComponent value={form} setvalue={setForm} label={item.label} name={item.name} error={error} />
                                    )
                                })
                            }
                            <div className='flex lg:flex-row -lg:flex-col lg:text-lg m-1   lg:mx-10 '>
                                <p className='self-center text-gray-400 ml-2 '>
                                    Enter Company Size
                                </p>
                                <div className='flex flex-col place-items-center' >

                                    <input type='number' className='m-1 lg:mx-10 border-2 rounded py-4 shadow-sm px-2 -lg:py-1  -lg:px-2 lg:text-lg  outline-none' min={"0"} />
                                    -
                                    <input type='number' className='m-1 lg:mx-10 border-2 rounded py-4 shadow-sm px-2 -lg:py-1  -lg:px-2 lg:text-lg  outline-none' min={"0"} />
                                </div>
                            </div>
                            <div className='flex flex-row -lg:flex-col lg:text-lg m-1   lg:mx-10 gap-10 '>
                                <p className='self-center text-gray-400 ml-2 '>
                                    Enter Location
                                </p>
                                <select className='bg-white w-fit -lg:self-center   ' onChange={(e) => setForm({ ...form, location: [e.target.value] })}  >
                                    {
                                        Country.getAllCountries().map((item) => {
                                            // console.log(item)
                                            return (
                                                <option value={item.name} >{item.name}</option>
                                            )
                                        })

                                    }
                                </select>
                                {/* <input type='number' className='m-1 lg:mx-10 border-2 rounded py-4 shadow-sm px-2 -lg:py-1  -lg:px-2 lg:text-lg  outline-none' min={"0"} /> */}
                            </div>

                            <div className='lg:mx-10 mt-4 ' >
                                <input ref={inpC} className='hidden' type='file' onChange={(e) => setFile(e.target.files[0])} />
                                <div className=' flex flex-row -lg:flex-col place-items-center justify-between px-2 text-gray-400 lg:text-lg -lg:gap-2' >
                                    <p>
                                        Company Logo
                                    </p>
                                    <div className='flex flex-row place-items-center lg:gap-4'>
                                        <button onClick={() => inpC.current.click()} className='bg-white border-2 border-green text-green outline-none rounded-lg px-4 py-2' >
                                            Choose File
                                        </button>
                                        {<p>
                                            {File?.name}
                                        </p>
                                        }
                                    </div>

                                    <button className='bg-pale-green text-dark-green px-4 py-2 rounded border' onClick={() => uploadFile()}>
                                        {isLoading ? <SmallerLoader /> : " Upload File"}
                                    </button>

                                </div>

                            </div>


                        </div>

                        <button className='bg-green text-white px-10 py-4 rounded w-fit  self-center active:bg-dark-green' onClick={() => register()} >
                            Register
                        </button>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default RRegister





