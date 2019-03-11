const { ccclass, property } = cc._decorator;

import { GameState, BallDirection, BallDelegate } from './GameConfig';
import BallControl from './BallControl';
import GameSetting from './GameSetting';

@ccclass
export default class GameController extends cc.Component implements BallDelegate {

    @property(cc.Node)
    UI: cc.Node = null;

    @property(cc.Canvas)
    canvas: cc.Canvas = null;

    state: GameState;
    menu: cc.Node;
    //level: cc.Node;

    @property(cc.Node)
    bar: cc.Node = null;

    @property(cc.Node)
    ball: cc.Node = null;

    @property(cc.Prefab)
    gameSetting : cc.Prefab = null;

    dataSetting : GameSetting;
    btnReset : cc.Node;

    @property(cc.Camera)
    camera : cc.Camera = null;

    level : cc.Node;

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

    resetGame(){
        this.state = GameState.None;
        this.init();
        this.node.removeChild(this.level);
    }

    start() {
        this.menu = this.UI.getChildByName("Menu");
        this.btnReset = this.UI.getChildByName("btnReset");
        //this.level = this.UI.getChildByName("Level1");
        this.init();

        this.dataSetting = cc.instantiate(this.gameSetting).getComponent(GameSetting);
    }

    update(dt) {
        if(this.camera.zoomRatio >= 1){
            //this.camera.zoomRatio += 10 * dt;
        }
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

        if(this.level != null && this.level.childrenCount == 0){
            // load level
            this.loadLevel(1);
        }

    }

    init() {
        this.menu.active = true;
        //this.level.active = false;
        this.state = GameState.MainMenuGame;
        
    }

    //Event 
    clickBtnPlay() {
        this.state = GameState.InGame;
        this.menu.active = false;
        this.btnReset.active = false;
        this.ball.active = true;

        this.ball.getComponent(BallControl).isMoving = true;

        // load level
        this.loadLevel(0);
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

    loadLevel(lel){
        // load level
        this.level = cc.instantiate(this.dataSetting.levels[lel]);
        this.level.x = 241;
        this.level.y = 1183;
        this.node.addChild(this.level);
    }

}
