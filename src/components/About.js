import React,{useContext, useEffect, useState} from 'react'
import noteContext from '../context/notes/noteContext'


const About = () => {

  useEffect(() => {
    userDetails()
  },[localStorage.getItem('token')])

  const context = useContext(noteContext)
  const { notes,getNote } = context
  const [data,setData] = useState({email:"",password:""})
  let host = `http://localhost:5000`

  const userDetails = async(e) => {
    e.preventDefault()
    const res = await fetch(`${host}/api/auth/getuser`, {
      method: 'POST',
      headers: {
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({  email: data.email, password: data.password })
    })
    const json = await res.json()
    console.log(json)
  }

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <h3>Profile Details :</h3>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" onChange={onChange} value="User Name" className="form-control" name='name' id="name" disabled />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input type="email" onChange={onChange} value="User Email" className="form-control" name='email' id="email" disabled />
      </div>
    </div>
  )
}

export default About