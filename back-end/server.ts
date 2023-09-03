import { Request, Response } from 'express'
const express = require('express')
import { Socket } from 'socket.io'
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const server = require('http').createServer(app)
const port = process.env.PORT || 5000
console.log(port)
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/WatchShroom')

const Room = require('./models/room')

interface CustomSocket extends Socket {
  username?: string
}

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
})

app.get('/getRoom/:roomId', async (req: Request, res: Response) => {
  const room = await Room.findOne({ roomId: req.params.roomId })
  if (room) {
    res.status(200).json({ succes: true, data: room })
  } else {
    res.status(400).json({
      succes: false,
      error: 'the room dosent exist or it has been ended by the host',
    })
  }
})

io.on('connection', (socket: CustomSocket) => {
  socket.on('create', async (data) => {
    socket.username = data.username as string
    const room = await Room.create({
      roomId: data.roomId,
      host: socket.id,
      users: [socket.username],
      playlist: [],
    })
    socket.join(room.roomId)
  })
  socket.on('join', async (data) => {
    socket.username = data.username as string
    const room = await Room.updateOne(
      { roomId: data.roomId },
      { $push: { users: socket.username } }
    )
    socket.join(data.roomId)
    io.to(data.roomId).emit('roomUpdate')
  })
  socket.on('disconnect', async () => {
    console.log('disconected')
    const room = await Room.findOne({ host: socket.id })
    if (room) {
      io.to(room.roomId).emit('roomEnded')
      await Room.deleteOne({ host: socket.id })
    }
  })
  // socket.on('addUrl', (url: string) => {
  //   console.log(url)
  //   room.vids.push(url)
  //   io.to(room.id).emit('roomUpdate', room)
  // })
})
server.listen(port, () => {
  console.log('server started')
})
