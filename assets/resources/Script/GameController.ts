const { ccclass, property } = cc._decorator;

import { GameState, BallDirection } from './GameConfig';

@ccclass
export default class GameController extends cc.Component {

    @property(cc.Node)
    UI: cc.Node = null;

    state: GameState;
    menu: cc.Node;
    level: cc.Node;

    onLoad() {
        this.state = GameState.None;
    }

    start() {
        this.menu = this.UI.getChildByName("Menu");
        this.level = this.UI.getChildByName("Level1");
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
        cc.log("btnPLAY");
        this.state = GameState.InGame;
        this.menu.active = false;
        this.level.active = true;

    }

}
