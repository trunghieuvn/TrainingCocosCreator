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

import GameManager from "./GameManager";

@ccclass
export default class Bubble extends cc.Component {

    gameManager: GameManager = null;
    isRootBubble:boolean = false;
    neighbourBubbles: cc.Node[] = [];
    id: number = 0;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    update (dt) {
        if (this.isRootBubble) {
            this.node.color = cc.Color.RED;
        }
        else {
            this.node.color = cc.Color.WHITE;
        }
    }

    reuse (game) {
        this.gameManager = game;
    }

    unuse () {
        if (this.gameManager != null) {
            this.gameManager.bubbleContainer.splice(this.gameManager.bubbleContainer.indexOf(this.node));
        }
    }
    
    moveDown () {
        this.node.y -= this.node.height - 12;
    }

    
    findInterconnectedComponent (output?): cc.Node[] {
        if (this.neighbourBubbles.length == 0) return [this.node];
        if (output == undefined) {
            output = [];
        }

        output.push(this.node);
        for (let b of this.neighbourBubbles) {
            if (output.indexOf(b) < 0) {
                let interconnectedComponent = b.getComponent("Bubble").findInterconnectedComponent(output); //recursive
            }
        }

        return output;
    }
}
