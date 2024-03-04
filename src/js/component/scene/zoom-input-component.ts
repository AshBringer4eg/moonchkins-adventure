import { Pinch } from 'phaser3-rex-plugins/plugins/gestures.js';

import { ZoomInputComponentOptions, ZoomState } from "../../../type/interface/component/zoom-input-component";
import Component from "../component";
import { config } from '../../../config/config';

const CAMERA_ZOOM_TIME = 200;

export class SceneZoomInputComponent extends Component {
  private zoomState: ZoomState = { min: 1, max: 3, step: 0.5, target: 1.5 };
  private options: ZoomInputComponentOptions = { stickyZoom: false };
  private camera: Phaser.Cameras.Scene2D.Camera | undefined;

  private wheelListener: Phaser.Input.InputPlugin | undefined;
  private pinchListener: Pinch | undefined;

  constructor(options?: ZoomInputComponentOptions, zoomState?: ZoomState) {
    super();

    if (zoomState) this.setZoomState(zoomState);
    if (options) this.options = options;
  }

  deactivate(): void {
    if (this.wheelListener) this.wheelListener.enabled = false;
    if (this.pinchListener) this.pinchListener.setEnable(false);
  }

  activate(scene: Phaser.Scene): void {
    this.scene = scene;
    this.camera = scene.cameras.main;
    this.camera.zoomTo(this.zoomState.target, 0);
    this.camera.pan(config.width / 2, config.height / 2, 0);

    this.activateWheelZoom();
    this.activatePinchZoom();
  }

  activatePinchZoom(): void {
    if (!this.scene) throw new Error(`Can't activate 'Pinch zoom' method without scene. Please call 'activate' method first.`);

    if (this.pinchListener) {
      this.pinchListener.setEnable(true);
      return;
    }

    this.pinchListener = new Pinch(this.scene);
    this.pinchListener.on('pinch', (pinch: { scaleFactor: number; }) => {
      if (!this.camera) return console.warn(`Pinch zoom feature disabled because the scene camera is not defined`);
      const scaleFactor = pinch.scaleFactor;
      const { max, min } = this.zoomState;

      if (this.camera.zoom === max && scaleFactor > 1) return;
      if (this.camera.zoom === min && scaleFactor < 1) return;

      this.camera.zoom = Phaser.Math.Clamp(this.camera.zoom * scaleFactor, min, max);

    });
  }

  activateWheelZoom(): void {
    if (!this.scene) throw new Error(`Can't activate 'Wheel zoom' method without scene. Please call 'activate' method first.`);

    if (this.wheelListener) {
      this.wheelListener.enabled = true;
      return;
    }
    this.wheelListener = this.scene.input.on("wheel", (
      pointer: Phaser.Input.Pointer,
      gameObjects: Phaser.GameObjects.GameObject[],
      deltaX: number,
      deltaY: number
    ) => {
      if (!this.camera) return console.warn(`Wheel zoom feature disabled because the scene camera is not defined`);

      const zoomDirection = deltaY > 0 ? -1 : 1;
      const { max, min, step } = this.zoomState;

      if (zoomDirection === 1 && this.camera.zoom === max) return;
      if (zoomDirection === -1 && this.camera.zoom === min) return;

      const newZoom = Phaser.Math.Clamp(this.camera.zoom + zoomDirection * step, min, max);

      this.zoomState.target = newZoom;
      this.camera.zoomTo(newZoom, CAMERA_ZOOM_TIME);

      if (this.options.stickyZoom) this.camera.pan(pointer.worldX, pointer.worldY, CAMERA_ZOOM_TIME);
    });
  }

  setOptions(options: ZoomInputComponentOptions): void {
    this.options = options;
  }

  setZoomState(zoomState: Partial<ZoomState>): void {
    if (!this.camera) throw new Error(`Can't zoom without camera`);
    let { min, max, step, target } = zoomState;
    if (!min) min = this.zoomState.min || 1;
    if (!max) max = this.zoomState.max || 1;
    if (!step) step = this.zoomState.step || .1;
    if (!target) target =  this.zoomState.target || 1;
    if (min > max) min = max;

    this.zoomState = { min, max, step, target };
  }

  zoomToCoordinates(x: number, y: number, zoom: number = this.zoomState.target, duration: number = CAMERA_ZOOM_TIME) {
    if (!this.camera) throw new Error(`Can't zoom without camera`);
    this.setZoomState({ target: zoom });
    this.camera.zoomTo(zoom, duration, 'Linear', true);
    this.camera.pan(x, y, duration, 'Linear', true);
  }
}

export default SceneZoomInputComponent;
