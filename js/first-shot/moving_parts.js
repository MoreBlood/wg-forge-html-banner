/* globals createjs, TimelineMax, TweenMax */
import shapes from '../shapes';
import Track from '../first-shot/tracks';
import { banner } from '../index';

class MovingParts extends createjs.Container {
  constructor() {
    super();
    this.setupFirstWheel();
    this.setupMiddleWheels();
    this.setupLastWheel();
    this.setupTracks();

    this.tracksRotatingTimeline = new TimelineMax({ repeat: -1, yoyo: true });

    this.tweens = [this.lastWheel, this.firstTrack].concat(this.middleWheels);
    // add rotation
    this.tracksRotatingTimeline.add(this.tweens.map(child => TweenMax.to(child, 1, { rotation: 35 + child.rotation, ease: Power1.easeInOut })), 0)
    ;
  }

  pause() {
    this.tracksRotatingTimeline.paused(true);
    this.rightTracks.stop();
    this.leftTracks.stop();
  }

  start() {
    this.tracksRotatingTimeline.play(0);
    this.rightTracks.start();
    this.leftTracks.start();
  }

  setupTracks() {
    this.rightTracks = new Track(15);
    this.leftTracks = new Track(15);

    this.leftTracks.x = -53;
    this.leftTracks.y = 6;
    this.leftTracks.scaleY = 0.76;
    this.leftTracks.scaleX = 0.9;

    this.addChild(this.rightTracks);
    this.addChild(this.leftTracks);
  }

  setupFirstWheel() {
    this.firstTrack = new createjs.Bitmap(banner.images[shapes.tracks.first]);
    this.firstTrack.x = 197;
    this.firstTrack.y = -1.5;

    this.firstTrack.regX = 11;
    this.firstTrack.regY = 11;

    this.addChild(this.firstTrack);
  }

  setupLastWheel() {
    this.lastWheel = new createjs.Bitmap(banner.images[shapes.tracks.last]);
    this.lastWheel.regX = 19;
    this.lastWheel.regY = 19;

    this.addChild(this.lastWheel);
  }

  setupMiddleWheels() {
    this.middleWheels = [];

    Array.from(Array(5)).forEach(() => this.middleWheels.push(new createjs.Bitmap(banner.images[shapes.tracks.middle])));

    for (let i = 0; i < this.middleWheels.length; i += 1) {
      this.middleWheels[i].y = 5;
      this.middleWheels[i].x = 40 + ((i * 34) - (i * 0.07));
      this.middleWheels[i].regX = 21;
      this.middleWheels[i].regY = 21;
      this.middleWheels[i].rotation = i * 50;
      this.middleWheels[i].scaleX = 1 - (i * 0.035);
      this.middleWheels[i].scaleY = 1 - (i * 0.035);
    }

    this.middleWheels.reverse().forEach(track => this.addChild(track));
  }
}

export { MovingParts as default };
