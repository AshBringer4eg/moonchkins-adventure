import Phaser from 'phaser';
import SceneCameraBoundComponent from '../component/scene/camera-bounds-component';
import SceneDragInputComponent from '../component/scene/drag-input-component';
import SceneZoomInputComponent from '../component/scene/zoom-input-component';
import Level from '../object/level';
import { ROOM_HEIGHT, ROOM_WIDTH } from '../object/_const';
import { Background } from '../../type/enums/image';

export default class GameScene extends Phaser.Scene {
  public zoomComponent: SceneZoomInputComponent = new SceneZoomInputComponent();
  private cameraBoundComponent: SceneCameraBoundComponent = new SceneCameraBoundComponent();
  private dragComponent: SceneDragInputComponent = new SceneDragInputComponent();

  private level: Level | null = null;

  constructor() {
    super({ key: GameScene.name });
  }

  create() {
    const width = Number(this.sys.game.config.width),
      height = Number(this.sys.game.config.height);
    this.add.image(width / 2, height / 2, Background.BG_GRID).setDisplaySize(width, height);

    this.level = new Level(this, 15, 11);

    this.zoomComponent.activate(this);
    this.dragComponent.activate(this);
    this.cameraBoundComponent.activate(this, {
      width: ROOM_WIDTH * this.level.rowCount,
      height: ROOM_HEIGHT * this.level.colCount,
    });

    const startRoom = this.level.getStartingRoom();
    if (startRoom) startRoom.zoomToRoom();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(time: number, delta: number) {}
}