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