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
    

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        for(var i = 0; i<9; i++){
            var obj = cc.instantiate(this.pokemon);
            obj.x = -60*i;
            var ball = obj.getComponent(PokemonControll);
            if(i % 2 == 0) ball.changeDir();
            this.node.addChild(obj);
        }
    }

    start () {

    }

    update (dt) {
 
    }
}
