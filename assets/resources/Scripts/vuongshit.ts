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
import PipeControl from './pipe';
@ccclass
export default class VuongshitController extends cc.Component {

    @property(cc.Node) gameWorld: cc.Node = null;
    @property(cc.Node) mask = null;
    @property(cc.AudioClip) play_open = null;
    @property(cc.Prefab) pipeGroup: cc.Prefab = null;
    @property bounceForce: number = 0;

    private myBody: cc.RigidBody;


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // this.canvas = this.getComponent(cc.Canvas);
        // this.label.string = "12345";
        // this.canvas.node.on(cc.Node.EventType.TOUCH_END, this._touchEnd.bind(this));

    }

    start () {
        
    }

    update (dt) {
        var groudbottom = cc.find('Canvas/GUIControl/groundbottom');
        if (groudbottom.x <= -720) {
            groudbottom.position = cc.v2({x: 0, y: groudbottom.y});
        }

        groudbottom.position = cc.v2({x: groudbottom.x - 200 * dt, y: groudbottom.y});

        var group = cc.instantiate(this.pipeGroup);
        group.getComponent(PipeControl).setPosition(group);

        this.node.addChild(group);
    }

    btplay () {
        cc.find('Canvas/GUIControl/Home/start').getComponent(cc.AudioSource).play();
        cc.audioEngine.play(this.play_open, false, 1);
        cc.find('Canvas/GUIControl/Home/start').runAction(cc.moveTo(25,40, 100));
        this.mask.active = true;
        this.mask.runAction(cc.fadeOut(1));
        cc.find('Canvas/GUIControl/Home').active = false;
        cc.find('Canvas/GUIControl/PlayGame').active = true;
        cc.find('Canvas/bird1').position = new cc.Vec2(-160, 123);
        // this.mask.active = false;
    }
}
