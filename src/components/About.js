import React,{ useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'


const About = () => {
  const navigate = useNavigate()

  const [userData,setUserData] = useState({
    name:"",
    email:""
  })
  let host = `http://localhost:5000`

  const userDetails = async() => {
    /* e.preventDefault() */
    const res = await fetch(`${host}/api/auth/getuser`, {
      method: 'POST',
      headers: {
        "auth-token": localStorage.getItem('token')
      },
    })
    const json = await res.json()
    setUserData(json)
    
  }

  useEffect(() => {
    if(localStorage.getItem('token')){
      userDetails()
    }
    else {
        navigate('/login')
    }
}, [localStorage.getItem('token')])
  
  return (
    <div>
      <h3>Profile Details :</h3>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text"  value={userData.name} className="form-control" name='name' id="name" disabled />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input type="email"  value={userData.email} className="form-control" name='email' id="email" disabled />
      </div>
      <div className="mb-3">
        <label htmlFor="createdDate" className="form-label">Profile Created Date</label>
        <input type="text"  value={userData.date} className="form-control" name='createdDate' id="createdDate" disabled />
      </div>
    </div>
  )
}

export default About