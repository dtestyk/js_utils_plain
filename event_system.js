var k=0.9
var eps=1e-16
var o={}
var interval=null

function set_tag(o, tag){
	//clasterization.appeng(o, tag)
	cluster(o, tag)
	o[tag] = o[tag]||[]
	o[tag].unshift(1)
}

function set_tags(o, arr){
	for(var i=0;i<arr.length;i++){
		var tag=arr[i]
		set_tag(o, tag)
	}
}

function set_event(o, str){
	var arr=str.split(' ')
	set_tags(o, arr)
}

function auto_set_tags(o, arr){
	for(var i=0;i<arr.length;i++){
		var tag=arr[i]
		o[tag] = o[tag]||[]
		o[tag].unshift(1)
	}
}

var snapshots=[]
function make_snapshot(o){
	return snapshots.push(o)-1
}

function dist(o1, o2){
	//o1 is subset of o2(current)
	var d=0
	for(var tag in o1){
		var tt=o1[tag]
		for(var i=0;i<tt.length;i++){
			var x1=tt[i]
			var x2=o2[tag]&&o2[tag][i]||0
			d+=Math.pow(x2-x1, 2)
		}
	}
	return d
}

var counter=[]
function increment_counter(i, tag){
	counter[i]=counter[i]||{}
	counter[i][tag]=counter[i][tag]||0
	counter[i][tag]++
}

var eps_cluster=0.1
function cluster(o, tag){
	var isFound=false
	for(var i=0;i<snapshots.length;i++){
		var pretender=snapshots[i]
		if(dist(pretender, o)<eps_cluster){
			isFound=true
			increment_counter(i, tag)
		}
	}
	if(!isFound){
		var i=make_snapshot(o)
		increment_counter(i, tag)
	}
}

function extract(o){
	var tags=[]
	for(var i=0;i<snapshots.length;i++){
		var pretender=snapshots[i]
		if(dist(pretender, o)<eps_cluster) {
			if(counter[i]){
				for(var tag in counter[i]) tags.append(tag)
			}
		}
	}
	o
	return tags
}

function tick(){
	//clasterization.extract(o)
	var tags=extract(o)
	auto_set_tags(o, tags)
	
	for(var tag in o){
		var tt=o[tag]
		for(var i=tt.length;i--;){
			tt[i] *= k
			if(tt[i]<eps) tt.pop()
		}
		if(o[tag].length === 0) delete o[tag]
	}
}

function start(){
	interval = window.setInterval(tick, 100)
}

function stop(){
	window.clearInterval(interval)
}

function view(){
	var str_view=JSON.stringify(o)
	console.log(str_view)
}


start()
set_tag(o, "start")
view()