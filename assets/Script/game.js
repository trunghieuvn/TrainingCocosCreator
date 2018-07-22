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
        score : 0,
        playerChild : {
            default : null,
            type : cc.Prefab
        },
        player : {
            default : null,
            type : cc.Node
        },
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        this.touch(); 
     },
     touch : function(){
        var self = this;
      this.node.on('touchend',function(touch, event){
         var t = true;
         self.t = t;
      });
    },
    getPlayerChild : function(x){
        var playerChild  = cc.instantiate(this.playerChild);
        playerChild.x = x-540;
        playerChild.y = 350-960;
        this.node.addChild(playerChild);
        playerChild.getComponent('playerChild').game = this;
    },
    start () {
    },
    fire : function(){
        var down = cc.moveBy(0.05,new cc.Vec2(1,-40)).easing(cc.easeCircleActionOut());
        var up = cc.moveBy(0.05,new cc.Vec2(1,40)).easing(cc.easeCubicActionIn());
        var sequence = cc.sequence(down,up);
        this.player.runAction(sequence);
    },
    getScore : function(){
        this.score++;
        cc.log(this.score);
    },
     update (dt) {
        if(this.t){
            this.getPlayerChild(this.player.x);
            this.fire();
            this.t = false;
        }
     },
});
