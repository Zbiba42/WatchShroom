import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { Socket } from 'socket.io-client'

interface Props {
  socket: Socket
  roomId: string | undefined
}

export const Chat = ({ socket, roomId }: Props) => {
  const [user, setUser] = useState<{
    id: string
    username: string
  }>()
  const [messages, setMessages] = useState<
    { user: { id: string; username: string }; content: string }[]
  >([])
  const inputRef = useRef<HTMLInputElement>(null)
  const sendMessage = () => {
    if (inputRef.current) {
      socket.emit('sendMessage', {
        roomId: roomId,
        message: { user: user, content: inputRef.current.value },
      })
    }
  }
  const getRoom = async () => {
    const { data } = await axios.get(`http://localhost:5000/getRoom/${roomId}`)
    data.data.users.filter((user: { id: string; username: string }) => {
      if (user.id == socket.id) {
        setUser(user)
      }
    })
  }
  useEffect(() => {
    getRoom()
    socket.on('recieveMsg', (message) => {
      console.log(message)
      setMessages((old) => [...old, message])
    })
  }, [])
  return (
    <>
      <div className="h-[269px] w-full border-y overflow-scroll relative p-1">
        {messages.map((message) => {
          if (message.user.id == user?.id) {
            return (
              <div className="w-full flex items-center gap-2 justify-end m-1">
                <div className="bg-gray-100 p-2 text-black rounded-xl">
                  {message.content}
                </div>
                <div>
                  <img
                    src={`https://ui-avatars.com/api/?name=${message.user.username}`}
                    className="w-10 h-10 rounded-full"
                    draggable="false"
                  />
                </div>
              </div>
            )
          } else {
            return (
              <div className="w-full flex items-center gap-2 m-1">
                <div>
                  <img
                    src={`https://ui-avatars.com/api/?name=${message.user.username}`}
                    className="w-10 h-10 rounded-full"
                    draggable="false"
                  />
                </div>
                <div className="bg-gray-100 p-2 text-black rounded-xl">
                  {message.content}
                </div>
              </div>
            )
          }
        })}
      </div>
      <div className="input-group w-3/12 fixed bottom-0">
        <input
          type="text"
          placeholder="message"
          className="input input-bordered input-primary w-full"
          ref={inputRef}
        />
        <button className="btn btn-primary" onClick={sendMessage}>
          Send
        </button>
      </div>
    </>
  )
}
