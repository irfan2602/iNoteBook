const mongoose = require('mongoose')

const NotesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title : {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Note = mongoose.model('Note',NotesSchema)

module.exports = Note