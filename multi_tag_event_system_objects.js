//событие множество меток
//у события одна вызывающая его комбинация
//когда событие происходит веса вызывающих меток корректируются


function tags_manager(cluster, events_predictor){
	var k=0.9
	var eps=1e-16
	var o={}
	var interval=null

	/*static*/ function _set_tag(o, tag){
		//clasterization.appeng(o, tag)
		o[tag] = o[tag]||[]
		o[tag].unshift(1)
	}

	function _set_event(str){
		events_predictor.append(o, str);
		var arr=str.split(' ')
		for(var i=0;i<arr.length;i++){
			var tag=arr[i]
			cluster.append(o, tag)
			_set_tag(o, tag)
		}
	}
	
	function _auto_set_tags(o, arr){
		for(var i=0;i<arr.length;i++){
			var tag=arr[i]
			_set_tag(o, tag)
		}
	}
	
	function _tick(){
		//proposed tags
		var tags=cluster.extract(o)
		_auto_set_tags(o, tags)
		
		var re=events_predictor.ready_events(o)
		//emit ready events
		if(re.length>0)	console.log("ready "+re)
		
		for(var tag in o){
			var tt=o[tag]
			for(var i=tt.length;i--;){
				tt[i] *= k
				if(tt[i]<eps) tt.pop()
			}
			if(o[tag].length === 0) delete o[tag]
		}
	}

	function _start(){
		interval = window.setInterval(_tick.bind(this), 100)
	}

	function _stop(){
		window.clearInterval(interval)
	}

	function _view(){
		var str_view=JSON.stringify(o)
		console.log(str_view)
	}
	
	function _get_state(){
		return o
	}
	return {
		set_event: _set_event,
		start: _start,
		stop: _stop,
		view: _view,
		get_state: _get_state
	}
}

function listener(tags_manager){
	var arr_listen=[]
	
	var handler=function(str){
		console.log("listener handle ",str)
		tags_manager.set_event(str)
	}

	function _add(obj, event, str){
		var func = handler.bind(null, str)
		arr_listen.push({
			obj: obj,
			event: event,
			func: func
		})
	
		obj.addEventListener(event, func, false)
	}
	
	function _clear(){
		for(var i=0; i<arr_listen.length; i++){
			var el=arr_listen[i]
			el.obj.removeEventListener(el.event, el.func, false)
		}
	}
	
	return {
		add: _add,
		clear: _clear
	}
}

function events_predictor(){
	var eps_events_match=0.1
	var k_correct=0.3
	/*var snapshots=[]
	var weights=[]
	var events=[]*/
	
	snapshots=[]
	weights=[]
	events=[]
	
	function _make_snapshot(o){
		return snapshots.push(o)-1
	}

	function _weighted_dist(o1, o2){
		//o1 is subset of o2(current)
		var d=0
		for(var tag in o1){
			var tt=o1[tag]
			for(var i=0;i<tt.length;i++){
				var w=weights[tag]&&weights[tag][i]||0
				var x1=tt[i]
				var x2=o2[tag]&&o2[tag][i]||0
				
				d+=w*Math.pow(x2-x1, 2)
			}
		}
		return d
	}
	
	
	function _homo_dist(o1, o2){
		//o1(pattern) is subset of o2(current)
		
		var max1=0
		var max2=0
		
		for(var tag in o1){
			var x1=o1[tag]&&o1[tag][0]||0
			var x2=o2[tag]&&o2[tag][0]||0
			if(x1>max1) max1=x1, max2=x2
		}
		
		var d=0
		for(var tag in o1){
			var tt=o1[tag]
			for(var i=0;i<tt.length;i++){
				var x1=tt[i]
				var x2=o2[tag]&&o2[tag][i]||0
				d+=Math.pow(x2/max2-x1/max1, 2)
			}
		}
		return d
	}

	function _create_weights(index){
		var o=snapshots[index]
		weights[index]={}
		for(var tag in o){
			var tt=o[tag]
			weights[index][tag]=[]
			for(var i=0;i<tt.length;i++){
				weights[index][tag][i]=1
			}
		}
	}
	
	function _correct_weights(index, o_curr){
		var o=snapshots[index]
		weights[index]={}
		for(var tag in o){
			var tt=o[tag]
			weights[index][tag]=[]
			for(var i=0;i<tt.length;i++){
				if(o_curr[tag]&&o_curr[tag][i]){
					weights[index][tag][i]*=1+k_correct
				}else{
					weights[index][tag][i]*=1-k_correct
				}
			}
		}
	}
	
	function _append(o, event){
		var isFound=false
		for(var i=0;i<events.length;i++){
			if(events[i] == event){
				isFound=true
				_correct_weights(i, o)
			}
		}
		console.log("isFound", isFound, event)
		if(!isFound){
			var i=_make_snapshot(o)
			_create_weights(i)
			events[i]=event
		}
	}
	
	//expected events
	//predict tag without time
	//distance without scale
	
	//ready events
	//predict event and time
	
	//proposed tags: _extract from event_system_object.js

	function _ready_events(o){
		var re=[]
		for(var i=0;i<snapshots.length;i++){
			var pretender=snapshots[i]
			if(_weighted_dist(pretender, o)<eps_events_match) {
				var event=events[i]
				re.push(event)
			}
		}
		return re
	}
	
	return {
		append: _append,
		ready_events: _ready_events
	}
}

var cluster_stub={
	append:function(o,tag){ },
	extract: function(o){return []}
}

var ep=events_predictor()
var tm=tags_manager(cluster_stub, ep)
var lis=listener(tm)

tm.start()
tm.set_event("start")
lis.add(document, 'click', 'document click')
tm.view()