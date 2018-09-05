/* global createjs, TweenMax, TimelineMax, loadFonts */
import MainShot from './first-shot/shot';
import PackShot from './pack-shot/shot';
import shapes from './shapes';
import Shell from './first-shot/shell';
import { preload, random } from './utils';
import ChargeText from './first-shot/text';
import Scene from './first-shot/fireworks/scene';

class Banner extends createjs.Stage {
  constructor(canvas) {
    super(canvas);
    this.enableMouseOver(20);
    // this.autoClear = false;

    createjs.Ticker.framerate = 60;
    createjs.Ticker.addEventListener('tick', this);

    this.cursor = 'pointer';

    setInterval(() => {
      // console.log(createjs.Ticker.getMeasuredFPS(1));
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
    this.wotLogo.y = 10;
    this.wotLogo.x = 60;
    this.wotLogo.shadow = new createjs.Shadow('black', 0, 0, 10);

    this.addChild(this.wotLogo);
  }

  addShellAndText() {
    // text
    this.enjoy = this.enjoy || new ChargeText();
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

class Fireworks extends createjs.Stage {
  constructor(canvas) {
    super(canvas);
    createjs.Ticker.addEventListener('tick', this);
    this.fireworks = new Scene();
    this.addChild(this.fireworks);
    this.autoClear = false;
    this.canvas.width = 1000;
    this.canvas.height = 1000;
  }
}


export const banner = new Banner('ad');
export const fireworks = new Fireworks(document.createElement('canvas'));


window.start = () => {
  window.w = banner.canvas.width;
  banner.load();
};

window.getMousePos = (e) => {
  const rect = banner.canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  };
};

preload()
  .then((images) => {
    banner.images = {};
    for (let i = 0; i < images.length; i += 1) {
      banner.images[images[i].url] = images[i].image;
    }
    loadFonts();
  });

// export { banner as default };
