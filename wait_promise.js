window.wait_promise = function(time, param){
	return new Promise(function(resolve, reject){
		setTimeout(function(param){
			resolve(param);
		}, time, param)
	});
}