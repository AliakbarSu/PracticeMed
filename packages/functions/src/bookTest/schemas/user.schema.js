const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
  userId: String,
  tests: [{ testType: String, expired: Boolean, results: String }],
})

exports.User = mongoose.model('User', UserSchema)
