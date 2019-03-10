enum GameState {
    MainMenuGame,
    InGame,
    EndGame
}

const {ccclass, property} = cc._decorator;

// import BallControll from './ballcontroll';

@ccclass
export default class GameController extends cc.Component {

    state : GameState;    

    @property(cc.Node) GUIManager: cc.Node = null;
    
    

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.state = GameState.MainMenuGame;
        this.init();
    }

    start () {

    }

    
    update (dt) {
        switch(this.state) {
            case GameState.MainMenuGame: {

            }
            case GameState.InGame: {
                
            }
            case GameState.EndGame: {
                
            }
        }
        
    }

    init() {
        cc.log(this.GUIManager);
        this.GUIManager.getChildByName("MainMenu").active = true;
    }

}
