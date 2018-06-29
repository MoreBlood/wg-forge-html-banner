import shapes from '../shapes';

const createjs = window.createjs;

const shellCountour = new createjs.Bitmap(shapes.shots.first.shellCountour);
const shellFill = new createjs.Bitmap(shapes.shots.first.shellFill);

const shellContainer = new createjs.Container();

const mask = new createjs.Shape();
const circle = new createjs.Shape();

mask.graphics.beginFill('#000000').drawRect(0, 90, 100, 100);
circle.graphics.beginFill('#000000').drawRect(0, 0, 50, 100);
circle.alpha = 0.01;

shellFill.mask = mask;

let isFilled = false;

const fillAnimation = createjs.Tween.get(mask, { paused: true })
  .to({ y: -90 }, 2000);

let timeout;

circle.on('mouseover', () => {
  console.log('mouseover', isFilled);
  if (isFilled) { return; }
  fillAnimation.gotoAndPlay(fillAnimation.position);
  fillAnimation.reversed = false;

  clearTimeout(timeout);
  timeout = setTimeout(() => {
    isFilled = true;
    fillAnimation.gotoAndPlay(fillAnimation.duration);
  }, 2000);
});

circle.on('mouseout', () => {
  console.log('mouseout', isFilled);
  clearTimeout(timeout);
  if (isFilled) { return; }
  fillAnimation.gotoAndPlay(fillAnimation.duration - fillAnimation.position);
  fillAnimation.reversed = true;
});

shellContainer.addChild(shellFill);
shellContainer.addChild(circle);
shellContainer.addChild(shellCountour);

export { shellContainer as default };
