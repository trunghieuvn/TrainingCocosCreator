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
export default class PipeControl extends cc.Component {

    @property(cc.Prefab)
    pipeGroup: cc.Prefab = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // this.node.position = new cc.Vec2(0,200);
        // var child = this.node.addChild(this.node, 1, 'pipe');
        // var pipe = cc.instantiate(pipeGroup);
        // this.node.addChild(pipe);
    }

    public setPosition (dt) : PipeControl {
        dt.y = 300 * dt + 100;
        dt.x = 500 * dt + 100;
        return this;
    }

    start () {

    }

    // update (dt) {}
}
