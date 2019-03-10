
enum GameState { 
    None,
    MainMenuGame,
    InGame, 
    EndGame
}
enum a{ 

}

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameWorldController extends cc.Component {

    @property (cc.Node) GuiManager : cc.Node = null;

    state : GameState;
    layer_MainMenu : cc.Node;

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        this.state = GameState.None;

    }

    start () {
        this.layer_MainMenu = this.GuiManager.getChildByName("MainMenu");

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
        this.layer_MainMenu.active = true;  
        this.state = GameState.MainMenuGame;
    }

     /// GUI 
    btnPlay() {
        cc.log("btnPLAY");
        this.state = GameState.InGame;
        this.layer_MainMenu.active = false;

     }
}
