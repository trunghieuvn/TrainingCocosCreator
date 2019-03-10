const { ccclass, property } = cc._decorator;

import { GameState, BallDirection } from './GameConfig';

@ccclass
export default class BallControl extends cc.Component {

    @property
    speed: number = 1000;

    isMoving: boolean = true;

    dir: BallDirection = null;

    onLoad() {

    }

    start() {
        
        this.dir = BallDirection.RIGHT_TOP;
    }

    update(dt) {
     

        if (this.isMoving === false) {
            return;
        }

        //Neu cham vao man hinh
        if (this.node.x > cc.winSize.width - this.node.getContentSize().width / 2) {
            if (this.dir == BallDirection.RIGHT_TOP) {
                this.dir = BallDirection.LEFT_TOP;
            } else if (this.dir == BallDirection.RIGHT_BOTTOM) {
                this.dir = BallDirection.LEFT_BOTTOM;
            } 
        }

        if (this.node.x < this.node.getContentSize().width / 2) {
            if (this.dir == BallDirection.LEFT_TOP) {
                this.dir = BallDirection.RIGHT_TOP;
            } else if (this.dir == BallDirection.LEFT_BOTTOM) {
                this.dir = BallDirection.RIGHT_BOTTOM;
            } 
        }

        if (this.node.y > cc.winSize.height - this.node.getContentSize().height / 2) {
            if (this.dir == BallDirection.RIGHT_TOP) {
                this.dir = BallDirection.RIGHT_BOTTOM;
            } else if (this.dir == BallDirection.LEFT_TOP) {
                this.dir = BallDirection.LEFT_BOTTOM;
            } 
        }

        if (this.node.y < this.node.getContentSize().height / 2) {
            if (this.dir == BallDirection.RIGHT_BOTTOM) {
                this.dir = BallDirection.RIGHT_TOP;
            } else if (this.dir == BallDirection.LEFT_BOTTOM) {
                this.dir = BallDirection.LEFT_TOP;
            } 
        }


        //Xac dinh phuong huong
        var dirX = 1;
        var dirY = 1;
        switch (this.dir) {
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
            case BallDirection.LEFT_BOTTOM: {
                dirX = -1;
                dirY = -1;
                break;
            }
            case BallDirection.RIGHT_BOTTOM: {
                dirX = 1;
                dirY = -1;
                break;
            }
        }

        this.node.x += this.speed * dirX * dt;
        this.node.y += this.speed * dirY * dt;

    }
}
