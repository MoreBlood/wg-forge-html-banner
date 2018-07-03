/* globals createjs */
import shapes from '../shapes';

createjs.MotionGuidePlugin.install();

class TracksPackShot extends createjs.Container {
  constructor() {
    super();
    this.tweens = [];

    for (let i = 0; i < 10; i += 1) {
      const trackPart = new createjs.Bitmap(shapes.shots.pack.track);
      trackPart.scaleY = 0.5;
      trackPart.regX = 10;
      trackPart.regY = 10;
      this.addChild(trackPart);

      const tween = createjs.Tween.get(trackPart, { loop: true })
        .to({ guide: { path: [0, -20, -5, -5, 4, 17] }, scaleY: 1 }, 1500)
        .to({ guide: { path: [4, 17, 8, 28, 20, 38] }, scaleY: 0 }, 1500);

      tween.gotoAndPlay(i * 300);
      tween.reversed = false;

      this.tweens.push(tween);
    }
  }

  stop() {
    this.tweens.forEach((tween, i) => {
      tween.paused = true;
    });
  }

  start() {
    this.startReverse();
    this.tweens.forEach((tween, i) => {
      tween.paused = false;
      tween.gotoAndPlay(i * 500);
      tween.reversed = true;
    });
  }
}


export { TracksPackShot as default };
