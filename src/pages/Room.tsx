import { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../App'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { HostRoom } from './HostRoom'
import { GuestRoom } from './GuestRoom'
import { toast } from 'react-toastify'

// interface RoomInterface {
//   roomId: string
//   host: {
//     id: string
//     username: string
//   }
//   users: {
//     id: string
//     username: string
//   }[]
//   playlist: string[]
// }

export const Room = () => {
  const navigate = useNavigate()
  const socketContext = useContext(SocketContext)
  const { roomId } = useParams()
  const [isHost, setIsHost] = useState(false)
  const [users, setUsers] = useState<
    {
      id: string
      username: string
    }[]
  >([])
  const [urls, setUrls] = useState<string[]>([])
  const [current, setCurrent] = useState<string>('')
  const getRoom = async () => {
    const socket = socketContext?.socket
    try {
      const { data } = await axios.get(
        `http://localhost:5000/getRoom/${roomId}`
      )
      if (data.data.host == socket?.id) {
        setIsHost(true)
      }
      setUsers(data.data.users)
      setUrls(data.data.playlist)
      setCurrent(data.data.current)
    } catch (error: any) {
      toast.error('the room dosent exist or it has been closed by the host')
      socket?.disconnect()
      navigate('/')
    }
  }
  useEffect(() => {
    const socket = socketContext?.socket
    if (socket) {
      getRoom()
    }
  }, [])
  useEffect(() => {
    const socket = socketContext?.socket
    if (socket) {
      socket.on('roomUpdate', () => {
        getRoom()
      })
      socket.on('roomEnded', () => {
        toast.info('sorry the host closed the room')
        navigate('/')
        socket.disconnect()
      })
    }
  }, [])
  return socketContext?.socket != null ? (
    <>
      <div className="flex w-full h-full rounded">
        <div className="w-2/12 p-2 rounded">
          <div
            className="flex items-center border rounded p-2 cursor-pointer bg-gray-700 hover:bg-slate-500 text-white"
            onClick={() => {
              navigator.clipboard.writeText(roomId as string)
              toast.info('copied to clipboard')
            }}
          >
            Click to copy Room ID
          </div>
          <h1>Connected Users :</h1>
          <div className="h-5/6 overflow-y-scroll overflow-x-hidden">
            {users.map((user) => {
              return (
                <div className="flex items-center gap-3  rounded p-2">
                  <img
                    src={`https://ui-avatars.com/api/?name=${user.username}`}
                    className="w-10 h-10 rounded-full"
                    draggable="false"
                  />
                  <h1 className="text-lg">
                    {user.username} {roomId?.includes(user.id) ? '(host)' : ''}
                  </h1>
                </div>
              )
            })}
          </div>
        </div>
        {isHost ? (
          <HostRoom
            socket={socketContext.socket}
            roomId={roomId}
            urls={urls}
            setUrls={setUrls}
            setCurrent={setCurrent}
            current={current}
          />
        ) : (
          <GuestRoom
            socket={socketContext.socket}
            urls={urls}
            current={current}
            roomId={roomId}
          />
        )}
      </div>
    </>
  ) : (
    <Navigate to="/" />
  )
}
