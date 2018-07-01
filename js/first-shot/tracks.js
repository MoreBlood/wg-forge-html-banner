/* globals createjs */
import shapes from '../shapes';

createjs.MotionGuidePlugin.install();

class Tracks extends createjs.Container {
  constructor() {
    super();
    this.tweens = [];

    setInterval(() => {
      this.reverse();
    }, 1000);

    for (let i = 0; i < 10; i += 1) {
      const trackPart = new createjs.Bitmap(shapes.tracks.trackPart);
      trackPart.scaleY = 0;
      trackPart.regX = 10;
      this.addChild(trackPart);

      const tween = createjs.Tween.get(trackPart, { loop: true })
        .to({ guide: { path: [-15, -20, -30, -8, -21, 0] }, scaleY: 1 }, 2500)
        .to({ guide: { path: [-21, 0, -16, 15, 10, 25] }, scaleY: 0 }, 2500);
      // tween.paused = true;

      tween.gotoAndPlay(i * 500);
      tween.reversed = true;


      this.tweens.push(tween);
    }
  }

  reverse() {
    this.tweens.forEach((tween) => {
      tween.gotoAndPlay(tween.duration - tween.position);
      tween.reversed = !tween.reversed;
    });
  }

  stop() {
    this.tweens.forEach((tween) => {
      tween.paused = true;
    });
  }
}


export { Tracks as default };
