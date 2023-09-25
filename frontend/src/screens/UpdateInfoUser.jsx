import React, { useContext, useEffect, useRef, useState } from 'react'
import { MultiSelect } from "react-multi-select-component";
import Loading from '../components/Loading';
import axios from 'axios';
import { base_url } from '../base_url';
import { SlDocs } from "react-icons/sl";
import { errorToast, successToast } from '../Toastify';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../MyContext';



const UpdateInfoUser = () => {
    const [bio, setBio] = useState("");
    const [skills, setSkills] = useState([]);
    const [data, setData] = useState([])
    const [File, setFile] = useState();
    const [fileUrl, setFileUrl] = useState(null);
    const inpC = useRef(null);
    const [resume, setResume] = useState();
    const { user, setUser } = useContext(MyContext)
    const [isLoading, setisLoading] = useState(false)
    const uploadResumetoFile = (url) => {
        let newUrl = url.replace(".pdf", ".jpg");
        axios.put(`${base_url}/resume`, {
            resume: url,
            id: user.id
        }).then((res) => {
            setResume(newUrl);
            setUser({ ...user, resume: newUrl });
            localStorage.setItem("userHRM", JSON.stringify({ ...user, type: "seeker", resume: newUrl }));
            setisLoading(false)
        })


    }
    const fetchSkills = () => {
        axios.get(`${base_url}/skills/`).then((res) => {
            // console.log(res)
            setData(res?.data?.data)
        }).catch((err) => {
            console.log(err)
            setData(["Something went wrong"]);
        })
    }
    useEffect(() => {
        fetchSkills();

    }, []);
    const uploadFile = async () => {
        setisLoading(true);
        const form = new FormData();
        if (!File) {
            return;
        }
        let fileSize = File.size / 1000;
        if (fileSize > 200) {
            warnToast("File Size greater the 200KB")
            return;
        }
        form.append("file", File);

        // return
        axios.post(`${base_url}/upload`, form).then((res) => {
            successToast("Resume Uploaded");
            console.log(res)
            setFileUrl(res.data.file)
            uploadResumetoFile(res.data.file);
            // if (temp) {
            //     deleteResume(temp);
            // }

        }).catch((err) => {
            console.log(err);
            errorToast("Something went wrong")
        })
    }
    const navigate = useNavigate()


    const update = () => {
        if (!fileUrl) {
            errorToast("Enter All the details!!")
            return;
        }
        axios.post(`${base_url}/users/update`, {
            id: user.id,
            bio: bio,
            skills: JSON.stringify(skills),

        }).then((res) => {
            console.log(res);

            navigate("/");
        }).catch()
    }

    return (
        <div className='w-screen h-screen bg-white-green flex flex-row' >
            <div className='w-[30rem] bg-pale-green'>

            </div>
            <div className='flex flex-1 flex-col place-items-center gap-4 mt-10'>


                <p className='text-3xl uppercase font-bold  text-dark-green pt-4  self-left mb-10  ' >
                    Set up your profile
                </p>
                <div>
                    <div>
                        <p className='px-3'>
                            Tell Something about yourself
                        </p>
                        <textarea className=' border-2 outline-none w-[45rem] h-[22rem] p-3 ' onChange={(e) => setBio(e.target.value)} placeholder='   Enter text Here' >

                        </textarea>
                    </div>


                    {data ? <div>
                        <p className='px-3'>
                            Skills
                        </p>
                        <MultiSelect
                            className='outline-none  border-dark-green   rounded w-[20rem]'
                            options={data?.map((item) => ({ value: item, label: item }))}
                            value={skills}
                            onChange={setSkills}

                            isCreatable
                        />
                    </div> : <Loading />}
                    <div>
                        <p className='text-2xl px-3 py-2 '>
                            Upload Resume


                        </p>
                        {/* setFile(e.target.files[0].value) */}
                        <input ref={inpC} className='hidden' type='file' onChange={(e) => (setFile(e.target.files[0]))} />
                        <div className='flex flex-row gap-5 justify-center'>
                            <button onClick={() => inpC.current.click()} className='border-2 border-green text-lg px-3 py-2 rounded'>
                                {" Choose File"}
                            </button>
                            <button disabled={!File} className='border-2 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:border-none border-green    bg-green text-white-green rounded  text-lg px-5 py-2  ' onClick={() => uploadFile()} >
                                Upload
                            </button>

                        </div>
                        {File && <p className='flex flex-row justify-center  place-items-center gap-4 mt-2'>

                            <SlDocs />
                            {File.name}
                        </p>}

                    </div>
                </div>
                <button className='bg-green text-black rounded px-4 py-2 self-end mr-[18rem]' onClick={() => update()} >
                    Continue
                </button>
            </div>
        </div>
    )
}

export default UpdateInfoUser