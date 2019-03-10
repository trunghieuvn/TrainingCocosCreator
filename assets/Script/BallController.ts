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
export class BallController extends cc.Component {

    @property speed : number = 100;
    @property dir : number = 1;

    sovacham : number = 0 ;

    onLoad () {
        cc.director.getCollisionManager().enabled = true;

    }

    start () {

    }

    update (dt) {
        this.node.y += this.speed * this.dir * dt;
    }


    onCollisionEnter(other, self) {
        cc.log("Ball onCollisionEnter");
        this.dir *= -1 ;
        this.sovacham += 2;
    }

    getVacham(){
        return this.sovacham;
    }

}
