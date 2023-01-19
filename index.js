const express = require('express')
const app = express()


const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
    console.log(`${socket.id} : ${new Date().getTime()} : Client Connected`)
    io.emit('recieved', `Ok : ${new Date}`)
    socket.on('sent', (text) => {
        console.log(`${socket.id} : ${new Date().getTime()} : ${text}`)
        io.emit('recieved', text)
    })
    socket.on('diconnect', () => {
        console.log(`${socket.id} : ${new Date().getTime()} : Client Disconnected`)
    })
})
const port = 3123
server.listen(port, () => {
    console.log(`Listening on port ${port}`)
})