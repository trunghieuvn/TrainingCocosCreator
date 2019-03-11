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
import Player, {PlayerState} from './Player';

export enum BridgeState {
    None,
    Bridging,
    Bridge,
    Finish
}

@ccclass
export default class Tower extends cc.Component {

    // ============================= Members ============================
    private _bridge: cc.Node = null;
    private _bridgingSpeed: number = 200;
    public bridgeState: BridgeState = BridgeState.None;
    public target: cc.Node = null;
    public vector: cc.Vec2 = cc.Vec2.ZERO;
    public player: cc.Node = null;
    public gameWorld: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._bridge = this.node.getChildByName('Bridge');
        this._bridge.active = false;
    }

    start () {

    }

    update (dt) {
        switch (this.bridgeState) {
            case BridgeState.Bridging: {
                this.bridging();
            } break;
            case BridgeState.Bridge: {
                this.bridge();
            } break;
            default: {

            } break;
        }
    }

    //  =============================== Methods ============================
    public bridging () {
        this._bridge.active = true;
        this._bridge.height += this._bridgingSpeed * cc.director.getDeltaTime();
    }

    public bridge () {
        let targetTop = this.target.getChildByName('Top');
        let thisTopPos = this.node.getChildByName('Top').position;
        let targetTopPos = this.node.convertToNodeSpaceAR(this.target.convertToWorldSpaceAR(this.target.getChildByName('Top').position));
        this.vector = new cc.Vec2(targetTopPos.x - thisTopPos.x, targetTopPos.y - thisTopPos.y);
        

        let minLength = this.vector.mag() - this.node.getChildByName('Rect').height - this.target.getChildByName('Rect').height;
        let maxLength = this.vector.mag() - this.node.getChildByName('Rect').height + this.target.getChildByName('Rect').height / 2;
        
        let angle: number = 0;
        if (this._bridge.height < minLength) {
            angle = 180;
            this.player.getComponent(Player).state = PlayerState.MoveToFall;
            this.player.getComponent(Player).moveDistance = this._bridge.height;
            this.player.getComponent(Player).moveDirection = this.vector;
        } else if (this._bridge.height > maxLength) {
            angle = this.vector.angle(new cc.Vec2(0, 1)) * 180 / Math.PI;
            this.player.getComponent(Player).state = PlayerState.MoveToFall;
            this.player.getComponent(Player).moveDistance = this._bridge.height;
            this.player.getComponent(Player).moveDirection = this.vector;
        } else {
            angle = this.vector.angle(new cc.Vec2(0, 1)) * 180 / Math.PI;
            this.player.getComponent(Player).state = PlayerState.Move;
            this.player.getComponent(Player).newPos = this.gameWorld.convertToNodeSpaceAR(this.target.convertToWorldSpaceAR(targetTop.position));
        }


        let actionRotateBy = cc.rotateBy(1, -angle);
        let actionSkewBy = cc.skewBy(1, 0, angle);
        let spawn = cc.spawn(actionRotateBy, actionSkewBy);
        this._bridge.runAction(spawn);
        this.bridgeState = BridgeState.Finish;
    }
}
