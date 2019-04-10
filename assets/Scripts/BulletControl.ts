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
export default class BulletControl extends cc.Component {

    @property() speed: number = 10;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        console.log("BulletControl onLoad");

        cc.director.getCollisionManager().enabled = true;
    }

    onCollisionEnter(other, self) {
        console.log("onCollisionEnter", other, self);
        self.node.destroy();
    }

    start () {

    }

    update (dt) {
        // this.node.y += this.speed * dt;

        if(this.node.y > cc.director.getWinSize().height){
            this.node.destroy();

            console.log("BulletControl is distroyed!");
        }
    }
}
