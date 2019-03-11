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

@ccclass
export default class BrickControl extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getCollisionManager().enabled = true;
    }

    start () {
    }

    update (dt) {
    }

    collisionCallback: () => void
    setCollisionCallback(collisionCallback) {
        this.collisionCallback = collisionCallback;
    }

    onCollisionEnter(nodeOther, nodeSelf) {
        // this.node.active = false;
        this.node.destroy();
        if (this.collisionCallback != null) {
            this.collisionCallback();
        }
    }
}
