import Room from "./room";

/**
 * Class for creating playgraund with room tiles.
 * @export
 * @class Level
 */
export default class Level {
  private playground: Room[][];
  private rooms: Room[] = [];

  public scene: Phaser.Scene;
  public rowCount: number = 11;
  public colCount: number = 11;

  /**
   * Creates an instance of Level and fills  the playground array with empty Rooms + start tuile in the center.
   * @param {Phaser.Scene} scene
   * @param {number} [rowCount] - Represents how many rooms will be placed from LEFT to RIGHT
   * @param {number} [colCount] - Represents how many rooms will be placed from TOP to BOTTOM
   * @memberof Level - Parent Level element
   */
  constructor(scene: Phaser.Scene, rowCount?: number, colCount?: number){
    this.scene = scene;
    this.rowCount = rowCount || this.rowCount;
    this.colCount = colCount || this.colCount;


    // Initialize battlefield with empty tiles
    this.playground = [];
    for (let row = 0; row < this.rowCount; row++) {
      this.playground.push([]);
      for (let col = 0; col < this.colCount; col++) {
        const room = new Room(this, { row, col });
        //      ^?
        if (row === Math.floor(this.rowCount/2) && col === Math.floor(this.colCount/2)) {
          room.initAsStartTile();
        }
        this.playground[row].push(room);
      }
    }
  }
}