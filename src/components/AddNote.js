import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = (props) => {
    const context = useContext(noteContext)
    const { addNote } = context

    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleClick = (e) => {
        e.preventDefault()
        addNote(note.title, note.description, note.tag)
        props.showAlert("Added Successfully","success")
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div className='container my-3'>
            <h3>Add Note</h3>
            <form className='container my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label" >Description</label>
                    <input type="text" className="form-control" id="description" name='description' aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="tag">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <button type="submit" disabled={note.title.length<5 || note.description.length<5 || note.tag.length<1} className="btn btn-primary" onClick={handleClick} >Add Note</button>
            </form>
        </div>
    )
}

export default AddNote