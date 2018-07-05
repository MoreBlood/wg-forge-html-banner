/* globals createjs */
import shapes from '../shapes';
import banner from '../index';

class TracksPackShot extends createjs.Container {
  constructor() {
    super();
    this.tweens = [];

    for (let i = 0; i < 10; i += 1) {
      const trackPart = new createjs.Bitmap(banner.images[shapes.shots.pack.track]);
      trackPart.scaleY = 0.5;
      trackPart.regX = 10;
      trackPart.regY = 10;
      this.addChild(trackPart);

      const tween = new TimelineMax({ repeat: -1 });

      tween
        .to(trackPart, 3.0, { ease: Power1.easeInOut,
          reversed: false,
          bezier: { type: 'quadratic',
            timeResolution: 100,
            values: [
              { x: 0, y: -20 },
              { x: -5, y: -5 },
              { x: 4, y: 17 },
              { x: 8, y: 28 },
              { x: 20, y: 38 },
            ] } })
        .to(trackPart, 1.5, { ease: Linear.easeNone, scaleY: 1 }, 0)
        .to(trackPart, 1.5, { ease: Linear.easeNone, scaleY: 0, delay: 1.5 }, 0);
      // tween.paused = true;

      tween.time(i * 0.3);

      this.tweens.push(tween);
    }
  }

  stop() {
    this.tweens.forEach((tween, i) => {
      tween.paused(true);
    });
  }

  start() {
    this.startReverse();
    this.tweens.forEach((tween, i) => {
      tween.play(i * 0.5);
    });
  }
}


export { TracksPackShot as default };
