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
        count3 : 0,
        animalPrefab:{
            default : [],
            type:cc.Prefab
        },
        skyPrefab:{
            default : null,
            type : cc.Prefab
        },
        audioStart:{
            default : null,
            url : cc.AudioClip
        },
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
         
     },
    spawnNewAnimal : function(){
         var animal = cc.instantiate(this.animalPrefab[Math.ceil(29*cc.random0To1())]);
         animal.x = cc.random0To1()*1080;
         animal.y = 2000;
         this.node.addChild(animal);
     },
    spawnNewSky : function(){
        var sky = cc.instantiate(this.skyPrefab);
        sky.x = 1200;
        sky.y = cc.random0To1()*600 + 1000;
        this.node.addChild(sky);
    },
   spawnNewSkyStart : function(){
       var sky = cc.instantiate(this.skyPrefab);
       sky.x = cc.random0To1()*1080;
       sky.y = cc.random0To1()*600 + 1000;
       this.node.addChild(sky);
   },
    start () {
        cc.audioEngine.play(this.audioStart,true,1);
        var i  = 0;
        var j = 0;
        for(i = 0 ; i < 8 ; i++){
            this.spawnNewSkyStart();
        }
    },

    update (dt) {
        this.count1 += dt;
        if(this.count1>this.count2+2.5){
            this.spawnNewSky();
            this.count2 = this.count1;
        }
        if(Math.ceil(this.count1)==1){
            this.spawnNewAnimal();
       }
    },
});
