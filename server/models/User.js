// server/models/User.js
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: String,
  job: String,
  hobbies: [String],
  gender: { type: String, enum: ['남성', '여성'] },
  regdate: { type: Date, default: Date.now }
})

export const User = mongoose.models.User || mongoose.model('User', userSchema)