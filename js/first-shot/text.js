/* global createjs, TweenMax, Bounce, Elastic, newTextPlate, stringFrame, drawButton */

class ChargeText extends createjs.Container {
  constructor() {
    super();
    this.textPlate = new newTextPlate();
    this.textPlate.frame1 = new stringFrame(this.textPlate, window.textFrame2, `bold 16pt ${window.font}`, 24);
    this.textPlate.textAlign = 'right';
    this.textPlate.scale = 1.3;
    this.textPlate.x = 180;
    this.textPlate.y = 30;
    this.showText();
  }

  showText() {
    this.textPlate.set(this.textPlate.frame1);
  }

  isVisible() {
    super.isVisible();
    return true;
  }

  draw(ctx) {
    super.draw(ctx);
    this.textPlate.draw(ctx);
  }
}

export { ChargeText as default };
