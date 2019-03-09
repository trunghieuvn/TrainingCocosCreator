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
export default class BallControll extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';
    @property
    d: number = 0;
    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        var r=Math.random();
        if(this.d==0){
            this.d=r>0.5?1:-1;
        }
     }

    start () {

    }
    @property
    speed: number = 400;
     update (dt) {
         
         this.node.y+=(this.speed*dt)*this.d;
     }
     changeDir(){
         this.d*=-1;
     }
}
