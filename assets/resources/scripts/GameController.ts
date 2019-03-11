
import {GameState, BallDelegate} from './GameDefine';
import BallControll from './BallControll';

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

    @property(cc.Canvas) canvas : cc.Canvas = null;
    @property (cc.Node) GuiManager : cc.Node = null;

    @property(cc.Prefab) gameSetting : cc.Prefab = null;
    
    state : GameState;
    layer_MainMenu : cc.Node;
    layer_Game : cc.Node;

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        cc.log("Winsize width: " + cc.winSize.width);
        cc.log("Winsize height: " + cc.winSize.height);

        this.canvas.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove.bind(this));
        cc.find("Canvas/GameWorld/Game/ball")
        .getComponent(BallControll)
        .addDelegate(this);
        
    }
    onTouchMove(event) {
        cc.log("touch x:" + event.touch._point.x);
        
    }
    
    start () {
        this.layer_MainMenu = this.GuiManager.getChildByName("MainMenu");
        this.layer_Game = cc.find("Canvas/GameWorld/Game");//this.node.getChildByName("Game");


        this.init ();
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
                break;
            }
            case GameState.EndGame: {
                break;
            }
        }
    }

    init() {
        this.state = GameState.MainMenuGame;
        
        this.layer_MainMenu.active = true;  
        this.layer_Game.active = false;
    }

     /// GUI 
    btnPlay() {
        cc.log("btnPLAY");
        this.state = GameState.InGame;
        this.layer_MainMenu.active = false;
        this.layer_Game.active = true;

     }
}
