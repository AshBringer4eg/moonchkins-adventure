import Phaser from 'phaser';
import WebFontFile from '../../config/web-font-loader';
import GameScene from './game';
import MenuScene from './menu';
// import SceneCameraBoundComponent from '../component/scene/camera-bounds-component';
import { config } from '../../config/config';
import { Background, Monster, Objects, Sprites, Tile } from '../../type/enums/image';

export default class LoaderScene extends Phaser.Scene {
  private stage: string = 'loader class...';
  private eventEmitter: Phaser.Events.EventEmitter;

  // private cameraBoundComponent: SceneCameraBoundComponent | undefined;

  constructor() {
    super({ key: LoaderScene.name, active: false, visible: false });
    this.eventEmitter = new Phaser.Events.EventEmitter();
    console.log('Loader Scene');
  }

  create() {
    // this.cameraBoundComponent = new SceneCameraBoundComponent(this);

    const screenCenterX = this.cameras.main.centerX;
    const screenCenterY = this.cameras.main.centerY;

    this.add.text(screenCenterX, screenCenterY, `Loading ${this.stage}`, {
      fontFamily: 'Protest Revolution',
      fontSize: '50px',
    }).setOrigin(0.5);

    setTimeout(() => {
      if (config.debug){
        return this.scene.start(GameScene.name, { emitter: this.eventEmitter });
      }
      return this.scene.start(MenuScene.name, { emitter: this.eventEmitter });
    }, 1);
  }

  preload() {
    this.load.setPath('./dist');

    this.loadFonts();
    this.loadSprites();
    this.loadImages();
    this.stage = 'complete';
  }

  loadSprites(): void {
    this.stage = 'sprites';
    this.load.spritesheet(Sprites.HEART, 'assets/ui/heart.png', {
      frameWidth: 34,
      frameHeight: 28,
    });
  }

  loadImages(): void {
    this.stage = 'images';
    this.load.image(Background.BG_GRID, 'assets/background/grid.jpg');
    this.load.image(Background.BG_SCROLL, 'assets/background/paper-scroll.png');

    this.load.image(Tile.ROOM_UNDISCOVERED, 'assets/tiles/room/room_undiscovered.png');
    this.load.image(Tile.ROOM, 'assets/tiles/room/room.png');
    this.load.image(Tile.HOLE, 'assets/tiles/room/part/hole.png');
    this.load.image(Objects.CHEST, 'assets/tiles/object/chest.png');
    this.load.image(Objects.DOOR, 'assets/tiles/object/door.png');
    this.load.image(Monster.MONSTER, 'assets/tiles/object/monster.png');
  }

  loadFonts(): void {
    this.stage = 'fonts';

    this.load.addFile(new WebFontFile(this.load, 'Protest Revolution'));
  }
}