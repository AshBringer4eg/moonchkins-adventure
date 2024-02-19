import Activatable from "../../../ts/interface/common";
import Component from "../component";

export interface Bounds {
  x: number,
  y: number,
  width: number,
  height: number
}

export class SceneCameraBoundComponent extends Component implements Activatable {
  private camera: Phaser.Cameras.Scene2D.Camera;

  private worldWidth = globalThis.config.width;
  private worldHeight = globalThis.config.height;

  private bounds: Bounds = {
    x: 0,
    y: 0,
    width: Math.max(this.worldWidth, this.scene.scale.width),
    height: Math.max(this.worldHeight, this.scene.scale.height),
  };

  constructor(scene: Phaser.Scene, camera: Phaser.Cameras.Scene2D.Camera = scene.cameras.main) {
    super(scene);

    this.camera = camera;
    this.activate();
  }

  deactivate(): void {
    this.camera.removeBounds();
  }

  activate(bounds?: Bounds): void {
    if (bounds) this.setBounds(bounds);

    this.camera.setBounds(
      this.bounds.x,
      this.bounds.y,
      this.bounds.width,
      this.bounds.height
    );
  }

  setBounds(bounds: Bounds): void {
    this.bounds = bounds;
  }
}

export default SceneCameraBoundComponent;
