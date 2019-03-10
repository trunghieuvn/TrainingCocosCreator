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
import PokemonControll from './PokemonControll';
@ccclass
export default class PokemonController extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.Prefab) pokemon:cc.Prefab = null;

    @property(cc.Label) lbTotal:cc.Label;

    @property
    text: string = 'hello';
    total: number = 0;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        for(var i = 0; i<2; i++){
            var obj = cc.instantiate(this.pokemon);
            obj.x = 0;
            if(i==0){
                obj.y = -250;
            }else{
                obj.y = 250;
            }
            var ball = obj.getComponent(PokemonControll);
            if(i % 2 != 0) ball.changeDir();
            this.node.addChild(obj);

            ball.callbackCollider = this.showTotal.bind(this);
            
            /*
            var obj1 = cc.instantiate(this.totalNumber);
            
            obj1.x = 0;
            if(i==0){
                obj1.y = -250;
            }else{
                obj1.y = 250;
            }
            
            var ball1 = obj.getComponent(PokemonControll);
            if(i % 2 != 0) ball1.changeDir();
            this.node.addChild(obj1);
            */

        }
        
    }

    showTotal(){
        this.total++;
        this.lbTotal.string = this.total.toString();
        cc.log("show total");
        /*
        if(whichball==1) this.total1++;
        if(whichball==2) this.total2++;
        this.totalnumber1.string = this.total1.toString();
        this.totalnumber2.string = this.total2.toString();
        */
    }

    start () {

    }

    update (dt) {
 
    }
}
