import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import IconButton from '@mui/material/IconButton';
import { Tooltip } from 'bootstrap';

const AllUsers = () => {
    const isOpenState = useSelector(state => state.isOpen)
    const dispatch = useDispatch()


    const [users, setUsers] = useState([
        { name: "", email: "" }
    ])
    const navigate = useNavigate()

    let host = `http://localhost:5000`

    const getUser = async () => {
        const res = await fetch(`${host}/api/auth/alluser`, {
            method: 'GET',
            headers: {
                "auth-token": localStorage.getItem('token')
            },
        })
        const json = await res.json()
        console.log(json)
        setUsers(json)
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getUser()
        }
        else {
            navigate('/login')
        }
    }, [localStorage.getItem('token')])

    const handleUser = () => {
        dispatch({ type: "OPEN_CHAT_MODAL", isOpen: true })
    }


    return (
        <div>
            {
                users.map((user) => {
                    return (<div className='container'>
                        <div className='row row-cols-2 row-cols-lg-5 g-2 g-lg-3'>
                            <div className='col-md-4'  >
                                <IconButton data-toggle="tooltip" data-placement="right" title={user.email} size="small" open={isOpenState} aria-label="show 4 new mails" color="inherit"  >
                                    {user.name}
                                </IconButton>
                            </div>
                        </div>
                    </div>
                    )
                })
            }
        </div>
    )
}

export default AllUsers