// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] httsp://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    setting:cc.Node = null;

    speed:number;
    lifeTime:number;
    timer:number;


    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    }

    start () {
        var settingComponent = this.setting.getComponent("Setting");
        this.speed = settingComponent.levelUpEffectSpeed;
        this.lifeTime = settingComponent.levelUpEffectLifeTime;

        this.timer = this.lifeTime;
        this.node.active = false;
    }

    update (dt) {
        if (this.node.active == false) {
            return;
        }
        this.timer -= dt;
        this.moveUp(dt);
        this.fadedAway(dt);

        if (this.timer <= 0) {
            this.onRelease();
        }
    }

    moveUp (dt) {
        this.node.y += this.speed * dt;
    }

    fadedAway (dt) {
        this.node.opacity = (this.timer / this.lifeTime) * 255;
    }

    onRelease () {
        this.node.setPosition(new cc.Vec2(0, 0));
        this.node.active = false;
    }

    onActive () {
        this.node.active = true;
        this.node.opacity = 255;
        this.timer = this.lifeTime;
    }
}
