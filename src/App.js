import './App.css';
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import NoteState from './context/notes/NoteState';
import Alert  from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';
import AllUsers from './components/AllUsers';
import { useState } from 'react';
import Chat from './components/Chat';
import Loading from './components/Loading';

function App() {
  const [alert,setAlert] = useState(null)
  const showAlert = (message,type) => {
    setAlert({
      msg: message,
      type: type,
    })
    setTimeout(() => {
      setAlert(null)
    },1500)
  }
  return (
    <>
      <NoteState>
        
        <Navbar />
        <Alert alert={alert} />
        <div className='container'>
          <Routes>
            <Route path='/' element={<Home showAlert={showAlert} />}></Route>
          </Routes>
          <Routes>
            <Route path='/about' element={<About />}></Route>
          </Routes>
          <Routes>
            <Route path='/user' element={<AllUsers />}></Route>
          </Routes>
          <Routes>
            <Route path='/chat' element={<Chat />}></Route>
          </Routes>
          <Routes>
            <Route path='/home' element={<Loading />}></Route>
          </Routes>
          <Routes>
            <Route path='/login' element={<Login showAlert={showAlert} />}></Route>
          </Routes>
          <Routes>
            <Route path='/signup' element={<Signup showAlert={showAlert} />}></Route>
          </Routes>
        </div>
      </NoteState>
    </>
  );
}

export default App;
