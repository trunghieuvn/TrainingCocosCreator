
cc.Class({
    extends: cc.Component,
    properties: {
        fall : 0,
     animal : {
        default : [],
        type : cc.Prefab
    },
    },
     onLoad () {
         
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
         if(cc.random0To1()<this.fall){
             this.getNewAnimal();
         }
     },
});

