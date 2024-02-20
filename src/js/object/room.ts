import { Tile } from '../../ts/enums/scene/scene';
import { RoomPosition } from '../../ts/interface/object/room';
import Level from './level';

export const DEFAULT_TILE_WIDTH = 128;
export const DEFAULT_TILE_HEIGHT = 128;

export default class Room {
  private coverImage: Phaser.GameObjects.Image;
  private level: Level;
  private position: RoomPosition;

  constructor(level: Level, position: RoomPosition){
    this.level = level;
    this.position = position;

    this.coverImage = this.prepareCoverImage(Tile.ROOM_UNDISCOVERED);
  }

  initAsStartTile(){
    this.coverImage = this.prepareCoverImage(Tile.ROOM_START);
  }

  prepareCoverImage(tileName: Tile): Phaser.GameObjects.Image {
    return this.level.scene.add.image(this.position.row * DEFAULT_TILE_WIDTH, this.position.col * DEFAULT_TILE_HEIGHT, tileName)
      .setDisplaySize(DEFAULT_TILE_WIDTH, DEFAULT_TILE_HEIGHT)
      .setOrigin(0,0);
  }
}