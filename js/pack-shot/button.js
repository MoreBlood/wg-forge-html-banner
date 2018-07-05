/* global createjs, TweenMax */
import shapes from '../shapes';
import banner from '../index';

class Button extends createjs.Container {
  constructor() {
    super();
    this.button = new createjs.Bitmap(banner.images[shapes.shots.pack.button]);
    const trigger = new createjs.Shape();
    trigger.cursor = 'pointer';

    trigger.graphics.beginFill('#000000').drawRect(0, 0, 146, 40);
    trigger.alpha = 0.01;
    trigger.regX = 73;
    trigger.regY = 20;

    this.button.regX = 73;
    this.button.regY = 20;

    this.button.alpha = 0;
    this.button.scaleX = 1.5;
    this.button.scaleY = 1.5;

    this.addChild(this.button);
    this.addChild(trigger);

    this.showButton = TweenMax.to(this.button, 1, { paused: false, alpha: 1, scaleX: 1, scaleY: 1, delay: 0.5, ease: Bounce.easeOut, });

    trigger.on('mouseover', () => {
      this.onMouseOver();
    });

    trigger.on('mouseout', () => {
      this.onMouseOut();
    });
  }

  onMouseOver() {
    TweenMax.to(this.button, 1, { alpha: 1, scaleX: 1.2, scaleY: 1.2, ease: Elastic.easeOut });
  }
  onMouseOut() {
    TweenMax.to(this.button, 1, { alpha: 1, scaleX: 1, scaleY: 1, ease: Elastic.easeOut });
  }
}

export { Button as default };
