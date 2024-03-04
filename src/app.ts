import './scss/main.scss';
import "@total-typescript/ts-reset";
import Phaser from 'phaser';

import GameScene from './js/scene/game';
import LoaderScene from './js/scene/loader';
import MenuScene from './js/scene/menu';
import { config } from './config/config';
import DialogScene from './js/scene/popup/big-dialog';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import UIScene from './js/scene/ui/ui';

const gameConfig = {
  type: Phaser.AUTO,
  width: config.width,
  height: config.height,
  scale: {
    mode: Phaser.Scale.RESIZE,
    // autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  render: {
    pixelArt: true,
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
    UIScene,
  ],
  plugins: {
    scene: [{
      key: 'rexUI',
      plugin: RexUIPlugin,
      mapping: 'rexUI',
    },
    // ...
    ],
  },
};

window.addEventListener('load', () => {
  const game = new Phaser.Game(gameConfig);
  game.scene.start(LoaderScene.name);
});
