import { random } from '../../utils';

class Particle {
  constructor(settings = {
    x: 0,
    y: 0,
    hue: 0,
    partSpeed: 1,
    partSpeedVariance: 6,
    partWind: 50,
    partFriction: 9,
    partGravity: 0.3,
    hueVariance: 30,
    lineWidth: 1,
  }) {
    this.x = settings.x;
    this.y = settings.y;
    this.coordLast = [
      { x: this.x, y: this.y },
      { x: this.x, y: this.y },
      { x: this.x, y: this.y },
    ];
    this.angle = random(0, 360);
    this.speed = random(((settings.partSpeed - settings.partSpeedVariance) <= 0) ? 1 : settings.partSpeed - settings.partSpeedVariance, (settings.partSpeed + settings.partSpeedVariance));
    this.friction = 1 - (settings.partFriction / 100);
    this.gravity = settings.partGravity / 2;
    this.hue = random(settings.hue - settings.hueVariance, settings.hue + settings.hueVariance);
    this.brightness = random(50, 80);
    this.alpha = random(40, 100) / 100;
    this.decay = random(10, 50) / 1000;
    this.wind = (random(0, settings.partWind) - (settings.partWind / 2)) / 25;
    this.lineWidth = settings.lineWidth;
    this.flickerDensity = 25;
  }

  update() {
    const radians = this.angle * (Math.PI / 180);
    const vx = Math.cos(radians) * this.speed;
    const vy = Math.sin(radians) * this.speed;
    
    this.speed *= this.friction;

    this.coordLast[2].x = this.coordLast[1].x;
    this.coordLast[2].y = this.coordLast[1].y;
    this.coordLast[1].x = this.coordLast[0].x;
    this.coordLast[1].y = this.coordLast[0].y;
    this.coordLast[0].x = this.x;
    this.coordLast[0].y = this.y;

    this.x += vx;
    this.y += vy;
    this.y += this.gravity;

    this.angle += this.wind;
    this.alpha -= this.decay;

    if (this.alpha < 0.05) {
      return true;
    }
    return false;
  }

  draw(ctx) {
    // ctx.globalCompositeOperation = 'lighter';
    const coordRand = Math.round(random(1, 3) - 1);
    ctx.beginPath();
    ctx.moveTo(Math.round(this.coordLast[coordRand].x), Math.round(this.coordLast[coordRand].y));
    ctx.lineTo(Math.round(this.x), Math.round(this.y));
    ctx.closePath();
    ctx.strokeStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.alpha})`;
    ctx.stroke();

    if (this.flickerDensity > 0) {
      const inverseDensity = 50 - this.flickerDensity;
      if (Math.round(random(0, inverseDensity)) === inverseDensity) {
        ctx.beginPath();
        ctx.arc(Math.round(this.x), Math.round(this.y), random(this.lineWidth, this.lineWidth + 3) / 2, 0, Math.PI * 2, false);
        ctx.closePath();
        const randAlpha = random(50, 100) / 100;
        ctx.fillStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${randAlpha})`;
        ctx.fill();
      }
    }
  }
}

export { Particle as default };
