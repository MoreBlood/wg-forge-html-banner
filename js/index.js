const createjs = window.createjs;
const stage = new createjs.Stage('ad');
const circle = new createjs.Shape();
circle.graphics.beginFill('DeepSkyBlue').drawCircle(0, 0, 40);
circle.x = 100;
circle.y = 100;
stage.addChild(circle);

circle.addEventListener('click', () => console.log({ x: circle.x, y: circle.y }));

createjs.Tween.get(circle, { loop: true })
  .to({ x: 400, scale: 0 }, 6000, createjs.Ease.getPowInOut(4))
  .to({ alpha: 0, y: 175, scale: 1 }, 500, createjs.Ease.getPowInOut(2))
  .to({ alpha: 0, y: 225 }, 100)
  .to({ alpha: 1, y: 200 }, 500, createjs.Ease.getPowInOut(2))
  .to({ x: 100, y: 100 }, 800, createjs.Ease.getPowInOut(2));

const text = new createjs.Text('Hello World', '20px Arial', '#ff7700');
text.x = 100;
text.y = 100;
text.textBaseline = 'alphabetic';

stage.addChild(text);

createjs.Ticker.setFPS(60);
createjs.Ticker.addEventListener('tick', stage);
