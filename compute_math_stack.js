window.compute_math_stack = function(arr){
	var i=arr.length
	while(i--){
		var val = arr.splice(i,1)[0]
		var res
		if(typeof val == "string") val = Math[val]
		if(typeof val == "number"){
			res = val
		}else if(typeof val == "function"){
			var func = val
			var n = func.length
			var args = arr.splice(i,n)
			res = func.apply(null,args)
		}
		arr.splice(i, 0, res);
	}
	return arr[0]
}