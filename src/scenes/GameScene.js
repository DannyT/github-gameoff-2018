import Baddie from '../gameObjects/Baddie';

class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'GameScene'
    });
  }

  create() {
    // player
    this.player = this.physics.add.image(
      100,
      100,
      'atlas',
      'images/chicken.png'
    );
    this.player.setCollideWorldBounds(true);
    this.player.setGravityY(2000);
    this.input.on('pointerdown', this.jump, this);
    this.input.keyboard.on('keydown_SPACE', this.jump, this);

    // ground
    this.platforms = this.physics.add.staticGroup();
    this.platforms
      .create(550, 700, 'atlas', 'images/ground.png')
      .setScale(12, 1)
      .refreshBody();
    this.physics.add.collider(this.player, this.platforms);

    // baddies
    this.baddies = this.physics.add.group({
      classType: Baddie,
      runChildUpdate: true,
      maxSize: 2
    });

    this.physics.add.collider(this.baddies, this.platforms);
    this.physics.add.overlap(this.baddies, this.player, this.gameOver, null, this);

    this.timerConfig = {
      delay: Phaser.Math.Between(800, 3000),
      callback: this.createBaddie,
      callbackScope: this,
      loop:true
    }
    this.spawnTimer = this.time.addEvent(this.timerConfig);

    // score
    this.scoreText = this.add.text(32, 32);
  }

  createBaddie() {
    let baddie = this.baddies.get(1200, 300);
    if (!baddie) {
      return;
    }
    baddie.setActive(true);
    baddie.setVisible(true);
    baddie.setScale(1, Phaser.Math.Between(10, 11)/10);
    baddie.setVelocity(-500, 0);
    this.timerConfig.delay = Phaser.Math.Between(1200, 3000);
    this.spawnTimer.reset(this.timerConfig);
  }

  jump() {
    if (this.player.body.touching.down) {
      this.player.body.setVelocityY(-1000);
    }
  }

  gameOver(){
    this.spawnTimer.remove();
    this.scene.pause();
  }

  update(time, delta){
    this.scoreText.setText((time/1000).toFixed(2));
  }
}

export default GameScene;
