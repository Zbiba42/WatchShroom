import React, { createContext, useEffect, useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Socket } from 'socket.io-client'
import { Landing } from './pages/Landing'
import { Room } from './pages/Room'
import { ToastContainer, Flip } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const SocketContext = createContext<{
  socket: Socket | null
  setSocket: React.Dispatch<React.SetStateAction<Socket | null>>
} | null>(null)

function App() {
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    console.log(socket)
  }, [socket])

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Landing />,
    },
    {
      path: '/:roomId',
      element: <Room />,
    },
  ])

  return (
    <SocketContext.Provider value={{ socket, setSocket }}>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Flip}
        theme="dark"
      />
      <RouterProvider router={router} />
    </SocketContext.Provider>
  )
}

export default App
