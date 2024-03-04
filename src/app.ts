import './scss/main.scss';
import "@total-typescript/ts-reset";

import GameScene from './js/scene/test';
import LoaderScene from './js/scene/loader';
import MenuScene from './js/scene/menu';
import { config } from './config/config';
import DialogScene from './js/scene/popup/big-dialog';

const gameConfig = {
  type: Phaser.AUTO,
  width: config.width,
  height: config.height,
  scale: {
    mode: Phaser.Scale.RESIZE,
    // autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  render: {
    pixelArt: false,
    antialias: true,
    antialiasGL: true,
  },
  physics: {
    default: 'arcade',
    arcade: { debug: true },
  },
  loader: {
    crossOrigin: 'anonymous',
  },
  scene: [
    LoaderScene,
    MenuScene,
    GameScene,
    DialogScene,
  ],
};

window.addEventListener('load', () => {
  const game = new Phaser.Game(gameConfig);
  game.scene.start(LoaderScene.name);
});
