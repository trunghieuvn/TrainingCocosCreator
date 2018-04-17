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
export default class Bullet extends cc.Component {

    velocity:cc.Vec2 = null;
    gameManager:GameManager = null;
    bulletPool:cc.NodePool = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.velocity = new cc.Vec2(0, 0);
    }

    start () {
        
    }

    update (dt) {
        this.fly(dt);
        this.checkOutOfScreen();
        this.checkCollisionEdge();
    }

    reuse (pool) {
        this.bulletPool = pool;
    }

    unuse () {

    }

    fly (dt) {
        this.node.position = this.node.position.add(this.velocity.mul(dt));
    }

    checkOutOfScreen () {
        var canvas = this.gameManager.canvas.node;
        if (this.node.y < (-1 * canvas.height / 2) - this.node.height * this.node.scaleY
            || this.node.y > (canvas.height / 2) + this.node.height * this.node.scaleY) {
                
                //destroy bullet
                this.bulletPool.put(this.node);
        }        
    }

    checkCollisionEdge () {
        var canvas = this.gameManager.canvas.node;
        if (this.node.x < (-1 * canvas.width / 2) + this.node.width / 2 * this.node.scaleX
            || this.node.x > canvas.width / 2 - this.node.width / 2 * this.node.scaleX) {

            //this.node.x -= this.node.x / Math.abs(this.node.x);
            this.velocity.x = -this.velocity.x;
        }
    }

}
