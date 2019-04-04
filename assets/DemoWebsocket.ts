const {ccclass, property} = cc._decorator;

import PlayerControl from './PlayerControl';
import { PlayerData, KEY_CONNECTED, KEY_READY, KEY_INGAME } from './GameDefine';

// doc 
// https://docs.cocos2d-x.org/creator/manual/en/scripting/network.html 

@ccclass
export default class WebsocketControl extends cc.Component {

    websocket : WebSocket;
    isConnected : boolean = false;

    player : PlayerControl;
    playerDataMe : PlayerData = null;
    playerDataRivel : PlayerData = null;

    @property(cc.Prefab) prefab_Player : cc.Prefab;
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    start () {
        cc.log("WebSocket start");
        this.websocket = new 
            // WebSocket("ws://192.168.1.64:8080");
            WebSocket("ws://10.218.234.94:8080");

        var self = this;
        this.websocket.onopen = function (evt) {
            // cc.log(evt);
            self.isConnected = true;
        };
        this.websocket.onmessage = function (evt) {
            console.log('data: ' + evt.data);
            let playerdata = JSON.parse(evt.data);
            if(playerdata.key != undefined && playerdata.key == KEY_CONNECTED) {
                if(playerdata.type == 'ME'){
                    self.playerDataMe = playerdata;
                    console.log("connect succes to server");
                }
                if(playerdata.type == 'RIVAL') {
                    self.playerDataRivel = playerdata;
                    self.playerDataRivel.node = cc.instantiate(self.prefab_Player);
                    // rival.x = -100;
                    self.playerDataRivel.node.y = 320;
                    self.playerDataRivel.node.color = cc.Color.RED;
                    self.node.addChild(self.playerDataRivel.node);
                    console.log(`rival: ${self.playerDataMe.id} vs ${self.playerDataRivel.id}` );
                }
                if(playerdata.type == KEY_INGAME) {
                    console.log(`data rivel: x=${playerdata.x}`);
                    self.playerDataRivel.x = playerdata.x;
                }
            }
            for(let i = 0 ; i < playerdata.length; i ++) {
                if(playerdata[i].id == self.playerDataRivel.id)
                    self.playerDataRivel.node.x = playerdata[i].x;
            }
        };

        this.websocket.onclose = function (event) {
            console.log("Closed ");
            self.isConnected = false;
        }
        this.player = cc.find('Canvas/Player').getComponent(PlayerControl);
        // this.Send(this.player.getInfo(KEY_READY));
        console.log(this.player.node.x);
    }

    update (dt) {
        if(this.isConnected == false) 
            return;

        // this.Send('dt: ' + dt);
    }

    public Send(data : string) {
        if(this.websocket != null && this.isConnected == true)
            this.websocket.send(data);
    }

}
