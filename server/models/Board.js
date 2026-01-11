// server/models/Board.js
import mongoose from 'mongoose'

const boardSchema = new mongoose.Schema({
  userid: { type: String, ref: 'User', required: true },
  writer: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  hitno: { type: Number, default: 0 },
  regdate: { type: Date, default: Date.now }
})

export const Board = mongoose.models.Board || mongoose.model('Board', boardSchema)