/* globals createjs */
import shapes from '../shapes';
import Smoke from '../first-shot/smoke';
import MovingParts from '../first-shot/moving_parts';

class TankT34 extends createjs.Container {
  constructor() {
    super();

    this.timeline = new createjs.Timeline({ loop: true, bounce: true });

    this.setupTank();
    this.setupTankLight();
    this.setupMovingParts();
    this.setupSmokesFromTurbines();
  }

  setupMovingParts() {
    this.movingTankParts = new MovingParts();

    this.movingTankParts.skewX = 5;
    this.movingTankParts.skewY = 4.55;
    this.movingTankParts.scaleY = 1.05;
    this.movingTankParts.scaleX = 0.91;
    this.movingTankParts.x = 80;
    this.movingTankParts.y = 66;

    this.addChild(this.movingTankParts);
    this.timeline.addTween(...this.movingTankParts.tracksRotatingTimeline.tweens);
  }

  stopAnimation() {
    this.timeline.paused = true;
    this.movingTankParts.pause();
  }

  startAnimation() {
    this.timeline.paused = false;
    this.timeline.gotoAndPlay(0);
    this.movingTankParts.start();
  }

  setupTank() {
    this.gun = new createjs.Bitmap(shapes.shots.first.tankGun);
    this.gun.x = 201;
    this.gun.y = 8;
    this.addChild(this.gun);
    this.tank = new createjs.Bitmap(shapes.shots.first.tank);
    this.addChild(this.tank);
  }

  setupTankLight() {
    this.tankLight = new createjs.Bitmap(shapes.shots.first.tankLight);
    this.tankLight.x = 10;
    this.tankLight.alpha = 0;
    this.addChild(this.tankLight);
  }

  blink(hue) {
    const matrix = new createjs.ColorMatrix().adjustHue(hue);
    this.tankLight.filters = [
      new createjs.ColorMatrixFilter(matrix),
    ];
    this.tankLight.cache(0, 0, 262, 102);

    createjs.Tween.get(this.tankLight)
      .to({ alpha: 0.5 }, 100)
      .to({ alpha: 0 }, 300);
  }

  animateGun() {
    createjs.Tween.get(this.gun, { loop: 1, bounce: true })
      .to({ x: this.gun.x - 6, y: this.gun.y + 3 }, 100);
  }

  setupSmokesFromTurbines() {
    this.smokeFromTurbineRight = new Smoke(2, true);
    this.smokeFromTurbineRight.y = 35;
    this.smokeFromTurbineRight.x = 55;
    this.smokeFromTurbineRight.rotation = -55;
    this.smokeFromTurbineRight.scale = 0.8;

    this.addChild(this.smokeFromTurbineRight);

    this.smokeFromTurbineLeft = new Smoke(3, true);
    this.smokeFromTurbineLeft.y = 35;
    this.smokeFromTurbineLeft.x = 37;
    this.smokeFromTurbineLeft.rotation = -55;
    this.smokeFromTurbineLeft.scale = 0.6;

    this.addChild(this.smokeFromTurbineLeft);
  }
}


export { TankT34 as default };
