// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        fall : 0,
        minOpa : 10,
        count : 0,
       
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        cc.director.getCollisionManager().enabled = true;
     },
     onCollisionEnter(){
         var self = this;
         var coll = true;
         this.fall = 0;
         self.coll = coll;
    },
    start () {
        this.fall = cc.random0To1()*10+2;
    },

     update (dt) {
         this.node.y-=this.fall;
         if(this.node.y<250){
             this.fall=0;
         }
         if(this.coll){
             this.node.opacity -= 100;
             this.count++;
         }
         if(this.count>20){
             this.node.destroy();
         }
     },
});
