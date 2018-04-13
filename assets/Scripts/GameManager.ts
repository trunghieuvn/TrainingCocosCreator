// Learn TypeScript:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/typescript/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

const {ccclass, property} = cc._decorator;

enum GameState {
    GameInit,
    GameMainMenu,
    GamePlay,
    GamePause,
    GameOver,
    Loading
}

@ccclass
export default class GameManager extends cc.Component {

    gameState : GameState;
    // LIFE-CYCLE CALLBACKS:
    onLoad () {}

    start () {
        this.gameState = GameState.GameInit;
    }

    update (dt) {}
}
