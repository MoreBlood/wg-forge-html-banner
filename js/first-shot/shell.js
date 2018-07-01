/* global createjs */
import shapes from '../shapes';

class Shell extends createjs.Container {
  constructor() {
    super();
    const shellCountour = new createjs.Bitmap(shapes.shots.first.shellCountour);
    const shellFill = new createjs.Bitmap(shapes.shots.first.shellFill);

    const mask = new createjs.Shape();
    const trigger = new createjs.Shape();

    mask.graphics.beginFill('#000000').drawRect(0, 90, 100, 100);
    trigger.graphics.beginFill('#000000').drawRect(0, 0, 50, 100);
    trigger.alpha = 0.01;

    shellFill.mask = mask;

    let isFilled = false;

    const fillAnimation = createjs.Tween.get(mask, { paused: true })
      .to({ y: -90 }, 2000);

    let timeout;

    this.filled = new Promise((resolve) => {
      trigger.on('mouseover', () => {
        if (isFilled) { return; }
        fillAnimation.gotoAndPlay(fillAnimation.position);
        fillAnimation.reversed = false;

        clearTimeout(timeout);
        timeout = setTimeout(() => {
          resolve();
          isFilled = true;
          fillAnimation.gotoAndPlay(fillAnimation.duration);
        }, 2000);
      });
    });

    trigger.on('mouseout', () => {
      clearTimeout(timeout);
      if (isFilled) { return; }
      fillAnimation.gotoAndPlay(fillAnimation.duration - fillAnimation.position);
      fillAnimation.reversed = true;
    });

    this.addChild(shellFill);
    this.addChild(trigger);
    this.addChild(shellCountour);
  }
}

export { Shell as default };
