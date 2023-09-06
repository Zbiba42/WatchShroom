import { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { Socket } from 'socket.io-client'
import { Chat } from '../components/Chat'

interface Props {
  socket: Socket
  urls: string[]
  roomId: string | undefined
  current: string
}

export const GuestRoom = ({ socket, urls, roomId, current }: Props) => {
  const [Playing, setPlaying] = useState(false)

  useEffect(() => {
    socket.on('playCurrent', () => {
      setPlaying(true)
    })
    socket.on('pauseCurrent', () => {
      setPlaying(false)
    })
  }, [])
  return (
    <>
      <div className=" w-7/12 h-full flex justify-center items-center border-x relative">
        <div
          style={{
            height: 509,
            width: 905,
            position: 'absolute',
          }}
        ></div>
        <ReactPlayer
          style={{ backgroundColor: 'gray' }}
          height={509}
          width={905}
          url={current}
          playing={Playing}
        />
      </div>
      <div className="w-3/12 ">
        <h1 className="ml-2">Playlist :</h1>
        <div className="w-full h-2/5 overflow-scroll p-1 mb-[52px]">
          {urls.map((url) => {
            const regex = /v=([A-Za-z0-9_-]+)/
            const match = url.match(regex)
            if (match) {
              const videoId = match[1]
              return (
                <div
                  className={
                    url === current
                      ? 'bg-gray-500 flex items-center gap-3 border rounded p-2 m-1 overflow-hidden cursor-pointer'
                      : 'flex items-center gap-3 border rounded p-2 m-1 overflow-hidden cursor-pointer'
                  }
                >
                  <img
                    src={`https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`}
                    className="w-10 h-10"
                    draggable="false"
                  />
                  <h1 className="text-lg">{url}</h1>
                </div>
              )
            } else {
              return (
                <div
                  className={
                    url === current
                      ? 'bg-gray-500 flex items-center gap-3 border rounded p-2 m-1 overflow-hidden cursor-pointer'
                      : 'flex items-center gap-3 border rounded p-2 m-1 overflow-hidden cursor-pointer'
                  }
                >
                  <img
                    src={`https://i.ytimg.com/vi/a/mqdefault.jpg`}
                    className="w-10 h-10"
                    draggable="false"
                  />
                  <h1 className="text-lg">{url}</h1>
                </div>
              )
            }
          })}
        </div>
        <Chat socket={socket} roomId={roomId} />
      </div>
    </>
  )
}
