/* globals createjs, TweenMax, TimelineMax */
import shapes from '../shapes';
import banner from '../index';

class Tracks extends createjs.Container {
  constructor() {
    super();
    this.tweens = [];

    this.startReverse();

    for (let i = 0; i < 10; i += 1) {
      const trackPart = new createjs.Bitmap(banner.images[shapes.tracks.trackPart]);
      trackPart.scaleY = 0;
      trackPart.regX = 14;
      trackPart.regY = 7;
      this.addChild(trackPart);


      const tween = new TimelineMax({ repeat: -1 });

      tween
        .to(trackPart, 2.5, { ease: Linear.easeNone, reversed: true, bezier: { type: 'quadratic', timeResolution: 100, values: [{ x: -10, y: -20 }, { x: -20, y: -8 }, { x: -21, y: 0 }, { x: -16, y: 15 }, { x: 10, y: 25 }] } })
        .to(trackPart, 1, { ease: Linear.easeNone, scaleY: 1 }, 0)
        .to(trackPart, 1.5, { ease: Linear.easeNone, scaleY: 0, delay: 1 }, 0);
      // tween.paused = true;

      tween.time(i * 0.3);

      this.tweens.push(tween);
    }
  }

  reverse() {
    this.tweens.forEach((tween) => {
      if (tween.paused()) return;
      tween.reversed(!tween.reversed());
    });
  }

  startReverse() {
    this.reverseFunc = setInterval(() => {
      this.reverse();
    }, 1000);
  }

  stop() {
    clearInterval(this.reverseFunc);
    this.tweens.forEach((tween) => {
      tween.paused(true);
    });
  }
  start() {
    this.startReverse();
    this.tweens.forEach((tween, i) => {
      tween.reversed(true);
      tween.play(i * 0.3);
    });
  }
}


export { Tracks as default };
