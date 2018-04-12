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

import {GameState} from "./GameManager"

@ccclass
export default class Egg extends cc.Component {

    speed:number;

    gameManager = null;
    canvas = null;
    setting = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getCollisionManager().enabled = true;
    }

    start () {
        var settingComponent = this.setting.getComponent("Setting");
        this.speed = settingComponent.EggSpeed;
    }

    update (dt) {
        if (this.gameManager.gameState != GameState.InGame) {
            this.gameManager.eggPool.put(this.node);
            return;
        }

        this.fallEgg(dt);
        if (this.node.y <= -this.canvas.node.height / 2) {
            this.gameManager.lossHeart();
            this.onRelease();
        }
    }

    fallEgg (dt) {
        this.node.y -= this.speed * dt;
    }

    onRelease () {
        this.gameManager.eggPool.put(this.node);
    }

    onCollisionEnter () {
        this.gameManager.gainScore();
        this.onRelease();
    }
}
