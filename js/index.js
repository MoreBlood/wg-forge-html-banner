/* global createjs, TweenMax, TimelineMax */
import MainShot from './first-shot/shot';
import PackShot from './pack-shot/shot';
import shapes from './shapes';
import Shell from './first-shot/shell';
import { preload } from './utils';

class Banner extends createjs.Stage {
  constructor(canvas) {
    super(canvas);
    this.enableMouseOver(20);

    createjs.Ticker.framerate = 60;
    createjs.Ticker.addEventListener('tick', this);

    setInterval(() => {
      console.log(createjs.Ticker.getMeasuredFPS(1));
    }, 1000);
  }

  load() {
    this.mainShot = new MainShot();
    this.addChild(this.mainShot);
    this.restart();
  }

  restart() {
    this.addShellAndText();
    this.mainShot.show();
    this.addLogo();
    this.bindPromise();
  }

  addLogo() {
    this.wotLogo = this.wotLogo || new createjs.Bitmap(this.images[shapes.shots.first.wotLogo]);
    this.wotLogo.y = 0;
    this.wotLogo.x = 60;

    this.addChild(this.wotLogo);
  }

  addShellAndText() {
    // text
    this.enjoy = this.enjoy || new createjs.Bitmap(this.images[shapes.shots.first.enjoy]);
    this.addChild(this.enjoy);

    // shell
    this.shell = this.shell || new Shell();

    this.addChild(this.shell);
    this.shell.restart();

    this.on('mouseover', event => this.shell.hideCursor(event.rawX, event.rawY));
    this.on('mouseout', () => this.shell.showCursor());

    this.putInPlaceShellAndText();
  }

  putInPlaceShellAndText() {
    this.shell.x = 290;
    this.shell.y = 179;

    this.enjoy.y = 210;
    this.enjoy.x = 92;
  }

  hideShellAndText() {
    TweenMax.to(this.shell, 1, { delay: 0.5, y: this.shell.y + 200 });
    TweenMax.to(this.enjoy, 1, { delay: 0.5, y: this.enjoy.y + 200 });
  }

  toPackShot() {
    this.packShot = new PackShot();
    this.packShot.blacked.alpha = 0;
    this.addChild(this.packShot);
    this.setChildIndex(this.packShot, this.numChildren - 2);
    this.packShot.scaleX = 3;
    this.packShot.scaleY = 3;
    this.packShot.alpha = 0;
    this.packShot.regX = 168;
    this.packShot.regY = 140;
    this.packShot.x = 168;
    this.packShot.y = 140;

    TweenMax.to(this.packShot, 1.5, { scaleX: 1, scaleY: 1, alpha: 1, ease: Power3.easeInOut });
    TweenMax.delayedCall(1.5, () => this.putInPlaceShellAndText());
  }

  bindPromise() {
    this.shell.filled()
      .then(() => {
        this.mainShot.shoot();
        this.hideShellAndText();
      });
  }
}
const banner = new Banner('ad');

preload()
  .then((images) => {
    banner.images = {};
    for (let i = 0; i < images.length; i += 1) {
      banner.images[images[i].url] = images[i].image;
    }
    banner.load();
  });

export { banner as default };
