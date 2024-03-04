import { ACTOR_EVENT, HEALTH_EVENT } from "../../type/event/event";
import Actor from "../../type/interface/object/actor";

export default class Health {
  private eventEmitter: Phaser.Events.EventEmitter;
  private currentHealth: number;
  private actor: Actor;
  private maxHealth: number;

  constructor(customEventEmitter: Phaser.Events.EventEmitter, actor: Actor) {
    this.currentHealth = 6;
    this.maxHealth = 6;
    this.eventEmitter = customEventEmitter;
    this.actor = actor;
  }

  getCurrentHealth(): number {
    return this.currentHealth;
  }

  getMaxHealth(): number {
    return this.maxHealth;
  }

  loseHealth(): void {
    if (this.currentHealth === 0) {
      this.eventEmitter.emit(ACTOR_EVENT.DIE, this.actor);
      return;
    }

    this.currentHealth -= 1;
    // emit event with health now and previous health value
    this.eventEmitter.emit(HEALTH_EVENT.LOSE_HEALTH, this.currentHealth, this.currentHealth + 1);
  }
}