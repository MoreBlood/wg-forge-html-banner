/* global createjs */
// when animating on canvas, it is best to use requestAnimationFrame instead of setTimeout or setInterval
// not supported in all browsers though and sometimes needs a prefix, so we need a shim
import shapes from '../shapes';
import { random, calculateDistance } from '../utils';

// create particle group/explosion

// now we are going to setup our function placeholders for the entire demo

class Particle {
  constructor(x, y, particles, hue) {
    this.x = x;
    this.y = y;
    this.hue = hue;
    this.particles = particles;
    // track the past coordinates of each particle to create a trail effect, increase the coordinate count to create more prominent trails
    this.coordinates = [];
    this.coordinateCount = random(3, 10);
    for (let i = 0; i < this.coordinateCount; i += 1) {
      this.coordinates.push([this.x, this.y]);
    }
    this.blurRadius = random(3, 10);
    this.lineWidth = random(0.4, 1.2);
    // set a random angle in all possible directions, in radians
    this.angle = random(0, Math.PI * random(-2, -1));
    this.speed = random(1, 5);
    // friction will slow the particle down
    this.friction = random(0.9, 0.96);
    // gravity will be applied and pull the particle down
    this.gravity = random(0.3, 0.6);
    // set the hue to a random number +-50 of the overall hue variable
    // this.hue = random( hue - 50, hue + 50 );
    this.brightness = random(40, 70);
    this.color = random(90, 100);
    this.alpha = 1;
    // set how fast the particle fades out
    this.decay = random(0.003, 0.05);
  }
  update(index) {
    // remove last item in coordinates array
    this.coordinates.pop();
    // add current coordinates to the start of the array
    this.coordinates.unshift([this.x, this.y]);
    // slow down the particle
    this.speed *= this.friction;
    // apply velocity
    this.x += Math.cos(this.angle) * this.speed;
    this.y += (Math.sin(this.angle) * this.speed) + this.gravity;
    // fade out the particle
    this.alpha -= this.decay;
    this.lineWidth -= 0.01;

    // remove the particle once the alpha is low enough, based on the passed in index
    if (this.alpha <= this.decay) {
      this.particles.splice(index, 1);
    }
  }

  draw(ctx) {
    ctx.beginPath();
    // move to the last tracked coordinates in the set, then draw a line to the current x and y
    ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
    this.hue += 0.5;
    ctx.strokeStyle = `hsl(${this.hue}, 100%, ${this.color}%)`;
    ctx.shadowBlur = this.blurRadius;
    ctx.shadowColor = `hsl(${this.hue}, 100%, ${this.brightness}%)`;
    ctx.lineWidth = this.lineWidth;
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
  }
}

class Firework {
  constructor(sx, sy, tx, ty, fireworks = [], particles = [], hue) {
    this.fireworks = fireworks;
    this.particles = particles;
    this.hue = hue;
    // actual coordinates
    this.x = sx;
    this.y = sy;
    // starting coordinates
    this.sx = sx;
    this.sy = sy;
    // target coordinates
    this.tx = tx;
    this.ty = ty;
    // distance from starting point to target
    this.distanceToTarget = calculateDistance(sx, sy, tx, ty);
    this.distanceTraveled = 0;
    // track the past coordinates of each firework to create a trail effect, increase the coordinate count to create more prominent trails
    this.coordinates = [];
    this.coordinateCount = 3;
    // populate initial coordinate collection with the current coordinates
    for (let i = 0; i < this.coordinateCount; i += 1) {
      this.coordinates.push([this.x, this.y]);
    }
    this.angle = Math.atan2(ty - sy, tx - sx);
    this.speed = 2;
    this.acceleration = 1.05;
    this.brightness = random(90, 100);
    // circle target indicator radius
    this.targetRadius = 2;
  }

  update(index) {
    // remove last item in coordinates array
    this.coordinates.pop();
    // add current coordinates to the start of the array
    this.coordinates.unshift([this.x, this.y]);

    // cycle the circle target indicator radius
    if (this.targetRadius < 8) {
      this.targetRadius += 0.3;
    } else {
      this.targetRadius = 1;
    }

    // speed up the firework
    this.speed *= this.acceleration;

    // get the current velocities based on angle and speed
    const vx = Math.cos(this.angle) * this.speed;
    const vy = Math.sin(this.angle) * this.speed;
    // how far will the firework have traveled with velocities applied?
    this.distanceTraveled = calculateDistance(this.sx, this.sy, this.x + vx, this.y + vy);

    // if the distance traveled, including velocities, is greater than the initial distance to the target, then the target has been reached
    if (this.distanceTraveled >= this.distanceToTarget) {
      const particleCount = 100;

      for (let i = 0; i < particleCount; i += 1) {
        this.particles.push(new Particle(this.tx, this.ty, this.particles, this.hue));
      }
      // remove the firework, use the index passed into the update function to determine which to remove
      this.fireworks.splice(index, 1);
    } else {
      // target not reached, keep traveling
      this.x += vx;
      this.y += vy;
    }
  }

  draw(ctx) {
    ctx.beginPath();
    // move to the last tracked coordinates in the set, then draw a line to the current x and y
    ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
    ctx.strokeStyle = `hsl(${this.hue}, 100%, ${this.brightness}%)`;
    ctx.lineWidth = 2;
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
  }
}


class Scene extends createjs.Container {
  constructor() {
    super();
    this.fireworks = [];
    this.particles = [];

    this.background = new createjs.Bitmap(shapes.shots.first.backgroud);
    this.background.x = -120;
    this.background.y = -120;
    this.addChild(this.background);
    this.isPaused = false;
    this.hue = 0;
  }
  shoot(fx, fy, tx, ty, hue) {
    this.hue = hue;
    this.fireworks.push(new Firework(fx, fy, tx, ty, this.fireworks, this.particles, this.hue));
  }
  pause() {
    this.isPaused = true;
  }
  draw(ctx) {
    super.draw(ctx);

    this.fireworks.forEach((firework, i) => {
      firework.draw(ctx);
      if (this.isPaused) return;
      firework.update(i);
    });
    this.particles.forEach((particle, i) => {
      particle.draw(ctx);
      if (this.isPaused) return;
      particle.update(i);
    });
  }
}

export { Scene as default };

