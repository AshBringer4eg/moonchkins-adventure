import { v4 } from 'uuid';
import { Tile } from '../../type/enums/image';
import { PositionOnGrid, RoomPosition } from '../../type/interface/object/room';
import { ROOM_HEIGHT, ROOM_WIDTH } from './_const';
import { Door } from './door';
import Level from './level';
import { Compass, CompassMainAxis } from '../utility/compas';
import { config } from '../../config/config';
import { Color } from '../../type/enums/entity';
import { objectKeys } from '../utility/utils';

const doorsPlaces = [CompassMainAxis.NORTH, CompassMainAxis.EAST, CompassMainAxis.SOUTH, CompassMainAxis.WEST] as const;

export default class Room {
  public uuid: string = v4();

  #active: boolean = false;

  private coverImage: Phaser.GameObjects.Image;
  private debugName: Phaser.GameObjects.Text | undefined;

  public discovered: boolean = false;
  public level: Level;
  public position: RoomPosition;
  public width: number = ROOM_WIDTH;
  public height: number = ROOM_HEIGHT;

  public doors: Record<CompassMainAxis, Door | undefined> = {
    [CompassMainAxis.NORTH]: undefined,
    [CompassMainAxis.EAST]: undefined,
    [CompassMainAxis.SOUTH]: undefined,
    [CompassMainAxis.WEST]: undefined,
  };

  constructor(level: Level, position: PositionOnGrid) {
    this.level = level;
    this.position = {
      col: position.col,
      row: position.row,
      x: position.row * ROOM_WIDTH,
      y: position.col * ROOM_HEIGHT,
    };

    this.coverImage = this.prepareCoverImage(Tile.ROOM_UNDISCOVERED);

    if (config.debug){
      this.debugName = this.level.scene.add.text(this.position.x, this.position.y, `R${this.position.row}:C${this.position.col}:D=${this.discovered}`);
      this.level.scene.add.text(this.position.x, this.position.y + 30, `${this.uuid.slice(-5)}`);
    }
  }

  set active(value: boolean) {
    this.#active = value;
    if (value) {
      this.tint();
    } else {
      this.tint(Color.BLACK);
    }
  }

  /*
    GETTERS & SETTER
  */
  get active() {
    return this.#active;
  }

  /*
    ACTION METHODS
  */

  enterRoom(previousRoom: Room) {
    previousRoom.active = false;
    this.active = true;
    if (!this.discovered) this.initAsRandomRoom();
  }

  /*
    INITIALIZATION
  */
  init() {
    this.discovered = true;
  }

  initAsStartRoom(): Room {
    this.init();

    this.active = true;
    this.coverImage = this.prepareCoverImage(Tile.ROOM);
    doorsPlaces.forEach(direction => {
      const adjacentRoom = this.getNeighbourRoom(direction);
      if (adjacentRoom) {
        this.doors[direction] = new Door(this, adjacentRoom, direction);
      }
    });

    return this;
  }

  initAsRandomRoom(): Room {
    if (this.discovered) return this;
    this.init();

    // Generate tile and floor
    this.coverImage = this.prepareCoverImage(Tile.ROOM);

    // Generate other doors
    doorsPlaces.forEach(direction => {
      // We don't need to do something with already created door, to protect entrance and doors to already uncovered rooms
      if (this.doors[direction]) return;
      const adjacentRoom = this.getNeighbourRoom(direction);
      if (!adjacentRoom) return; // We don't need doors to nowhere, there is dark and cold place :'(
      // if (Math.random() > 0) { // Try to generate random door
      if (adjacentRoom.discovered) {  // Generate door if we have discovered room on the other side
        if (adjacentRoom.doors[Compass.getOppositDirectionMain(direction)]) { // and on the other side we have a door
          this.doors[direction] = new Door(this, adjacentRoom, direction);
        }
      }  else if (Math.random() > 0.3) { // Try to generate random door
        this.doors[direction] = new Door(this, adjacentRoom, direction);
      }
    });

    return this;
  }

  /*
    SERVICE METHODS
  */

  tint(color?: Color) {
    if (!color) {
      this.coverImage.clearTint();
    } else {
      this.coverImage.setTint(color);
    }
    for (const key of objectKeys(this.doors)) {
      const door = this.doors[key];
      if (door) door.tint(color);
    }
  }

  prepareCoverImage(tileName: Tile): Phaser.GameObjects.Image {
    return this.level.scene.add.image(this.position.x + Math.random(), this.position.y, tileName)
      .setDisplaySize(ROOM_WIDTH, ROOM_HEIGHT)
      .setOrigin(0,0);
  }

  getNeighbourRoom(direction: CompassMainAxis) : Room | undefined {
    switch (direction) {
      case CompassMainAxis.NORTH:
        return this.level.getRoom({
          row: this.position.row,
          col: this.position.col - 1,
        });
      case CompassMainAxis.EAST:
        return this.level.getRoom({
          row: this.position.row + 1,
          col: this.position.col,
        });
      case CompassMainAxis.SOUTH:
        return this.level.getRoom({
          row: this.position.row,
          col: this.position.col + 1,
        });
      case CompassMainAxis.WEST:
        return this.level.getRoom({
          row: this.position.row - 1,
          col: this.position.col,
        });
    }
  }
}