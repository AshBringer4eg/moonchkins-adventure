import { Door } from ".";
import { Color } from "../../../type/enums/entity";

export const addHoverHandler = (door: Door) => {
  door.getInteractiveControll().on('pointerover', () => {
    if (door.room.active) door.tint(Color.GREEN);
  });

  door.getInteractiveControll().on('pointerout', () => {
    if (door.room.active) door.tint();
  });

  door.getInteractiveControll().on('pointerdown', () => {
    if (door.room.active) door.goToAdjacentRoom();
  });
};