import {BallDirection, BallState, BallDelegate} from './GameDefine';

const {ccclass, property} = cc._decorator;

@ccclass
export default class BallControll extends cc.Component {

    @property speed: number = 100;
    // @property dir : BallDirection = BallDirection.RIGHT_TOP;

    @property isMoving: Boolean = true;


    @property({
        type: cc.Enum(BallDirection),
    }) dir = BallDirection.RIGHT_TOP;

    player : cc.Node;

    /// 
    state : BallState = BallState.MOVING;

    // Define delegate 
    // delegate : BallDelegate;
    // setDelegate(deleg) {
    //     this.delegate = deleg;
    // }

    delegates : Array<BallDelegate> = [];
    addDelegate(deleg) {
        this.delegates.push(deleg);
    }
    notiDelegate_OnDie() {
        this.delegates.forEach(delegate => {
            delegate.OnDie();
        });
    }

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getCollisionManager().enabled = true;
    }

    start () {
        // this.player = cc.find("Canvas/GameWorld/Game/player");
    }

    update (dt) {
        if(this.state != BallState.MOVING) 
            return;

        if(this.node.x > cc.winSize.width 
            - this.node.getContentSize().width / 2) {
            if(this.dir == BallDirection.RIGHT_TOP)
                this.dir = BallDirection.LEFT_TOP;
            if(this.dir == BallDirection.RIGHT_BOTTOM)
                this.dir = BallDirection.LEFT_BOTTOM;
        }
        if(this.node.x < this.node.getContentSize().width / 2) {
            if(this.dir == BallDirection.LEFT_TOP)
                this.dir = BallDirection.RIGHT_TOP;
            if(this.dir == BallDirection.LEFT_BOTTOM)
                this.dir = BallDirection.RIGHT_BOTTOM;
        }

        if(this.node.y > cc.winSize.height - this.node.getContentSize().height / 2) {
            if(this.dir == BallDirection.RIGHT_TOP) {
                this.dir = BallDirection.RIGHT_BOTTOM;
            }
            if(this.dir == BallDirection.LEFT_TOP) {
                this.dir = BallDirection.LEFT_BOTTOM;
            }
        }

        if(this.node.y < this.node.getContentSize().height / 2) {
            this.state = BallState.DIE;
            // if(this.delegate != null)
            //     this.delegate.OnDie();
            this.notiDelegate_OnDie();
            
        }

        this.moveByDirection(dt, this.dir);
    }

    moveByDirection(dt, direction : BallDirection) {
        var dirX = 1;
        var dirY = 1;
        switch(direction) {
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
