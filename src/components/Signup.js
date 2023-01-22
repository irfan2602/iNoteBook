import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
  const navigate = useNavigate()
  const [register, setregister] = useState({ name: "", email: "", password: "", cpassword: "" })
  let host = `http://localhost:5000`

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch(`${host}/api/auth/user`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: register.name, email: register.email, password: register.password, cpassword: register.cpassword })
    })
    const json = await res.json()
    console.log(json)
    if (json.success) {
      localStorage.setItem('token', json.authToken)
      navigate('/login')
      props.showAlert("Successfully Created","success")
    }
    else {
      props.showAlert("Invalid Details","danger")
    }



  }
  const onChange = (e) => {
    setregister({ ...register, [e.target.name]: e.target.value })
  }
  return (
    <div className='container mt-2'>
      <h2 className='my-2'>Please create an account to use iNoteBook</h2>
      <form onSubmit={handleSubmit} >
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" value={register.name} onChange={onChange} name='name' id="name" aria-describedby="emailHelp" minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" value={register.email} onChange={onChange} name='email' id="email" aria-describedby="emailHelp" required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" value={register.password} onChange={onChange} name='password' id="password" minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" value={register.cpassword} onChange={onChange} name='cpassword' id="cpassword" minLength={5} required />
        </div>
        <button type="submit" className="btn btn-primary" >Submit</button>
      </form>
    </div>
  )
}

export default Signup