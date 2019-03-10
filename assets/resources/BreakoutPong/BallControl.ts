import { BallDirection } from "./GameDefine";

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

@ccclass
export default class BallControl extends cc.Component {

    @property speed: number = 1000;

    @property({
        type: cc.Enum(BallDirection)
    }) ballDirection: BallDirection;
    

    // onLoad () {}
    winSizeW: number = 0;
    winSizeH: number = 0;
    start () {
        this.winSizeW = cc.winSize.width;
        this.winSizeH = cc.winSize.height;
    }

    update (dt) {
        this.moveByDirection(dt, this.ballDirection);

        // change direction if exeed canvas
        var changedDir = false;
        if (this.node.x > this.winSizeW - this.node.width/2) {
            this.dirX = -1;
            changedDir = true;
        } else if (this.node.x < this.node.width/2) {
            this.dirX = 1;
            changedDir = true;
        }
        if (this.node.y > this.winSizeH - this.node.height/2) {
            this.dirY = -1;
            changedDir = true;
        } else if (this.node.y < this.node.height/2) {
            this.dirY = -1;
            changedDir = true;
        }

        if (changedDir) {
            this.node.x += this.dirX * this.speed * dt;
            this.node.y += this.dirY * this.speed * dt;    
        }
    }

    dirX: number = 1;
    dirY: number = 1;
    moveByDirection(dt, ballDirection) {
        switch(ballDirection) {
            case BallDirection.BOTTOM_LEFT:
                this.dirX = -1;
                this.dirY = -1;
                break;
            case BallDirection.BOTTOM_RIGHT:
                this.dirX = 1;
                this.dirY = -1;
                break;
            case BallDirection.TOP_LEFT:
                this.dirX = -1;
                this.dirY = 1;
                break;
            case BallDirection.TOP_RIGHT:
                this.dirX = 1;
                this.dirY = 1;
                break;
        }
        this.node.x += this.dirX * this.speed * dt;
        this.node.y += this.dirY * this.speed * dt;
    }
}
