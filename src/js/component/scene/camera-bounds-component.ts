import { config } from "../../../config/config";
import Activatable from "../../../ts/interface/common";
import Component from "../component";

export interface Bounds {
  x?: number,
  y?: number,
  width: number,
  height: number
}

export class SceneCameraBoundComponent extends Component implements Activatable {
  private camera: Phaser.Cameras.Scene2D.Camera;

  private worldWidth = config.width;
  private worldHeight = config.height;

  private bounds: Bounds = {
    x: 0,
    y: 0,
    width: Math.max(this.worldWidth, this.scene.scale.width),
    height: Math.max(this.worldHeight, this.scene.scale.height),
  };

  constructor(scene: Phaser.Scene, bounds?: Bounds, camera: Phaser.Cameras.Scene2D.Camera = scene.cameras.main) {
    super(scene);

    this.camera = camera;
    if (bounds) {
      this.bounds = bounds;
    }
    this.activate();
  }

  deactivate(): void {
    this.camera.removeBounds();
  }

  activate(): void {
    this.camera.setBounds(
      this.bounds.x || 0,
      this.bounds.y || 0,
      this.bounds.width,
      this.bounds.height
    );
  }

  setBounds(bounds: Bounds): void {
    this.bounds = bounds;
    this.activate();
  }
}

export default SceneCameraBoundComponent;
