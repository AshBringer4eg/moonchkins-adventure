import Health from ".";
import Actor from "../../type/interface/object/actor";

export default class Player implements Actor {
  public health: Health;

  constructor(customEventEmitter: Phaser.Events.EventEmitter){
    this.health = new Health(customEventEmitter, this);
  }

  loseHealth() {
    this.health.loseHealth();
  }
}