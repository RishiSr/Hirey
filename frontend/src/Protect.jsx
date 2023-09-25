import React, { useContext, useEffect } from 'react'
import { MyContext } from './MyContext'
import { useNavigate } from 'react-router-dom';
import EntryPage from './screens/EntryPage';

const Protect = () => {
    console.log(window.location)
    const { user } = useContext(MyContext);
    const navigate = useNavigate();
    useEffect(() => {

        if (user) {
            navigate("./home/all")
        }
        else {
            navigate("/")
        }

    }, [user])

    return (
        null
    )
}

export default Protect