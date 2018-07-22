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
      audio : {
        default : null,
        url : cc.AudioClip
      },
     cloud : {
       default : null,
       type : cc.Prefab
     },
     animal : {
      default : [],
      type : cc.Prefab
     },
    },
    getNewAnimal : function(x){
      var animal = cc.instantiate(this.animal[Math.ceil(cc.random0To1()*29)]);
      animal.x = x;
      animal.y = 2000;
      this.node.addChild(animal);
    },
    touch : function(){
        var self = this;
      this.node.on('touchend',function(touch, event){
         var t = true;
         self.t = t;
         var x = touch.getLocation().x;
         self.locationX = x;
      });
    },
    getNewCloud : function(){
      var cloud = cc.instantiate(this.cloud);
      cloud.x = 1100;
      cloud.y = cc.random0To1()*700+1000;
      this.node.addChild(cloud);
    },
   
     onLoad () {
      this.touch();
     },
    
    start () {
        cc.audioEngine.play(this.audio ,true ,1);
    },

     update (dt) {
      if(this.t){
        this.getNewAnimal(this.locationX);
        this.t= false;
    }
       if(cc.random0To1()<0.004){
        this.getNewCloud();
      }
     },
});
