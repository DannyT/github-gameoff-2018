import Baddie from '../gameObjects/Baddie';

class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'GameScene'
        });
    }

    create() {
        // player
        this.player = this.physics.add.image(100, 100, 'atlas', 'images/chicken.png');
        this.player.setCollideWorldBounds(true);
        this.player.setGravityY(2000);
        this.input.on('pointerdown', this.jump, this);
        this.input.keyboard.on('keydown_SPACE', this.jump, this);

        // ground
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(550, 700, 'atlas', 'images/ground.png').setScale(12, 1).refreshBody();
        this.physics.add.collider(this.player, this.platforms);

        // baddies
        this.baddies = this.physics.add.group({
            classType: Baddie,
            runChildUpdate: true,
            maxSize: 2
        });

        this.physics.add.collider(this.baddies, this.platforms);

        this.time.addEvent({
            delay: 900,
            loop: true,
            callback: this.createBaddie,
            callbackScope: this
        });
    }

    createBaddie() {
        let baddie = this.baddies.get(1200,300);
        if(!baddie) {
            return;
        }
        baddie.setActive(true);
        baddie.setVisible(true);
        baddie.setVelocity(-500, 0);
    }

    jump(){
        if(this.player.body.touching.down) {
            this.player.body.setVelocityY(-1000);
        }
        
    }
}

export default GameScene;
