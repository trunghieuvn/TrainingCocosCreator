import PokemonController from "./PokemonController";

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
export default class PokemonControll extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property dir : number = 1;

    @property
    text: string = 'hello';
    total: number  = 0;

    callbackCollider : () => void = null;

    //@property(cc.Node) :cc.Prefab = null;

    //@property(cc.Node) mainscreen:cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getCollisionManager().enabled = true;
    }

    setCallBackVN(callback){
        this.callbackCollider = callback;
    }

    onCollisionEnter(other, self) {
        cc.log("Ball onCollisionEnter");
        this.changeDir();
        this.callbackCollider();
        //var obj = new cc.Node();
        //var ball = obj.getComponent(PokemonController);
        //ball.setPoint(1);
        //this.total++;
        //var obj = cc.instantiate(this.node.getPa);
        //var ball = obj.getComponent(PokemonController);
        //ball.setPoint(1);
        //console.log(this.total);

    }

    changeDir(){
        this.dir *= -1;
    }

    start () {

    }

    update (dt) {
        this.node.y += 500 * dt * this.dir;
        if(this.node.y<=-250||this.node.y>=250) this.changeDir();
        //cc.log(this.node.y);
    }
}
