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

    @property speed : number = 180;
    @property gravity : number = 100;
    @property move_left : boolean = true;
 
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }
    update (dt) {
        if (this.speed <= 0){
            return;
        }
        this.speed -= this.gravity * dt;
        let left = this.move_left == true ? 1 : -1;
        
        this.node.x += left * this.speed * dt;

    }
}
