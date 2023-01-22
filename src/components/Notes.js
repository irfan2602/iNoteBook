import React, { useContext, useEffect, useRef,useState } from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem'
import AddNote from './AddNote'
import { useNavigate } from 'react-router-dom'

const Notes = (props) => {
    const navigate = useNavigate()
    const [modal,setModal] = useState(false)
    const context = useContext(noteContext)
    const { notes, getNote } = context
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNote()
        }
        else {
            navigate('/login')
        }
        // eslint-disable-next-line
    }, [])

    const ref = useRef(null)

    const updateNote = (note) => {
        //ref.current.click();
        ref.current.click()
        console.log('hey edit')
       
    }


    return (
        <>
            <AddNote showAlert={props.showAlert} />

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            ...
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-3'>
                <div className='col-md-12'>
                    <h2>Your Notes</h2>
                </div>
                <div className='container mx-2'>
                    {notes.length === 0 && 'No Notes To Display!'}
                </div>
                {
                    notes.map((note) => {
                        return <NoteItem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
                    })
                }
            </div>
        </>
    )
}

export default Notes