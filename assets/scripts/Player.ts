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
import GameWorld from './GameWorld';

export enum PlayerState {
    None,
    Move,
    MoveToFall
}

@ccclass
export default class Player extends cc.Component {
    // ========================= Properties ===========================
    @property(cc.Node) gameWorld: cc.Node = null;

    // ========================= Members ==============================
    public state: PlayerState = PlayerState.None;
    public isMoving: boolean = false;
    public moveDistance: number = 0;
    public moveDirection: cc.Vec2 = cc.Vec2.ZERO;
    public newPos: cc.Vec2 = cc.Vec2.ZERO;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    update (dt) {
        switch (this.state) {
            case PlayerState.Move: {
                this.scheduleOnce(() => {
                    this.move();
                }, 1);
                this.state = PlayerState.None;
            } break;
            case PlayerState.MoveToFall: {
                this.scheduleOnce(() => {
                    this.moveToFall();
                }, 1);
                this.state = PlayerState.None;
            } break;
            default: {

            } break;
        }
    }

    // ========================== Methods ==============================
    public move () {
        let actionMoveTo = cc.moveTo(1, this.newPos);
        let actionFlip = cc.callFunc(() => {
            this.node.scaleX *= -1;
            this.isMoving = false;
            this.gameWorld.getComponent(GameWorld).spawnTower();
        });
        let sequence = cc.sequence(actionMoveTo, actionFlip);

        this.isMoving = true;
        this.node.runAction(sequence);
    }

    public moveToFall () {
        let direction = this.moveDirection.normalize();
        let distXY = direction.mul(this.moveDistance);
        
        let actionMoveBy = cc.moveBy(1, distXY);
        let actionFall = cc.callFunc(() => {
            this.fall();
        });
        let sequence = cc.sequence(actionMoveBy, actionFall);

        this.isMoving = true;
        this.node.runAction(sequence);
    }

    private fall () {
        let scale = cc.scaleTo(1, 0, 0);
        let rotate = cc.rotateBy(1, -60);
        let spawn = cc.spawn(scale, rotate);

        let finish = cc.callFunc(() => {
            this.gameWorld.getComponent(GameWorld).gameOver();
        });

        let actionSequence = cc.sequence(spawn, finish);
        this.node.runAction(actionSequence);
    }
}
