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

enum GameState {
    Started,
    InGame,
    GameOver
}

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.Canvas)
    canvas:cc.Canvas = null;

    totalTime:number;
    gameState:GameState;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.canvas.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart.bind(this));
        this.canvas.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove.bind(this));
        this.canvas.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd.bind(this));
    }


    onTouchStart () {

    }

    onTouchMove () {

    }

    onTouchEnd () {
        this.gameState = GameState.InGame;
        this.totalTime = 0;
    }

    start () {
        this.totalTime = 0;
        this.gameState = GameState.Started;
    }

    update (dt) {
        switch (this.gameState) {
            case GameState.Started: {

            } break;
            case GameState.InGame: {
                this.totalTime += dt;
                this.label.string = Math.floor(this.totalTime).toString();
                if (this.totalTime > 6)
                    this.gameState = GameState.GameOver;
            } break;
            case GameState.GameOver: {

            } break;
        }
    }
}
