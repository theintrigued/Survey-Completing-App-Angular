let mongoose = require('mongoose')

let users = new mongoose.Schema({
    
    username:{type: String, unique: true},
    robuxcount: Number

})

module.exports = mongoose.model('User', users)

