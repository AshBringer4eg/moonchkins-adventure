// ^_^ Don't blame me, here I was upset and those arrows makes me happy ^_^
export enum Direction {
  TOP_LEFT = '⇖',
  TOP = '⇑',
  TOP_RIGHT = '⇗',
  RIGHT = '⇒',
  BOTTOM_RIGHT = '⇘',
  BOTTOM = '⇓',
  BOTTOM_LEFT = '⇙',
  LEFT = '⇐',
  CENTER = '↺',
  NONE = ''
}

export enum CompassMainAxis {
  NORTH = Direction.TOP,
  EAST = Direction.RIGHT,
  SOUTH = Direction.BOTTOM,
  WEST = Direction.LEFT,
}

export enum CompassDiagonalAxis {
  NORTH_EAST = Direction.TOP_RIGHT,
  SOUTH_EAST = Direction.BOTTOM_RIGHT,
  SOUTH_WEST = Direction.BOTTOM_LEFT,
  NORTH_WEST = Direction.TOP_LEFT
}

export type CompassRose = CompassMainAxis | CompassDiagonalAxis;

export class Compass {
  static getOppositDirectionMain(direction: CompassMainAxis) {
    switch (direction) {
      case CompassMainAxis.NORTH:
        return CompassMainAxis.SOUTH;
      case CompassMainAxis.EAST:
        return CompassMainAxis.WEST;
      case CompassMainAxis.SOUTH:
        return CompassMainAxis.NORTH;
      case CompassMainAxis.WEST:
        return CompassMainAxis.EAST;
    }
  }
  static getOppositDirectionDiagonal(direction: CompassDiagonalAxis) {
    switch (direction) {
      case CompassDiagonalAxis.NORTH_EAST:
        return CompassDiagonalAxis.SOUTH_WEST;
      case CompassDiagonalAxis.SOUTH_EAST:
        return CompassDiagonalAxis.NORTH_WEST;
      case CompassDiagonalAxis.SOUTH_WEST:
        return CompassDiagonalAxis.NORTH_EAST;
      case CompassDiagonalAxis.NORTH_WEST:
        return CompassDiagonalAxis.SOUTH_EAST;
    }
  }
}
