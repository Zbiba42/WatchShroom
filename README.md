# WatchShroom 🍄

WatchShroom is a 🌟 unique website that allows you to create 🏠 virtual rooms and share a Room ID with your friends and guests. These rooms are not just ordinary spaces; they are 🎬 multimedia hubs where you can enjoy videos, 🗨️ chat with friends, and control the playback of videos in real-time.

## Features 🚀

### Create and Join Rooms 🏠

- Hosts can create rooms and share a Room ID with guests. 🎉
- Guests can join rooms using the provided Room ID. 🔑

### Video Playback 📺

- Hosts can add videos to the playlist from various supported platforms, including:
  - Facebook 📘
  - Vimeo 🎥
  - Wistia 📽️
  - Dailymotion 📹
  - SoundCloud 🎵
  - Mixcloud 🎶
  - Twitch (excluding live streams) 🕹️
  - Direct video links 🔗

### Real-time Video Control ⏯️

- Hosts have full control over video playback, including play, pause, seek, and more. ⏩⏸️
- When a video buffers for the host, playback pauses for all users until buffering is complete. 📶

### Chat Functionality 💬

- Engage in real-time conversations with other users in the chat corner. 💬💬

## Installation 🛠️

To run WatchShroom, you will need [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/) installed on your system.

1. Clone the repository:

```bash
git clone https://github.com/Zbiba42/WatchShroom.git
```

2. Install dependencies for both the client and server:

```bash
npm install
cd back-end
npm install
```

## Usage 🎯

### Development Mode 🚧

To run the website in development mode:

1. Start the client (frontend):

```bash
npm run dev # In the client folder
```

2. Start the server (backend):

```bash
cd back-end
npm run dev:watch # For watch mode
# OR
npm run dev
```

### Building the App 🏗️

To build the app:

1. Build the client:

```bash
npm run build
```

2. Serve the build:

```bash
serve -s build
```

3. Build the server:

```bash
cd back-end
npm run build
```

4. Run the server:

```bash
npm start
```

## Client Dependencies 📦

- `axios`: HTTP client for making requests. 🌐
- `react` and `react-dom`: React for building user interfaces. ⚛️
- `react-player`: A React component for playing media. ▶️
- `react-router-dom`: Routing library for React. 🛣️
- `react-toastify`: Toast notifications for React. 🍞
- `socket.io-client`: Socket.IO client for real-time communication. 📡

## Server Dependencies 🏢

- `express`: Web application framework for Node.js. 🌐
- `mongoose`: MongoDB object modeling library. 🍃
- `socket.io`: Real-time bidirectional event-based communication. 📡
- `ts-node` and `typescript`: TypeScript support for the server. 🦕
- `cors`: Cross-Origin Resource Sharing middleware for Express. 🤝
- `@types/express` and `@types/node`: TypeScript type definitions for Express and Node.js. 🧾

## Contributing 🤝

Feel free to contribute to WatchShroom by opening issues or pull requests. We welcome your ideas and suggestions! 🙌

Enjoy using WatchShroom, and happy watching! 🍄📺🎉
