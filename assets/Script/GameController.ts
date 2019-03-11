import {GameState, BallDelegate} from "./GameDefine";
import BallControll from './BallControll';
import GameSetting from './GameSetting';


const {ccclass, property} = cc._decorator;


@ccclass
export default class GameWorldController extends cc.Component implements BallDelegate {

    onReady() {
        throw new Error("Method not implemented.");
    }
    onMoving() {
        throw new Error("Method not implemented.");
    }
    OnDie() {
        cc.log("GameWorldController::OnDie: DIE");
    }

    @property (cc.Node) GuiManager : cc.Node = null;
    @property(cc.Canvas) canvas : cc.Canvas = null;
    @property(cc.Prefab) gameSetting : cc.Prefab = null;

    state : GameState;
    layer_MainMenu : cc.Node;
    layer_Game : cc.Node;
    bar : cc.Node;
    dataSetting : GameSetting;

    
    // layer_Game : cc.Node;


    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        this.state = GameState.None;
        // this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove.bind(this));


        cc.log("Winsize width: " + cc.winSize.width);
        cc.log("Winsize height: " + cc.winSize.height);

        // this.canvas.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove.bind(this));
        // cc.find("Canvas/GameWorld/Game/ball")
        // .getComponent(BallControll)
        // .setDelegate(this);
        

    }

    start () {
        this.layer_MainMenu = this.GuiManager.getChildByName("MainMenu");
        // this.layer_Game = this.node.getChildByName("Game");
        this.layer_Game = cc.find("Canvas/GameWorld/Game");
        this.bar = this.node.getChildByName("bar");
        this.init ();

        this.dataSetting = cc.instantiate(this.gameSetting).getComponent(GameSetting);
    }

    update (dt) {
        
        switch(this.state) {
            case GameState.MainMenuGame: {
                // code effect for main menu 
                cc.log("MAIN MENU ......");
                break;
            }
            case GameState.InGame: {
                /// code logic game update component in game 
                cc.log("IN GAME ......");
                this.layer_Game.active = true;
                break;
            }
            case GameState.EndGame: {
                break;
            }
        }
    }

    init() {
        this.layer_MainMenu.active = true;  
        this.state = GameState.MainMenuGame;
        this.layer_Game.active = false;
    }

     /// GUI 
    btnPlay() {
        cc.log("btnPLAY");
        this.state = GameState.InGame;
        this.layer_MainMenu.active = false;
        // load level
        var level1 = cc.instantiate(this.dataSetting.levels[1]);
        this.node.addChild(level1);

     }

     onTouchMove(event) {
         cc.log("touch x:" + event.touch._point.x);
        // if (this.state != GameState.InGame) {
        //     return;
        // }
        // var x = event.touch._point.x;
        // if (x < this.bar.getContentSize().width/2) {
        //     x = this.bar.getContentSize().width/2;
        // } else if (x > cc.winSize.width - this.bar.getContentSize().width/2) {
        //     x = cc.winSize.width - this.bar.getContentSize().width/2;
        // }
        // this.bar.x = x;
        // cc.log("bar:   " + this.bar);
    }
}
