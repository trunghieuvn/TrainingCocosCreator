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
import { GameState } from "./Consts";
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Canvas)
    canvas: cc.Canvas = null;
    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    stateOfGame: GameState;
    totalOfTime: number;
    // LIFE-CYCLE CALLBACKS:


    onLoad() {
        cc.log("GameManager onLoad");
        // this.canvas.node.on(cc.Node.EventType.TOUCH_START,
        //     this.onTouchStart.bind(this));
        this.canvas.node.on(cc.Node.EventType.TOUCH_END,
            this.onTouchEnd.bind(this));
        
    }
    // TouchEvent
    onTouchStart(event) {
        cc.log("GameManager onTouchStart " + event);
    }
    onTouchEnd(event) {
        cc.log("GameManager onTouchEnd");
        this.btnstart();
    }

    start() {
        this.stateOfGame = GameState.Start;
        this.totalOfTime = 0;
    }


    update(dt) {
        switch (this.stateOfGame) {
            case GameState.Start:
                break;
            case GameState.InGame:
                this.totalOfTime += dt;
                this.label.string = Math.floor(this.totalOfTime).toString();
                if (Math.floor(this.totalOfTime) > 10) {
                    this.label.string = "Het Game";
                }
                break;

            case GameState.End:
                this.stateOfGame = GameState.End;
                this.label.string = "End Game";
                break;
        }
    }

    btnstart() {
        this.stateOfGame = GameState.InGame;
        this.totalOfTime = 0;
    }
    btnEnd() {
        cc.game.end();
    }
}
