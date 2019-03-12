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
export default class NewClass extends cc.Component {

    // ================================= PROPERTIES EDITOR ======================================
    @property(cc.Node) gameWorld: cc.Node = null;

    // ==================================== MEMBERS ============================================
    public items: cc.Node[] = [];
    public speed: number = 300;


    // ==================================== LIFE-CYCLE CALLBACKS ===============================
    onLoad () {}

    start() {
        let item1 = this.node.getChildByName("Item1");
        let item2 = this.node.getChildByName("Item2");
        this.items = [item1, item2];

        // item location at begin
        item2.x = item1.x + item1.height;
    }

    update(dt) {
        this.move();
    }

    // ======================================= METHODS =================================

    public move () {
        let dt = cc.director.getDeltaTime();
        // Di chuyển các item
        for (let item of this.items) {
            item.x -= this.speed * dt;
        }

        if (this.items[0].x + this.items[0].height / 2 < -this.gameWorld.width / 2) {
            this.scroll();
        }
    }

    public scroll() {
        // Dời vị trí items[0] về phía sau items[1]
        this.items[0].x = this.items[1].x + this.items[1].height;

        // Gán lại item0 = item1, item1 = item0, để giữ trạng thái sao cho biến item0 luôn trỏ đến item đứng trước
        // swap
        [this.items[0], this.items[1]] = [this.items[1], this.items[0]];
    }
}
