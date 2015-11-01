const w = 600
const h = 200

v = document.querySelector("video")
canvas = document.createElement('canvas')

var context = new AudioContext();
var gainNode = context.createGain();
var analyser = context.createAnalyser();


gainNode.gain.value = 1;
analyser.fftSize = 2048;
canvas.width = w;
canvas.height = h;

var source = context.createMediaElementSource(v);
var ctx = canvas.getContext('2d')
var n = analyser.frequencyBinCount;
var data = new Float32Array(n);
var bin_freq = context.sampleRate/n
var i1 = Math.floor(60/bin_freq)
var i2 = Math.ceil(1000/bin_freq)

source.connect(gainNode);
gainNode.connect(analyser);
analyser.connect(context.destination);
document.querySelector('#action-panel-details').appendChild(canvas);

function draw_spliter(x){
  ctx.strokeStyle = 'yellow';
  ctx.beginPath();
  ctx.moveTo(x,0);
  ctx.lineTo(x,h);
  ctx.stroke();
}

function draw() {
  requestAnimationFrame(draw);
  analyser.getFloatFrequencyData(data);
  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.fillRect(0, 0, w, h);
  
  var bar = {w: w/n, h: 0}
  var x = 0;

  for(var i = 0; i < n; i++) {
    bar.h = (data[i] + 130)*2;
    ctx.fillStyle = 'rgb(' + Math.floor(bar.h+100) + ',50,50)';
    ctx.fillRect(x, h-bar.h, bar.w, bar.h);
    
    if(i==i1 || i==i2) draw_spliter(x)
    x += bar.w + 1;
  }
};

draw();
