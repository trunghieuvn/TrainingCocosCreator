import {GameState, BallDelegate} from "./GameDefind"
import BallControll from "./BallControll";
import GameSetting from "./GameSetting";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameWorldController extends cc.Component implements BallDelegate {

    onReady() {
        throw new Error("Method not implemented");
    }

    onMoving() {
        throw new Error("Method not implemented");
    }

    onDie() {
        throw new Error("Method not implemented");
    }

    @property (cc.Node) GuiManager : cc.Node = null;

    @property (cc.Node) bar : cc.Node = null;

    @property (cc.Canvas) canvas : cc.Canvas = null;

    @property(cc.Prefab) GameSetting : cc.Prefab = null;




    state : GameState;
    layer_MainMenu : cc.Node;
    layer_Game : cc.Node;
    dataSetting : GameSetting;

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        this.state = GameState.None;
        cc.log('aa');
        this.canvas.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove.bind(this));
        cc.log('bb');
    }

    start () {
        this.layer_MainMenu = this.GuiManager.getChildByName("MainMenu");
        this.layer_Game = cc.find("Canvas/GameWorld/Game");
        this.init ();
        this.dataSetting = cc.instantiate(this.GameSetting)
                        .getComponent(GameSetting);
    }

    update (dt) {
        switch(this.state) {
            case GameState.MainMenuGame: {
                // code effect for main menu 

                break;
            }
            case GameState.InGame: {
                /// code logic game update component in game 
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
        this.layer_Game.active = true;

        // load level
        var level1 = cc.instantiate(this.dataSetting.levels[1]);
                        this.node.addChild(level1);
                        console.log(level1);
     }

     onTouchMove(event) {
        if (this.state != GameState.InGame) {
            return
        }
        var x = event.touch._point.x
        if (x < this.bar.getContentSize().width/2) {
            x = this.bar.getContentSize().width/2
        } else if (x > cc.winSize.width - this.bar.getContentSize().width/2) {
            x = cc.winSize.width - this.bar.getContentSize().width/2
        }
        this.bar.x = x
    }
}
