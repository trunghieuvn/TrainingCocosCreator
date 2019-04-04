const WebSocket = require('ws')
const uuidv1 = require('uuid/v1');

class PlayerData {
    constructor(id, x) {
        this.id = id;
        this.x = x;
        this.status = 0;
        this.key = '';
    }
}
const KEY_CONNECTED = 'connected';
const KEY_READY = 'ready';
const KEY_INGAME = 'ingame';
// https://www.jianshu.com/p/a391b8452b5a 

const wss = new WebSocket.Server({ port: 8080 })
let users = {};

wss.on('connection', function connection(ws) {
    let player = new PlayerData(uuidv1(), 0);
    player.ws = ws;
    player.key = KEY_CONNECTED;
    users[player.id] = player;
    ws.send(JSON.stringify({
        'id'  : player.id, 
        'x'   : player.x,
        'key' : player.key,
        'type' : 'ME'
    })); 

    console.log('____________________');
    console.log('| client++: ' + player.id + ' connected');
    console.log('| size : ' + Object.keys(users).length);
    // console.log(Object.keys(wss).length);
    console.log('____________________');

    wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
            //   client.send(data);
            // console.log(client);
        }
    });
    for(let user_id in users) {
        let user = users[user_id];

        console.log(user_id);
        if(user.ws != ws) {
            console.log(`rival: ${player.id} vs ${user.id}`); 
            user.ws.send(JSON.stringify({
                'id'  : player.id, 
                'x'   : player.x,
                'key' : player.key,
                'type' : 'RIVAL'
            })); 
            ws.send(JSON.stringify({
                'id'  : user.id, 
                'x'   : user.x,
                'key' : user.key,
                'type' : 'RIVAL'
            })); 
        }
    }

    ws.on('message', data => {
        let playerdata = JSON.parse(data);
        if(playerdata.type == KEY_READY) {
            console.log(`Received message form client: => ${data}`)
        }
        let pack = new Array();
        if(playerdata.type == KEY_INGAME) {
            console.log('sent: ')
            console.log(playerdata);
            for(let id in users) {
                let user = users[id];
                user.type = KEY_INGAME;
                pack.push(playerdata);

            }
            for(let id in users) {
                users[id].ws.send(JSON.stringify(
                    pack
                )); 
            }
             
        }
    })
    
    ws.on('close', message => {
        console.log('close .. ');
        console.log(message);
        console.log(wss.clients.length);

        for(let obj in users) {
            console.log(obj);
            if(users[obj].ws == ws) {
                console.log("remove client --");
                delete users[obj];
                break;
            }
        }
        console.log('clients size : ' + Object.keys(users).length);
    });
    
    ws.on('error', function (code, reason) {
        console.log(code);
    });
});

