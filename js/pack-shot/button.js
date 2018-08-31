/* global createjs, TweenMax, Bounce, Elastic, Button, drawButton */
import shapes from '../shapes';
import { banner } from '../index';

class ButtonPlay extends createjs.Container {
  constructor() {
    super();
    this.button = Button;
    this.button.pic = banner.images[shapes.shots.pack.playButton];
    this.button.x = 168;
    this.button.y = 249;
  }

  static showButton() {
    window.showButton();
  }

  static hideButton() {
    window.hideButton();
  }

  isVisible() {
    super.isVisible();
    return true;
  }

  draw(ctx) {
    super.draw(ctx);
    drawButton(ctx);
  }
}

export { ButtonPlay as default };
