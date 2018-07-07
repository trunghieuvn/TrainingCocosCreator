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
     player : {
         default : null,
         type : cc.Node
     },
     playerChild : {
         default : null,
         type : cc.Prefab
     },
     animal : {
        default : [],
        type : cc.Prefab
    },
    },


     onLoad () {
         this.touch();
         cc.director.getCollisionManager().enabled = true;
     },
     
    onCollisionEnter(animal,playerChild) {
        cc.log("Ball onCollisionEnter");
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
        playerChild.x = x;
        playerChild.y = 250;
        this.node.addChild(playerChild);
    },
    getNewAnimal : function(){
        var animal = cc.instantiate(this.animal[Math.ceil(cc.random0To1()*29)]);
        animal.x = cc.random0To1()*880+100;
        animal.y = 2000;
        this.node.addChild(animal);
    },
    start () {
        this.fall =0.01;
    },

     update (dt) {
        this.fall+=dt*0.0005;
        if(this.t){
            this.getPlayerChild(this.player.x);
            this.t = false;
        }
         if(cc.random0To1()<this.fall){
             this.getNewAnimal();
         }
     },
});
