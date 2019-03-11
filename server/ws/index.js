const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 8080 })

wss.on('connection', ws => {

    console.log("user connected ...");
    ws.send('hi from server!')

    ws.on('message', message => {
        console.log(`Received message => ${message}`)
    })
})