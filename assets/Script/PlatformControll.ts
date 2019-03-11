const {ccclass, property} = cc._decorator;

@ccclass
export default class PlatformControll extends cc.Component {


    hp : number = 1;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getCollisionManager().enabled = true;
    }

    start () {

    }

    // update (dt) {}
}