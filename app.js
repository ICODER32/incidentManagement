const express = require('express')
const ejs = require('ejs')
const path = require('path')
const connectDb = require('./config/db')
const cookieParser = require('cookie-parser')

const PORT = process.env.PORT || 3000;
const app = express()

//Template Engine
app.set('view engine', 'ejs')
// Database Loading
connectDb()


//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
//Routes
app.use(require('./routes/pages'))
app.use('/api', require('./routes/functional'))

app.use(express.static(path.join(__dirname, '/public')))


app.listen(PORT, () => {
    console.log(`Server Started at http://localhost:${PORT}`);
})