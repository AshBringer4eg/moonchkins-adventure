export type PositionOnGrid = {
  row: number,
  col: number,
};

export type PositionCoordinates = {
  x: number,
  y: number
};

export type RoomPosition = PositionOnGrid & PositionCoordinates;
