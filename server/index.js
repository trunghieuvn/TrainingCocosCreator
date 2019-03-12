const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 8080 })

wss.on('connection', ws => {

    console.log('connnected');
    ws.on('message', message => {
        console.log(`Received message form client: => ${message}`)
    })
    ws.send('hi!');
})