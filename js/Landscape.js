// import Sprite from "./Sprite.js";

export default class Landscape extends Phaser.Physics.Matter.Sprite{


    static preload(scene){
        //load recources
        scene.load.atlas('resources', 'assets/images/resources.png', 'assets/images/resources_atlas.json');
        // scene.load.audio('tree', 'assets/audio/tree.mp3');
        // scene.load.audio('rock', 'assets/audio/rock.mp3');
        // scene.load.audio('bush', 'assets/audio/bush.mp3');
        // scene.load.audio('pickup', 'assets/audio/pickup.mp3');

    }
    constructor(data) {

        let {scene,landscape} = data;
        super(scene, landscape.x, landscape.y, texture, frame);
        //super(scene.matter.world, resource.x, resource.y, 'resources', resource.type);
        // let drops = JSON.parse(resource.properties.find(p=>p.name=='drops').value);
        // let depth = resource.properties.find(p=>p.name=='depth').value;
        super({scene, x:landscape.x, y:landscape.y, texture:'resources', frame:resource.type, rops, depth, health:5, name:resource.type})

        // let yOrigin = resource.properties.find(p=>p.name == 'yOrigin').value;

        // // shift resource over by half of its width
        // this.x += this.width/2;
        // // additioal height adjustments
        // this.y -= this.height/2;
        // this.y = this.y + this.height * (yOrigin - .5);

        const {Bodies} = Phaser.Physics.Matter.Matter;
        let circleCollider = Bodies.circle(this.x, this.y, 12, {isSensor:false, label:'collider'});
        this.setExistingBody(circleCollider);

        this.setStatic(true);
        // this.setOrigin(.5, yOrigin);
    }
}