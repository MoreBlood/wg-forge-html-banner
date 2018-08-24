/* global createjs */

class Scene extends createjs.Container {
  constructor() {
    super();
    this.fireworks = [];
    this.particles = [];

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


class Fireworks {

  constructor(settings = {
    partCount: 250,
    currentHue: 30,
    partSpeed: 1,
    partSpeedVariance: 6,
    partWind: 50,
    partFriction: 9,
    partGravity: 0.3,
    hueMin: 0,
    hueMax: 360,
    rocketSpeed: 0.4,
    rocketAccel: 10,
    hueVariance: 30,
    flickerDensity: 25,
    clearAlpha: 15,
    lineWidth: 1,
  }) {

  }
  function fwInit() {
    particles = [];
    // кол-во разлетающихся частиц
    partCount = 250;
    fireworks = [];
    // стартовый цвет
    currentHue = 30;
    // скорость разлета частиц: боьше скорость - больше радиус разлета
    partSpeed = 1;
    // разница в скорости разлета
    partSpeedVariance = 6;
    // кривизна сноса частиц
    partWind = 50;
    // торможение частиц
    partFriction = 9;
    // гравитация, при + опускание вниз, при - поднятие вверх
    partGravity = 0.3;
    // цветовая шкала hue , при одинаковых значениях - один цвет
    hueMin = 0;
    hueMax = 360;
    // скорость взлета ракеты
    rocketSpeed = 0.4;
    // ускорение взлета ракеты
    rocketAccel = 10;
    // разбежка цвета
    hueVariance = 30;
    // яркость фликера после разлета частиц
    flickerDensity = 25;
    // длительность затухания
    clearAlpha = 15;
    // толщина линии фейерверка
    lineWidth = 1;
  }
  createParticles = function (x, y, hue) {
    let countdown = partCount;
    while (countdown--) {
      const newParticle =
			{
			  x,
			  y,
			  coordLast: [
			    { x, y },
			    { x, y },
			    { x, y },
			  ],
			  angle: randomization(0, 360),
			  speed: randomization(((partSpeed - partSpeedVariance) <= 0) ? 1 : partSpeed - partSpeedVariance, (partSpeed + partSpeedVariance)),
			  friction: 1 - partFriction / 100,
			  gravity: partGravity / 2,
			  hue: randomization(hue - hueVariance, hue + hueVariance),
			  brightness: randomization(50, 80),
			  alpha: randomization(40, 100) / 100,
			  decay: randomization(10, 50) / 1000,
			  wind: (randomization(0, partWind) - (partWind / 2)) / 25,
			  lineWidth,
			};
      particles.push(newParticle);
    }
  };
  updateParticles = function () {
    let i = particles.length;
    while (i--) {
      const p = particles[i];
      const radians = p.angle * Math.PI / 180;
        	const vx = Math.cos(radians) * p.speed;
        	const vy = Math.sin(radians) * p.speed;
      p.speed *= p.friction;

      p.coordLast[2].x = p.coordLast[1].x;
      p.coordLast[2].y = p.coordLast[1].y;
      p.coordLast[1].x = p.coordLast[0].x;
      p.coordLast[1].y = p.coordLast[0].y;
      p.coordLast[0].x = p.x;
      p.coordLast[0].y = p.y;

      p.x += vx;
      p.y += vy;
      p.y += p.gravity;

      p.angle += p.wind;
      p.alpha -= p.decay;

      if (p.alpha < 0.05) {
        particles.splice(i, 1);
      }
    }
  };

  drawParticles = function () {
    let i = particles.length;
    while (i--) {
      const p = particles[i];

      const coordRand = (randomization(1, 3) - 1);
      ctx.beginPath();
      ctx.moveTo(Math.round(p.coordLast[coordRand].x), Math.round(p.coordLast[coordRand].y));
      ctx.lineTo(Math.round(p.x), Math.round(p.y));
      ctx.closePath();
      ctx.strokeStyle = `hsla(${p.hue}, 100%, ${p.brightness}%, ${p.alpha})`;
      ctx.stroke();

      if (flickerDensity > 0) {
        const inverseDensity = 50 - flickerDensity;
        if (randomization(0, inverseDensity) === inverseDensity) {
          ctx.beginPath();
          ctx.arc(Math.round(p.x), Math.round(p.y), randomization(p.lineWidth, p.lineWidth + 3) / 2, 0, Math.PI * 2, false);
          ctx.closePath();
          const randAlpha = randomization(50, 100) / 100;
          ctx.fillStyle = `hsla(${p.hue}, 100%, ${p.brightness}%, ${randAlpha})`;
          ctx.fill();
        }
      }
    }
  };

  createFirework = function (startX, startY, targetX, targetY) {
    currentHue = randomization(hueMin, hueMax);
    const newFirework =
		{
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
		  speed: rocketSpeed,
		  angle: Math.atan2(targetY - startY, targetX - startX),
		  shockwaveAngle: Math.atan2(targetY - startY, targetX - startX) + (90 * (Math.PI / 180)),
		  acceleration: rocketAccel / 100,
		  hue: currentHue,
		  brightness: randomization(50, 80),
		  alpha: randomization(50, 100) / 100,
		  lineWidth,
		};
    fireworks.push(newFirework);
  };

  updateFw = function () {
    let i = fireworks.length;
    while (i--) {
      const f = fireworks[i];
      ctx.lineWidth = f.lineWidth;

      vx = Math.cos(f.angle) * f.speed,
      vy = Math.sin(f.angle) * f.speed;
      f.speed *= 1 + f.acceleration;
      f.coordLast[2].x = f.coordLast[1].x;
      f.coordLast[2].y = f.coordLast[1].y;
      f.coordLast[1].x = f.coordLast[0].x;
      f.coordLast[1].y = f.coordLast[0].y;
      f.coordLast[0].x = f.x;
      f.coordLast[0].y = f.y;

      if (f.startX >= f.targetX) {
        if (f.x + vx <= f.targetX) {
          f.x = f.targetX;
          f.hitX = true;
        } else {
          f.x += vx;
        }
      } else
      if (f.x + vx >= f.targetX) {
        f.x = f.targetX;
        f.hitX = true;
      } else {
        f.x += vx;
      }

      if (f.startY >= f.targetY) {
        if (f.y + vy <= f.targetY) {
          f.y = f.targetY;
          f.hitY = true;
        } else {
          f.y += vy;
        }
      } else
      if (f.y + vy >= f.targetY) {
        f.y = f.targetY;
        f.hitY = true;
      } else {
        f.y += vy;
      }

      if (f.hitX && f.hitY) {
        createParticles(f.targetX, f.targetY, f.hue);
        fireworks.splice(i, 1);
      }
    }
  };

  drawFireworks = function () {
    let i = fireworks.length;
    ctx.globalCompositeOperation = 'lighter';
    while (i--) {
      const f = fireworks[i];
      ctx.lineWidth = f.lineWidth;
      const coordRand = (randomization(1, 3) - 1);
      ctx.beginPath();
      ctx.moveTo(Math.round(f.coordLast[coordRand].x), Math.round(f.coordLast[coordRand].y));
      ctx.lineTo(Math.round(f.x), Math.round(f.y));
      ctx.closePath();
      // ctx.strokeStyle = 'hsla('+f.hue+', 100%, '+f.brightness+'%, '+f.alpha+')';
      ctx.strokeStyle = 'white';
      ctx.stroke();
    }
  };
  //
  fwInit();
}
function updateFireworks() {
  const ctx = canvasFireworks.getContext('2d');
  ctx.globalCompositeOperation = 'destination-out';
  ctx.fillStyle = `rgba(0,0,0,${clearAlpha / 100})`;
  ctx.fillRect(0, 0, w, h);
  updateFw();
  updateParticles();
  drawFireworks();
  drawParticles();
}

randomization = function (rA, rB) {
  // return ~~((Math.random()*(rB-rA+1))+rA);
  return Math.floor((Math.random() * (rB - rA + 1)) + rA);
};

