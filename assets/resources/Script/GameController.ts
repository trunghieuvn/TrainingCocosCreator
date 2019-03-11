const { ccclass, property } = cc._decorator;

import { GameState, BallDirection, BallDelegate } from './GameConfig';
import BallControl from './BallControl';

@ccclass
export default class GameController extends cc.Component implements BallDelegate {

    @property(cc.Node)
    UI: cc.Node = null;

    @property(cc.Canvas)
    canvas: cc.Canvas = null;

    state: GameState;
    menu: cc.Node;
    level: cc.Node;

    @property(cc.Node)
    bar: cc.Node = null;

    @property(cc.Node)
    ball: cc.Node = null;


    onReady(){

    }

    onDie(){
        cc.log("Game over")
        this.state = GameState.EndGame;
        this.ball.getComponent(BallControl).isMoving = false;
    }

    onMoving(){

    }

    onLoad() {
        this.state = GameState.None;
        this.canvas.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove.bind(this))

        //Add delegate
        cc.find("Canvas/GameWorld/Ball").getComponent(BallControl).setDelegate(this);
    }

    start() {
        this.menu = this.UI.getChildByName("Menu");
        this.level = this.UI.getChildByName("Level1");
        this.bar.x = 0;
        this.init();
    }

    update(dt) {
        switch (this.state) {
            case GameState.None:
                cc.log("None case")
                break;
            case GameState.MainMenuGame:
                cc.log("Main menu case");
                break;
            case GameState.InGame:
                cc.log("In game case");
                break;
            case GameState.EndGame:
                cc.log("End game case");
                break;
        }
    }

    init() {
        this.menu.active = true;
        this.level.active = false;
        this.state = GameState.MainMenuGame;
    }

    //Event 
    clickBtnPlay() {
        this.state = GameState.InGame;
        this.menu.active = false;
        this.level.active = true;
        this.ball.active = true;

        this.ball.getComponent(BallControl).isMoving = true;
    }

    onTouchMove(event) {
        //cc.log("touch x:" + event.touch._point.x);
        if (this.state != GameState.InGame) {
            return
        }
        var x = event.touch._point.x;
        
        //Ngan khong cho keo ra 2 bien
        if (x < this.bar.getContentSize().width / 2) {
             x = this.bar.getContentSize().width / 2;
        } else if (x > cc.winSize.width - this.bar.getContentSize().width/2) {
             x = cc.winSize.width - this.bar.getContentSize().width/2
        }
        this.bar.x = x
    }

}
