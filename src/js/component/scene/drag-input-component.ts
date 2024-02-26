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
  private dragState: DragState = { active: false, prevPointer:  { x:0, y:0 } };

  private camera: Phaser.Cameras.Scene2D.Camera | undefined;

  private pointerDownListener: Phaser.Input.InputPlugin | undefined;
  private pointerMoveListener: Phaser.Input.InputPlugin | undefined;
  private pointerUpListener:   Phaser.Input.InputPlugin | undefined;


  constructor() {
    super();
  }

  deactivate(): void {
    if (this.pointerDownListener) this.pointerDownListener.enabled = false;
    if (this.pointerMoveListener) this.pointerMoveListener.enabled = false;
    if (this.pointerUpListener) this.pointerUpListener.enabled = false;
  }

  activate(scene: Phaser.Scene): void {
    this.scene = scene;
    this.camera = this.scene.cameras.main;

    this.activatePointerDown();
    this.activatePointerMove();
    this.activatePointerUp();
  }

  activatePointerMove(): void {
    if (!this.scene) throw new Error(`Can't activate 'Pointer Move' method without scene. Please call 'activate' method first.`);

    if (this.pointerMoveListener){
      this.pointerMoveListener.enabled = true;
      return;
    }
    this.scene.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      if (!this.camera) return console.warn(`Drag feature disabled because the scene camera is not defined`);

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
    if (!this.scene) throw new Error(`Can't activate 'Pointer Up' method without scene. Please call 'activate' method first.`);

    if (this.pointerUpListener){
      this.pointerUpListener.enabled = true;
      return;
    }
    this.scene.input.on('pointerup', () => {
      this.dragState.active = false;
    });
  }

  activatePointerDown(): void {
    if (!this.scene) throw new Error(`Can't activate 'Pointer Down' method without scene. Please call 'activate' method first.`);

    if (this.pointerDownListener){
      this.pointerDownListener.enabled = true;
      return;
    }
    this.scene.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      this.dragState.active = true;
      this.dragState.prevPointer = { x: pointer.x, y: pointer.y };
    });
  }
}

export default SceneDragInputComponent;
