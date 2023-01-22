import React,{useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext'
import About from './About'



const NoteItem = (props) => {
    const context = useContext(noteContext)
    const [state,setState] = useState(false)
    const { deleteNote } = context
    const { note,updateNote } = props
    return (
        <div class='col-md-3'>
            <div class="card my-3">
                <div class="card-body" style={{boxShadow: '10px 5px 5px',minHeight:'15rem',maxHeight:'15rem',overflow:'auto'}}>
                    <div className='d-flex align-items-center'>
                        <h5 class="card-title">{note.title}</h5>
                        <i class="fa-solid fa-trash mx-2" onClick={() => {deleteNote(note._id);props.showAlert('Deleted Successfully','success')}}></i>
                        {/* <i class="fa-regular fa-pen-to-square mx-2" onClick={() => {updateNote(note)}}></i> */}
                        <i class="far fa-edit mx-2" onClick={() => {updateNote(note)}}></i>
                    </div>
                    <p class="card-text"> {note.description} </p>
                    <p class="card-text"> {note.tag} </p>
                </div>
            </div>
         {/* <EditNoteModal /> */}
        </div>
    )
}

export default NoteItem