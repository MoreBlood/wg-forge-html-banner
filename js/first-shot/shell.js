/* global createjs, TweenMax */
import shapes from '../shapes';
import banner from '../index';

class Shell extends createjs.Container {
  constructor() {
    super();
    const shellCountour = new createjs.Bitmap(banner.images[shapes.shots.first.shellCountour]);
    const shellFill = new createjs.Bitmap(banner.images[shapes.shots.first.shellFill]);
    this.pointer = new createjs.Bitmap(banner.images[shapes.shots.first.pointer]);

    this.pointer.x = -25;
    this.pointer.y = -10;
    this.pointer.alpha = 0;

    this.showCursor();

    TweenMax.to(this.pointer, 1.5, { x: -90, repeat: -1, yoyo: true, ease: Power3.easeInOut });

    const mask = new createjs.Shape();
    this.trigger = new createjs.Shape();

    mask.graphics.beginFill('#000000').drawRect(0, 90, 100, 100);
    this.trigger.graphics.beginFill('#000000').drawRect(-400, 0, 450, 200);
    this.trigger.alpha = 0.01;
    this.trigger.cursor = 'pointer';

    shellFill.mask = mask;

    this.isFilled = false;

    this.fillAnimation = TweenMax.to(mask, 2, { y: -90, paused: true });

    this.filled = () => new Promise((resolve) => {
      this.trigger.removeAllEventListeners();
      this.trigger.on('mouseover', () => {
        if (this.isFilled) { return; }
        this.fillAnimation.play(this.fillAnimation.time());
        this.fillAnimation.reversed(false);

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          resolve();
          this.isFilled = true;
          this.fillAnimation.play(this.fillAnimation.duration());
        }, 2000);
      });
      this.trigger.on('mouseout', () => {
        clearTimeout(this.timeout);
        if (this.isFilled || this.fillAnimation.time() === 0) { return; }
        this.fillAnimation.reversed(true);
      });
    });

    this.addChild(shellFill);
    this.addChild(shellCountour);
    this.addChild(this.pointer);
    this.addChild(this.trigger);
  }

  hideCursor(x, y) {
    // const local = this.globalToLocal(x, y);
    TweenMax.to(this.pointer, 0.2, { alpha: 0, ease: Power1.easeInOut });
  }

  showCursor() {
    TweenMax.to(this.pointer, 0.5, { alpha: 1, ease: Power1.easeInOut });
  }

  restart() {
    this.pointer.alpha = 1;
    this.isFilled = false;
    this.fillAnimation.reversed(false);
    this.fillAnimation.time(0);
    this.fillAnimation.paused(true);
  }
}

export { Shell as default };
