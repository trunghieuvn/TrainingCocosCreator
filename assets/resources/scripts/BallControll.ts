
import {BallDirection, BallState, BallDelegate} from './GameDefine';

const {ccclass, property} = cc._decorator;

@ccclass
export default class BallControll extends cc.Component {

    
    /// 
    @property speed: number = 100;
    @property({
        type: cc.Enum(BallDirection),
    }) dir = BallDirection.RIGHT_TOP;

    player : cc.Node;

    /// 
    state : BallState = BallState.MOVING;

    // Define delegate 
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
        cc.director.getCollisionManager().enabled  = false;
    }

    start () {
        this.player = cc.find("Canvas/GameWorld/Game/player");
    }

    moveByDirection(dt : number, direction : BallDirection) {
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
        }

        if(this.node.y < this.node.getContentSize().height / 2) {
            cc.log("is die");
            this.state = BallState.DIE;

            this.notiDelegate_OnDie();
            
        }

        this.moveByDirection(dt, this.dir);
       
    }

    lateUpdate() {
    }

    
}
