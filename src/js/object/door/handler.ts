import { Door } from ".";
import { Color } from "../../../type/enums/entity";

export const addHoverHandler = (door: Door) => {
  door.coverImage.on('pointerover', () => {
    door.coverImage.setTint(Color.GREEN);
  });

  door.coverImage.on('pointerout', () => {
    door.coverImage.clearTint();
  });

  door.coverImage.on('pointerdown', () => {
    door.adjacentRoom.initAsRandomRoom();
  });
  //getOppositDirection
};