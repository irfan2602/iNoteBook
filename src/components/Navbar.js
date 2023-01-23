import React from 'react'
import { NavLink,useLocation,useNavigate } from 'react-router-dom'

const Navbar = (props) => {
  let location = useLocation()
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
    props.showAlert("Successfully Login","success")
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand" aria-current="page" to="/">iNoteBook</NavLink>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className={`nav-link ${location.pathname === "/" ? "active" : ""}`}  to="/" >Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</NavLink>
              </li>
              
            </ul>
            {!localStorage.getItem('token') ?
            <form className="d-flex mx-40" id='credentialBtn'>
              <NavLink className='btn btn-primary mx-1' to='/login' role="button">Login</NavLink>
              <NavLink className='btn btn-primary mx-1' to='/signup' role="button">Signup</NavLink>
            </form> : <button className='btn btn-primary' onClick={handleLogout}>Logout</button>}
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar