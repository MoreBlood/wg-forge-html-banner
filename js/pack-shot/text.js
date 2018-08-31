/* globals stringFrame */
import ChargeText from '../first-shot/text';


class ChargeTextPackShot extends ChargeText {
  constructor() {
    super();
    this.textPlate.frame1 = new stringFrame(this.textPlate, ['НАСЛАЖДАЙСЯ ПРАЗДНИКОМ!'], `bold 16pt ${window.font}`, 24);
    this.textPlate.scale = 1.2;
    this.textPlate.x = (window.w / 2) - 30;
    this.textPlate.y = 0;
    this.textPlate.textAlign = 'center';
    this.showText();
  }
}

export { ChargeTextPackShot as default };
