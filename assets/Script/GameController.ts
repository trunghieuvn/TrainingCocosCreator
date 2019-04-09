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

enum  GameState {
    Start,
    InGame,
    EndGame,
};

import Helloworld from './Helloworld';

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab) prefab: cc.Prefab = null;
    @property(cc.Label) label: cc.Label = null;

    @property(cc.Canvas) canvas : cc.Canvas = null;
    // private
    totalTime : number;
    state : GameState;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.log("GameManager onLoad");
        // this.canvas.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart.bind(this));
        // this.canvas.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd.bind(this));
    }

    start () {
        for (let index = 0; index < 4; index++) {
            let tmp = cc.instantiate(this.prefab);
            tmp.getComponent(Helloworld).dir = index;
            tmp.x = tmp.getComponent(cc.Sprite).spriteFrame.getOriginalSize().width * index;
            
            this.node.addChild(tmp);
        }


        // cc.log("GameManager start");
        // this.totalTime = 0;
        // this.state = GameState.Start;


    }

    update (dt) {

        switch(this.state){
            case GameState.Start:
                break;
            case GameState.InGame:
                this.totalTime += dt;
                console.log("this.totalTime", this.totalTime);
                if(Math.floor(this.totalTime) > 5 ) {
                    this.state = GameState.EndGame;
                }
                this.label.string = Math.floor(this.totalTime).toString();
            break;
                case GameState.EndGame:
                break;
        }   

    }

    playGame() {
        this.state = GameState.InGame;
        this.totalTime = 0;
    }

    // TouchEvent
    onTouchStart(event) {
        cc.log("GameManager onTouchStart " + event);
    }

    // TouchEnd
    onTouchEnd(event) {
        cc.log("GameManager onTouchEnd");
        this.playGame();
    }
}
