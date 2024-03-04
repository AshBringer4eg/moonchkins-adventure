import { inRange, isNil } from "lodash";
import { v4 } from "uuid";
import Room from "./room";
import { RoomPosition } from "../../type/interface/object/room";
import { RexUiScene } from "../../type/scene/rex-ui";

/**
 * Class for creating playgraund with room tiles.
 * @export
 * @class Level
 */
export default class Level {
  public uuid: string = v4();

  private playground: Room[][];

  public scene: RexUiScene;
  public rowCount: number = 11;
  public colCount: number = 11;
  public startRoom: Room | undefined;

  /**
   * Creates an instance of Level and fills  the playground array with empty Rooms + start tuile in the center.
   * @param {RexUiScene} scene
   * @param {number} [rowCount] - Represents how many rooms will be placed from LEFT to RIGHT
   * @param {number} [colCount] - Represents how many rooms will be placed from TOP to BOTTOM
   * @memberof Level - Parent Level element
   */
  constructor(scene: RexUiScene, rowCount?: number, colCount?: number){
    this.scene = scene;
    this.rowCount = rowCount || this.rowCount;
    this.colCount = colCount || this.colCount;

    // Initialize battlefield with empty tiles
    this.playground = [];
    for (let row = 0; row < this.rowCount; row++) {
      this.playground.push([]);
      for (let col = 0; col < this.colCount; col++) {
        const room = new Room(this, { row, col });
        if (row === Math.floor(this.rowCount / 2) && col === Math.floor(this.colCount / 2)) {
          this.startRoom = room;
        }
        this.playground[row].push(room);
      }
    }
    if (this.startRoom){
      this.startRoom.initAsStartRoom();
    } else {
      throw new Error(`Can't initialize the starting room`);
    }
  }

  getStartingRoom(): Room | undefined {
    return this.startRoom;
  }

  getRoom(position: Partial<RoomPosition>): Room | undefined {
    for (let row = 0; row < this.rowCount; row++) {
      for (let col = 0; col < this.colCount; col++) {
        const room = this.playground[row][col];
        if (!isNil(position?.x) && !isNil(position?.y)) {
          if (
            inRange(position.x, room.position.x, room.position.x + room.width) &&
            inRange(position.y, room.position.y, room.position.y + room.height)) {
            return room;
          }
        } else if (!isNil(position.row) && !isNil(position.col)){
          if (room.position.row === position.row && room.position.col === position.col) {
            return room;
          }
        }
      }
    }
  }

  /*
  printDebug(){
    const zeroPad = (num: number, places: number) => String(num).padStart(places, '0');

    let result = '';
    for (let row = 0; row < this.rowCount; row++) {
      result += `\n`;
      for (let col = 0; col < this.colCount; col++) {
        result += `R${zeroPad(row, 2)}:C${zeroPad(col, 2)} `;
      }
    }
    console.log(result);
  }

  R00:C00 R00:C01 R00:C02 R00:C03 R00:C04 R00:C05 R00:C06 R00:C07 R00:C08 R00:C09 R00:C10
  R01:C00 R01:C01 R01:C02 R01:C03 R01:C04 R01:C05 R01:C06 R01:C07 R01:C08 R01:C09 R01:C10
  R02:C00 R02:C01 R02:C02 R02:C03 R02:C04 R02:C05 R02:C06 R02:C07 R02:C08 R02:C09 R02:C10
  R03:C00 R03:C01 R03:C02 R03:C03 R03:C04 R03:C05 R03:C06 R03:C07 R03:C08 R03:C09 R03:C10
  R04:C00 R04:C01 R04:C02 R04:C03 R04:C04 R04:C05 R04:C06 R04:C07 R04:C08 R04:C09 R04:C10
  R05:C00 R05:C01 R05:C02 R05:C03 R05:C04 R05:C05 R05:C06 R05:C07 R05:C08 R05:C09 R05:C10
  R06:C00 R06:C01 R06:C02 R06:C03 R06:C04 R06:C05 R06:C06 R06:C07 R06:C08 R06:C09 R06:C10
  R07:C00 R07:C01 R07:C02 R07:C03 R07:C04 R07:C05 R07:C06 R07:C07 R07:C08 R07:C09 R07:C10
  R08:C00 R08:C01 R08:C02 R08:C03 R08:C04 R08:C05 R08:C06 R08:C07 R08:C08 R08:C09 R08:C10
  R09:C00 R09:C01 R09:C02 R09:C03 R09:C04 R09:C05 R09:C06 R09:C07 R09:C08 R09:C09 R09:C10
  R10:C00 R10:C01 R10:C02 R10:C03 R10:C04 R10:C05 R10:C06 R10:C07 R10:C08 R10:C09 R10:C10
  R11:C00 R11:C01 R11:C02 R11:C03 R11:C04 R11:C05 R11:C06 R11:C07 R11:C08 R11:C09 R11:C10
  R12:C00 R12:C01 R12:C02 R12:C03 R12:C04 R12:C05 R12:C06 R12:C07 R12:C08 R12:C09 R12:C10
  R13:C00 R13:C01 R13:C02 R13:C03 R13:C04 R13:C05 R13:C06 R13:C07 R13:C08 R13:C09 R13:C10
  R14:C00 R14:C01 R14:C02 R14:C03 R14:C04 R14:C05 R14:C06 R14:C07 R14:C08 R14:C09 R14:C10
*/
}