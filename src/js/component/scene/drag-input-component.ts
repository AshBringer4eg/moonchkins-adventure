import { Pinch } from "phaser3-rex-plugins/plugins/gestures";
import Component from "../component";

export interface MouseWheelListener {
  (
    pointer: Phaser.Input.Pointer,
    gameObjects: Phaser.GameObjects.GameObject[],
    deltaX: number,
    deltaY: number
  ): void;
}

export interface DragState {
  active: boolean,
  prevPointer: {
    x: number,
    y: number
  }
}

export class SceneDragInputComponent extends Component {
  private camera: Phaser.Cameras.Scene2D.Camera | undefined;

  private pinchListener: Pinch | undefined;

  constructor() {
    super();
  }

  deactivate(): void {
    if (this.pinchListener) this.pinchListener.setEnable(false);
  }

  activate(scene: Phaser.Scene): void {
    this.scene = scene;
    this.camera = this.scene.cameras.main;

    this.activateDrag();
  }

  activateDrag(): void {
    if (!this.scene) throw new Error(`Can't activate 'Pinch zoom' method without scene. Please call 'activate' method first.`);

    if (this.pinchListener) {
      this.pinchListener.setEnable(true);
      return;
    }

    this.pinchListener = new Pinch(this.scene);
    this.pinchListener.on('drag1', (dragScale: { drag1Vector: { x: number, y: number }; }) => {
      if (!this.camera) return console.warn(`Drag feature disabled because the scene camera is not defined`);

      const drag1Vector = dragScale.drag1Vector;
      this.camera.scrollX -= drag1Vector.x / this.camera.zoom;
      this.camera.scrollY -= drag1Vector.y / this.camera.zoom;
    });
  }
}

export default SceneDragInputComponent;
