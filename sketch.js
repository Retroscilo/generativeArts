const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');


const settings = {
  dimensions: [ 2048, 2048 ]
};

const grid = (length) => {
  const color = random.pick(palettes).concat(random.pick(palettes))
  const points = [];
  for(let x = 0; x < length; x++) {
    for(let y = 0; y < length; y++) {
      const u = length <= 1 ? 0.5 : x/(length-1);
      const v = length <= 1 ? 0.5 : y/(length-1);
      const radius = Math.abs(random.noise2D( u, v )) * 0.01;
      points.push({
        color: random.pick(color),
        radius: radius,
        position: [ u, v ],
        rotation: random.noise2D(u, v)
      })
    }
  }
  return points;
}

const points = grid(60).filter(() => random.value() > 0.3);
const margin = 600;

const sketch = () => {
  
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    points.forEach(({color, radius, position, rotation}) => {
      let [u,v] = position;
      let x = lerp(margin, width - margin, u);
      let y = lerp(margin, height - margin, v);

      context.save();
      context.fillStyle = color;
      context.font = `${radius * width}px "Helvetica"`;
      context.translate(x, y);
      context.rotate(rotation);
      context.fillText(`------------------audrey-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------`, 0, 0);
      context.restore();
    });
  };
};

canvasSketch(sketch, settings);
