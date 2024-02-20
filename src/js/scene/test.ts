import Phaser from 'phaser';
import { Background } from '../../ts/enums/scene/scene';
import SceneCameraBoundComponent from '../component/scene/camera-bounds-component';
import SceneDragInputComponent from '../component/scene/drag-input-component';
import SceneZoomInputComponent from '../component/scene/zoom-input-component';
import Level from '../object/level';
import { DEFAULT_TILE_HEIGHT, DEFAULT_TILE_WIDTH } from '../object/room';

export default class TestScene extends Phaser.Scene {
  private zoomComponent: SceneZoomInputComponent | undefined;
  private dragComponent: SceneDragInputComponent | undefined;
  private cameraBoundComponent: SceneCameraBoundComponent | undefined;

  private level: Level | null = null;

  constructor() {
    super({ key: TestScene.name });
  }

  create() {
    const width = Number(this.sys.game.config.width),
      height = Number(this.sys.game.config.height);
    this.add.image(width/2, height/2, Background.GRID).setDisplaySize(width, height);

    this.level = new Level(this, 16, 11);

    this.zoomComponent = new SceneZoomInputComponent(this);
    this.dragComponent = new SceneDragInputComponent(this);
    this.cameraBoundComponent = new SceneCameraBoundComponent(this, {
      width: DEFAULT_TILE_WIDTH * this.level.rowCount,
      height: DEFAULT_TILE_HEIGHT * this.level.colCount,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(time: number, delta: number) {}
}