import React, { useContext, useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { ToastContainer } from 'react-toastify';
import { base_url } from '../base_url';
import axios from 'axios';
import { MyContext } from '../MyContext';
import { MultiSelect } from "react-multi-select-component";
import { errorToast, successToast, warnToast } from '../Toastify';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const UpdateDetails = () => {
    const [data, setData] = useState({})
    const { user } = useContext(MyContext);
    const [skills, setSkills] = useState();
    const [tempData, setTempData] = useState()
    const [selectedSkills, setselectedSkills] = useState([])
    const getdata = () => {
        axios.get(`${base_url}/users/${user.id || user._id}`).then((res) => {
            setData(res.data.data);
            setTempData(res.data.data)

            setselectedSkills(JSON.parse(res.data.data.skills))
        }).catch((err) => {
            console.log(err);
        })
    }
    const [update, setUpdate] = useState(false)
    const [namenew, setNamenew] = useState();
    const [emailnew, setemailnew] = useState();
    const [number, setnumber] = useState();
    const [password, setPassword] = useState()
    const mobile = 'mmf';
    const [error, setError] = useState({});
    const [cnfPassword, setCnfPassword] = useState()
    const [oldPassword, setOldPassword] = useState()
    const [newPassword, setNewPassword] = useState()
    const fetchSkills = () => {
        axios.get(`${base_url}/skills/`).then((res) => {
            // console.log(res)
            setSkills(res?.data.data)

        }).catch((err) => {
            console.log(err)
            setSkills(["Something went wrong"]);
        })
    }
    const [showPW, setShowPW] = useState(false);
    const [showCW, setShowCW] = useState(false);
    const [showOW, setShowOW] = useState(false)
    const getdataRec = () => {
        axios.get(`${base_url}/recruiter/${user.id || user._id}`).then((res) => {
            setData(res.data.data);
            setTempData(res.data.data)
        })
    }
    useEffect(() => {
        if (user?.type == "seeker") {

            getdata();
            fetchSkills();

        } else if (user?.type == "recruiter") {
            getdataRec();
        }


    }, [])
    const updateValue = () => {
        axios.put(`${base_url}/users/update/${user._id || user.id}`, data).then((res) => {
            console.log(res);
            successToast("User Info Updated");
        }).catch((err) => {
            errorToast("Something went wrong")
        })
    }
    useEffect(() => {
        if (JSON.stringify(tempData) != JSON.stringify(data)) {
            setUpdate(true);
        } else {
            setUpdate(false)
        }
    }, [data])

    useEffect(() => {
        setData({ ...data, skills: JSON.stringify(selectedSkills) });
    }, [selectedSkills])

    const [openPasswordUpdate, setOpenPasswordUpdate] = useState(false)
    const updatePSS = () => {
        if (!(newPassword?.length > 0 && cnfPassword?.length > 0 && oldPassword?.length > 0)) {
            warnToast("Enter all the feilds !!");
            return;
        }
        if (newPassword != cnfPassword) {
            setError({ cnfpassword: "Passwords do not match!!" });
            return;
        } else {
            setError({});
        }
        let url = `${base_url}/users/update/password`;
        if (user.type == 'recruiter') {
            url = `${base_url}/recruiter/update/password`;
        }
        axios.put(temp, {
            oldP: oldPassword,
            newP: newPassword,
            id: user.id || user._id
        }).then((res) => {
            successToast(res.data.message);

        }).catch((err) => {
            console.log(err);
            errorToast(err?.response?.data?.message || "Something went wrong")
        })
    }

    return (


        <div className='w-full h-full' >
            <p className='text-xl ml-4 mt-4' >
                Update Data
            </p>


            <div className='mx-10 my-5 border-2 rounded p-5 flex flex-col gap-3 border-green relative'>
                <p>
                    Name
                </p>
                <input className='bg-white border-2 rounded w-full px-3 py-1 ' value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
                <p>
                    Email
                </p>
                <input className='bg-white border-2 rounded w-full px-3 py-1 ' value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
                {data.bio && <>
                    <p>
                        Bio
                    </p>
                    <input className='bg-white border-2 rounded w-full px-3 py-1 ' value={data.bio} onChange={(e) => setData({ ...data, bio: e.target.value })} />
                </>}
                {skills && <p>
                    Skills
                </p>}
                {/* <input className='bg-white border-2 rounded w-full px-3 py-1 ' /> */}
                {skills && <MultiSelect
                    className='bg-white rounded w-full  '
                    options={skills?.map((item) => ({ value: item, label: item }))}
                    value={selectedSkills}
                    onChange={setselectedSkills}

                    isCreatable
                />}
                {openPasswordUpdate && <div className='absolute lg:p-2 px-0 pt-0 gap-10 flex flex-col  -top-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white border lg:w-[30rem] w-[20rem] -lg:pb-3  h-fit rounded-lg border-green'>
                    <p className='text-lg text-center bg-pale-green  py-3   '>
                        Update Password
                    </p>
                    <div className='mx-10 -lg:mx-2 relative'>

                        <input className='lg:m-1  border-2 rounded lg:py-4  py-2 shadow-sm px-2 lg:text-lg w-full ' onChange={(e) => setOldPassword(e.target.value)} value={oldPassword} type={showOW ? "text" : "password"} placeholder='Old Password' />
                        <div className='absolute top-1/2 -translate-y-1/2 right-3 text-2xl cursor-pointer' >

                            {showOW ? <AiOutlineEyeInvisible onClick={() => setShowOW(false)} /> : <AiOutlineEye onClick={() => setShowOW(true)} />}
                        </div>

                    </div>
                    <div className='mx-10 -lg:mx-2 relative'>

                        <input className='lg:m-1  border-2 rounded lg:py-4  py-2 shadow-sm px-2 lg:text-lg w-full  ' onChange={(e) => setNewPassword(e.target.value)} value={newPassword} type={showPW ? "text" : "password"} placeholder='New Password' />
                        <div className='absolute top-1/2 -translate-y-1/2 right-3 text-2xl cursor-pointer' >

                            {showPW ? <AiOutlineEyeInvisible onClick={() => setShowPW(false)} /> : <AiOutlineEye onClick={() => setShowPW(true)} />}
                        </div>

                    </div>
                    <div className='mx-10 -lg:mx-2 relative'>

                        <input className='lg:m-1  border-2 rounded lg:py-4  py-2 shadow-sm px-2 lg:text-lg w-full  ' onChange={(e) => setCnfPassword(e.target.value)} value={cnfPassword} type={showCW ? "text" : "password"} placeholder='Confirm New Password' />
                        <div className='absolute top-1/2 -translate-y-1/2 right-3 text-2xl cursor-pointer' >

                            {showCW ? <AiOutlineEyeInvisible onClick={() => setShowCW(false)} /> : <AiOutlineEye onClick={() => setShowCW(true)} />}
                        </div>
                        {
                            error.cnfpassword && <p className='text-red-600 text-bold  mx-10 absolute' >{error.cnfpassword}</p>
                        }
                    </div>
                    <div className='flex flex-row justify-center'>
                        <button className='px-4 py-2 bg-green text-dark-green rounded-lg mx-3 active:bg-dark-green  active:text-white ' onClick={() => updatePSS()}>
                            Update
                        </button>
                        <button className='px-4 py-2 bg-red-700   text-white rounded-lg mx-3 active:bg-red-900  active:text-white ' onClick={() => setOpenPasswordUpdate(false)}>
                            Cancel
                        </button>
                    </div>
                </div>}


                <button disabled={!update} className='px-5 disabled:bg-slate-400 disabled:cursor-not-allowed  py-1 border rounded bg-white  border-green w-32 self-end active:bg-dark-green hover:shadow-lg active:text-white hover:bg-light-green ' onClick={() => updateValue()} >
                    Update Info
                </button>

                <button className='px-5 disabled:bg-slate-400 disabled:cursor-not-allowed  py-1 border rounded bg-white  border-green w-32 self-end active:bg-dark-green hover:shadow-lg active:text-white hover:bg-light-green ' onClick={() => setOpenPasswordUpdate(true)} >
                    Update Password
                </button>


            </div>

        </div>
    )
}

export default UpdateDetails