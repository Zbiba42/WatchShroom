import { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'
import { SocketContext } from '../App'
export const Landing = () => {
  const socketContext = useContext(SocketContext)
  const [isCreating, setCreating] = useState(false)
  const navigate = useNavigate()
  const usernameRef = useRef<HTMLInputElement>(null)
  const createRoom = () => {
    const socket = io('http://localhost:5000/')

    socket.on('connect', () => {
      socketContext?.setSocket(socket)
      if (usernameRef.current) {
        socket.emit('create', {
          roomId: 'Room_' + socket.id,
          username: usernameRef.current.value,
        })
        navigate(`/${'Room_' + socket.id}`)
      }
    })
  }
  return (
    <div className="h-5/6 text-[#F9F4F5] flex flex-col justify-center items-center">
      <h1 className="text-3xl font-medium mb-12">Welcome {'<'}3.</h1>
      <div className="w-10/12 flex justify-between">
        <div
          className={
            isCreating
              ? 'border-2 rounded-md w-full h-64 flex items-center justify-center flex-col gap-4'
              : 'border-2 rounded-md w-5/12 h-64 flex items-center justify-center flex-col gap-4'
          }
        >
          {!isCreating ? (
            <>
              <h1 className="text-2xl">Create a room</h1>
              <button
                className="btn btn-primary"
                onClick={() => setCreating(true)}
              >
                Create
              </button>
            </>
          ) : (
            <>
              <h1 className="text-2xl mb-2">Enter a username</h1>
              <div className="input-group w-full px-6">
                <input
                  type="text"
                  placeholder="username"
                  className="input input-bordered input-primary w-full"
                  ref={usernameRef}
                />
                <button className="btn btn-primary" onClick={createRoom}>
                  Join Room
                </button>
              </div>
            </>
          )}
        </div>
        {isCreating || (
          <div className="border-2 rounded-md w-5/12 h-64 flex items-center justify-center flex-col gap-4">
            <h1 className="text-2xl">Join a room</h1>
            <div className="input-group w-full px-6">
              <input
                type="text"
                placeholder="Room Id"
                className="input input-bordered input-primary w-full"
              />
              <button className="btn btn-primary">Go</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}