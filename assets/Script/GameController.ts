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


    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        this.state = GameState.None;

    }

    start () {
        this.layer_MainMenu = this.GuiManager.getChildByName("MainMenu");
        this.layer_StartGame = this.node.getChildByName("StartGame");
        this.layer_InGame = this.node.getChildByName("InGame");
        this.layer_EndGame = this.node.getChildByName("EndGame");
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
        this.layer_StartGame.active = false;
        this.layer_StartGame.active = false;
    }

     /// GUI 
    btnPlay() {
        cc.log("btnPLAY");
        this.state = GameState.InGame;
        this.layer_MainMenu.active = false;

     }
}
