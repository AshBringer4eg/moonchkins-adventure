
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

export interface DragState {
  active: boolean,
  prevPointer: {
    x: number,
    y: number
  }
}

export class SceneDragInputComponent extends Component implements Activatable {
  private dragState: DragState = { active: false, prevPointer:  { x:0, y:0 } };

  private camera: Phaser.Cameras.Scene2D.Camera;

  private pointerDownListener: Phaser.Input.InputPlugin | undefined;
  private pointerMoveListener: Phaser.Input.InputPlugin | undefined;
  private pointerUpListener:   Phaser.Input.InputPlugin | undefined;


  constructor(scene: Phaser.Scene, camera: Phaser.Cameras.Scene2D.Camera = scene.cameras.main) {
    super(scene);

    this.camera = camera;
    this.activate();
  }

  deactivate(): void {
    if (this.pointerDownListener) this.pointerDownListener.enabled = false;
    if (this.pointerMoveListener) this.pointerMoveListener.enabled = false;
    if (this.pointerUpListener) this.pointerUpListener.enabled = false;
  }

  activate(): void {
    this.activatePointerDown();
    this.activatePointerMove();
    this.activatePointerUp();
  }

  activatePointerMove(): void {
    if (this.pointerMoveListener){
      this.pointerMoveListener.enabled = true;
      return;
    }
    this.scene.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      if (this.dragState.active) {
        const deltaX = this.dragState.prevPointer.x - pointer.x;
        const deltaY = this.dragState.prevPointer.y - pointer.y;

        this.camera.scrollX += deltaX / this.camera.zoom;
        this.camera.scrollY += deltaY / this.camera.zoom;

        this.dragState.prevPointer = { x: pointer.x, y: pointer.y };
      }
    });
  }

  activatePointerUp(): void {
    if (this.pointerUpListener){
      this.pointerUpListener.enabled = true;
      return;
    }
    this.scene.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {
      this.dragState.active = false;
      console.log('POINTERUP: ' + pointer.id);
    });
  }

  activatePointerDown(): void {
    if (this.pointerDownListener){
      this.pointerDownListener.enabled = true;
      return;
    }
    this.scene.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      this.dragState.active = true;
      this.dragState.prevPointer = { x: pointer.x, y: pointer.y };
      console.log('POINTERDOWN: ' + pointer.id);
    });
  }
}

export default SceneDragInputComponent;
