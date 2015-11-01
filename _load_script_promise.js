window.load_script_path = ''
//window.load_script_path = 'http://127.0.0.1:82/js_utils/'
window.load_script_promise = function(file){
        var is_full_path = file.slice(0, 7) == 'http://'
          || file.slice(0, 8) == 'https://'
        var url = is_full_path? file: window.load_script_path + file
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