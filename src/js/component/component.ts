import Activatable from "../../ts/interface/common";

export class Component implements Activatable {
  protected scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }
  activate(): void {
    throw new Error("Method not implemented.");
  }
  deactivate(): void {
    throw new Error("Method not implemented.");
  }
}

export default Component;