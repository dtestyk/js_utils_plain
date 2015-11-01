const w = 600
const h = 200

var vd = document.querySelector("video")

var context = new AudioContext();
var gainNode = context.createGain();
var analyser = context.createAnalyser();


gainNode.gain.value = 1;
analyser.fftSize = 2048;

var source = context.createMediaElementSource(vd);
var n = analyser.frequencyBinCount;
var data = new Float32Array(n);
var mfp = max_freq_plot(0, 200)

source.connect(gainNode);
gainNode.connect(analyser);
analyser.connect(context.destination);

function argmax(a, i, j){
  if (i >= j)return undefined;

  var k = i;
  var v = a[k];

  while(++i<=j) if(a[i]>v) k=i, v=a[i]
  return k;
}

var recs = []

function draw() {
  requestAnimationFrame(draw);
  analyser.getFloatFrequencyData(data);
  var i_max = argmax(data, 0, 200)
  var id = i_max
  recs[id] = recs[id]||{
    n:0,
    v:-Infinity,
    t:undefined,
    fr:i_max/n*context.sampleRate/2
  }
  recs[id].n++
  var val = data[i_max]
  var t = vd.currentTime
  if(val>recs[id].v){
    recs[id].t = t
    recs[id].v = val
  }
  mfp.draw(data)
};

function start(){
  recs = {}
  mfp.start()
  draw();
}

start()

function max_freq_plot(i1, i2){
  var canvas = document.createElement('canvas')
  canvas.width = w;
  canvas.height = h;
  var ctx = canvas.getContext('2d')
  
  function draw_circle(x, y, r){
    var h = Math.floor(x/w*3600)%360;
    ctx.strokeStyle = 'hsl('+h+', 100%, 50%)';
    ctx.beginPath();
    ctx.arc(x, y, r, 0,2*Math.PI);
    ctx.stroke();
  }

  var v1=+Infinity
  var v2=-Infinity
  function draw(data) {
    var i_max = argmax(data, i1, i2)
    var v_max = data[i_max]
    if(v_max<-90) return
    var x = vd.currentTime/vd.duration*w
    var y = (i_max-i1)/(i2-i1)*h
    v1 = Math.min(v1, v_max)
    v2 = Math.max(v2, v_max)
    var r = v2>v1? (v_max-v1)/(v2-v1)*10: 5
    draw_circle(x, y, r)
  }

  function start(){
    document.querySelector('#action-panel-details').appendChild(canvas);
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillRect(0, 0, w, h);
    recs = {}
  }
  
  canvas.onclick = function(e){
    console.log(e)
    var x = e.offsetX
    var y = e.offsetY
    vd.currentTime = x/w*vd.duration
  }
  return{
    start: start,
    draw: draw
  }
}

JSON.stringify(recs).split('},').join('},\n')