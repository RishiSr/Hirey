import React from 'react'

const CreateJobComponent = ({ text, data, setData, label }) => {
    return (
        <div>
            <p className='text-lg'>
                {text}
            </p>
            <input className='w-full border-2 border-dark-green rounded px-3 py-2 ' onChange={(e) => setData({ ...data, [label]: e.target.value })} />
        </div>
    )
}

export default CreateJobComponent