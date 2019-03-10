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

export enum BridgeState {
    None,
    Bridging,
    Bridge
}

@ccclass
export default class Tower extends cc.Component {

    // ============================= Members ============================
    private _bridge: cc.Node = null;
    private _bridgingSpeed: number = 200;
    public bridgeState: BridgeState = BridgeState.None;
    public vector: cc.Vec2 = cc.Vec2.ZERO;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._bridge = this.node.getChildByName('Bridge');
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
        this._bridge.height += this._bridgingSpeed * cc.director.getDeltaTime();
    }

    public bridge () {
        let angle = this.vector.angle(new cc.Vec2(0, 1)) * 180 / Math.PI;
        let actionRotateBy = cc.rotateBy(1, -angle);
        let actionSkewBy = cc.skewBy(1, 0, angle);
        let spawn = cc.spawn(actionRotateBy, actionSkewBy);
        this._bridge.runAction(spawn);
        this.bridgeState = BridgeState.None;
    }
}
