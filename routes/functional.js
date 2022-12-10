const express = require('express')
const router = express.Router();
const Incident = require('../models/Incident')
const User = require('../models/user')




router.post('/create', async (req, res) => {
    const loggedIn = req.cookies.login
    const ticket = Date.now()
    console.log(ticket)
    try {
        const incident = new Incident({ ...req.body, ticket })
        const response = await incident.save()
        res.redirect('/view')
    } catch (error) {
        res.status(500).render('error', {
            loggedIn
        })
    }
})

router.get('/delete/:id', async (req, res) => {
    const id = req.params.id
    const loggedIn = req.cookies.login

    try {
        const response = await Incident.find({ _id: id })
        await Incident.deleteOne({ _id: response[0]._id })
        res.redirect('/view')
    } catch (error) {
        res.status(500).render('error', {
            loggedIn
        })

    }
})

router.post('/edit/:id', async (req, res) => {
    const _id = req.params.id
    const body = req.body
    const loggedIn = req.cookies.login
    try {
        const data = await Incident.replaceOne({ _id }, body)
        res.redirect('/view')

    } catch (error) {
        res.status(500).render('error', {
            loggedIn
        })

    }
})
router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password, cpassword } = req.body
    const loggedIn = req.cookies.login
    if (password !== cpassword) {
        res.render('error', {
            message: "Passwords are not matching",
            loggedIn
        })
    } else {
        try {
            const data = new User({
                firstName, lastName, email, password
            })
            const response = await data.save()
            res.redirect('/login')
            const loggedIn = req.cookies.login
        } catch (error) {
            res.render('error', {
                message: "Something went wrong . Check Internet and try again",
                loggedIn

            })
        }
    }

})

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const loggedIn = req.cookies.login
    try {
        const user = await User.findOne({ email })
        if (user) {
            if (user.password == password) {
                res.cookie('login', user._id.toString()).redirect('/view')
            } else {
                res.status(500).render('error', {
                    loggedIn
                })
            }
        } else {
            res.status(500).render('error', {
                loggedIn
            })
        }
    } catch (error) {
        res.status(500).render('error', {
            loggedIn
        })
    }
})
router.post('/updateAccount', async (req, res) => {
    const { firstName, lastName, email, password, _id } = req.body;
    try {
        const data = await User.updateOne({ _id }, { firstName, lastName, email, password })
        res.clearCookie('login').redirect('/login')
    } catch (error) {
        res.redirect('/error')
    }
})

router.get('/logout', (req, res) => {
    res.clearCookie('login').redirect('/login')
})


router.post('/updateStatus/:id', async (req, res) => {
    const _id = req.params.id;
    const { status, narrative } = req.body
    const date = new Date()
    try {
        console.log(req.body);
        const response = await Incident.updateOne({ _id }, { status: status, $push: { narrative: { narrative, date } } })
        res.redirect('/viewAll')
    } catch (error) {

    }
})
module.exports = router