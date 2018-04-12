// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

import {GameState} from "./GameManager";

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    gameManager:cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}
    onBtnPlayClicked () {
        console.log("BTN_PLAY CLICKED");
        var game = this.gameManager.getComponent("GameManager");
        game.btnPlay.node.active = false;
        game.btnExit.node.active = false;
        if (game.gameState == GameState.GameOver) {
            game.onRestart();
        }
        game.gameState = GameState.InGame;
        game.player.active = true;
    }

    onBtnExitClicked () {
        cc.game.end();
    }
}
