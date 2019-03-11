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
import {GameState, BallDirection} from "./GameDefind";

@ccclass
export default class BallControll extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property speed: number = 100;

    @property({
        type: cc.Enum(BallDirection),
    }) dir = BallDirection.RIGHT_TOP;

    isMoving : boolean = true;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getCollisionManager().enabled = false;
    }

    onCollisionEnter(other, self) {
        cc.log('onCollisionEnter');
        if (this.node.name == 'break') {
            cc.log('break');
        } else {
            cc.log('bar');
        }
    }

    

    moveByDirection(dt, direction: BallDirection) {
        var dirX = 1;
        var dirY = 1;
        switch (direction) {
            case BallDirection.LEFT_BOTTOM: {
                dirX = -1;
                dirY = -1;
                break;
            }
            case BallDirection.LEFT_TOP: {
                dirX = -1;
                dirY = 1;
                break;
            }
            case BallDirection.RIGHT_TOP: {
                dirX = 1;
                dirY = 1;
                break;
            }
            case BallDirection.RIGHT_BOTTOM: {
                dirX = 1;
                dirY = -1;
                break;
            }
        }

        this.node.x += dirX * this.speed * dt;
        this.node.y += dirY * this.speed * dt;
    }

    start () {

    }

    update (dt) {
        if (this.isMoving ==false)
        return 

        if (this.node.x > cc.winSize.width - this.node.getContentSize().width /2) {
            if (this.dir == BallDirection.RIGHT_TOP)
                this.dir = BallDirection.LEFT_TOP;
            if (this.dir == BallDirection.RIGHT_BOTTOM)
                this.dir = BallDirection.LEFT_BOTTOM;
        }

        if (this.node.x < this.node.getContentSize().width / 2) {
            if (this.dir == BallDirection.LEFT_TOP)
                this.dir = BallDirection.RIGHT_TOP;
            if (this.dir == BallDirection.LEFT_BOTTOM)
                this.dir = BallDirection.RIGHT_BOTTOM;
        }

        if (this.node.y < this.node.getContentSize().height / 2) {
            if (this.dir == BallDirection.RIGHT_BOTTOM)
                this.dir = BallDirection.RIGHT_TOP;
            if (this.dir == BallDirection.LEFT_BOTTOM)
                this.dir = BallDirection.LEFT_TOP;
        }

        if (this.node.y > cc.winSize.height - this.node.getContentSize().height /2) {
            if (this.dir == BallDirection.RIGHT_TOP)
                this.dir = BallDirection.RIGHT_BOTTOM;
            if (this.dir == BallDirection.LEFT_TOP)
                this.dir = BallDirection.LEFT_BOTTOM;
        }

        this.moveByDirection(dt, this.dir);

    }
}
