window.load_script_promise = function(url){
	return new Promise(function(resolve, reject){
		var script = document.querySelector('script[src="'+url+'"]');
		if(script) resolve(script)
		else{
			var head = document.getElementsByTagName('head')[0]
			script = document.createElement('script')
			script.type = 'text/javascript'
			script.addEventListener('load', function(){
				this.removeEventListener('load', arguments.callee)
				resolve(script)
			})
			script.src = url
			head.appendChild(script)
		}
	})
}