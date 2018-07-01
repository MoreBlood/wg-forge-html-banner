/* globals createjs */
import shapes from '../shapes';
import Track from '../first-shot/tracks';

createjs.MotionGuidePlugin.install();

class MovingParts extends createjs.Container {
  constructor() {
    super();
    this.setupFirstWheel();
    this.setupMiddleWheels();
    this.setupLastWheel();
    this.setupTracks();

    this.tracksRotatingTimeline = new createjs.Timeline();
    // add rotation
    this.tracksRotatingTimeline.addTween(
      ...[this.lastWheel, this.firstTrack].concat(this.middleWheels).map(child => createjs.Tween.get(child).to({ rotation: 35 + child.rotation }, 1000, createjs.Ease.quadInOut)))
    ;
  }

  pause() {
    this.tracksRotatingTimeline.paused = true;
    this.rightTracks.stop();
    this.leftTracks.stop();
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
    this.firstTrack = new createjs.Bitmap(shapes.tracks.first);
    this.firstTrack.x = 197;
    this.firstTrack.y = -1.5;

    this.firstTrack.regX = 11;
    this.firstTrack.regY = 11;

    this.addChild(this.firstTrack);
  }

  setupLastWheel() {
    this.lastWheel = new createjs.Bitmap(shapes.tracks.last);
    this.lastWheel.regX = 19;
    this.lastWheel.regY = 19;

    this.addChild(this.lastWheel);
  }

  setupMiddleWheels() {
    this.middleWheels = [];

    Array.from(Array(5)).forEach(() => this.middleWheels.push(new createjs.Bitmap(shapes.tracks.middle)));

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
