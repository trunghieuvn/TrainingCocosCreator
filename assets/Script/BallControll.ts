
import {BallDirection} from "./GameDefine"; 

const {ccclass, property} = cc._decorator;

@ccclass
export default class BallControll extends cc.Component {

    @property(cc.Label) label: cc.Label = null;

    @property text: string = 'hello';

    @property speed: number = 100;
    @property dir : BallDirection = BallDirection.RIGHT_TOP;

    @property isMoving: Boolean = true;




    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.log("ccc");
        cc.director.getCollisionManager().enabled = true;
    }

    start () {

    }

    update (dt) {
        if(this.isMoving == false) {
            return;
        }

        if(this.node.x > cc.winSize.width - this.node.getContentSize().width / 2) {
            if(this.dir == BallDirection.RIGHT_TOP) {
                this.dir = BallDirection.LEFT_TOP;
            }
            if(this.dir == BallDirection.LEFT_BOTTOM) {
                this.dir = BallDirection.RIGHT_BOTTOM;
            }
        }

        if(this.node.x < cc.winSize.width - this.node.getContentSize().width / 2) {
            if(this.dir == BallDirection.LEFT_TOP) {
                this.dir = BallDirection.RIGHT_TOP;
            }
            if(this.dir == BallDirection.RIGHT_BOTTOM) {
                this.dir = BallDirection.LEFT_BOTTOM;
            }
        }

        if(this.node.y > cc.winSize.height -this.node.getContentSize().height / 2) {

        }

        // this.node.x += this.dir * this.speed * dt;
        // this.node.y += this.dir * this.speed * dt;
        
        this.moveByDirection(dt, this.dir);
    }

    moveByDirection (dt, direction: BallDirection) {
        var dirX = 1;
        var dirY = 1;
        switch (direction) {
            case BallDirection.LEFT_BOTTOM: {
                dirX = -1;
                dirY = -1;
            }
            case BallDirection.LEFT_TOP: {
                dirX = -1;
                dirY = 1;
            }
            case BallDirection.RIGHT_BOTTOM: {
                dirX = 1;
                dirY = 1;
            }
            case BallDirection.RIGHT_TOP: {
                dirX = 1;
                dirY = -1;
            }
        }
    
        this.node.x += dirX * this.speed * dt;
        this.node.y += dirY * this.speed * dt;
    }

    onCollisionEnter(other, self) {
        cc.log("Ball onCollisionEnter");
        // this.changeDir();
        // this.count += 1;
        // cc.log(this.callBackController);
    }

    onCollisionExit(other, self) {
        cc.log("Ball onCollisionExit");
    }

    onCollisionStay(other, self) {
        cc.log("Ball onCollisionStay");
    }
}
