import React, { useEffect, useRef, useState } from 'react'
import { RxCross1 } from "react-icons/rx";
import { BsThreeDotsVertical } from "react-icons/bs";

const ProjectComponent = ({ index, project, projects, setProjects }) => {
    const [Description, setDescription] = useState([]);
    const [form, setform] = useState({ ...project })
    const [Stack, setStack] = useState([])
    const [open, setOpen] = useState(false)
    const [tempStack, setTempStack] = useState("");
    const [addLink, setAddLink] = useState(false);
    const inputStack = useRef(null);
    useEffect(() => {
        if (open) {
            inputStack.current.focus();
        }

    }, [open])
    useEffect(() => {
        console.log(index, project, "profile11")
        console.log(form)
        let temp = [...projects];
        temp[index] = { ...form };
        setProjects([...temp])
    }, [form])

    return (
        <div className='flex flex-col gap-3 flex-1'>

            <div className=' flex flex-col' >
                <div className='flex flex-row justify-between'>
                    <p className='flex flex-row place-items-center'>
                        <BsThreeDotsVertical /> <input type='text' className=' border-green rounded border px-3 py-2 outline-none' value={form?.name || ""} onChange={(e) => setform({ ...form, name: e.target.value })} placeholder='Enter Project name' />


                    </p>
                    <div>
                        <div className='flex flex-row place-items-center gap-4'>

                            <input className=' border-green rounded border px-3  outline-none' onChange={(e) => setform({ ...form, start: e.target.value })} placeholder='Enter Stating Year' type='date' />
                            <p>
                                -
                            </p>
                            <input className=' border-green rounded border px-3  outline-none' onChange={(e) => setform({ ...form, end: e.target.value })} placeholder='Enter Stating Year' type='date' />
                            <button className='ml-4 bg-red-300 rounded-full p-2' onClick={() => {
                                let temp = [...projects];
                                temp.splice(index, 1);
                                // console.log(projects)
                                setProjects([...temp])
                            }}>
                                <RxCross1 />
                            </button>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col my-3'>
                    <div className='flex flex-row justify-between'>
                        <p>
                            Links
                        </p>
                        <button className='text-white bg-green border border-dark-green rounded px-3 py-1  active:bg-dark-green ' onClick={() => setAddLink(true)}>
                            Add New
                        </button>
                    </div>

                    {addLink && <div className='flex flex-row place-items-center gap-4' >
                        <div className=' flex flex-row   place-items-center gap-2'>
                            <p>
                                Name
                            </p>
                            <input className='px-2 py-1 border   border-green rounded' />
                        </div>
                        <div className=' flex flex-row   place-items-center gap-2'>
                            <p>
                                Link
                            </p>
                            <input className='px-2 py-1 border   border-green rounded' />
                        </div>
                        <button className='text-white bg-green border border-dark-green rounded px-3 py-1  active:bg-dark-green  self-center ' >
                            Add
                        </button>
                        <button className='text-white bg-green border border-dark-green rounded px-3 py-1  active:bg-dark-green  self-center ' onClick={() => setAddLink(false)}>
                            Cancel
                        </button>
                    </div>
                    }
                </div>
                <div className='flex flex-row justify-between'>
                    <p>

                        Tech Stack
                    </p>
                    <button className='text-white bg-green border border-dark-green rounded px-3 py-1  active:bg-dark-green mb-3 ' onClick={() => { setOpen(true); }}>
                        Add New
                    </button>
                </div>
                {open && <div className='flex flex-row gap-3 my-3'>
                    <input ref={inputStack} onKeyDown={e => {
                        if (e.key === "Enter") {
                            setStack([...Stack, tempStack]); setTempStack(""); setOpen(false)
                        }
                    }} type="text" className='border px-3 py-1 outline-none border-green rounded' onChange={(e) => setTempStack(e.target.value)} />
                    {tempStack?.length > 0 && <button className='bg-green text-dark-green px-3 py-2 rounded' onClick={() => { setStack([...Stack, tempStack]); setTempStack(""); setOpen(false) }}>
                        Save
                    </button>}
                    <button className='bg-red-600  px-3 py-2  rounded' onClick={() => setOpen(false)}>
                        Cancel
                    </button>
                </div>}
                <div className='flex flex-row gap-3'>
                    {
                        Stack.map((item, index) => {
                            return (<div className='' >
                                <div className='group  capitalize border  border-green text-dark-green px-3 py-1 rounded-xl w-fit hover:bg-red-400 hover:bg-transparent flex flex-row gap-3 place-items-center relative ' >


                                    <p className=''>

                                        {item}
                                    </p>
                                    <p className=' absolute left-[50%] -translate-x-[50%] duration-150 z-20  scale-0 group-hover:scale-100      cursor-pointer bg-red-500 rounded-full p-1 text-white ' onClick={() => {
                                        let temp = [...Stack];
                                        temp.splice(index, 1);
                                        setStack([...temp])

                                    }} >
                                        <RxCross1 />
                                    </p>
                                </div>
                            </div>
                            )
                        })
                    }
                </div>

                <div className='flex flex-row justify-between place-items-center '>
                    <p>

                        Description
                    </p>
                    <button className='text-white bg-green border border-dark-green rounded px-3 py-1  active:bg-dark-green mb-3 ' onClick={() => setDescription([...Description, ""])}>
                        Add Line
                    </button>



                </div>
                <div className='flex flex-col gap-3'>

                    {
                        Description.map((item, index) => {
                            return (
                                <div className='flex flex-row gap-3 place-items-center' key={index} >
                                    <p className='text-xl' >

                                        ·
                                    </p>

                                    <input value={Description[index]} className='rounded w-full px-2 py-1 outline-none border border-green ' onChange={(e) => {

                                        let temp = [...Description];
                                        temp[index] = e.target.value;
                                        setDescription([...temp])
                                    }} />
                                    <button className='text-sm bg-red-500 rounded-full px-2 py-1   place-items-center text-white active:bg-red-900 ' onClick={() => {
                                        let temp = [...Description];
                                        temp.splice(index, 1);
                                        console.log(temp)
                                        setDescription([...temp])
                                    }} >
                                        Delete
                                    </button>
                                </div>
                            )
                        })
                    }
                </div>

            </div>
            <div className='w-[100%] h-1 bg-light-green border border-dark-green rounded-full mx-auto mb-2 mt-2' >

            </div>
        </div>
    )
}

export default ProjectComponent