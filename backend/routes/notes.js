const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const fetchuser = require('../middleware/fetchuser')
const Notes = require('../model/Note')


// ROUTE: 1 Get All Notes
router.get('/allnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Internal Server Error')
    }


})
// ROUTE: 2 Add Notes
router.post('/addnotes', fetchuser, [
    body('title', 'Enter a title').isLength({ min: 5 }),
    body('description', 'Enter Description').isLength({ min: 10 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body
        console.log(title)
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: "Error123" })
        }
        const notes = new Notes({
            title, description, tag, user: req.user.id
        })
        console.log(notes)
        const saveNote = await notes.save()

        res.json(saveNote)

    } catch (error) {
        console.log(error.message)
        res.status(500).send('Internal Server Error')
    }


})

// ROUTE: 3 Update Notes

router.put('/updatenotes/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body
        const newNote = {}
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }
        let note = await Notes.findById(req.params.id)
        if (!note) { return res.status(404).send('Not Found!!!') }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Not Allowed')
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })

    } catch (error) {
        console.log(error.message)
        res.status(500).send('Internal Server Error')
    }
})

// ROUTE: 4 Delete Note
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        /* const { title, description, tag } = req.body */
        let note = await Notes.findById(req.params.id)
        if(!note) {return res.status(401).send('Not Found')}

        if(note.user.toString() !== req.user.id){
            return res.status(401).send('Not Allowed')
        }
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({"Message": "Note Has Been Deleted Successfully"})

    } catch (error) {
        console.log(error.message)
        res.status(500).send('Internal Server Error')
    }
})

module.exports = router