const {ccclass, property} = cc._decorator;
const ESTIMATE_BUBBLE_POOL_SIZE = 50;

const MAX_BUBBLE_NUMBER_ON_SCREEN_WIDTH = 7;

@ccclass
export default class GameManager extends cc.Component {

    @property(cc.Canvas)
    canvas:cc.Canvas = null;

    @property(cc.Prefab)
    bubblePrefab:cc.Prefab = null;

    @property(cc.Node)
    topBar:cc.Node = null;

    isSpawnFull:boolean = false; //spawn interleave flag
    bubblePool:cc.NodePool = null;
    bubbleContainer:cc.Node[] = [];

    // LIFE-CYCLE CALLBACKS:


    onLoad () {
       this.bubblePool = new cc.NodePool("Bubble");
       for (let i = 0; i < ESTIMATE_BUBBLE_POOL_SIZE; i++) {
           var bubble = cc.instantiate(this.bubblePrefab);
           this.bubblePool.put(bubble);
       }
    }


    start () {
        this.spawnBubbles();
    }

    // update (dt) {}


    spawnBubbles () {
        let selectedBranchs = this.selectBranchBubbles();
        let positionSpawnList: cc.Vec2[] = [];
        
        if (this.isSpawnFull) {    
            if (selectedBranchs.length > 0) {
                for (let bubble of selectedBranchs) {
                    let x = bubble.x - bubble.width / 2;
                    let y = (this.topBar.y - this.topBar.height / 2) - bubble.height / 2;
                    positionSpawnList.push(new cc.Vec2(x, y));
                }
            }
            //select random bubbles for additional
            //random number of additional
            let numOfAdd = Math.floor(Math.random() * (MAX_BUBBLE_NUMBER_ON_SCREEN_WIDTH - selectedBranchs.length + 1));
            
            //random position of bubbles additional
            for (let i = 0; i < numOfAdd; i++) {
                let bubble: cc.Node = this.createBubble(); //temp bubble
                let posit: cc.Vec2 = null;
                let isAccept: boolean;
                do {
                    isAccept = true;
                    let index = Math.floor(Math.random() * MAX_BUBBLE_NUMBER_ON_SCREEN_WIDTH);
                    let x = -1 * this.canvas.node.width / 2 + (bubble.width / 2) + bubble.width * index;
                    let y = (this.topBar.y - this.topBar.height / 2) - bubble.height / 2;
                    posit = new cc.Vec2(x, y);
                    for (let v of positionSpawnList) {
                        if (cc.pDistance(v, posit) < bubble.width / 2) {
                            isAccept = false;
                        }
                    }
                } while (!isAccept);

                positionSpawnList.push(posit);
                this.bubblePool.put(bubble); //destroy temp bubble
            }

            this.unRootAll();
            for (let position of positionSpawnList) {
                let bubble = this.createBubble();
                bubble.setPosition(position);
                bubble.getComponent("Bubble").isRootBubble = true;
                bubble.getChildByName("BubbleValue").getComponent("cc.Label").string = "1";
            }
        }
        else {
            if (selectedBranchs.length > 0) {
                for (let bubble of selectedBranchs) {
                    let x = bubble.x + bubble.width / 2;
                    if (x >= -1 * this.canvas.node.width / 2 + (bubble.width / 2) + bubble.width * (MAX_BUBBLE_NUMBER_ON_SCREEN_WIDTH  - 1)) {
                        x -= bubble.width;
                        bubble.getChildByName("BubbleValue").getComponent("cc.Label").string = "T"; // ###################################   
                    }
                    let y = (this.topBar.y - this.topBar.height / 2) - bubble.height / 2;
                    positionSpawnList.push(new cc.Vec2(x, y));
                }
            }
            //select random bubbles for additional
            //random number of additional
            let numOfAdd = Math.floor(Math.random() * (MAX_BUBBLE_NUMBER_ON_SCREEN_WIDTH - selectedBranchs.length));
            
            //random position of bubbles additional
            for (let i = 0; i < numOfAdd; i++) {
                let bubble: cc.Node = this.createBubble(); //temp bubble
                let posit: cc.Vec2 = null;
                let isAccept: boolean;
                do {
                    isAccept = true;
                    let index = Math.floor(Math.random() * (MAX_BUBBLE_NUMBER_ON_SCREEN_WIDTH - 1));
                    let x = -1 * this.canvas.node.width / 2 + bubble.width + bubble.width * index;
                    let y = (this.topBar.y - this.topBar.height / 2) - bubble.height / 2;
                    posit = new cc.Vec2(x, y);
                    for (let v of positionSpawnList) {
                        if (cc.pDistance(v, posit) < bubble.width / 2) {
                            isAccept = false;
                        }
                    }
                } while (!isAccept);

                positionSpawnList.push(posit);
                this.bubblePool.put(bubble); //destroy temp bubble
            }

            this.unRootAll();
            for (let position of positionSpawnList) {
                let bubble = this.createBubble();
                bubble.setPosition(position);
                bubble.getComponent("Bubble").isRootBubble = true;
                bubble.getChildByName("BubbleValue").getComponent("cc.Label").string = "1";
            }
        }

        this.updateNeighbourBubbleList();
        
        this.isSpawnFull = !this.isSpawnFull;
    }


    createBubble ():cc.Node {
        let bubble:cc.Node = null;
        if (this.bubblePool.size() > 0) {
            bubble = this.bubblePool.get(this);
        }
        else {
            bubble = cc.instantiate(this.bubblePrefab);
            bubble.getComponent("Bubble").gameManager = this;
        }
        bubble.parent = this.canvas.node;
        this.bubbleContainer.push(bubble);
        return bubble;
    }


    moveDownBubbles () {
        for (let bubble of this.bubbleContainer) {
            bubble.getComponent("Bubble").moveDown();
        }
    }


    checkNeighbourBubble (bubble1:cc.Node, bubble2:cc.Node): boolean {
        return cc.pDistance(bubble1.position, bubble2.position) <= 1.5 * (bubble1.width / 2 + bubble2.width / 2); //1.5 is optional
    }


    updateNeighbourBubbleList () {
        //only update neightbour bubble for root bubbles (newly added)
        for (let bubble_a of this.bubbleContainer) {
            if (bubble_a.getComponent("Bubble").isRootBubble) {
                for (let bubble_b of this.bubbleContainer) {
                    if (this.checkNeighbourBubble(bubble_a, bubble_b) == true && bubble_a != bubble_b) {
                        bubble_a.getComponent("Bubble").neighbourBubbles.push(bubble_b);
                    }
                }
            }
        }
    }


    selectBranchBubbles (): cc.Node[] {
        let rootBubbles:cc.Node[] = [];
        for (let bubble of this.bubbleContainer) {
            if (bubble.getComponent("Bubble").isRootBubble == true) {
                rootBubbles.push(bubble);
            }
        }

        if (rootBubbles.length == 0) return [];
        
        let interconnectedComponents: cc.Node[][] = [];
        for (let bubble of rootBubbles) {
            //check if bubble exist in interconnectedComponents
            let flag = false;
            for (let arr of interconnectedComponents) {
                if (arr.indexOf(bubble) >= 0) {
                    flag = true;
                    break;
                }
            }
            if (flag) {
                continue;
            }

            let interconnectedComponent: cc.Node[] = bubble.getComponent("Bubble").findInterconnectedComponent();
            if (interconnectedComponent.length > 0) {
                interconnectedComponents.push([...interconnectedComponent]);
            }
        }

        //select needed bubbles to avoid segmentation
        let selectedBubbles: cc.Node[] = [];
        for (let component of interconnectedComponents) {
            selectedBubbles.push(component[0]);
        }

        for (let i of selectedBubbles) {
            i.getChildByName("BubbleValue").getComponent("cc.Label").string = "C";
        }

        return selectedBubbles;
    }


    unRootAll () {
        for (let bubble of this.bubbleContainer) {
            bubble.getComponent("Bubble").isRootBubble = false;
        }
    }
}