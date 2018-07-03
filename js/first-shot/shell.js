/* global createjs */
import shapes from '../shapes';

class Shell extends createjs.Container {
  constructor() {
    super();
    const shellCountour = new createjs.Bitmap(shapes.shots.first.shellCountour);
    const shellFill = new createjs.Bitmap(shapes.shots.first.shellFill);
    this.pointer = new createjs.Bitmap(shapes.shots.first.pointer);

    this.pointer.x = -25;
    this.pointer.y = -10;
    this.pointer.alpha = 0;

    this.showCursor();

    createjs.Tween.get(this.pointer, { loop: true, bounce: true })
      .to({ x: -90 }, 1500, createjs.Ease.quadInOut);

    const mask = new createjs.Shape();
    this.trigger = new createjs.Shape();

    mask.graphics.beginFill('#000000').drawRect(0, 90, 100, 100);
    this.trigger.graphics.beginFill('#000000').drawRect(-400, 0, 450, 200);
    this.trigger.alpha = 0.01;
    this.trigger.cursor = 'pointer';

    shellFill.mask = mask;

    this.isFilled = false;

    this.fillAnimation = createjs.Tween.get(mask, { paused: true })
      .to({ y: -90 }, 2000);

    this.filled = () => new Promise((resolve) => {
      this.trigger.removeAllEventListeners();
      this.trigger.on('mouseover', () => {
        if (this.isFilled) { return; }
        this.fillAnimation.gotoAndPlay(this.fillAnimation.position);
        this.fillAnimation.reversed = false;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          resolve();
          this.isFilled = true;
          this.fillAnimation.gotoAndPlay(this.fillAnimation.duration);
        }, 2000);
      });
      this.trigger.on('mouseout', () => {
        clearTimeout(this.timeout);
        if (this.isFilled || this.fillAnimation.position === 0) { return; }
        this.fillAnimation.gotoAndPlay(this.fillAnimation.duration - this.fillAnimation.position);
        this.fillAnimation.reversed = true;
      });
    });

    this.addChild(shellFill);
    this.addChild(shellCountour);
    this.addChild(this.pointer);
    this.addChild(this.trigger);
  }

  hideCursor(x, y) {
    // const local = this.globalToLocal(x, y);
    createjs.Tween.get(this.pointer)
      // .to({ x: local.x, y: local.y }, 500, createjs.Ease.quadInOut)
      .to({ alpha: 0 }, 200, createjs.Ease.quadInOut);
  }

  showCursor() {
    createjs.Tween.get(this.pointer)
      .to({ alpha: 1 }, 500, createjs.Ease.quadInOut);
  }

  restart() {
    this.pointer.alpha = 1;
    this.isFilled = false;
    this.fillAnimation.reversed = false;
    this.fillAnimation.gotoAndStop(0);
  }
}

export { Shell as default };
