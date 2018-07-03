/* global createjs */

import MainShot from './first-shot/shot';
import PackShot from './pack-shot/shot';
import shapes from './shapes';
import Shell from './first-shot/shell';


class Banner extends createjs.Stage {
  constructor(canvas) {
    super(canvas);
    this.enableMouseOver(20);

    this.mainShot = new MainShot();
    this.addChild(this.mainShot);

    //this.toPackShot();

    this.restart();

    createjs.Ticker.framerate = 60;
    createjs.Ticker.addEventListener('tick', this);

    setInterval(() => {
      console.log(createjs.Ticker.getMeasuredFPS(1));
    }, 1000);
  }

  restart() {
    this.addShellAndText();
    this.mainShot.show();
    this.addLogo();
    this.bindPromise();
  }

  addLogo() {
    this.wotLogo = this.wotLogo || new createjs.Bitmap(shapes.shots.first.wotLogo);
    this.wotLogo.y = 0;
    this.wotLogo.x = 60;

    this.addChild(this.wotLogo);
  }

  addShellAndText() {
    // text
    this.enjoy = this.enjoy || new createjs.Bitmap(shapes.shots.first.enjoy);
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
    createjs.Tween.get(this.shell)
      .wait(500)
      .to({ y: this.shell.y + 200 }, 1000);

    createjs.Tween.get(this.enjoy)
      .wait(500)
      .to({ y: this.enjoy.y + 200 }, 1000);
  }

  toPackShot() {
    this.packShot = new PackShot();
    this.packShot.blacked.alpha = 0;
    this.addChild(this.packShot);
    this.setChildIndex(this.packShot, this.numChildren - 2);
    this.packShot.scale = 3;
    this.packShot.alpha = 0;
    this.packShot.regX = 168;
    this.packShot.regY = 140;
    this.packShot.x = 168;
    this.packShot.y = 140;

    createjs.Tween.get(this.packShot)
      .to({ scale: 1, alpha: 1 }, 1500, createjs.Ease.quadInOut)
      .call(() => this.putInPlaceShellAndText());
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

export { banner as default };
