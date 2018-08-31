/* global createjs, TweenMax, TimelineMax  */
import shapes from '../shapes';
import { banner } from '../index';


class Explosion extends createjs.Container {
  constructor(timeScale = 5) {
    super();
    const start = new createjs.Bitmap(banner.images[shapes.shots.first.explosion.start]);
    const middle = new createjs.Bitmap(banner.images[shapes.shots.first.explosion.middle]);
    const end = new createjs.Bitmap(banner.images[shapes.shots.first.explosion.end]);
    const smoke = new createjs.Bitmap(banner.images[shapes.shots.first.explosion.smoke]);
    const sparks = new createjs.Bitmap(banner.images[shapes.shots.first.explosion.sparks]);
    const trail = new createjs.Bitmap(banner.images[shapes.shots.first.explosion.trail]);

    trail.setTransform(-9, 15, 1, 1, -28, 0, 0, 7, 3);
    smoke.setTransform(0, 15, 0.3, 0.3, 13, 0, 0, 27, 107);
    sparks.setTransform(20, 20, 1, 1, 0, 0, 0, 165, 100);
    start.setTransform(0, 0, 0.1, 0.1, 0, 0, 0, 40, 100);
    end.setTransform(-10, 47, 0.1, 0.1, 0, 0, 0, 52, 80);
    middle.setTransform(-5, 23, 0.1, 0.1, 0, 0, 0, 36, 41);

    sparks.compositeOperation = 'screen';

    sparks.alpha = 0;
    smoke.alpha = 0;
    start.alpha = 0;
    end.alpha = 0;
    middle.alpha = 0;
    trail.alpha = 0;

    [smoke, end, middle, start, trail, sparks].forEach(elem => this.addChild(elem));

    const explosion = [end, middle, start, trail];

    for (let i = 0; i < explosion.length; i += 1) {
      explosion[i].shadow = new createjs.Shadow('#ff8600', 0, 0, 30);
    }

    this.shadow = new createjs.Shadow('#ff5600', 0, 0, 30);

    this.timeLine = new TimelineMax({ paused: true })
      .timeScale(timeScale);

    this.timeLine.add(
      [
        new TimelineMax()
          .to(start, 0.5, { scaleX: 1, scaleY: 1, alpha: 1 })
          .to(start, 0.5, { scaleX: 0.8, scaleY: 0.8, alpha: 0, delay: 0.15 }),
        new TimelineMax()
          .to(trail, 1, { alpha: 1, y: -80, x: 162 })
          .to(trail, 0.5, { scaleX: 0.8, scaleY: 0.8, alpha: 0, delay: 0.15 }),
        new TimelineMax()
          .to(smoke, 0.5, { alpha: 0.7 })
          .to(smoke, 9.5, { x: smoke.x + 30, y: smoke.y - 40, scaleX: 1.7, scaleY: 1.7, alpha: 0 }),
        new TimelineMax()
          .to(sparks, 0.5, { scaleX: 1, scaleY: 1, alpha: 1 })
          .to(sparks, 0.1, { alpha: 0, delay: 0.15 }),
        new TimelineMax()
          .to(middle, 0.5, { scaleX: 1, scaleY: 1, x: 17, y: -5, alpha: 1, delay: 0.2 })
          .to(middle, 0.5, { scaleX: 0.8, scaleY: 0.8, alpha: 0, delay: 0.15 }),
        new TimelineMax()
          .to(end, 0.5, { scaleX: 1, scaleY: 1, y: -15, x: 55, alpha: 1, delay: 0.15 })
          .to(end, 0.5, { scaleX: 0.8, scaleY: 0.8, alpha: 0, delay: 0.25 })
          .addPause(1.55),
      ], 0, 'start');
  }

  shoot() {
    this.timeLine.play(0);
  }
}

export { Explosion as default };

