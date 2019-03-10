const { ccclass, property } = cc._decorator;

enum GameState { 
    None,
    MainMenuGame,
    InGame, 
    EndGame
}

@ccclass
export default class GameController extends cc.Component {

    @property(cc.Node)
    UI: cc.Node = null;

    state : GameState;
    menu : cc.Node;

    onLoad() {
        this.state = GameState.None;
    }

    start() {
        this.menu = this.UI.getChildByName("Menu");
        this.init ();
    }

    update(dt) {

    }

    init() {
        this.menu.active = true;  
        this.state = GameState.MainMenuGame;
    }

    //Event 
    clickBtnPlay() {
        cc.log("btnPLAY");
        this.state = GameState.InGame;
        this.menu.active = false;

    }

}
