let mongoose = require('mongoose')

let users = new mongoose.Schema({
    name:String,
    email: String

})

module.exports = mongoose.model('User', users)

