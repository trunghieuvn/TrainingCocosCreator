import { BallDirection } from "./GameDefine";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BallControl extends cc.Component {

    speed: number = 750;

    @property({
        type: cc.Enum(BallDirection)
    }) ballDirection: BallDirection = BallDirection.TOP_LEFT;
    
    // onLoad () {}
    winSizeW: number = 0;
    winSizeH: number = 0;
    dirX: number = 1;
    dirY: number = 1;
    start () {
        this.winSizeW = cc.winSize.width;
        this.winSizeH = cc.winSize.height;
        this.changeDirection(this.ballDirection);
    }

    update (dt) {
        var x = this.node.x;
        var y = this.node.y;

        x += this.dirX * this.speed * dt;
        y += this.dirY * this.speed * dt;

        var newPos = new cc.Vec2(x, y);

        // change direction if exeed canvas
        var changedDir = false;
        if (newPos.x > this.winSizeW - (this.node.width/2)) {
            //this.dirX = -1;
            this.changeDirectionByCollistion(true);
            changedDir = true;
        } else if (newPos.x < (this.node.width/2)) {
            // this.dirX = 1;
            this.changeDirectionByCollistion(true);
            changedDir = true;
        } else if (newPos.y > this.winSizeH - (this.node.height/2)) {
            // this.dirY = -1;
            this.changeDirectionByCollistion(false);
            changedDir = true;
        } else if (newPos.y < (this.node.height/2)) {
            // this.dirY = 1;
            //this.changeDirectionByCollistion(false);
            //changedDir = true;
            // TODO gameover
        }

        if (changedDir) {
            newPos = new cc.Vec2(this.node.x, this.node.y);
            newPos.x += this.dirX * this.speed * dt;
            newPos.y += this.dirY * this.speed * dt;    
        }

        this.node.x = newPos.x;
        this.node.y = newPos.y;
    }

    changeDirection(ballDirection) {
        this.ballDirection = ballDirection;
        switch(this.ballDirection) {
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
    }

    changeDirectionByCollistion(isVerticalCollision: boolean) {
        switch(this.ballDirection) {
            case BallDirection.BOTTOM_LEFT:
                if (isVerticalCollision) {
                    this.changeDirection(BallDirection.BOTTOM_RIGHT);
                } else {
                    this.changeDirection(BallDirection.TOP_LEFT);
                }                
                break;
            case BallDirection.BOTTOM_RIGHT:
                if (isVerticalCollision) {
                    this.changeDirection(BallDirection.BOTTOM_LEFT);
                } else {
                    this.changeDirection(BallDirection.TOP_RIGHT);
                }
                break;
            case BallDirection.TOP_LEFT:
                if (isVerticalCollision) {
                    this.changeDirection(BallDirection.TOP_RIGHT);
                } else {
                    this.changeDirection(BallDirection.BOTTOM_LEFT);
                }
                break;
            case BallDirection.TOP_RIGHT:
                if (isVerticalCollision) {
                    this.changeDirection(BallDirection.TOP_LEFT);
                } else {
                    this.changeDirection(BallDirection.BOTTOM_RIGHT);
                }
                break;
        }
    }
}
