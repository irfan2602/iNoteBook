import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import IconButton from '@mui/material/IconButton';
import ChatTemplate from './ChatTemplate';

const Chat = () => {
    const isOpenState = useSelector(state => state.isOpen)
    const dispatch = useDispatch()

    const [ismessage, setIsMessage] = useState({message:""})

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

    /* console.log(users[0].name) */

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

    const handleChange = (e) => {
        setIsMessage({ ...ismessage, [e.target.name]: e.target.value })
    }
    const handleClick = () => {
        setIsMessage({ ...ismessage })
        setTimeout(() => {
            dispatch({ type: "OPEN_CHAT_MODAL", isOpen: false })
        },1000)
    }
    

    const onClose = () => {
        dispatch({ type: "OPEN_CHAT_MODAL", isOpen: false })
    }
    return (
        <>

            <Dialog
                open={isOpenState}
                close={onClose}
                fullWidth
                height='700px'
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{users[0].name}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div className='row' >
                            <div className='col-md-12' style={{ overflow: 'auto',minHeight:'15rem' }}> 
                                {
                                    ismessage.message
                                }
                            </div>
                        </div>
                        <textarea type="textare" name='message' onChange={handleChange} placeholder='type...' className="form-control" id="message" aria-describedby="emailHelp" />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' color='error' size='small' onClick={onClose}>X</Button>
                    <Button variant='contained' color='success' size='small' onClick={handleClick} >✓</Button>
                </DialogActions>
            </Dialog>

            {
                users.map((user,index) => {
                    return (<div className='container'>
                        <div className='row row-cols-2 row-cols-lg-5 g-2 g-lg-3'>
                            <div className='col-md-4'  >
                                <IconButton key={index} size="small" open={isOpenState} aria-label="show 4 new mails" color="inherit" onClick={handleUser} >
                                    {user.name}
                                </IconButton>
                            </div>
                        </div>
                    </div>
                    )
                })
            }
        </>
    )
}

export default Chat