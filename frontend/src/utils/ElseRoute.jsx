import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ElseRoute = () => {
    const navigate = useNavigate();
    useEffect(() => {

        navigate("/home")


    }, [])

    return (
        null
    )
}

export default ElseRoute