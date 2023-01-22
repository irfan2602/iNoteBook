const express = require('express')
const router = express.Router()
const Users = require('../model/Users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator')
const fetchuser = require('../middleware/fetchuser')
const JWT_SECRET = "MYNAMEISIRFANAHMAD"

// ROUTE: 1 Registration user

router.post('/user', [
    body('name', 'Enter a valid name').isLength({ min: 5 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
    body('cpassword', 'Password and confirm password must be same').isLength({ min: 5 }),
], async (req, res) => {
    let success = false
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json({ success, error: error.array() })
    }
    try {
        let user = await Users.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ success, error: "Sorry user already exists" })
        }
        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.password, salt)
        user = await Users.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
            cpassword: secPass,
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        /* console.log(authToken) */
        success = true
        res.json( { success, authToken})

    } catch (error) {
        console.log(error.message)
        res.status(500).send('Internal Server Error')
    }

})

// ROUTE: 2 Authentication

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password can not be blank').exists(),
], async (req, res) => {
    let success = false
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body
    try {
        let user = await Users.findOne({ email })
        if (!user) {
            success = false
            return res.status(400).json({ error: "Sorry doesnt exists" })
        }

        const comparePassword = await bcrypt.compare(password, user.password)
        if (!comparePassword) {
            success = false
            return res.status(400).json({ error: "Please give correct credentials" })
        }
        const payload = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(payload, JWT_SECRET)
        success = true
        res.json({success, authToken })

    } catch (error) {
        console.log(error.message)
        res.status(500).send('Internal Server Error')
    }

})

// ROUTE: 3 Get  User Details

router.post('/getuser',fetchuser, async (req, res) => {
    try {
        let userID = req.user.id
        const user = await Users.findById(userID).select("-password")
        res.send(user)

    } catch (error) {
        console.log(error.message)
        res.status(500).send('Internal Server Error')
    }

})

module.exports = router