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

import NodeController from "./NodeController";
import DotController from "./DotController";

enum GameState {
    Start,
    InGame,
    EndGame
}

@ccclass
export default class GameManager extends cc.Component {

    // Inspector
    @property Speed : number = 0;
    @property PosBegin : cc.Vec2 = new cc.Vec2();

    @property(cc.Label) label : cc.Label = null;
    @property(cc.Canvas) canvas : cc.Canvas = null;
    @property(cc.Node) MainMenu : cc.Node = null;
    @property(cc.Node) GameOver : cc.Node = null;
    @property(cc.Sprite) cocos : cc.Sprite = null;

    @property(cc.Node) BoardGame : cc.Node = null;
    @property(cc.Prefab) nodePrefab : cc.Prefab = null;

    // private
    totalTime : number;
    state : GameState;

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        cc.log("HieuLog onLoad");
        this.canvas.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart.bind(this));
        this.canvas.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd.bind(this));
    }
    createNode(posStart) {
        var obj = cc.instantiate(this.nodePrefab);
        obj.setPosition(this.PosBegin);
        obj.getComponent(NodeController).dot.getComponent(DotController).callback = this.callbackCollision.bind(this);
        this.BoardGame.addChild(obj);
    }

    callbackCollision() {
        cc.log("GameManager callbackCollision");
        this.EndGame();
    }
    loadLevel(level, numberDot) {
        for(var i = 0; i < level; i++) {
            var obj = cc.instantiate(this.nodePrefab);
            obj.rotation =  i * ( 360 / level);
            this.BoardGame.addChild(obj);
        }

    }
    playGame() {
        this.state = GameState.InGame;
        this.MainMenu.active = false;
        this.totalTime = 0;
        
        this.cocos.node.rotation = 0;
        this.updateUI();
    }
    EndGame () {
        this.cocos.node.runAction(cc.rotateTo(3, 180));
        this.state = GameState.EndGame;
        this.GameOver.active = true;
    }
    // TouchEvent
    onTouchStart(event) {
        // cc.log("onTouchStart " + event);
    }
    onTouchEnd(event) {
        cc.log("HieuLog onTouchEnd");
        this.playGame();

        this.createNode(this.PosBegin);
    }
    // End TouchEvent

    start () {
        cc.log("HieuLog start");
        this.totalTime = 0;
        this.state = GameState.Start;
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
