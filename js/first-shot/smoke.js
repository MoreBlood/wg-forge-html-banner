/* globals createjs, TweenMax, TimelineMax */

import shapes from '../shapes';
import { random } from '../utils';
import { banner } from '../index';


class Smoke extends createjs.Container {
  constructor(timeScale = 1, black = false) {
    super();
    const smoke = new createjs.Bitmap(banner.images[black ? shapes.shots.first.smokeBlack : shapes.shots.first.smoke]);

    smoke.regY = 75;
    smoke.regX = 228;
    smoke.scaleX = 0.1;
    smoke.scaleY = 0.1;
    smoke.alpha = 0;

    const smokeArray = Array.from(Array(10)).map(() => smoke.clone());

    this.timeline = new TimelineMax({ repeat: -1 })
      .timeScale(timeScale);

    for (let i = 0; i < smokeArray.length; i += 1) {
      this.addChild(smokeArray[i]);

      const scale = random(1, 1.3);
      
      this.timeline.add(TweenMax.to(smokeArray[i], 3, { x: smoke.x - random(10, 100), y: smoke.y - random(10, 15), scaleX: scale, scaleY: scale }), i * 0.4);
    
      const show = TweenMax.to(smokeArray[i], 0.5, { alpha: 1 });

      const hide = TweenMax.to(smokeArray[i], 2.5, { alpha: 0 });

      this.timeline.add([show, hide], i * 0.4, 'sequence');
    }
  }
}


export { Smoke as default };

