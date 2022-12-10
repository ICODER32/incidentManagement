const mongoose = require('mongoose')

const connectDb = () => {
    mongoose.connect('mongodb+srv://syusufza:Comp229@cluster0.soqospg.mongodb.net/incidentManagement?retryWrites=true&w=majority').then(() => console.log('Database Connected')).catch(err => console.log(err))
}
module.exports = connectDb