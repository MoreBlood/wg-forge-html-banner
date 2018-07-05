/* global createjs, TimelineMax, TweenMax */

import TankT3485 from '../pack-shot/tank_t34-85';
import shapes from '../shapes';
import Smoke from '../first-shot/smoke';
import Firework from '../first-shot/fireworks';
import { random } from '../utils';
import Button from '../pack-shot/button';
import banner from '../index';

class PackShot extends createjs.Container {
  constructor() {
    super();
    this.timeline = new TimelineMax({ loop: true, bounce: true });

    this.setupScene();
    this.setupButton();
    this.setupText();
    this.addBlacked();
    this.expodeFireworks(15);
    // setInterval(() => this.shoot(), 2000);
  }

  addBlacked() {
    this.blacked = new createjs.Shape();
    this.blacked.graphics.beginFill('black').drawRect(-300, -300, 1000, 1000);
    this.blacked.alpha = 0;
    this.addChild(this.blacked);
  }

  hide() {
    return TweenMax.to(this.blacked, 1, { alpha: 1,
      onComplete: () => {
        this.alpha = 0;
      } });
  }

  setupScene() {
    this.hill = new createjs.Bitmap(banner.images[shapes.shots.first.hill]);
    this.treeLeft = new createjs.Bitmap(banner.images[shapes.shots.first.treeLeft]);
    this.treeRight = new createjs.Bitmap(banner.images[shapes.shots.first.treeRight]);


    this.firework = new Firework();
    this.addChild(this.firework);

    // bg big smoke
    const smoke0 = new Smoke(0.2);
    smoke0.y = 250;
    smoke0.x = 300;
    smoke0.scaleX = 2.5;
    smoke0.scaleY = 2.5;
    smoke0.alpha = 1;
    this.addChild(smoke0);

    // setup tank
    this.tank = new TankT3485();
    this.addChild(this.tank);
    this.tank.y = 75;
    this.tank.x = 90;
    this.tank.scale = 0.9;
    this.tank.rotation = -0.5;

    const tankTween = TweenMax.to(this.tank, 2, { y: this.tank.y - 25, x: this.tank.x - 55, scale: 1, delay: 1, onComplete: () => this.tank.stopAnimation(), ease: Power1.easeInOut });
    this.tank.timeline.add(tankTween, 0);

    // smokes at foreground
    const smoke = new Smoke(0.5);
    smoke.y = 220;
    smoke.x = 230;
    smoke.scale = 1.3;
    this.addChild(smoke);

    const smoke3 = new Smoke(0.2);
    smoke3.y = 250;
    smoke3.x = 330;
    smoke3.scaleX = 2;
    smoke3.scaleY = 2;
    smoke3.alpha = 0.5;
    this.addChild(smoke3);

    // hill and trees and
    this.addChild(this.hill);
    this.hill.y = 150;
    this.hill.x = -100;

    this.addChild(this.treeLeft);
    this.treeLeft.y = 250;

    this.addChild(this.treeRight);
    this.treeRight.y = 230;
    this.treeRight.x = 100;
  }

  expodeFireworks(number) {
    for (let i = 0; i < number; i += 1) {
      setTimeout(() => {
        const hue = random(0, 360);
        this.firework.shoot(
          random(160, 170),
          random(170, 180),
          random(40, 300),
          random(50, 60),
          hue);
        this.tank.blink(hue);
      },
      300 + (i * 500) + random(0, 250));
    }
  }

  setupButton() {
    this.button = new Button();

    this.button.x = 168;
    this.button.y = 249;

    this.addChild(this.button);

    this.showButton = this.button.showButton;
  }

  setupText() {
    this.greeting = new createjs.Bitmap(banner.images[shapes.shots.pack.greeting]);
    this.enjoy = new createjs.Bitmap(banner.images[shapes.shots.pack.enjoy]);

    this.greeting.x = 168;
    this.greeting.regX = 126.5;
    this.greeting.regY = 37.5;
    this.greeting.y = 181;

    this.greeting.alpha = 0;
    this.greeting.scaleX = 2;
    this.greeting.scaleY = 2;
    this.greeting.shadow = new createjs.Shadow('black', 0, 0, 10);

    this.enjoy.x = 168;
    this.enjoy.regX = 139;
    this.enjoy.y = 207;
    this.enjoy.regY = 12.5;
    this.enjoy.alpha = 0;
    this.enjoy.scaleX = 2;
    this.enjoy.scaleY = 2;

    this.addChild(this.greeting);
    this.addChild(this.enjoy);

    const showGreeting = TweenMax.to(this.greeting, 0.5, { paused: false, alpha: 1, scaleX: 1, scaleY: 1, delay: 2, ease: Power3.easeOut });

    const timeline = new TimelineMax();

    timeline
      .to(this.enjoy, 0.5, { alpha: 1, scaleX: 1, scaleY: 1, delay: 1.5, ease: Power3.easeOut })
      .add(this.showButton)
      .add(showGreeting)
      .to(this.enjoy, 0.5, { alpha: 0, scaleX: 0, scaleY: 0, ease: Power3.easeOut }, '-=0.5');
  }

  shoot() {
    this.tank.stopAnimation();
  }
}


export { PackShot as default };
