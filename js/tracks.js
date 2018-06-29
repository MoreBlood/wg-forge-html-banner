import shapes from './shapes';
import Track from './first-shot/tracks_moving';

const createjs = window.createjs;
createjs.MotionGuidePlugin.install();

const tracksContainer = new createjs.Container();
const lastTrack = new createjs.Bitmap(shapes.tracks.last);
const firstTrack = new createjs.Bitmap(shapes.tracks.first);
const middleTracks = [];

Array.from(Array(5)).forEach(() => middleTracks.push(new createjs.Bitmap(shapes.tracks.middle)));

for (let i = 0; i < middleTracks.length; i += 1) {
  middleTracks[i].y = 5;
  middleTracks[i].x = 40 + ((i * 34) - (i * 0.07));
  middleTracks[i].regX = 21;
  middleTracks[i].regY = 21;
  middleTracks[i].rotation = i * 50;
  middleTracks[i].scaleX = 1 - (i * 0.035);
  middleTracks[i].scaleY = 1 - (i * 0.035);
}


lastTrack.regX = 19;
lastTrack.regY = 19;

firstTrack.x = 197;
firstTrack.y = -1.5;

firstTrack.regX = 11;
firstTrack.regY = 11;

tracksContainer.addChild(firstTrack);
middleTracks.reverse().forEach(track => tracksContainer.addChild(track));
tracksContainer.addChild(lastTrack);


const tracksRotatingTimeline = new createjs.Timeline();

const rightTracks = new Track(15);
const leftTracks = new Track(15);

leftTracks.tracks.x = -53;
leftTracks.tracks.y = 6;
leftTracks.tracks.scaleY = 0.76;
leftTracks.tracks.scaleX = 0.9;

tracksContainer.addChild(rightTracks.tracks);
tracksContainer.addChild(leftTracks.tracks);

tracksRotatingTimeline.addTween(
  ...[lastTrack, firstTrack].concat(middleTracks).map(child => createjs.Tween.get(child).to({ rotation: 35 + child.rotation }, 1000, createjs.Ease.quadInOut)),
  rightTracks.tweens,
  leftTracks.tweens)
;

// Visualizing the line
const line = new createjs.Shape();
tracksContainer.addChild(line);
line.graphics.setStrokeStyle(3);
line.graphics.beginStroke('DeepSkyBlue');
// line.graphics.moveTo(-15, -20).curveTo(-30, -10, -23, 0).curveTo(-18, 15, 10, 25);


export { tracksContainer, tracksRotatingTimeline };
