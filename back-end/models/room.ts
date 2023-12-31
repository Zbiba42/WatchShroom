const mongoose = require('mongoose')

const RoomSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
  },
  host: {
    type: String,
    required: true,
  },
  users: [
    {
      type: Object,
    },
  ],
  current: {
    type: String,
    default: '',
  },
  playlist: [
    {
      type: String,
    },
  ],
})

module.exports = mongoose.model('Room', RoomSchema)
