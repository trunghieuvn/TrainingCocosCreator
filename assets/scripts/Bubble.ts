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
    value:number = 0;
    fallSpeed: number = 800;
    
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.getChildByName("BubbleValue").getComponent("cc.Label").string = this.value.toString();
    }


    start () {
        this.value = 3;
    }


    update (dt) {
        if (this.checkFall() == true) {
            this.fall(dt);
        }

        //check destroy
        if (this.value <= 0 || this.node.y < -1 * this.gameManager.canvas.node.height / 2 - this.node.height) {
            this.gameManager.bubblePool.put(this.node);
        }
    }


    reuse (game) {
        this.gameManager = game;
        this.reset();
    }


    unuse () {
        if (this.gameManager != null) {
            this.gameManager.bubbleContainer.splice(this.gameManager.bubbleContainer.indexOf(this.node), 1);
        }

        //delete this in it's neighbourBubbles
        for (let bubble of this.neighbourBubbles) {
            bubble.getComponent("Bubble").neighbourBubbles.splice(bubble.getComponent("Bubble").neighbourBubbles.indexOf(this.node), 1);
        }
    }
    

    reset () {
        this.value = 3;
        this.updateValue();
        this.neighbourBubbles = [];
        this.isRootBubble = false;
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
                b.getComponent("Bubble").findInterconnectedComponent(output); //recursive
            }
        }

        return output;
    }

    findInterconnectedComponentWithColor (color?: cc.Color, output?): cc.Node[] {
        if (output == undefined) {
            output = [];
        }

        if (color == undefined) {
            color = this.node.color;
        }

        if (this.node.color.toHEX("#rrggbb") != color.toHEX("#rrggbb")) return [];
        if (this.neighbourBubbles.length == 0) return [this.node];
        
        output.push(this.node);
        
        for (let b of this.neighbourBubbles) {
            if (output.indexOf(b) < 0) {
                b.getComponent("Bubble").findInterconnectedComponentWithColor(color, output); //recursive
            }
        }

        return output;
    }


    hitMany () {
        let interconnnectedComponentWithColor: cc.Node[] = this.findInterconnectedComponentWithColor();
        
        for (let bubble of interconnnectedComponentWithColor) {
            if (bubble.getComponent("Bubble").value > 0) {
                bubble.getComponent("Bubble").value--;
                bubble.getComponent("Bubble").updateValue();
            }
        }
    }

    hitOne () {
        if (this.value > 0) {
            this.value--;
            this.updateValue();
        }
    }

    updateValue () {
        this.node.getChildByName("BubbleValue").getComponent("cc.Label").string = this.value.toString();
    }

    checkFall (): boolean {
        let interconnectedComponent = this.findInterconnectedComponent();
        for (let bubble of interconnectedComponent) {
            if (bubble.getComponent("Bubble").isRootBubble) {
                return false;
            }
        }
        return true;
    }

    fall (dt) {
        this.node.y -= this.fallSpeed * dt;
    }
}
