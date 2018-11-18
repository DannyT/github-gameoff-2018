class Baddie extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'atlas', 'images/baddie.png');
    scene.add.existing(this);
    scene.physics.add.existing(this);
  }

  preUpdate(time, delta) {
    if (this.x < 0 || this.y > 1000) {
      this.setActive(false);
      this.setVisible(false);
    }
  }
}

export default Baddie;
