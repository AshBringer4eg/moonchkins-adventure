import Activatable, { Direction } from "../../../ts/interface/common";
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

export interface ZoomInputComponentOptions {
  stickyZoom: boolean
}


const CAMERA_ZOOM_TIME = 200;

/* TODO: Add this logic here
https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/input/gestures/pinch/Pinch.js
https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/input/gestures/twopointerstracer/TwoPointersTracer.js

*/
export class SceneZoomInputComponent extends Component implements Activatable {
  private zoomState: ZoomState = { min: 1, max: 2.5, step: 0.5, target: 1.5 };
  private options: ZoomInputComponentOptions = { stickyZoom: false };
  private camera: Phaser.Cameras.Scene2D.Camera;

  private wheelListener: Phaser.Input.InputPlugin | undefined;

  public proleaded: boolean = false;

  constructor(scene: Phaser.Scene, options?: ZoomInputComponentOptions, zoomState?: ZoomState, camera: Phaser.Cameras.Scene2D.Camera = scene.cameras.main) {
    super(scene);

    this.camera = camera;
    if (zoomState) this.setZoomState(zoomState);
    if (options) this.options = options;

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

        if (this.options.stickyZoom) this.camera.pan(pointer.worldX, pointer.worldY, CAMERA_ZOOM_TIME);
      }
    );
  }

  setOptions(options: ZoomInputComponentOptions): void {
    this.options = options;
  }

  setZoomState(zoomState: Partial<ZoomState>): void {
    let { min, max, step, target } = zoomState;
    if (!min) min = this.zoomState.min || 1;
    if (!max) max = this.zoomState.max || 1;
    if (!step) step = this.zoomState.step || .1;
    if (!target) target =  this.zoomState.target || 1;
    if (min > max) min = max;

    this.zoomState = { min, max, step, target };
  }

  getZoomVectorDirection(pointer: Phaser.Input.Pointer): Direction {
    const blockSizeX = this.camera.width / 3;
    const blockSizeY = this.camera.height / 3;

    if (pointer.x <= blockSizeX) {
      if (pointer.y < blockSizeY) {
        return Direction.TOP_LEFT; // ⇖
      } else if (pointer.y  <= 2 * blockSizeY){
        return Direction.LEFT; // ⇐
      } else {
        return Direction.BOTTOM_LEFT; // ⇙
      }
    } else if (pointer.x <= 2 * blockSizeX) {
      if (pointer.y < blockSizeY) {
        return Direction.TOP; // ⇑
      } else if (pointer.y  <= 2 * blockSizeY){
        return Direction.CENTER; // ↺
      } else {
        return Direction.BOTTOM; // ⇓
      }
    } else {
      if (pointer.y < blockSizeY) {
        return Direction.TOP_RIGHT; // ⇗
      } else if (pointer.y  <= 2 * blockSizeY){
        return Direction.RIGHT; // ⇒
      } else {
        return Direction.BOTTOM_RIGHT; // ⇘
      }
    }
  }
}

export default SceneZoomInputComponent;
