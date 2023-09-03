import { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../App'
import { Navigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { HostRoom } from './HostRoom'
import { GuestRoom } from './GuestRoom'

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
  const socketContext = useContext(SocketContext)
  const { roomId } = useParams()
  const [isHost, setIsHost] = useState(false)
  const [users, setUsers] = useState<string[]>([])
  const [urls, setUrls] = useState<string[]>([])

  // useEffect(() => {
  //   const socket = socketContext?.socket
  //   // if (socket) {
  //   //   socket.on(
  //   //     'roomUpdate',
  //   //     (room: { id: string; users: string[]; vids: string[] }) => {
  //   //       console.log(room)
  //   //       setUsers(room.users)
  //   //       setUrls(room.vids)
  //   //     }
  //   //   )
  //   // }
  // }, [])
  const getRoom = async () => {
    const socket = socketContext?.socket
    const { data } = await axios.get(`http://localhost:5000/getRoom/${roomId}`)
    if (data.data.host == socket?.id) {
      setIsHost(true)
    }
    setUsers(data.data.users)
    setUrls(data.data.playlist)
  }
  useEffect(() => {
    const socket = socketContext?.socket
    if (socket) {
      getRoom()
    }
  }, [])
  return socketContext?.socket != null ? (
    <>{isHost ? <HostRoom users={users} /> : <GuestRoom />}</>
  ) : (
    <Navigate to="/" />
  )
}
