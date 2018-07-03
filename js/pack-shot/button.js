/* global createjs */
import shapes from '../shapes';

class Button extends createjs.Container {
  constructor() {
    super();
    this.button = new createjs.Bitmap(shapes.shots.pack.button);
    const trigger = new createjs.Shape();

    trigger.graphics.beginFill('#000000').drawRect(0, 0, 146, 40);
    trigger.alpha = 0.01;
    trigger.regX = 73;
    trigger.regY = 20;

    this.button.regX = 73;
    this.button.regY = 20;

    this.button.alpha = 0;
    this.button.scale = 1.5;

    this.addChild(this.button);
    this.addChild(trigger);

    this.showButton = createjs.Tween.get(this.button, { paused: true })
      .to({ alpha: 1, scale: 1 }, 1000, createjs.Ease.bounceOut);

    trigger.on('mouseover', () => {
      this.onMouseOver();
    });

    trigger.on('mouseout', () => {
      this.onMouseOut();
    });
  }

  onMouseOver() {
    createjs.Tween.get(this.button)
      .to({ alpha: 1, scale: 1.2 }, 1000, createjs.Ease.elasticOut);
  }
  onMouseOut() {
    createjs.Tween.get(this.button)
      .to({ alpha: 1, scale: 1 }, 1000, createjs.Ease.elasticOut);
  }
}

export { Button as default };
