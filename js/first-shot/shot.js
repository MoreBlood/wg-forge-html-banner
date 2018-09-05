/* global createjs, TimelineMax, TweenMax */

import TankT34 from '../first-shot/tank_t34';
import shapes from '../shapes';
import Smoke from '../first-shot/smoke';
import Explosion from '../first-shot/explosion';
import Firework from '../first-shot/fireworks/scene';
import { random } from '../utils';
import { banner, fireworks } from '../index';

class MainShot extends createjs.Container {
  constructor() {
    super();
    this.timeline = new TimelineMax({ loop: true, yoyo: true });
    this.background = new createjs.Bitmap(shapes.shots.first.backgroud);
    this.background.x = -120;
    this.background.y = -120;
    this.addChild(this.background);

    this.fireworksCanvas = new createjs.Bitmap(fireworks.canvas);
    this.fireworksCanvas.x = 120;
    this.fireworksCanvas.y = -120;
    this.addChild(this.fireworksCanvas);


    this.blacked = new createjs.Shape();
    this.blacked.graphics.beginFill('black').drawRect(-300, -300, 1000, 1000);
    this.blacked.alpha = 1;

    this.setupScene();
    this.setupExplosion();

    this.addChild(this.blacked);
    // this.toPackShot();
    // setInterval(() => this.shoot(), 2000);
  }

  show() {
    TweenMax.to(this.blacked, 1, { alpha: 0 });
  }

  hide() {
    return TweenMax.to(this.blacked, 1, { alpha: 1 });
  }
  
  draw(ctx) { 
    super.draw(ctx);
  }

  setupScene() {
    this.hill = new createjs.Bitmap(banner.images[shapes.shots.first.hill]);
    this.hillLight = new createjs.Bitmap(banner.images[shapes.shots.first.explosion.hillLight]);
    this.treeLeft = new createjs.Bitmap(banner.images[shapes.shots.first.treeLeft]);
    this.treeRight = new createjs.Bitmap(banner.images[shapes.shots.first.treeRight]);


    this.firework = fireworks.fireworks;
    // this.addChild(this.firework);

    // bg big smoke
    const smoke0 = new Smoke(0.2);
    smoke0.y = 170;
    smoke0.x = 300;
    smoke0.scaleX = 2.5;
    smoke0.scaleY = 2.5;
    smoke0.alpha = 1;
    this.addChild(smoke0);

    const smoke01 = new Smoke(0.2);
    smoke01.y = 200;
    smoke01.x = 450;
    smoke01.scaleX = 2.5;
    smoke01.scaleY = 2.5;
    smoke01.alpha = 0.5;
    this.addChild(smoke01);

    // setup tank
    this.tank = new TankT34();
    this.addChild(this.tank);
    this.tank.y = 100;
    this.tank.rotation = -0.1;

    const tankTween = TweenMax.to(this.tank, 1, { x: this.tank.x + 30, y: this.tank.y + 6, rotation: 0.1, scale: 0.96, ease: Power1.easeInOut });

    this.tank.timeline.add(tankTween);

    // smokes at foreground
    const smoke = new Smoke(0.5);
    smoke.y = 210;
    smoke.x = 190;
    this.addChild(smoke);

    const smoke3 = new Smoke(0.2);
    smoke3.y = 210;
    smoke3.x = 300;
    smoke3.scaleX = 2;
    smoke3.scaleY = 2;
    smoke3.alpha = 0.5;
    this.addChild(smoke3);

    const smoke2 = new Smoke(0.4);
    smoke2.y = 210;
    smoke2.x = 230;
    smoke2.scaleX = -0.5;
    smoke2.scaleY = 0.5;
    this.addChild(smoke2);

    // hill and trees and
    this.addChild(this.hill);
    this.hill.y = 140;
    this.hill.x = -100;

    this.addChild(this.hillLight);
    this.hillLight.y = 144;
    this.hillLight.x = 4;
    this.hillLight.alpha = 0;
    this.hillLight.compositeOperation = 'screen';

    this.addChild(this.treeLeft);
    this.treeLeft.y = 250;

    this.addChild(this.treeRight);
    this.treeRight.y = 230;
    this.treeRight.x = 100;
  }

  setupExplosion() {
    this.explosion = new Explosion();
    this.explosion.x = 245;
    this.explosion.y = -8;
    this.tank.addChild(this.explosion);
  }

  expodeFireworks(number) {
    for (let i = 0; i < number; i += 1) {
      TweenMax.delayedCall((300 + (i * 500) + random(0, 250)) / 1000, () => {
        const hue = random(0, 360);
        this.firework.createFirework(
          random(100, 150),
          random(200, 300),
          random(150, 300),
          random(50, 150),
          hue);
        this.tank.blink(hue);
      });
    }
  }

  restart() {
    console.log('restart');
    this.blacked.alpha = 1;

    banner.packShot.hide();
    this.hide()
      .eventCallback('onComplete', () => {
        this.x += 170;
        this.y -= 100;
        this.show();
        banner.restart();
      });
    this.tank.startAnimation();
  }

  shoot() {
    this.tank.stopAnimation();

    const play = () => {
      this.explosion.shoot();
      this.tank.animateGun();

      const hillLightTimeline = new TimelineMax();

      hillLightTimeline
        .to(this.hillLight, 0.2, { alpha: 1 })
        .to(this.hillLight, 0.2, { alpha: 0 })
        .call(() => this.expodeFireworks(9));

      this.tank.blink(0);

      const tankShakeTimeline = new TimelineMax();

      tankShakeTimeline
        .to(this.tank, 0.1, { x: this.tank.x -= 1, y: this.tank.y += 1 })
        .to(this.tank, 0.1, { x: this.tank.x += 1, y: this.tank.y -= 1 });
    };

    const sceneTimeline = new TimelineMax();

    sceneTimeline
      .to(this, 0.5, { x: this.x - 34, y: this.y + 20 })
      .call(() => play(), null, this, 0.5)
      .to(this, 0.1, { y: this.y + 30, ease: Power1.easeInOut })
      .to(this, 0.1, { y: this.y + 20, ease: Power2.easeInOut })
      .to(this, 2, { x: this.x - 170, y: this.y + 100, ease: Power2.easeInOut })
      .addPause('+=4', () => banner.toPackShot());

    TweenMax.delayedCall(18, () => this.restart());
  }
}


export { MainShot as default };
