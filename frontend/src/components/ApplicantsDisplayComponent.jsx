import React from 'react'
import { FaUserTie } from "react-icons/fa";

const ApplicantsDisplayComponent = () => {
    return (
        <div className='mx-8 bg-white border border-green text-dark-green  hover:bg-pale-green   hover:shadow-xl rounded justify-between px-8 py-4 flex flex-row gap-3 place-items-center' >
            <div className=' my-auto flex flex-row gap-3' >

                <p className='my-auto border-2 p-2   text-gray-600 border-dark-green rounded-full'>
                    <FaUserTie />
                </p>
                <p className='my-auto'>
                    Rishi
                </p>
            </div>
            <p className='my-auto    ' >
                Applied : <span className=' text-red-700 ' >
                    24/08/2024
                </span>
            </p>
        </div>
    )
}

export default ApplicantsDisplayComponent