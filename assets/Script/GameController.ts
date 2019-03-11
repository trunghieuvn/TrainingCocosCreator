import {GameState} from "./GameDefine";
const {ccclass, property} = cc._decorator;

@ccclass
export default class GameWorldController extends cc.Component {

    @property (cc.Node) GuiManager : cc.Node = null;

    state : GameState;
    layer_MainMenu : cc.Node;
    layer_StartGame : cc.Node;
    layer_InGame : cc.Node;
    layer_EndGame : cc.Node;
    bar : cc.Node;


    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        this.state = GameState.None;
        
        

    }

    start () {
        this.layer_MainMenu = this.GuiManager.getChildByName("MainMenu");
        this.layer_StartGame = this.node.getChildByName("StartGame");
        this.layer_InGame = this.node.getChildByName("InGame");
        this.layer_EndGame = this.node.getChildByName("EndGame");
        this.bar = this.node.getChildByName("bar");
        this.init ();
    }

    update (dt) {
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove.bind(this));
        switch(this.state) {
            case GameState.MainMenuGame: {
                // code effect for main menu 
                cc.log("MAIN MENU ......");
                break;
            }
            case GameState.InGame: {
                /// code logic game update component in game 
                cc.log("IN GAME ......");
                this.layer_StartGame.active = false;
                this.layer_InGame.active = true;
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
        this.layer_StartGame.active = true;
        this.layer_InGame.active = false;
        this.layer_EndGame.active = false;
    }

     /// GUI 
    btnPlay() {
        cc.log("btnPLAY");
        this.state = GameState.InGame;
        this.layer_MainMenu.active = false;

     }

     onTouchMove(event) {
        if (this.state != GameState.InGame) {
            return;
        }
        var x = event.touch._point.x;
        if (x < this.bar.getContentSize().width/2) {
            x = this.bar.getContentSize().width/2;
        } else if (x > cc.winSize.width - this.bar.getContentSize().width/2) {
            x = cc.winSize.width - this.bar.getContentSize().width/2;
        }
        this.bar.x = x;
        cc.log("bar:   " + this.bar);
    }
}
