import { Background } from "../../../type/enums/image";

export default class Dialog extends Phaser.Scene {
  private backScene?: string;

  constructor(){
    super({ key: Dialog.name });
  }

  init(data: { backScene: string }) {
    this.backScene = data.backScene;
  }

  preload() {

  }

  create() {
    const canvas = this.sys.canvas;
    this.add.image(canvas.width / 2, canvas.height / 2, Background.BG_SCROLL)
      .setOrigin(0.5)
      .setDisplaySize(canvas.width * 0.9, canvas.height * 0.9);

    this.input.on('pointerdown', () => {
      this.scene.stop(Dialog.name);
      if (this.backScene) {
        this.scene.resume(this.backScene);
      }
    });
  }
}