
const {ccclass, property} = cc._decorator;

@ccclass
export default class BackgroundControl extends cc.Component {

    @property speed :  number = 200;
    @property resetX :  number = -300;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    update (dt) {
        this.node.x +=  this.speed * dt;
        if(this.node.x <= this.resetX){
            this.node.x -=  this.speed * dt;
        }
    }
}
