import React, { useContext, useEffect, useState } from 'react'
import CreateJobComponent from '../components/CreateJobComponent'
import { base_url } from '../base_url';
import axios from 'axios';
import { MultiSelect } from "react-multi-select-component";
import Datepicker from "react-tailwindcss-datepicker";
import { MyContext } from '../MyContext';
import { errorToast } from '../Toastify';

const CreateJobs = () => {
    const [form, setForm] = useState({});
    const { user } = useContext(MyContext);
    const [skills, setSkills] = useState([]);
    const [skillMust, setSetskillMust] = useState([]);
    const [skillsOpt, setSetskillsOpt] = useState([]);
    const [applyBy, setApplyBy] = useState("")
    // const [date, setDate] = useState({
    //     startDate: null,
    //     endDate: null
    // })
    const handleValueChange = (newValue) => {
        console.log("newValue:", newValue);
        setDate(newValue);
    }

    const [Minwh, setMinwh] = useState();
    const [Maxwh, setMaxwh] = useState();

    const fetchSkills = () => {
        axios.get(`${base_url}/skills/`).then((res) => {
            // console.log(res)
            setSkills(res?.data.data)
        }).catch((err) => {
            console.log(err)
            setSkills(["Something went wrong"]);
        })
    }
    useEffect(() => {
        fetchSkills();

    }, []);
    const submit = () => {
        // const keyObj = ["name", "description", "experience", "salaryfrom", "salaryto", "startDate", "endDate", "skills", "optSkills", "recruiter", "applyBy"]
        const keyObj = ["name", "description", "experience", "salaryfrom", "salaryto", "startDate", "skills", "optSkills", "recruiter", "applyBy", "duration", "mode",
            "wrkHrs",
            "duration",
            "openings"]

        console.log(user)
        let skillMustlocal = skillMust?.map((item) => item.value);
        let skillOptlocal = skillsOpt?.map((item) => item.value);
        let sendForm = { ...form, skills: JSON.stringify([...skillMustlocal]), optSkills: JSON.stringify([...skillOptlocal]), recruiter: user.id, applyBy, wrkHrs: JSON.stringify({ min: Minwh, max: Maxwh }) };
        console.log(sendForm)
        for (let i in keyObj) {
            if (!sendForm[keyObj[i]] || sendForm[keyObj[i]].length == 0) {
                console.log(keyObj[i])
                errorToast("Fill all the feilds");
                return;
            }
        }
        // console.log(sendForm)
        // return;
        axios.post(`${base_url}/jobs/create`, sendForm).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })

    }

    return (
        <div className='flex flex-row px-3 py-2 gap-4 overflow-auto  w-full   ' >
            <div className='flex flex-col '>

                <CreateJobComponent data={form} setData={setForm} text={"Role"} label={"name"} />
                <CreateJobComponent data={form} setData={setForm} text={"Description"} label={"description"} />
                <CreateJobComponent data={form} setData={setForm} text={"Experience"} label={"experience"} />
                <div>
                    <p className='text-lg'>
                        No of Openings
                    </p>
                    <input className='outline-none border-2 border-dark-green px-3 py-2 rounded lg:lg:w-[20rem]' value={form.openings} onChange={(e) => setForm({ ...form, openings: e.target.value })} type='number' />
                </div>
                <div>
                    <p className='text-lg'>
                        Working Hours
                    </p>
                    <div className='flex -lg:flex-col flex-row gap-3 ' >
                        <div className='flex flex-col'>
                            <p>
                                Min Hours
                            </p>
                            <input className='outline-none border-2 border-dark-green px-3 py-2 rounded lg:lg:w-[20rem]' onChange={(e) => setMinwh(e.target.value)} type='number' />
                        </div>
                        <div className='flex flex-col'>
                            <p>
                                Max Hours
                            </p>
                            <input className='outline-none border-2 border-dark-green px-3 py-2 rounded lg:lg:w-[20rem]' onChange={(e) => setMaxwh(e.target.value)} type='number' />
                        </div>
                    </div>
                </div>
                {/* <input class    Name='' value={form.opening} onChange={(e) => setForm({ ...form, opening: e.target.value })} type='number' /> */}

                <div className='grid grid-cols-1  gap-x-6'>
                    <p>
                        Start Date
                    </p>
                    <input type='date' min="1997-01-01" max="2030-12-31" placeholder="dd-mm-yyyy" className='outline-none border-2 border-dark-green px-3 py-2 rounded lg:w-[20rem]' onChange={(e) => setForm({ ...form, startDate: e.target.value })} />


                </div>
                <div>
                    <p className='text-lg'>
                        Duration
                    </p>
                    <input className='outline-none border-2 border-dark-green px-3 py-2 rounded lg:w-[20rem]' value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} type='number' />
                </div>
                <div className='flex flex-col first-letter:'>

                    <p className='text-lg'>
                        Stipend
                    </p>
                    <div className='flex  -lg:flex-col flex-row gap-2'>

                        <CreateJobComponent data={form} setData={setForm} text={"From"} label={"salaryfrom"} />
                        <CreateJobComponent data={form} setData={setForm} text={"To"} label={"salaryto"} />
                    </div>
                </div>
                <div>
                    <p>Apply By</p>
                    <input type='date' min="1997-01-01" max="2030-12-31" placeholder="dd-mm-yyyy" className='outline-none border-2 border-dark-green px-3 py-2 rounded lg:w-[20rem]' onChange={(e) => setApplyBy(e.target.value)} />
                </div>
                <div>
                    <p>Skills (Must)</p>


                    <MultiSelect
                        className='outline-none  border-dark-green   rounded lg:w-[20rem]'
                        options={skills.map((item) => ({ value: item, label: item }))}
                        value={skillMust}
                        onChange={setSetskillMust}

                        isCreatable
                    />

                </div>
                <div>
                    <p>Skills (Optional)</p>

                    <MultiSelect
                        className='outline-none  border-dark-green   rounded lg:w-[20rem]'
                        options={skills.map((item) => ({ value: item, label: item }))}
                        value={skillsOpt}
                        onChange={setSetskillsOpt}

                        isCreatable
                    />

                </div>
                <div>
                    <p>Job Opening Type</p>

                    <select className='outline-none py-2 bg-white  border-2  border-dark-green   rounded lg:w-[20rem]' onChange={(e) => setForm({ ...form, type: e.target.value })}  >
                        <option value={""}>
                            Chooose Option
                        </option>
                        <option value={"Internship"}>
                            Internship
                        </option>
                        <option value={"Full Time Role"}>
                            Full Time Role
                        </option>
                    </select>

                </div>
                <div>
                    <p>Working Mode</p>

                    <select className='outline-none py-2 bg-white  border-2  border-dark-green   rounded lg:w-[20rem]' onChange={(e) => setForm({ ...form, mode: e.target.value })}  >
                        <option value={""}>
                            Chooose Option
                        </option>
                        <option value={"remote"}>
                            Remote
                        </option>
                        <option value={"inoffice"}>
                            In Office
                        </option>
                        <option value={"Hybrid"}>
                            Hybrid
                        </option>
                    </select>

                </div>
                <button onClick={() => submit()} className='  self-end mr-9 bg-another-green   text-white rounded px-4 py-3  active:bg-dark-green ' >
                    Create Job
                </button>
            </div>
        </div>
    )
}

export default CreateJobs