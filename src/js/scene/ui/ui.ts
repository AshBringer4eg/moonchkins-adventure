import { config } from "../../../config/config";
import { HEALTH_ANIMATION } from "../../../type/enums/animation";
import { Sprites } from "../../../type/enums/image";
import { HEALTH_EVENT } from "../../../type/event/event";
import { RexUiScene } from "../../../type/scene/rex-ui";
import Player from "../../player/player";

export default class UI extends RexUiScene {
  private eventEmitter: Phaser.Events.EventEmitter | undefined;
  private player: Player | undefined;

  constructor() {
    super({ key: UI.name });
  }

  init(data: { emitter: Phaser.Events.EventEmitter; player: Player }) {
    this.eventEmitter = data.emitter;
    this.player = data.player;
  }

  create() {
    if (!this.player) throw new Error('Player is required for UI scene');
    if (!this.eventEmitter) throw new Error('Event emitter is required for UI scene');

    this.anims.create({
      key: HEALTH_ANIMATION.LOSE_FIRST_HALF,
      frames: this.anims.generateFrameNumbers(Sprites.HEART, { start: 0, end: 1 }),
      frameRate: 30,
    });

    this.anims.create({
      key: HEALTH_ANIMATION.LOSE_SECOND_HALF,
      frames: this.anims.generateFrameNumbers(Sprites.HEART, { start: 1, end: 3 }),
      frameRate: 30,
    });

    const hearts: Phaser.GameObjects.Sprite[] = [];
    for (let i = 0; i < Math.floor(this.player.health.getMaxHealth() / 2); i++) {
      const heart = this.add
        .sprite(10, 10, Sprites.HEART, 0)
        .setScale(config.ui.scale)
        .setOrigin(0);
      hearts.push(heart);
      Phaser.Actions.AlignTo(hearts, Phaser.Display.Align.RIGHT_CENTER, (config.ui.scale - 1) * 20);
    }

    this.eventEmitter.on(HEALTH_EVENT.LOSE_HEALTH, (newHealth: number, prevHealth: number) => {
      const heartIndex = Math.round(prevHealth / 2) - 1;
      if (prevHealth % 2 === 0){
        hearts[heartIndex].play(HEALTH_ANIMATION.LOSE_FIRST_HALF);
      } else {
        hearts[heartIndex].play(HEALTH_ANIMATION.LOSE_SECOND_HALF);
      }
    });
  }
}