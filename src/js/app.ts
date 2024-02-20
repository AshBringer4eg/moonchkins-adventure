import '../scss/main.scss';

import initializeApplicationConfiguration from './config/config';
import TestScene from './scene/test';
import LoaderScene from './scene/loader';
import MenuScene from './scene/menu';

initializeApplicationConfiguration();

const gameConfig = {
  type: Phaser.CANVAS,
  width: globalThis.config.width,
  height: globalThis.config.height,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  render: {
    pixelArt: true,
    antialias: false,
    antialiasGL: false,
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
  globalThis.game = new Phaser.Game(gameConfig);
  globalThis.game.scene.start(LoaderScene.name);
});
