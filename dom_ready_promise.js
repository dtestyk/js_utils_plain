window.dom_ready_promise = function(){
	return new Promise(function(resolve, reject){
		var isReady = document.readyState=='loaded'||document.readyState=='complete'
		
		if(isReady){
			resolve(document)
		}else{
			document.addEventListener('DOMContentLoaded', function () {
				document.removeEventListener('DOMContentLoaded', arguments.callee)
				resolve(document)
			})
		}
	})
}