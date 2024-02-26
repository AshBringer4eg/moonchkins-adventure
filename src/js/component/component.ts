interface Activatable {
  activate(scene: Phaser.Scene): void
  deactivate(): void
  preload?(): void
}

export class Component implements Activatable {
  protected scene: Phaser.Scene | undefined;

  constructor() {
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  activate(scene: Phaser.Scene): void {
    throw new Error("Method not implemented.");
  }
  deactivate(): void {
    throw new Error("Method not implemented.");
  }
}

export default Component;