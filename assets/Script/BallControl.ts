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
export default class BallControl extends cc.Component {

    onLoad () {
        cc.director.getCollisionManager().enabled = true;
    }

    callbackCollider : (text) => void = null; 

    isEnter: boolean = false;
    counter: number = 0;
    onCollisionEnter(other, self) {
        this.counter++;
        this.isEnter = true;

        if(this.callbackCollider != null) {
            this.callbackCollider("Đụng mày nè: " + this.counter);
        }
    }

    setCallbackCollider(_callback){
        this.callbackCollider = _callback;
    }

    onCollisionStay(other, self) {
        this.isEnter = false;
        // cc.log('on collision stay')
    }

    onCollisionExit(other, self){
        // cc.log('on collision exit')
    }

    getCounter(){
        return this.counter;
    }

    @property dir: number = 1;
    @property speed : number = 100;

    start () {

    }

    changeDir(){
        this.dir *= -1;
    }

    update (dt) {
        this.node.y += this.dir * this.speed * dt;
        if(this.node.y > 500 || this.node.y < -500 || this.isEnter){
            this.changeDir();
        }
        
        if(this.isEnter){
            // this.gameCtrl.changeLabel("Đụng mày nè: " + this.counter);
        }
    }
}
