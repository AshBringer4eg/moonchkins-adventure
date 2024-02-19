import Phaser from 'phaser';
import GameScene from './game';
import WebFontFile from '../config/web-font-loader';
import MenuScene from './menu';
import SceneCameraBoundComponent from '../component/scene/camera-bounds-component';
import { Background, Image } from '../../ts/enums/scene/scene';

export default class LoaderScene extends Phaser.Scene {
  private stage: string = 'loader class...';

  private cameraBoundComponent: SceneCameraBoundComponent | undefined;

  constructor() {
    super({ key: LoaderScene.name, active: false, visible: false });
    console.log('Loader Scene');
  }

  create() {
    this.cameraBoundComponent = new SceneCameraBoundComponent(this);

    const screenCenterX = this.cameras.main.centerX;
    const screenCenterY = this.cameras.main.centerY;

    this.add.text(screenCenterX, screenCenterY, `Loading ${this.stage}`, {
      fontFamily: 'Protest Revolution',
      fontSize: '50px',
    }).setOrigin(0.5);

    setTimeout(() => {
      if (globalThis.config.debug){
        return this.scene.start(GameScene.name);
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
    this.load.image(Background.GRID, 'assets/background/grid.jpg');

    this.stage = 'images';
  }

  loadFonts(): void {
    this.stage = 'fonts';

    this.load.addFile(new WebFontFile(this.load, 'Protest Revolution'));
  }
}