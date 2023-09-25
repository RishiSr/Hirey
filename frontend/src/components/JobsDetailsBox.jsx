import React from 'react'

const JobsDetailsBox = ({ details, name }) => {
    return (
        <div className='flex flex-col text-dark-green px-4 py-1 place-items-center' >
            <p>
                {name}
            </p>
            <p >
                {details}
            </p>
        </div>


    )
}

export default JobsDetailsBox