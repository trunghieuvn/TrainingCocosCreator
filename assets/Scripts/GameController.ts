// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

enum STATE{
    IDLE,
    MOVE_LEFT,
    MOVE_RIGHT,
}

@ccclass
export default class GameController extends cc.Component {

    @property(cc.Prefab) prefab_bullet : cc.Prefab = null;

    @property(cc.Canvas) canvas : cc.Canvas = null;

    @property() speed: number = 0.1;

    state: STATE = STATE.IDLE;
    player: cc.Node = null;
    ws: WebSocket = null;

    isConnected : boolean = false;
    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        console.log("GameController start");
        this.player = this.node.getChildByName("Player");

        this.canvas.node.on(cc.Node.EventType.TOUCH_START, 
            this.onTouchStart.bind(this));

        this.canvas.node.on(cc.Node.EventType.TOUCH_END, 
            this.onTouchEnd.bind(this));
    }

    onTouchStart(event) {
        cc.log("GameManager onTouchStart " + event);
    }

    onTouchEnd(event) {
        cc.log("GameManager onTouchEnd");
        this.state = STATE.IDLE;

    }

    start () {
        this.ws = new WebSocket("ws://192.168.1.7:8080");

        let seft = this;

        this.ws.onopen = function (event) {
            console.log("Send Text WS was opened.");

            seft.isConnected = true;
        };
        this.ws.onmessage = function (event) {
            console.log("response text msg: " + event.data);
        };
        this.ws.onerror = function (event) {
            console.log("Send Text fired an error");
        };
        this.ws.onclose = function (event) {
            console.log("WebSocket instance closed.");
        };
    }

    update (dt) {
        switch(this.state){
            case STATE.IDLE:
                break;
            case STATE.MOVE_LEFT:
                this.player.x -= this.speed * dt;

                if(this.player.x < 0){
                    this.player.x = cc.director.getWinSize().width;
                }
                break;
            case STATE.MOVE_RIGHT:
                this.player.x += this.speed * dt;

                if(this.player.x > cc.director.getWinSize().width){
                    this.player.x = 0;
                }
                break;
        }
        if(this.isConnected) {
            this.ws.send(JSON.stringify({
                'x' : this.player.x
            }));
        }
    }

    btnPlay() {
        console.log("btnPlay clicked!");
        cc.find("Canvas/GameWorld/UI/MainMenu").active = false;
        cc.find("Canvas/GameWorld/UI/Control").active = true;
        this.player.active = true;
    }

    btnMoveLeft() {
        console.log("btnMoveLeft clicked!");
        this.state = STATE.MOVE_LEFT;
    }

    btnMoveRight() {
        console.log("btnMoveRight clicked!");
        this.state = STATE.MOVE_RIGHT;
    }

    btnFire() {
        console.log("btnFire clicked!");
    
        let obj =  cc.instantiate(this.prefab_bullet);
        obj.x = this.player.x;
        obj.y = this.player.y + 40;
        
        this.node.addChild(obj);
    }
}
