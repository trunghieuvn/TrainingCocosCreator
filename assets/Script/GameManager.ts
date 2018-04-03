// Learn TypeScript:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/typescript/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

const {ccclass, property} = cc._decorator;

<<<<<<< HEAD
@ccclass
export default class GameManager extends cc.Component {
    
    @property(cc.Label)  label: cc.Label = null;

    isStart : boolean;
    totalTime: number = 0;
    
    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        
    }

    start () {
        this.totalTime = 0;
        this.isStart = false;
    }

    update (dt) {

        if (this.isStart == false)
            return;

        if(Math.floor(this.totalTime) > 5)
            return;

        this.totalTime += dt;
        this.label.string = Math.floor(this.totalTime).toString();
    }

    // GUI
    btnPlay() {
        this.isStart = true;
=======
enum  GameState {
    Start,
    InGame,
    EndGame
}


@ccclass
export default class GameManager extends cc.Component {

    // Inspector
    @property(cc.Label) label: cc.Label = null;
    @property(cc.Canvas) canvas : cc.Canvas = null;
    @property(cc.Node) GUI : cc.Node = null;
    @property(cc.Sprite) cocos : cc.Sprite = null;

    // private
    totalTime : number;
    state : GameState;

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        cc.log("HieuLog onLoad");
        this.canvas.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart.bind(this));
        this.canvas.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd.bind(this));
    }
    playGame() {
        this.state = GameState.InGame;
        this.GUI.active = false;
        this.totalTime = 0;
        
        this.cocos.node.stopAllActions();
        this.cocos.node.rotation = 0;
    }
    // TouchEvent
    onTouchStart(event) {
        cc.log("onTouchStart " + event);
    }
    onTouchEnd(event) {
        cc.log("HieuLog onTouchEnd");
        this.playGame();

    }
    // End TouchEvent

    start () {
        cc.log("HieuLog start");
        this.totalTime = 0;
        this.state = GameState.Start;
    }

    update (dt) {
        switch(this.state){
            case GameState.Start:

            break;
            case GameState.InGame:
            this.totalTime += dt;

            if(Math.floor(this.totalTime) > 5 ) {
                this.cocos.node.runAction(cc.rotateTo(3, 180));
                this.state = GameState.EndGame;
                this.GUI.active = true;
            }
            this.label.string = Math.floor(this.totalTime).toString();
            
            break;
            case GameState.EndGame:

            break;
        }
       
        
    }
    
    btnPlay() {
        this.playGame();
>>>>>>> 9fd3c96cd7ca7c0b38579c4eb82e4bde8c437cb4
    }
    btnExit() {
        cc.game.end();
    }
}
