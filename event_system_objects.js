//событие множество меток
//у события одна вызывающая его комбинация
//когда событие происходит веса вызывающих меток корректируются


function tags_manager(cluster){
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
		//clasterization.extract(o)
		var tags=cluster.extract(o)
		_auto_set_tags(o, tags)
		
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
	return {
		set_event: _set_event,
		start: _start,
		stop: _stop,
		view: _view
	}
}

function listener(tags_manager){
	var arr_listen=[]
	
	var handler=function(str){
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

function cluster(){
	var eps_cluster=0.1
	var snapshots=[]
	var counter=[]	
	
	function _make_snapshot(o){
		return snapshots.push(o)-1
	}

	function _dist(o1, o2){
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
	
	function _recentest_tag_value(o){
		var val=0
		for(var tag in o){
			var x=o[tag]&&o[tag][0]||0
			if(x>val) val=x
		}
		return val
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

	function _increment_counter(i, tag){
		counter[i]=counter[i]||{}
		counter[i][tag]=counter[i][tag]||0
		counter[i][tag]++
	}

	function _append(o, tag){
		var isFound=false
		for(var i=0;i<snapshots.length;i++){
			var pretender=snapshots[i]
			if(_dist(pretender, o)<eps_cluster){
				isFound=true
				_increment_counter(i, tag)
			}
		}
		if(!isFound){
			var i=_make_snapshot(o)
			_increment_counter(i, tag)
		}
	}
	
	//predict tag without time
	//distance without scale
	
	//predict tag and time

	function _extract(o){
		var tags=[]
		for(var i=0;i<snapshots.length;i++){
			var pretender=snapshots[i]
			if(_dist(pretender, o)<eps_cluster) {
				if(counter[i]){
					for(var tag in counter[i]) tags.append(tag)
				}
			}
		}
		return tags
	}
	
	return {
		append: _append,
		extract: _extract
	}
}

var cluster_stub={
	append:function(o,tag){ },
	extract: function(o){return []}
}

//var cl=cluster()
//var tk=tags_keeper(cl)
var tm=tags_manager(cluster_stub)
var lis=listener(tm)

tm.start()
tm.set_event("start")
lis.add(document, 'click', 'document click')
tm.view()