import { random } from '../../utils';
import Particle from './particle';

class Firework {
  constructor(settings = {
    x: 0,
    y: 0,
    startX: 0,
    startY: 0,
    hitX: false,
    hitY: false,
    coordLast: [
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ],
    targetX: 0,
    targetY: 0,
    speed: 0,
    angle: 0,
    shockwaveAngle: 0,
    acceleration: 1,
    hue: 0,
    alpha: 0.5,
    lineWidth: 1,
    partSpeed: 1,
    partSpeedVariance: 6,
    partWind: 50,
    partFriction: 9,
    partGravity: 0.3,
  }, particles) {
    this.x = settings.x;
    this.y = settings.y;
    this.partCount = settings.partCount;
    this.startX = settings.startX;
    this.startY = settings.startY;
    this.hitX = settings.hitX;
    this.hitY = settings.hitY;
    this.coordLast = settings.coordLast;
    this.targetX = settings.targetX;
    this.targetY = settings.targetY;
    this.speed = settings.speed;
    this.angle = Math.atan2(settings.targetY - settings.startY, settings.targetX - settings.startX);
    this.shockwaveAngle = Math.atan2(settings.targetY - settings.startY, settings.targetX - settings.startX) + (90 * (Math.PI / 180));
    this.hue = settings.hue;
    this.brightness = random(50, 80);
    this.alpha = random(50, 100) / 100;
    this.lineWidth = settings.lineWidth;
    this.acceleration = settings.acceleration;
    this.hueVariance = settings.hueVariance;
    this.partSpeed = settings.partSpeed;
    this.partSpeedVariance = settings.partSpeedVariance;
    this.partWind = settings.partWind;
    this.partFriction = settings.partFriction;
    this.partGravity = settings.partGravity;

    this.particles = particles;
  }

  createParticles(x, y, hue) {
    const array = [];
    for (let countdown = this.partCount; countdown > 0; countdown -= 1) {
      const newParticle = new Particle({
        x,
        y,
        hue: random(hue - this.hueVariance, hue + this.hueVariance),
        partSpeed: this.partSpeed,
        partSpeedVariance: this.partSpeedVariance,
        partWind: this.partWind,
        partFriction: this.partFriction,
        partGravity: this.partGravity,
        hueVariance: this.hueVariance,
        lineWidth: this.lineWidth,
      },
      this.particles);

      array.push(newParticle);
    }
    return array;
  }

  update() {
    const vx = Math.cos(this.angle) * this.speed;
    const vy = Math.sin(this.angle) * this.speed;

    this.speed *= 1 + this.acceleration;
    this.coordLast[2].x = this.coordLast[1].x;
    this.coordLast[2].y = this.coordLast[1].y;
    this.coordLast[1].x = this.coordLast[0].x;
    this.coordLast[1].y = this.coordLast[0].y;
    this.coordLast[0].x = this.x;
    this.coordLast[0].y = this.y;

    if (this.startX >= this.targetX) {
      if (this.x + vx <= this.targetX) {
        this.x = this.targetX;
        this.hitX = true;
      } else {
        this.x += vx;
      }
    } else if (this.x + vx >= this.targetX) {
      this.x = this.targetX;
      this.hitX = true;
    } else {
      this.x += vx;
    }

    if (this.startY >= this.targetY) {
      if (this.y + vy <= this.targetY) {
        this.y = this.targetY;
        this.hitY = true;
      } else {
        this.y += vy;
      }
    } else if (this.y + vy >= this.targetY) {
      this.y = this.targetY;
      this.hitY = true;
    } else {
      this.y += vy;
    }

    if (this.hitX && this.hitY) {
      return this.createParticles(this.targetX, this.targetY, this.hue);
    }
    return false;
  }

  draw(ctx) {
    ctx.globalCompositeOperation = 'lighter';
    ctx.lineWidth = this.lineWidth;
    const coordRand = Math.round(random(1, 3) - 1);
    ctx.beginPath();
    ctx.moveTo(Math.round(this.coordLast[coordRand].x), Math.round(this.coordLast[coordRand].y));
    ctx.lineTo(Math.round(this.x), Math.round(this.y));
    ctx.closePath();
    // ctx.strokeStyle = 'hsla('+f.hue+', 100%, '+f.brightness+'%, '+f.alpha+')';
    ctx.strokeStyle = 'white';
    ctx.stroke();
  }
}

export { Firework as default };
