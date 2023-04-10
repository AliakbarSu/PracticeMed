const mongoose = require('mongoose')

const { Schema } = mongoose
const UserSchema = new Schema({
    userId: String,
    tests: [{ testType: String, expired: Boolean }]
})
const User = mongoose.model('User', UserSchema)

module.exports = {
    User
}