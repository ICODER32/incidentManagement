const express = require('express')
const router = express.Router();
const Incident = require('../models/Incident')
const User = require('../models/user')


const auth = (req, res, next) => {
    const login = req.cookies.login
    if (login) {
        next()
    } else {

        res.redirect('/login')
    }
}

router.get('/', (req, res) => {
    const loggedIn = req.cookies.login
    res.render('index', {
        loggedIn
    })
})
router.get('/view', auth, async (req, res) => {
    const loggedIn = req.cookies.login
    const allIncidents = await Incident.find({ status: 'active' })


    res.render('view', {
        title: 'Active Records',
        allrecord: false,
        data: allIncidents,
        loggedIn
    })
})
router.get('/viewAll', auth, async (req, res) => {
    const loggedIn = req.cookies.login
    const allIncidents = await Incident.find()


    res.render('view', {
        title: 'All Records',
        allrecord: true,
        data: allIncidents,
        loggedIn
    })
})
router.get('/create', auth, (req, res) => {
    const loggedIn = req.cookies.login
    res.render('create', {
        loggedIn
    })
})

router.get('/edit/:id', auth, async (req, res) => {
    const id = req.params.id
    const loggedIn = req.cookies.login
    const allIncidents = await Incident.find({ _id: id })

    res.render('edit', {
        title: 'Edit Record',
        data: allIncidents[0],
        loggedIn

    })
})

router.get('/login', (req, res) => {
    const loggedIn = req.cookies.login
    res.render('login', {
        loggedIn
    })
})
router.get('/register', (req, res) => {
    const loggedIn = req.cookies.login
    res.render('register', {
        loggedIn
    })
})


router.get('/update/:id', auth, async (req, res) => {
    const loggedIn = req.cookies.login
    try {
        const data = await User.findOne({ _id: req.params.id })
        res.render('updateUser', {
            loggedIn,
            data: data
        })

    } catch (error) {

    }
})

router.get('/viewTicket/:id', auth, async (req, res) => {
    const loggedIn = req.cookies.login
    const _id = req.params.id;
    try {
        const data = await Incident.findOne({ _id })
        res.render('viewTicket', {
            loggedIn,
            data
        })

    } catch (error) {
        res.redirect('/error')
    }
})

router.get('/ticket/:id', auth, (req, res) => {
    const loggedIn = req.cookies.login
    res.render('updateProgress', {
        loggedIn,
        id: req.params.id
    })
})
module.exports = router