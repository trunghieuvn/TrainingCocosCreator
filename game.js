

cc.Class({
    extends: cc.Component,

    properties: {
        count1 : 0,
        count2 : 0,
        count3 : 0,
        array : {
            default : [],
            type : cc.Integer
        },
       otoePrefab : {
        default : [],
        type : cc.Prefab
       },
       animalPrefab:{
        default : [],
        type : cc.Prefab
       },
      
    },
   
   
    spawnAnimal: function(){
        var animal = cc.instantiate(this.animalPrefab[Math.ceil(30*cc.random0To1())]);
        var rd = Math.ceil(4*cc.random0To1());
        animal.x = this.array[rd-1];
        animal.y = 2056;
        this.node.addChild(animal);
    },
    spawnGrass : function(){
        var grass0 = cc.instantiate(this.otoePrefab[0]);
        var grass1 = cc.instantiate(this.otoePrefab[1]);
        var grass2 = cc.instantiate(this.otoePrefab[2]);
        var grass3 = cc.instantiate(this.otoePrefab[3]);
        var grass4 = cc.instantiate(this.otoePrefab[4]);
        var grass5 = cc.instantiate(this.otoePrefab[5]);
        var grass6 = cc.instantiate(this.otoePrefab[6]);
        grass0.x = 77;
        grass0.y = 2050;
        grass1.x = 230;
        grass1.y = 2050;
        grass2.x = 383;
        grass2.y = 2050;
        grass3.x = 540;
        grass3.y = 2050;
        grass4.x = 696;
        grass4.y = 2050;
        grass5.x = 850;
        grass5.y = 2050;
        grass6.x = 1004;
        grass6.y = 2050;
        this.node.addChild(grass0);
        this.node.addChild(grass1);
        this.node.addChild(grass2);
        this.node.addChild(grass3);
        this.node.addChild(grass4);
        this.node.addChild(grass5);
        this.node.addChild(grass6);
    },
    // onLoad () {},

    start () {

    },

     update (dt) {
        this.count1+=dt;
    
        if(this.count1>this.count2+0.245){
            this.spawnGrass();
            
            this.count2 = this.count1;
        }
        if(this.count1>this.count3+1){
            this.spawnAnimal();
            this.count3 = this.count2;
        }
        
     },
});
