import Activatable from "../../../ts/interface/common";
import Component from "../component";

export interface MouseWheelListener {
  (
    pointer: Phaser.Input.Pointer,
    gameObjects: Phaser.GameObjects.GameObject[],
    deltaX: number,
    deltaY: number
  ): void;
}

export interface ZoomState {
  min: number
  max: number
  step: number
  target: number
}

const CAMERA_ZOOM_TIME = 100;

export class SceneZoomInputComponent extends Component implements Activatable {
  private zoomState: ZoomState = { min: 1, max: 1.5, step: 0.1, target: 1 };

  private camera: Phaser.Cameras.Scene2D.Camera;

  private wheelListener: Phaser.Input.InputPlugin | undefined;

  constructor(scene: Phaser.Scene, zoomState?: ZoomState, camera: Phaser.Cameras.Scene2D.Camera = scene.cameras.main) {
    super(scene);

    this.camera = camera;
    if (zoomState) this.setZoomState(zoomState);

    this.camera.zoomTo(this.zoomState.target, CAMERA_ZOOM_TIME);
    this.activate();
  }

  deactivate(): void {
    if (this.wheelListener)
      this.wheelListener.enabled = false;
  }

  activate(): void {
    if (this.wheelListener) {
      this.wheelListener.enabled = true;
      return;
    }
    this.wheelListener = this.scene.input.on(
      "wheel",
      (
        pointer: Phaser.Input.Pointer,
        gameObjects: Phaser.GameObjects.GameObject[],
        deltaX: number,
        deltaY: number
      ) => {
        const zoomDirection = deltaY > 0 ? -1 : 1;
        const { max, min, step } = this.zoomState;

        if (zoomDirection === 1 && this.camera.zoom === max) return;
        if (zoomDirection === -1 && this.camera.zoom === min) return;

        const newZoom = Phaser.Math.Clamp(this.camera.zoom + zoomDirection * step, min, max);

        this.zoomState.target = newZoom;
        this.camera.zoomTo(newZoom, CAMERA_ZOOM_TIME);
        this.camera.pan(pointer.x, pointer.y, CAMERA_ZOOM_TIME);
      }
    );
  }

  setZoomState(zoomState: ZoomState): void {
    let { min, max, step, target } = zoomState;
    if (!min) min = 1;
    if (!max) max = 1;
    if (!step) step = .1;
    if (!target) target = 1;
    if (min > max) min = max;

    this.zoomState = { min, max, step, target };
  }
}

export default SceneZoomInputComponent;
