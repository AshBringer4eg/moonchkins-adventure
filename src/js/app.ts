import '../scss/main.scss';

import TestScene from './scene/test';
import LoaderScene from './scene/loader';
import MenuScene from './scene/menu';
import { config } from '../config/config';

const gameConfig = {
  type: Phaser.AUTO,
  width: config.width,
  height: config.height,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
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
    TestScene,
  ],
};

window.addEventListener('load', () => {
  const game = new Phaser.Game(gameConfig);
  game.scene.start(LoaderScene.name);
});
