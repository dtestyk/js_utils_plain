
Math.mul = function(x,y){return x*y}
var arr = ["floor","mul","random",256]

function compute_math_stack(arr){
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

//#region data
var nInputs = 1024
var masks=[]
var keys=[]
var mediums=[]
//#end

//#region fill arrs
for(var i=0;i<30;i++){
	var mask=compute_math_stack(["floor","mul","random",nInputs])
	var mask1=compute_math_stack(["floor","mul","random",nInputs])
	var key=compute_math_stack(["floor","mul","random",nInputs])
	masks[i]=mask&mask1
	keys[i]=key&mask
}
//#end

//#region process
var x=compute_math_stack(["floor","mul","random",nInputs])
var t=x>100? 5: 3
/*
var x=90
var t=0
*/
var out_counters=[]

var val=0
for(var i=0;i<30;i++){
	var mask=masks[i]
	var key=keys[i]
	var is_match=(x&mask)==key
	val |= (is_match)<<i
	if(is_match&&t) mediums[i]=t
	if(is_match&&!t){
	    var out=mediums[i]
		out_counters[out] = (out_counters[out]||0)+1
	}
}
val |= 1<<30
//#end

//#show result
console.log(val.toString(2))
console.log(mediums)
console.log(out_counters)
//#end







