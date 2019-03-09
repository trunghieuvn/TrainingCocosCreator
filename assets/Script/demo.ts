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

import {GameState} from './const';

@ccclass
export default class DemoController extends cc.Component {

    @property(cc.Sprite)
    cocos: cc.Sprite = null;

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property(cc.Canvas) 
    canvas : cc.Canvas = null;

    @property(cc.Button) 
    btnPlay : cc.Button = null;

    @property(cc.Button) 
    btnExit : cc.Button = null;

    //Inner
    totalTime : number;
    temp : cc.Canvas = null;
    state: GameState ;

    onLoad () {
        
        this.temp = this.getComponent(cc.Canvas);
        cc.log("AAAAA : "  +this.temp);

        this.canvas.node.on(cc.Node.EventType.TOUCH_START, 
            this.onTouchStart.bind(this));
        this.canvas.node.on(cc.Node.EventType.TOUCH_END, 
            this.onTouchEnd.bind(this));
        this.totalTime = 0;
    }

    //TouchEvent
    onTouchStart(event) {
        cc.log("GameManager onTouchStart " + event);
    }
    onTouchEnd(event) {
        this.resetGame();
        cc.log("GameManager onTouchEnd");
    }

    start () {
        cc.log("start");
    }

    update (dt) {
        switch(this.state){
            case GameState.StartGame:
                break;
            case GameState.InGame:
                this.totalTime += dt;
                this.label.string = Math.floor(this.totalTime).toString();

                if(Math.floor(this.totalTime) > 5 ) {
                    this.cocos.node.rotation= 180;
                    this.totalTime = 0;
                    this.state = GameState.StartGame;
                }
                break;
            case GameState.EndGame:
                break;
        }
       
    }

    playGame(){
        this.totalTime = 0;
        cc.log("play game");
        this.state = GameState.InGame;

        this.btnPlay.node.active = false;
        this.btnExit.node.active = false;
    }


    exitGame(){
        cc.log("exit game");
        cc.game.end();
    }

    resetGame(){
        cc.log("exit game");
        this.label.string = "Hello, World";
        this.state = GameState.EndGame;

        this.btnPlay.node.active = true;
        this.btnExit.node.active = true;
    }


}
