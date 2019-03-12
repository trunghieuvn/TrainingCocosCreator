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
    @property(cc.Node) gameWorld: cc.Node = null;
    @property bounceForce: number = 0;

    private myBody: cc.RigidBody;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // Add event touch listener
        this.gameWorld.on(cc.Node.EventType.TOUCH_START, this.onTouchStart.bind(this));

        this.myBody = this.node.getComponent(cc.RigidBody);
    }

    start () {
    }

    update (dt) {
        this.move();
    }

    // Hàm xử lý trong khi player di chuyển
    public move () {
        // Xoay player với angle phụ thuộc vào vận tốc y (linearVelocity.y)
        
        // linearVelocity.y > 0, xoay lên với góc trong khoảng 0 và 90 thay đổi dựa theo vận tốc y
        if (this.myBody.linearVelocity.y > 0) {
            // (tham số thứ 3 của hàm lerp là tùy chỉnh), để cho mượt -> đảm bảo tỉ lệ linearVelocity.y / 450 gần = 3/7
            // note: linearVelocity.y đã được set = bounceForce trong hàm onTouchStart
            let angle = this.lerp(0, 90, this.myBody.linearVelocity.y / 450);
            this.node.angle = angle;
        } else if (this.myBody.linearVelocity.y === 0) {
            this.node.angle = 0;
        } else {
            let angle = this.lerp(0, -60, -this.myBody.linearVelocity.y / 450);
            this.node.angle = angle;
        }
    }

    public onTouchStart () {
        // khởi tạo vận tốc y cho player nảy lên
        this.myBody.linearVelocity = new cc.Vec2(this.myBody.linearVelocity.x, this.bounceForce);
    }


    // Hàm lerp thực hiện phép toán nội suy giữa 2 giá trị value1 và value2,
    // trả về 1 giá trị tương ứng với thành phần amount trong hàm
    // Với t = 0, hàm sẽ trả về giá trị = value1. Với t = 1,
    // hàm sẽ trả về giá trị = value2. Với t thuộc khoảng (0, 1), hàm sẽ nội suy để tìm ra vị trí giữa value1 và value2.
    public lerp (value1: number, value2: number, amount: number) {
        amount = amount < 0 ? 0 : amount;
        amount = amount > 1 ? 1 : amount;
        return value1 + (value2 - value1) * amount;
    }
}
