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
        count1 : 0,
        count2 : 0,
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
         
     },

    start () {
        var self = this;
        this.action();
        var pos = this.node.getPositionX()
        self.posi = pos;
    },
    jumAction : function(x){
       
        if(x>540){
            var jumpUp = cc.moveBy(0.3, new cc.Vec2(-10,40)).easing(cc.easeCircleActionOut());
            var jumpDown = cc.moveBy(0.3, new cc.Vec2(-10,-40)).easing(cc.easeCubicActionIn());
        }else{
            var jumpUp = cc.moveBy(0.3, new cc.Vec2(10,40)).easing(cc.easeCircleActionOut());
            var jumpDown = cc.moveBy(0.3, new cc.Vec2(10,-40)).easing(cc.easeCubicActionIn());
        }
        var SAction = cc.sequence(jumpUp,jumpDown);
        this.node.runAction(SAction);
    },
    action : function(){
        var move = cc.moveTo(1 ,this.node.getPositionX(),cc.random0To1()*100+50).easing(cc.easeCircleActionOut());
        this.node.runAction(move);
    },

     update (dt) {
        this.count1 += dt;
        if(this.count1>this.count2+1&&this.count1>1.5){
            this.jumAction(this.posi);
            this.count2 = this.count1;
        }
        if(this.node.getPositionX()>1080||this.node.getPositionX()<0){
            this.node.destroy();    
        }
        
     },
});
