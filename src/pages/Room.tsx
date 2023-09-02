import { useContext, useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { SocketContext } from '../App'
import { Navigate } from 'react-router-dom'
export const Room = () => {
  const socketContext = useContext(SocketContext)
  const [users, setUsers] = useState<string[]>([])
  const [urls, setUrls] = useState<string[]>([])
  const urlRef = useRef<HTMLInputElement>(null)
  const addUrl = () => {
    if (urlRef.current) {
      socketContext?.socket?.emit('addUrl', urlRef.current.value)
    }
  }
  useEffect(() => {
    const socket = socketContext?.socket
    if (socket) {
      socket.on(
        'roomUpdate',
        (room: { id: string; users: string[]; vids: string[] }) => {
          console.log(room)
          setUsers(room.users)
          setUrls(room.vids)
        }
      )
    }
  }, [])
  useEffect(() => {
    const socket = socketContext?.socket
    if (socket) {
      socket.emit('getRoom')
    }
  }, [])
  return socketContext?.socket != null ? (
    <>
      <div className="flex">
        <div className="w-4/12 border">
          {users.map((user) => {
            return <h1>{user}</h1>
          })}
        </div>
        <div className="input-group w-full px-6">
          <input
            type="text"
            placeholder="Please type the video url"
            className="input input-bordered input-primary w-full"
            ref={urlRef}
          />
          <button className="btn btn-primary" onClick={addUrl}>
            Join Room
          </button>
        </div>
        <ReactPlayer url={'url'} />
      </div>
    </>
  ) : (
    <Navigate to="/" />
  )
}
