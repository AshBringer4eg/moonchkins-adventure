import Phaser from 'phaser';
import { Background } from '../../ts/enums/scene/scene';
import SceneCameraBoundComponent from '../component/scene/camera-bounds-component';
import SceneDragInputComponent from '../component/scene/drag-input-component';
import SceneZoomInputComponent from '../component/scene/zoom-input-component';

export default class GameScene extends Phaser.Scene {
  private zoomComponent: SceneZoomInputComponent | undefined;
  private dragComponent: SceneDragInputComponent | undefined;
  private cameraBoundComponent: SceneCameraBoundComponent | undefined;

  constructor() {
    super({ key: GameScene.name });
  }

  create() {
    const width = Number(this.sys.game.config.width),
      height = Number(this.sys.game.config.height);
    this.add.image(width/2, height/2, Background.GRID).setDisplaySize(width, height);

    this.zoomComponent = new SceneZoomInputComponent(this);
    this.dragComponent = new SceneDragInputComponent(this);
    this.cameraBoundComponent = new SceneCameraBoundComponent(this);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(time: number, delta: number) {}
}