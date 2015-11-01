var read_text_file = function(file){
	return new Promise(function(resolve, reject){
    		var reader = new FileReader();
    		reader.onload = function(){resolve(reader)}
		reader.onerror = function(){reject(reader)}
    		reader.readAsText(file);
	})
}