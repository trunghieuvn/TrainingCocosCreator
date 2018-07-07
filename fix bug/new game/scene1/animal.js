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
        time1 : 0,
        check : 0,
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {},

    start () { 
    },
   
    jumpto : function(x){
        var jumpUp = cc.moveBy(0.5, new cc.Vec2(40*x,40)).easing(cc.easeCubicActionIn());
        var jumpDown = cc.moveBy(0.5, new cc.Vec2(40*x,-40)).easing(cc.easeCircleActionOut());
        var SequeceAction = cc.sequence(jumpUp,jumpDown);
        return cc.repeatForever(SequeceAction);
    },
     update (dt) {
         this.time1+=dt;
        if(this.node.x > 1100 || this.node.x < 0){
            this.node.destroy();
        }
       if(this.node.y>200){
           this.node.y -= cc.random0To1()*8+7;
       }
       if(this.time1>3 && this.check == 0 ){
          this.check = 1;
        if(this.node.x>540){
            this.node.runAction(this.jumpto(-1));
        }else{
            this.node.runAction(this.jumpto(1));
        }
       }
     },
});
