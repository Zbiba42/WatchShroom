import { useRef } from 'react'
import ReactPlayer from 'react-player'

interface Props {
  users: string[]
}

export const HostRoom = ({ users }: Props) => {
  const urlRef = useRef<HTMLInputElement>(null)
  return (
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
        <button className="btn btn-primary">Join Room</button>
      </div>
      <ReactPlayer url={'url'} />
    </div>
  )
}
