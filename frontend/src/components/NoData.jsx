import React from 'react'
import NoGif from '../assets/No data.gif'
const NoData = () => {
    return (
        <div className='flex flex-row justify-center w-full my-auto mx-auto' >
            <img src={NoGif} />
        </div>
    )
}

export default NoData