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
var i2 = Math.ceil(3600/bin_freq)

source.connect(gainNode);
gainNode.connect(analyser);
analyser.connect(context.destination);

var argmax = function(a, i, j){
	if (i >= j)return undefined;

	var k = i;
	var v = a[k];

	while(++i<=j) if(a[i]>v) k=i, v=a[i]
	return k;
};


function draw_circle(x, y, r){
  var h = Math.floor(x/w*3600)%360;
  ctx.strokeStyle = 'hsl('+h+', 100%, 50%)';
  ctx.beginPath();
  ctx.arc(x, y, r, 0,2*Math.PI);
  ctx.stroke();
}

var v1=+Infinity
var v2=-Infinity

function draw() {
  requestAnimationFrame(draw);
  analyser.getFloatFrequencyData(data);
  var i_max = argmax(data, i1, i2)
  var v_max = data[i_max]
  if(v_max<-90) return
  var x = v.currentTime/v.duration*w
  var y = (i_max-i1)/(i2-i1)*h
  v1 = Math.min(v1, v_max)
  v2 = Math.max(v2, v_max)
  var r = v2>v1? (v_max-v1)/(v2-v1)*10: 5
  draw_circle(x, y, r)
};

function start(){
  document.querySelector('#action-panel-details').appendChild(canvas);
  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.fillRect(0, 0, w, h);
  draw();
}

start()