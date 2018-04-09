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

import Ball from './Ball';

enum GameState {
    Started,
    InGame,
    GameOver
}
import Info from './Info';

@ccclass
export default class GameManager extends cc.Component {

    @property(cc.Label) label: cc.Label = null;
    @property(cc.Canvas) canvas : cc.Canvas = null;

    @property(cc.Prefab) prefab_CaiTrung : cc.Prefab = null;

    @property(cc.Node) player : cc.Node = null;
    @property({}) speed : number = 0;
    totalTime : number;
    gameState : GameState;

    @property({
        type: cc.Integer
    })
    myInteger = 1;
    
    @property
    myNumber = 0;
    
    @property
    myText = "";
    
    @property(cc.Node)
    myNode: cc.Node = null;
    
    @property
    myOffset = new cc.Vec2(100, 100);

    @property([cc.Node])
    public myNodes: cc.Node[] = [];

    @property([cc.Color])
    public myColors: cc.Color[] = [];

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.canvas.node.on(cc.Node.EventType.TOUCH_START,
             this.onTouchStart.bind(this));
        this.canvas.node.on(cc.Node.EventType.TOUCH_END, 
            this.onTouchEnd.bind(this));
            this.canvas.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove.bind(this));
            // stage 
            // wave 
            cc.log("width: " + this.prefab_CaiTrung.data.width);

            cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown.bind(this));
    }

    onKeyDown (event) {
        switch (event.keyCode) {
            case cc.KEY.a:
            cc.log("Key A");
            break;
        }
    }
    onTouchStart (event) {
        cc.log("GameManager onTouchStart");
    }
    onTouchEnd (event) {
        cc.log("GameManager onTouchEnd");
        this.gameState = GameState.InGame;
        this.totalTime = 0;
    }
    onTouchMove (event) {
        cc.log("GameManager onTouchMove");
    }
    start () {
        this.totalTime = 0;
        this.gameState = GameState.Started;

        for(var i = 0; i < 5; i ++ ){
           var obj =  cc.instantiate(this.prefab_CaiTrung);
           this.node.addChild(obj);

           var ball = obj.getComponent(Ball);
           ball.MoveObj();
           ball.setSpeed(i * 100);
           obj.x = i * 170;
           obj.y = i * 30;

           ball.callbackCollider = this.GameOVer.bind(this);
        }
    }

    update (dt) {
        switch(this.gameState) {
            case GameState.Started:
            {
                break;
            }
            case GameState.InGame:
            {
                this.totalTime += dt;

               
                break;
            }
            case GameState.GameOver:
            {
                break;
            }
        }
        
        this.label.string = Math.floor(this.totalTime).toString();

    }
    GameOVer() {
        cc.log("GameManager Gameover");
    }
}
