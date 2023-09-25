import React from 'react'

const CreateCompany = () => {
    return (
        <div className='flex flex-col px-3 gap-5 ' >

            <div>
                <p className='text-lg'>
                    Name
                </p>
                <input className='w-full border-2 border-dark-green rounded px-3 py-2 ' />
            </div>
            <div>
                <p className='text-lg'>
                    Description
                </p>
                <input className='w-full border-2 border-dark-green rounded px-3 py-2 ' />
            </div>

            <div>
                <p className='text-lg'>
                    Team Size
                </p>
                <input className='w-full border-2 border-dark-green rounded px-3 py-2 ' />
            </div>
            <div>
                <p className='text-lg'>
                    Link
                </p>
                <input className='w-full border-2 border-dark-green rounded px-3 py-2 ' />
            </div>


            <div className='flex flex-col gap-3'>
                <p className='text-lg'>
                    Upload Logo
                </p>
                <input type='file' className='w-full     border-dark-green rounded' />
            </div>

            <button className='bg-green border border-dark-green   self-end px-3 py-2 rounded mr-5 active:bg-dark-green active:text-white '>
                Create Company
            </button>


        </div>
    )
}

export default CreateCompany