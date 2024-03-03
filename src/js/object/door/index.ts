import { v4 } from "uuid";
import { PositionCoordinates } from '../../../type/interface/object/room';
import { DOOR_HEIGHT, DOOR_WIDTH, ROOM_HEIGHT, ROOM_WIDTH } from '../_const';
import Room from "../room";
import { Objects } from '../../../type/enums/image';
import { addHoverHandler } from "./handler";
import { CompassMainAxis } from "../../utility/compas";

export class Door {
  public uuid: string = v4();

  private scene: Phaser.Scene;

  // Is it have to be private?
  public coverImage: Phaser.GameObjects.Image;
  public position: PositionCoordinates;
  public room: Room;
  public adjacentRoom: Room;
  public orientation: CompassMainAxis;

  constructor(room: Room, adjacentRoom: Room, orientation: CompassMainAxis) {
    this.room = room;
    this.adjacentRoom = adjacentRoom;
    this.orientation = orientation;
    this.position = this.getDoorPlaceholderCoordinates();

    this.scene = room.level.scene;
    this.coverImage = this.prepareCoverImage(Objects.DOOR);
    addHoverHandler(this);
  }

  getInteractiveControll() {
    return this.coverImage;
  }

  getDoorPlaceholderCoordinates() : PositionCoordinates {
    const OFFSET = DOOR_HEIGHT / 10;

    const HALF_ROOM_WIDTH = Math.floor(ROOM_WIDTH / 2);
    const HALF_ROOM_HEIGHT = Math.floor(ROOM_HEIGHT / 2);
    const HALF_DOOR_WIDTH = Math.floor(DOOR_WIDTH / 2);
    const HALF_DOOR_HEIGHT = Math.floor(DOOR_HEIGHT / 2);

    switch (this.orientation) {
      case CompassMainAxis.NORTH:
        return {
          x: this.room.position.x + HALF_ROOM_WIDTH,
          y: this.room.position.y + HALF_DOOR_HEIGHT + OFFSET, // SET HERE OFFSET
        };
      case CompassMainAxis.EAST:
        return {
          x: this.room.position.x + ROOM_WIDTH - HALF_DOOR_WIDTH - OFFSET, // SET HERE OFFSET
          y: this.room.position.y + HALF_ROOM_HEIGHT,
        };
      case CompassMainAxis.SOUTH:
        return {
          x: this.room.position.x + HALF_ROOM_WIDTH ,
          y: this.room.position.y + ROOM_HEIGHT - HALF_DOOR_HEIGHT - OFFSET, // SET HERE OFFSET
        };
      case CompassMainAxis.WEST:
        return {
          x: this.room.position.x + HALF_DOOR_WIDTH + OFFSET, // SET HERE OFFSET
          y: this.room.position.y + HALF_ROOM_HEIGHT,
        };
    }
  }

  prepareCoverImage(tileName: Objects): Phaser.GameObjects.Image {
    const image = this.scene.add.image(this.position.x + Math.random(), this.position.y, tileName)
      .setDisplaySize(DOOR_WIDTH, DOOR_HEIGHT);
    switch (this.orientation) {
      case CompassMainAxis.NORTH:
        image.setRotation(0);
        break;
      case CompassMainAxis.EAST:
        image.setRotation(Math.PI / 2);
        break;
      case CompassMainAxis.SOUTH:
        image.setRotation(Math.PI);
        break;
      case CompassMainAxis.WEST:
        image.setRotation(-Math.PI / 2);
        break;
    }
    image.setOrigin(0.5);
    image.setInteractive();
    return image;
  }
}