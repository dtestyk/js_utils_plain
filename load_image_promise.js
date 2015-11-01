var load_image = function(src){
	return new Promise(function(resolve, reject){
		var img = new Image();
		img.onload = function() { resolve(img);}
		img.onerror = function() { reject(img);}
		img.src = src;
	});
}