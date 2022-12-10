const mongoose = require('mongoose')

const IncidentModel = new mongoose.Schema({
    name: String,
    type: String,
    place: String,
    date: String,
    description: String,
    priority: String,
    ticket: String,
    narrative: {
        type: Array,
        default: []
    },
    status: {
        type: String,
        default: "new"
    },

}, { timestamps: true })

module.exports = mongoose.model('incident', IncidentModel)