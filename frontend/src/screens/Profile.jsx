// import React, { useEffect, useState } from 'react'
// import ProjectComponent from '../components/ProjectComponent'

// const Profile = () => {
//     const [form, setForm] = useState({})
//     const [Projects, setProjects] = useState([]);
//     useEffect(() => {
//         console.log(Projects, "PROFILE111");

//     }, [Projects])

//     return (
//         <div className='flex flex-col px-2 gap-3' >

//             <p className=' m-3 mx-6 text-3xl uppercase' >
//                 My Profile
//             </p>


//             <div className=' flex flex-col' >
//                 <p>
//                     Name
//                 </p>
//                 <div className='w-full '>
//                     <input className=' border-green rounded border px-3 py-2 outline-none' onChange={(e) => setForm({ ...form, name: e.target.value })} />
//                 </div>
//             </div>
//             <div className=' flex flex-col gap-4' >
//                 <p>
//                     Education
//                 </p>
//                 <div className=' flex flex-col' >
//                     <p>
//                         BTech
//                     </p>
//                     <div className='w-full flex flex-col gap-2'>
//                         <input className=' border-green rounded border px-3 py-2 outline-none' onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder='Enter College name' />
//                         <div className='flex flex-row place-items-center gap-4'>
//                             <p>
//                                 From
//                             </p>

//                             <input className=' border-green rounded border px-3 py-2 outline-none' onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder='Enter Stating Year' type='date' />
//                             <p>
//                                 To
//                             </p>
//                             <input className=' border-green rounded border px-3 py-2 outline-none' onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder='Enter Stating Year' type='date' />
//                         </div>

//                     </div>
//                 </div>
//             </div>
//             <div className='flex flex-col '>

//                 <div className='flex flex-row justify-between'>

//                     <p>
//                         Projects
//                     </p>
//                     <button className='text-white bg-green border border-dark-green rounded px-3 py-1  active:bg-dark-green mb-3 ' onClick={() => setProjects([...Projects, {}])}>
//                         Add New Project
//                     </button>
//                 </div>
//                 <div className=' flex flex-col gap-3 w-full' >
//                     {
//                         Projects.map((item, index) => {
//                             return (
//                                 <div className=' ' >

//                                     <ProjectComponent projects={Projects} setProjects={setProjects} index={index} project={item} />
//                                 </div>
//                             )
//                         })
//                     }

//                 </div>

//             </div>
//         </div>
//     )
// }

// export default Profile

import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { base_url } from '../base_url'
import { errorToast, successToast, warnToast } from '../Toastify'
import { MyContext } from '../MyContext'
import Loading from '../components/Loading'

const Profile = () => {
    const { user, setUser } = useContext(MyContext);
    const [File, setFile] = useState(null)
    const [fileUrl, setFileUrl] = useState(null);
    const [resume, setResume] = useState(user.resume);
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
    useEffect(() => {
        let chck = false;
        if (!user.resume && !chck) {
            chck = true;
            getResume();

        }


    }, [])

    const deleteResume = async (temp) => {
        let url = new URL(temp);
        let public_id = url.pathname.split('/')[url.pathname.split('/').length - 1];
        public_id = public_id.replace(".jpg", "");
        // console.log(public_id.replace(".jpg", ""), "temp")
        axios.delete(`${base_url}/deletefile/${public_id}`).then((res) => {
            console.log("Previous Resume Deleted");
        }).catch((err) => {
            console.log("Something went wrong")
        })
    }
    const getResume = () => {
        axios.get(`${base_url}/resume/${user.id}`).then((res) => {
            console.log(res.data.data.resume)
            setResume(res.data.data.resume);
            setUser({ ...user, resume: res.data.data.resume });
            localStorage.setItem("userHRM", JSON.stringify({ ...res.data.data, type: "seeker", resume: res.data.data.resume }));
        }).catch((err) => {
            console.log(err);
            errorToast("Something went wrong")
        })
    }
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
        let temp = resume;
        if (temp) {
            deleteResume(temp);
        }
        // return
        axios.post(`${base_url}/upload`, form).then((res) => {
            successToast("Resume Uploaded");
            console.log(res)
            setFileUrl(res.data.file)
            uploadResumetoFile(res.data.file);
            if (temp) {
                deleteResume(temp);
            }

        }).catch((err) => {
            console.log(err);
            errorToast("Something went wrong")
        })
    }

    const inpC = useRef(null)
    return (
        <div className='overflow-auto'>
            <p className='text-2xl px-3 py-2 '>
                Upload Resume


            </p>
            {/* setFile(e.target.files[0].value) */}
            <input ref={inpC} className='hidden' type='file' onChange={(e) => (setFile(e.target.files[0]))} />
            <div className='flex flex-row gap-5 justify-center'>
                <button onClick={() => inpC.current.click()} className='border-2 border-green text-lg px-3 py-2 rounded'>
                    {resume ? "Update Resume" : " Choose File"}
                </button>
                <button disabled={!File} className='border-2 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:border-none border-green    bg-green text-white-green rounded  text-lg px-5 py-2  ' onClick={() => uploadFile()} >
                    Upload
                </button>

            </div>

            {
                isLoading &&

                <div className='w-full  flex flex-row justify-center  mt-16 '>
                    <Loading />

                </div>
            }
            {
                resume && !isLoading &&
                <div className='mx-auto mt-2 mb-2 '>
                    <img src={resume} className='h-auto w-[55%]    mx-auto border border-black  ' />
                </div>
            }
        </div >
    )
}

export default Profile