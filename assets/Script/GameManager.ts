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

import GameController from "./GameController";
import GameSettings from "./GameSettings";

enum GameState {
    Start = 0,
    InGame = 1,
    EndGame = 2
}

@ccclass
export default class GameManager extends cc.Component {

    // Inspector
    @property(cc.Label) label : cc.Label = null;
    @property(cc.Canvas) canvas : cc.Canvas = null;
    @property(cc.Node) MainMenu : cc.Node = null;
    @property(cc.Node) GameOver : cc.Node = null;

    @property(cc.Node) gameController : cc.Node = null;

    // @property([cc.Color]) public myColors: cc.Color[] = [];
    // @property get width () {
    //         return 3;
    //     }
        
    // private
    totalTime : number;
    state : GameState = GameState.Start;

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        cc.log("HieuLog onLoad");
        this.canvas.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart.bind(this));
        this.canvas.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd.bind(this));
    }
    start () {
        cc.log("HieuLog start");
        this.totalTime = 0;
        this.state = GameState.Start;

        // this.gameController.getComponent(GameController).loadLevel(5, 10);
        var gController = this.gameController.getComponent(GameController);
        gController.callBackEndGame = this.EndGame.bind(this);
    }

    update (dt) {

        switch(this.state) {
            case GameState.Start:
            break;
            case GameState.InGame:
                this.totalTime += dt;
            break;
            case GameState.EndGame:

            break;
            default:
            break;
        }
    }

    playGame() {
        this.state = GameState.InGame;
        this.MainMenu.active = false;
        this.totalTime = 0;

        var gController = this.gameController.getComponent(GameController);
        gController.BoardGame.active = true;
        this.updateUI();
    }

    EndGame () {
        cc.log("End Game");
        this.state = GameState.EndGame;
        this.GameOver.active = true;
    }
    // TouchEvent
    onTouchStart(event) {
    }
    onTouchEnd(event) {
        cc.log("HieuLog onTouchEnd");
        this.playGame();

        this.gameController.getComponent(GameController).createNode();
    }
    // End TouchEvent

    
    updateUI() {
        
    }
    btnPlay() {
        this.playGame();
    }
    btnExit() {
        cc.game.end();
    }

    btnClose() {
        this.GameOver.active = false;
        this.state = GameState.Start;
    }

    btnGoToMenu() {
        this.btnClose();
        this.MainMenu.active = true;
    }

    btnRetry() {
        this.btnClose();
        this.playGame();
    }
}
