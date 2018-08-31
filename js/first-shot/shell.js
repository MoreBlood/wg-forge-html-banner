/* global createjs, TweenMax, Power1, Power3, Elastic */
import shapes from '../shapes';
import { calculateDistance } from '../utils';
import { banner } from '../index';

class Shell extends createjs.Container {
  constructor() {
    super();
    this.shellCountour = new createjs.Bitmap(banner.images[shapes.shots.first.shellCountour]);
    this.shellFill = new createjs.Bitmap(banner.images[shapes.shots.first.shellFill]);
    this.directionPointer = new createjs.Bitmap(banner.images[shapes.shots.first.directionPointer]);
    this.pointer = new createjs.Bitmap(banner.images[shapes.shots.first.pointer]);


    this.shellFill.scaleX = 0;
    this.shellFill.scaleY = 0;
    this.shellFill.alpha = 0;
    this.shellFill.y = 200;

    // setup shell positioning point in it's center
    const shellFillBounds = this.shellFill.getBounds();
    this.shellFill.regX = (shellFillBounds.width / 2);
    this.shellFill.regY = (shellFillBounds.height / 2);

    // setup rotation point
    this.directionPointer.y = 200;
    const directionPointerBounds = this.directionPointer.getBounds();
    const ROTATION_RADIUS = 50;
    this.directionPointer.regX = directionPointerBounds.width / 2;
    this.directionPointer.regY = directionPointerBounds.height + ROTATION_RADIUS;
    this.directionPointer.shadow = new createjs.Shadow('#a2ff00', 0, 0, 5);


    // setup countor and its tweened shadow
    this.shellCountour.y = -17;
    const shadow = new createjs.Shadow('rgba(255, 0, 0, 1)', 0, 0, 15);
    this.shellCountour.shadow = shadow;
    TweenMax.to(shadow, 1.5, { color: 'rgba(255, 0, 0, 0.0)', repeat: -1, yoyo: true, ease: Power3.easeInOut });
    TweenMax.to(this.shellCountour, 1.5, { alpha: 0.5, repeat: -1, yoyo: true, ease: Power3.easeInOut });

    this.pointer.x = -25;
    this.pointer.y = -10;
    this.pointer.alpha = 0;

    this.showCursor();

    TweenMax.to(this.pointer, 1.5, { x: -90, repeat: -1, yoyo: true, ease: Power3.easeInOut });

    this.isFilled = false;

    let eventListners = [];
    const eventTypes = ['stagemousemove', 'mouseenter', 'mouseover', 'mouseleave'];


    this.filled = () => new Promise((resolve) => {
      eventListners.forEach((listener, i) => {
        this.stage.removeEventListener(eventTypes[i], listener);
      });

      eventListners = [];

      eventListners.push(this.stage.on('stagemousemove', (e) => {
        if (this.isFilled) { return; }

        const fixed = this.globalToLocal(e.stageX, e.stageY);
        const targetPosition = {
          x: this.shellCountour.x + (this.shellCountour.getBounds().width / 2),
          y: this.shellCountour.y + (this.shellCountour.getBounds().height),
        };
        const angle = (Math.atan2(targetPosition.y - fixed.y, targetPosition.x - fixed.x) * (180 / Math.PI)) + 90;
        const distance = calculateDistance(this.shellCountour.x, this.shellCountour.y + 50, fixed.x, fixed.y);
        const calculateAlpha = Math.min(distance / 200, 1);

        if (distance < 30) {
          this.getCloseToTarget();
          resolve();
          return;
        }

        TweenMax.to(this.shellFill, 0.5, { x: fixed.x, y: fixed.y });
        TweenMax.to(this.directionPointer, 0.5, { x: fixed.x, y: fixed.y, alpha: calculateAlpha, scaleX: calculateAlpha, scaleY: calculateAlpha, rotation: angle });
      }));

      eventListners.push(this.stage.on('mouseenter', () => this.showShell()));
      eventListners.push(this.stage.on('mouseover', () => this.showShell()));
      eventListners.push(this.stage.on('mouseleave', () => this.hideShell()));
    });

    this.addChild(this.shellFill);
    this.addChild(this.shellCountour);
    this.addChild(this.pointer);
    this.addChild(this.directionPointer);
  }

  hideShell() {
    this.shellFill.shadow = null;
    if (this.isFilled) { return; }
    TweenMax.to(this.shellFill, 0.3, { scaleX: 0.5, scaleY: 0.5, alpha: 0, ease: Power3.easeIn });
    TweenMax.to(this.directionPointer, 0.3, { scaleX: 0.5, scaleY: 0.5, alpha: 0, ease: Power3.easeIn, delay: 0.01 });
  }

  showShell() {
    this.shellFill.shadow = new createjs.Shadow('#a2ff00', 0, 0, 5);
    TweenMax.to(this.shellFill, 1, { scaleX: 1, scaleY: 1, alpha: 1, ease: Elastic.easeOut });
  }

  hideCursor() {
    TweenMax.to(this.pointer, 0.2, { alpha: 0, ease: Power1.easeInOut });
  }

  showCursor() {
    TweenMax.to(this.pointer, 0.5, { alpha: 1, ease: Power1.easeInOut });
  }

  getCloseToTarget() {
    this.isFilled = true;
    TweenMax.killTweensOf(this.shellFill, { x: true, y: true });
    TweenMax.to(this.shellFill, 0.5, { x: 11, y: 37, alpha: 1, scaleX: 1, scaleY: 1 });
    TweenMax.to(this.shellCountour, 0.5, { alpha: 0 });
    TweenMax.to(this.directionPointer, 0.5, { alpha: 0 });
  }

  restart() {
    this.pointer.alpha = 1;
    this.isFilled = false;
    this.shellCountour.alpha = 1;
    this.shellFill.y = 200;
  }
}

export { Shell as default };
