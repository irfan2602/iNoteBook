import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
    let host = `http://localhost:5000`
    const inotes = []

    const [notes, setNotes] = useState(inotes)

    // Add a Note
    const addNote = async(title, description, tag) => {
        // API Call

        const res = await fetch(`${host}/api/notes/addnotes`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag})
        })
        const json = res.json()

        const note = {
            "_id": "63c301069397e9c05215be0d",
            "user": "63c2dd949a03f8126dc97af5",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2023-01-14T19:22:46.924Z",
            "__v": 0
        }
        setNotes(notes.concat(note))
    }
    const getNote = async() => {
        // API Call

        const res = await fetch(`${host}/api/notes/allnotes`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        })
        const json = await res.json()
        setNotes(json)
    }

    // Delete a Note
    const deleteNote = async(id) => {
        // API Call
        const res = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        })
        const json = res.json()

        //console.log(`Deleting note with id:` + id)
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }

    // Edit a Note
    const editNote = async (id, title, description, tag) => {
        // API Call
        const res = await fetch(`${host}/api/notes/updatenotes/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag})
        })
        const json = await res.json()

        for (let index = 0; index < notes.length; index++) {
            const element = notes[index]
            if (element._id === id) {
                element.title = title
                element.description = description
                element.tag = tag
            }
        }

    }

    return (
        <noteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNote }}>
            {props.children}
        </noteContext.Provider>
    )
}


export default NoteState