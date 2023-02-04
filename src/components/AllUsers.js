import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Chat from './Chat'

const AllUsers = () => {
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
        alert(`Hi User`)
    }

    return (
        <div>
            {
                users.map((user) => {
                    return (<div className='container'>
                        <div className='row row-cols-2 row-cols-lg-5 g-2 g-lg-3'>
                        <div className='col-md-4'  >
                            <button 
                                type='button' 
                                className='btn btn-outline-primary' 
                                onClick={handleUser} 
                                style={{marginBottom:'5px'}} >
                                    {user.name} 
                            </button>
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