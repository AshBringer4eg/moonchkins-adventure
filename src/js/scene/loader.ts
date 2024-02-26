import Phaser from 'phaser';
import TestScene from './test';
import WebFontFile from '../../config/web-font-loader';
import MenuScene from './menu';
// import SceneCameraBoundComponent from '../component/scene/camera-bounds-component';
import { Background, Tile } from '../../ts/enums/scene/scene';
import { config } from '../../config/config';

export default class LoaderScene extends Phaser.Scene {
  private stage: string = 'loader class...';

  // private cameraBoundComponent: SceneCameraBoundComponent | undefined;

  constructor() {
    super({ key: LoaderScene.name, active: false, visible: false });
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
        return this.scene.start(TestScene.name);
      }
      return this.scene.start(MenuScene.name);
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
  }

  loadImages(): void {
    this.stage = 'images';
    this.load.image(Background.GRID, 'assets/background/grid.jpg');
    this.load.image(Tile.ROOM_UNDISCOVERED, 'assets/tiles/room/room_undiscovered.png');
    this.load.image(Tile.ROOM_START, 'assets/tiles/room/room_4.png');
  }

  loadFonts(): void {
    this.stage = 'fonts';

    this.load.addFile(new WebFontFile(this.load, 'Protest Revolution'));
  }
}