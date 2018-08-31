/* global createjs */
import { random } from '../../utils';
import Firework from './firework';
import shapes from '../../shapes';

class Scene extends createjs.Container {
  constructor(settings = {
    hueMin: 0,
    hueMax: 360,
    clearAlpha: 12,
    rocketSpeed: 0.4,
    rocketAccel: 10,
    lineWidth: 1,
    partCount: 250,
    hueVariance: 30,
  }) {
    super();
    this.fireworks = [];
    this.particles = [];

    this.tickEnabled = true;

    this.clearAlpha = settings.clearAlpha;
    this.hueMin = settings.hueMin;
    this.hueMax = settings.hueMax;
    this.rocketSpeed = settings.rocketSpeed;
    this.rocketAccel = settings.rocketAccel;
    this.lineWidth = settings.lineWidth;
    this.partCount = settings.partCount;
    this.currentHue = 0;
    this.hueVariance = settings.hueVariance;
  }

  isVisible() {
    super.isVisible();
    return true;
  }

  draw(ctx) {
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = `rgba(0, 0, 0, ${this.clearAlpha / 100})`;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.restore();

    super.draw(ctx);


    for (let i = 0; i < this.fireworks.length; i += 1) {
      this.fireworks[i].draw(ctx);
      const res = this.fireworks[i].update(ctx);
      if (res) {
        this.particles = this.particles.concat(res);
        this.fireworks.splice(i, 1);
      }
    }

    this.particles.forEach((particle, i) => {
      particle.draw(ctx);
      if (particle.update(ctx)) {
        this.particles.splice(i, 1);
      }
    });
  }

  createFirework(startX, startY, targetX, targetY, hue) {
    this.currentHue = hue;
    const newFirework = new Firework({
      x: startX,
      y: startY,
      startX,
      startY,
      hitX: false,
      hitY: false,
      coordLast: [
        { x: startX, y: startY },
        { x: startX, y: startY },
        { x: startX, y: startY },
      ],
      targetX,
      targetY,
      speed: this.rocketSpeed,
      angle: Math.atan2(targetY - startY, targetX - startX),
      shockwaveAngle: Math.atan2(targetY - startY, targetX - startX) + (90 * (Math.PI / 180)),
      acceleration: this.rocketAccel / 100,
      hue: this.currentHue,
      brightness: random(50, 80),
      alpha: random(50, 100) / 100,
      lineWidth: this.lineWidth,
      partCount: this.partCount,
      hueVariance: this.hueVariance,
      partSpeed: 1,
      partSpeedVariance: 6,
      partWind: 50,
      partFriction: 9,
      partGravity: 0.3,
    });
    
    this.fireworks.push(newFirework);
  }
}

export { Scene as default };
