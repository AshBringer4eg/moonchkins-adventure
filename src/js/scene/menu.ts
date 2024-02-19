import Phaser from 'phaser';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: MenuScene.name, active: false, visible: false });
  }

  create() {
    console.log(`${MenuScene.name} Scene`);
  }
}