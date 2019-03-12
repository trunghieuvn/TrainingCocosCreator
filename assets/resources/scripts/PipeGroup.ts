const {ccclass, property} = cc._decorator;

@ccclass
export default class PipeGroup extends cc.Component {

    distance: number;
    pos_y : number;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}

    setDisAndY(dis : number, y: number) : PipeGroup {

        var top = this.node.getChildByName("top_pipe");
        var bottom = this.node.getChildByName("bottom_pipe");

        top.y = y + dis/2;
        bottom.y = y - dis/2;

        return this;
    }

}
