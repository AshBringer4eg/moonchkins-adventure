import { Config } from './config.js';
export declare global {
  var game: Phaser.Game
  namespace globalThis {
    var config: Config;
  }
}
