import { useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { toast } from 'react-toastify'

import { Socket } from 'socket.io-client'

interface Props {
  socket: Socket
  roomId: string | undefined
  urls: string[]
  setUrls: React.Dispatch<React.SetStateAction<string[]>>
  setCurrent: React.Dispatch<React.SetStateAction<string>>
  current: string
}
export const HostRoom = ({
  socket,
  roomId,
  urls,
  setUrls,
  setCurrent,
  current,
}: Props) => {
  const urlRef = useRef<HTMLInputElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const AddUrl = () => {
    if (urlRef.current) {
      if (urlRef.current.value.trim().length > 0) {
        if (!urls.includes(urlRef.current.value.trim())) {
          socket.emit('addUrl', { roomId: roomId, url: urlRef.current?.value })
          setUrls((old) => [...old, urlRef.current?.value as string])
        } else {
          toast.info('Link already exists')
        }
      } else {
        toast.error('Please add a valid url')
      }
    }
  }
  return (
    <>
      <div className=" w-7/12 h-full flex justify-center items-center border-x">
        <ReactPlayer
          style={{ backgroundColor: 'gray' }}
          height={509}
          width={905}
          controls={true}
          url={current}
          playing={isPlaying}
          onBuffer={() => {
            socket.emit('pauseCurrent', roomId)
            setIsPlaying(false)
          }}
          onBufferEnd={() => {
            socket.emit('playCurrent', roomId)
            setIsPlaying(true)
          }}
          onPlay={() => {
            socket.emit('playCurrent', roomId)
          }}
          onPause={() => {
            socket.emit('pauseCurrent', roomId)
          }}
        />
      </div>
      <div className="w-3/12 ">
        <div className="input-group w-full p-1">
          {/* <select className="select select-bordered">
            <option disabled selected>
              Platform
            </option>
            <option>Youtube</option>
            <option>Other</option>
            <option>Local File</option>
          </select> */}

          <input
            type="text"
            placeholder="video url"
            className="input input-bordered input-primary w-full"
            ref={urlRef}
          />
          <button className="btn btn-primary" onClick={AddUrl}>
            Add
          </button>
        </div>
        <h1 className="ml-2">Playlist :</h1>
        <div className="w-full h-2/5 overflow-scroll p-1">
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
                  onClick={() => {
                    setCurrent(url)
                    socket.emit('setCurrent', { roomId: roomId, url: url })
                  }}
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
                  onClick={() => {
                    setCurrent(url)
                    socket.emit('setCurrent', { roomId: roomId, url: url })
                  }}
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
      </div>
    </>
  )
}
