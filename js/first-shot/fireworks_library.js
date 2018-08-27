/* global createjs */
import { random } from '../utils';

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
    const coordRand = (random(1, 3) - 1);
    ctx.beginPath();
    ctx.moveTo(Math.round(this.coordLast[coordRand].x), Math.round(this.coordLast[coordRand].y));
    ctx.lineTo(Math.round(this.x), Math.round(this.y));
    ctx.closePath();
    ctx.strokeStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.alpha})`;
    ctx.stroke();

    if (this.flickerDensity > 0) {
      const inverseDensity = 50 - this.flickerDensity;
      if (random(0, inverseDensity) === inverseDensity) {
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

class Firework {
  constructor(settings = {
    startX: 0,
    startY: 0,
    targetX: 0,
    targetY: 0,
    hitX: 0,
    hitY: 0,
    partCount: 250,
    currentHue: 30,
    partSpeed: 1,
    partSpeedVariance: 6,
    partWind: 50,
    partFriction: 9,
    partGravity: 0.3,
    rocketSpeed: 0.4,
    rocketAccel: 10,
    hueVariance: 30,
    flickerDensity: 25,
    clearAlpha: 15,
    lineWidth: 1,
  }) {
    this.startX = settings.startX;
    this.startY = settings.startY;
    this.hitX = settings.hitX;
    this.hitY = settings.hitY;
    this.coordLast = settings.coordLast;
    this.partCount = settings.partCount;
    this.currentHue = settings.currentHue;
    this.partSpeed = settings.partSpeed;
    this.partSpeedVariance = settings.this.partSpeedVariance;
    this.partWind = settings.partWind;
    this.partFriction = settings.this.partFriction;
    this.partGravity = settings.partGravity;
    this.rocketSpeed = settings.rocketSpeed;
    this.rocketAccel = settings.rocketAccel;
    this.hueVariance = settings.hueVariance;
    this.flickerDensity = settings.flickerDensity;
    this.clearAlpha = settings.clearAlpha;
    this.lineWidth = settings.lineWidth;

    this.particles = [];
  }

  createParticles(x, y, hue) {
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
      });
      this.particles.push(newParticle);
    }
  }

  update(ctx) {
    ctx.lineWidth = this.lineWidth;

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
    } else
    if (this.x + vx >= this.targetX) {
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
    } else
    if (this.y + vy >= this.targetY) {
      this.y = this.targetY;
      this.hitY = true;
    } else {
      this.y += vy;
    }

    if (this.hitX && this.hitY) {
      this.createParticles(this.targetX, this.targetY, this.hue);
      return true;
    }
    return false;
  }

  drawFireworks(ctx) {
    ctx.globalCompositeOperation = 'lighter';
    ctx.lineWidth = this.lineWidth;
    const coordRand = (random(1, 3) - 1);
    ctx.beginPath();
    ctx.moveTo(Math.round(this.coordLast[coordRand].x), Math.round(this.coordLast[coordRand].y));
    ctx.lineTo(Math.round(this.x), Math.round(this.y));
    ctx.closePath();
    // ctx.strokeStyle = 'hsla('+f.hue+', 100%, '+f.brightness+'%, '+f.alpha+')';
    ctx.strokeStyle = 'white';
    ctx.stroke();


    this.particles.forEach((particle, i) => {
      particle.draw(ctx);
      if (particle.update()) {
        particle.splice(i, 1);
      }
    });
  }
}

class Scene extends createjs.Container {
  constructor(settings = {
    hueMin: 0,
    hueMax: 360,
    clearAlpha: 0.15,
  }) {
    super();
    this.fireworks = [];
    this.particles = [];
    this.clearAlpha = settings.clearAlpha;
    this.hueMin = settings.hueMin;
    this.hueMax = settings.hueMax;

    this.currentHue = 0;
  }

  draw(ctx) {
    super.draw(ctx);

    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = `rgba(0,0,0,${this.clearAlpha / 100})`;
    // ctx.fillRect(0, 0, w, h);

    this.fireworks.forEach((firework, i) => {
      firework.draw(ctx);
      if (firework.update()) {
        this.fireworks.splice(i, 1);
      }
    });
  }

  createFirework(startX, startY, targetX, targetY) {
    this.currentHue = random(this.hueMin, this.hueMax);
    const newFirework = new Firework({
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
    });
    this.fireworks.push(newFirework);
  }
}

