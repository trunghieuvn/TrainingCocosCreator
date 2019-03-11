const { ccclass, property } = cc._decorator;

import { GameState, BallDirection, BallDelegate } from './GameConfig';

@ccclass
export default class BallControl extends cc.Component {

    @property
    speed: number = 100;

    isMoving: boolean = true;

    dir: BallDirection = null;

    delegate : BallDelegate;
    setDelegate(delegate) {
        this.delegate = delegate;
    }

    onLoad() {
        cc.director.getCollisionManager().enabled = true;
        this.isMoving = false;
    }

    start() {
        this.dir = BallDirection.RIGHT_TOP;
    }

    onCollisionEnter(other, self) {
        cc.log("cham vao thanh o duoi");

        if (other.node.name == 'break') {
            cc.log("aaaa: " + other.node.name);
            other.node.active = false;

            if (this.dir == BallDirection.RIGHT_TOP) {
                this.dir = BallDirection.RIGHT_BOTTOM;
            } else if (this.dir == BallDirection.LEFT_TOP) {
                this.dir = BallDirection.LEFT_BOTTOM;
            }

        } else {
            //Khi cham vao thanh o duoi
            if (this.dir == BallDirection.RIGHT_BOTTOM) {
                this.dir = BallDirection.RIGHT_TOP;
            } else if (this.dir == BallDirection.LEFT_BOTTOM) {
                this.dir = BallDirection.LEFT_TOP;
            }
        }

        this.moveDirection();

    }

    update(dt) {


        if (this.isMoving === false) {
            return;
        }

        this.moveDirection();


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

    moveDirection() {
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
            cc.log("Chet roi")
            this.delegate.onDie();
            if (this.dir == BallDirection.RIGHT_BOTTOM) {
                this.dir = BallDirection.RIGHT_TOP;
            } else if (this.dir == BallDirection.LEFT_BOTTOM) {
                this.dir = BallDirection.LEFT_TOP;
            }


        }
    }
}
