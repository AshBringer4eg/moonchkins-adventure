import { config } from "../../../config/config";
import { Bounds } from "../../../type/interface/component/camera-bound-component";
import Component from "../component";


export class SceneCameraBoundComponent extends Component {
  private camera: Phaser.Cameras.Scene2D.Camera | undefined;

  private worldWidth = config.width;
  private worldHeight = config.height;

  private bounds: Bounds = {
    x: 0,
    y: 0,
    width: Math.max(this.worldWidth),
    height: Math.max(this.worldHeight),
  };

  constructor(bounds?: Bounds) {
    super();

    if (bounds) {
      this.bounds = bounds;
    }
  }

  deactivate(): void {
    if (this.camera) this.camera.removeBounds();
  }

  activate(scene: Phaser.Scene, bounds?: Bounds): void {
    this.scene = scene;
    this.camera = this.scene.cameras.main;

    if (bounds) {
      this.bounds = bounds;
    }

    this.camera.setBounds(
      this.bounds.x || 0,
      this.bounds.y || 0,
      this.bounds.width,
      this.bounds.height
    );
  }

  setBounds(bounds: Bounds): void {
    if (!this.scene) throw new Error(`Can't activate 'Set Bounds' method without scene. Please call 'activate' method first.`);

    this.bounds = bounds;
    this.activate(this.scene);
  }
}

export default SceneCameraBoundComponent;
