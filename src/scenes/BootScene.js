import TitleScene from './TitleScene';

class BootScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'BootScene',
      pack: {
        files: [
          { type: 'image', key: 'logo', url: 'assets/images/moov2-logo.png' }
        ]
      }
    });
  }

  preload() {
    var progress = this.add.graphics();

    this.load.on('progress', value => {
      progress.clear();
      progress.fillStyle(0x990000, 1);
      progress.fillRect(
        0,
        this.sys.game.config.width / 2 - 60,
        this.sys.game.config.width * value,
        60
      );
    });

    this.load.on('complete', function() {
      progress.destroy();
    });

    this.load.atlas(
      'atlas',
      '/assets/atlas/dinohen-atlas.png',
      '/assets/atlas/dinohen-atlas.json'
    );
    this.load.image('blue', 'http://labs.phaser.io/assets/particles/blue.png');
  }

  create() {
    this.scene.add('TitleScene', TitleScene);
    this.scene.start('TitleScene');
  }
}

export default BootScene;
