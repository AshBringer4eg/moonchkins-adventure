import { Tile } from '../../ts/enums/scene/scene';
import { RoomPosition } from '../../ts/interface/object/room';
import Level from './level';

export const DEFAULT_TILE_WIDTH = 200;
export const DEFAULT_TILE_HEIGHT = 200;

export default class Room {
  private coverImage: Phaser.GameObjects.Image;
  private level: Level;
  public position: RoomPosition;
  public width: number = DEFAULT_TILE_WIDTH;
  public height: number = DEFAULT_TILE_HEIGHT;

  constructor(level: Level, position: Pick<RoomPosition, 'row' | 'col'>){
    this.level = level;
    this.position = {
      col: position.col,
      row: position.row,
      x: position.row * DEFAULT_TILE_WIDTH,
      y: position.col * DEFAULT_TILE_HEIGHT,
    };

    // this.coverImage = this.prepareCoverImage(Tile.ROOM);
    this.coverImage = this.prepareCoverImage(Tile.ROOM_UNDISCOVERED);
  }

  initAsStartTile(): Room {
    this.coverImage = this.prepareCoverImage(Tile.ROOM);
    return this;
  }

  prepareCoverImage(tileName: Tile): Phaser.GameObjects.Image {
    return this.level.scene.add.image(this.position.x + Math.random(), this.position.y, tileName)
      .setDisplaySize(DEFAULT_TILE_WIDTH, DEFAULT_TILE_HEIGHT)
      .setOrigin(0,0);
  }
}