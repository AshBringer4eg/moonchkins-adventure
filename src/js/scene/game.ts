
import { Background } from '../../type/enums/image';
import { HEALTH_EVENT } from '../../type/event/event';
import { RexUiScene } from '../../type/scene/rex-ui';
import SceneCameraBoundComponent from '../component/scene/camera-bounds-component';
import SceneDragInputComponent from '../component/scene/drag-input-component';
import SceneZoomInputComponent from '../component/scene/zoom-input-component';
import { ROOM_HEIGHT, ROOM_WIDTH } from '../object/_const';
import Level from '../object/level';
import Player from '../player/player';
import { UiFactory } from './ui/factory';
import UIScene from './ui/ui';

export default class GameScene extends RexUiScene {
  public zoomComponent: SceneZoomInputComponent = new SceneZoomInputComponent();
  private cameraBoundComponent: SceneCameraBoundComponent = new SceneCameraBoundComponent();
  private dragComponent: SceneDragInputComponent = new SceneDragInputComponent();

  private eventEmitter: Phaser.Events.EventEmitter | undefined;
  private player: Player | undefined;
  private level: Level | undefined;

  constructor() {
    super({ key: GameScene.name });
  }

  init(data: { emitter: Phaser.Events.EventEmitter; }) {
    this.eventEmitter = data.emitter;
  }

  create() {
    const width = Number(this.sys.game.config.width),
      height = Number(this.sys.game.config.height);
    this.add.image(width / 2, height / 2, Background.BG_GRID).setDisplaySize(width, height);

    if (!this.eventEmitter) throw new Error('Event emitter is required.');
    this.player = new Player(this.eventEmitter);
    this.level = new Level(this, 15, 11);

    this.zoomComponent.activate(this);
    this.dragComponent.activate(this);
    this.cameraBoundComponent.activate(this, {
      width: ROOM_WIDTH * this.level.rowCount,
      height: ROOM_HEIGHT * this.level.colCount,
    });

    this.scene.launch(UIScene.name, { emitter: this.eventEmitter, player: this.player });

    const startRoom = this.level.getStartingRoom();
    if (startRoom) startRoom.zoomToRoom();

    UiFactory.create(this);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(time: number, delta: number) {}
}