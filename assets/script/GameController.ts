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
export default class GameController extends cc.Component {

  
    left : number = -1;
    player : cc.Node = null;
    speed : number;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {}

    start () {
        cc.log("GameController Start");
        this.player = this.node.getChildByName('player');
        this.left = 0;
        this.speed = 40;
    }
    btnPlay(){
        cc.log('BtnPlay clicked');
        cc.find("Canvas/GameWorld/UI").active = false;
        cc.find("Canvas/GameWorld/GameMenu").active = true;
        this.node.getChildByName('player').active = true;
    }
   
    BtnMoveLeft(){
        cc.log("BtnMoveLeft is Clicked");
        this.left = -1;
    }
    BtnMoveRight(){
        cc.log("BtnMoveRight is Clicked");
        this.left = 1;
    }
    Fire(){
        cc.log("GameControlller Fired");
        this.left = 0;
    }
    update (dt) {
        if(this.left == 0) {
            return;
        }
        this.player.x += this.speed * dt * this.left;
       
    }
}
