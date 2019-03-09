// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;



enum GameState {
    Start,
    InGame,
    EndGame
}
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Canvas) canvassss: cc.Canvas = null;
    // canvas : cc.Canvas;

    @property(cc.Button) btnStart: cc.Button = null;
    @property(cc.Button) btnEnd: cc.Button = null;

    @property(cc.Prefab) prefab_CaiTrung : cc.Prefab = null;
    @property(cc.Prefab) prefab_CaiTrung2 : cc.Prefab = null;
    
    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // private
    totalTime: number;
    state: GameState;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // this.canvassss = this.getComponent(cc.Canvas);
        //this.node.active = false;
        cc.log("onload");
        //this.node.scaleX = 2;
        //this.label.string = "mot";

        this.canvassss.node.on(cc.Node.EventType.TOUCH_START,
            this.onTouchStart.bind(this));
        // this.canvas.node.on(cc.Node.EventType.TOUCH_END,
        //     this.onTouchEnd.bind(this));
    }

    // TouchEvent
    onTouchStart(event) {
        cc.log("GameManager onTouchStart " + event);
        //this.btnPlay();
    }
    onTouchEnd(event) {
        cc.log("GameManager onTouchEnd");
        this.btnPlay();
    }
    start() {
        cc.log("Start");
        this.totalTime = 0;
    }
    update(dt) {

        return; 
        switch (this.state) {
            case GameState.Start:
                break;
            case GameState.InGame:
                this.totalTime += dt;
                if (Math.floor(this.totalTime) > 5) {
                    this.state = GameState.EndGame;
                }
                this.label.string = Math.floor(this.totalTime).toString();
                break;
            case GameState.EndGame:
                this.label.string = "het game";
                break;
        }

    }
    btnPlay() {
        this.state = GameState.InGame;
        //this.btnStart.node.active =false;
        //this.btnEnd.node.active =false;
        //cc.log("11");

    }
    btnPlay2() {
        this.state = GameState.EndGame;
        this.totalTime = 0;
        //this.canvas.enabled = false;

    }
    xoayHinh() {

    }


}
