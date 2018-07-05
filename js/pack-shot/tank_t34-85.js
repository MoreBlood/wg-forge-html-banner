/* globals createjs, TimelineMax */
import shapes from '../shapes';
import TracksPackShot from './tracks';
import banner from '../index';


class TankT3485 extends createjs.Container {
  constructor() {
    super();

    this.timeline = new TimelineMax();

    this.setupTank();
    this.setupTankLight();
    this.setupMovingParts();
  }

  setupMovingParts() {
    this.rightTrack = new TracksPackShot();

    const maskRight = new createjs.Shape();
    this.trigger = new createjs.Shape();

    maskRight.graphics.beginFill('#000000').drawRect(120, 123, 40, 100);
    this.rightTrack.mask = maskRight;

    this.rightTrack.x = 130;
    this.rightTrack.y = 130;

    this.leftTrack = new TracksPackShot();

    const maskLeft = new createjs.Shape();
    this.trigger = new createjs.Shape();

    maskLeft.graphics.beginFill('#000000').drawRect(-10, 128, 40, 100);
    this.leftTrack.mask = maskLeft;

    this.leftTrack.x = 10;
    this.leftTrack.y = 130;
    this.leftTrack.scaleY = 0.8;
    this.leftTrack.scaleX = 0.75;
    this.addChild(this.rightTrack);
    this.addChild(this.leftTrack);
  }

  stopAnimation() {
    this.timeline.paused = true;
    this.leftTrack.stop();
    this.rightTrack.stop();
  }

  setupTank() {
    this.tank = new createjs.Bitmap(banner.images[shapes.shots.pack.tank]);
    this.addChild(this.tank);
  }

  setupTankLight() {
    this.tankLight = new createjs.Bitmap(banner.images[shapes.shots.pack.tankLight]);
    this.tankLight.x = 90;
    this.tankLight.alpha = 0.75;
    this.tankLight.compositeOperation = 'lighten';
    this.addChild(this.tankLight);
  }

  blink(hue) {
    const matrix = new createjs.ColorMatrix().adjustHue(hue % 180);
    this.tankLight.filters = [
      new createjs.ColorMatrixFilter(matrix),
    ];
    this.tankLight.cache(0, 0, 262, 202);

    const blinkTimeline = new TimelineMax();

    blinkTimeline
      .to(this.tankLight, 0.1, { alpha: 0.5 })
      .to(this.tankLight, 0.3, { alpha: 0 });
  }
}


export { TankT3485 as default };
