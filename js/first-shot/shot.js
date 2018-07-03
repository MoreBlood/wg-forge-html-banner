/* global createjs */

import TankT34 from '../first-shot/tank_t34';
import shapes from '../shapes';
import Smoke from '../first-shot/smoke';
import Explosion from '../first-shot/explosion';
import Firework from '../first-shot/fireworks';
import { random } from '../utils';
import banner from '../index';

class MainShot extends createjs.Container {
  constructor() {
    super();
    this.timeline = new createjs.Timeline({ loop: true, bounce: true });

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
    createjs.Tween.get(this.blacked)
      .to({ alpha: 0 }, 1000, createjs.Ease.quadInOut);
  }

  hide() {
    return createjs.Tween.get(this.blacked)
      .to({ alpha: 1 }, 1000, createjs.Ease.quadInOut);
  }

  setupScene() {
    this.hill = new createjs.Bitmap(shapes.shots.first.hill);
    this.hillLight = new createjs.Bitmap(shapes.shots.first.explosion.hillLight);
    this.treeLeft = new createjs.Bitmap(shapes.shots.first.treeLeft);
    this.treeRight = new createjs.Bitmap(shapes.shots.first.treeRight);


    this.firework = new Firework();
    this.addChild(this.firework);

    // bg big smoke
    const smoke0 = new Smoke(0.2);
    smoke0.y = 170;
    smoke0.x = 300;
    smoke0.scaleX = 2.5;
    smoke0.scaleY = 2.5;
    smoke0.alpha = 1;
    this.addChild(smoke0);

    // setup tank
    this.tank = new TankT34();
    this.addChild(this.tank);
    this.tank.y = 100;
    this.tank.rotation = -0.5;

    const tankTween = createjs.Tween.get(this.tank, { paused: true })
      .to({ x: this.tank.x + 30, y: this.tank.y + 6, rotation: 0.5, scale: 0.96 }, 1000, createjs.Ease.quadInOut);
      
    this.tank.timeline.addTween(tankTween);

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
      setTimeout(() => {
        const hue = random(0, 360);
        this.firework.shoot(
          random(200, 250),
          random(0, 40),
          random(250, 400),
          random(50, -20),
          hue);
        this.tank.blink(hue);
      },
      300 + (i * 500) + random(0, 250));
    }
  }

  restart() {
    this.blacked.alpha = 1;

    banner.packShot.hide()
      .call(() => this.hide())
      .call(() => {
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

      createjs.Tween.get(this.hillLight)
        .to({ alpha: 1 }, 200)
        .to({ alpha: 0 }, 200)
        .call(() => this.expodeFireworks(10));

      this.tank.blink(0);

      createjs.Tween.get(this.tank)
        .to({ x: this.tank.x -= 1, y: this.tank.y += 1 }, 100)
        .to({ x: this.tank.x += 1, y: this.tank.y -= 1 }, 100);
    };

    createjs.Tween.get(this)
      .to({ x: this.x - 34, y: this.y + 20 }, 500)
      .call(() => play())
      .to({ y: this.y + 30 }, 100, createjs.Ease.quadInOut)
      .to({ y: this.y + 20 }, 100, createjs.Ease.quadInOut)
      .to({ x: this.x - 170, y: this.y + 100 }, 2000, createjs.Ease.quadInOut)
      .wait(1500)
      .call(() => this.expodeFireworks(7))
      .wait(3500)
      .call(() => banner.toPackShot())
      .wait(12000)
      .call(() => this.restart());
  }
}


export { MainShot as default };
