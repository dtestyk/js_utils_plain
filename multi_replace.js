var esc = function(s){return '__'+s+'__'}

var escape_array = function(str, arr) {
   var strreg = '(' + arr.join('|').replace('\\\\','\\') + ')'
   var regex = new RegExp(strreg, 'g');
   return str.replace(regex, esc);
}

var multi_replace = function(str, arr2){
  var arr=arr2.map(function(a) {return a[0];});
  var obj=arr2.reduce(function(obj, a) {obj[a[0]]=a[1]; return obj;}, {})
  var str_res = escape_array(str, arr)
  for(var i=0; i<arr.length; i++){
	var s = arr[i]
    var regex = new RegExp(esc(s), 'g')
    str_res = str_res.replace(regex, obj[s])
  }
  return str_res
}

multi_replace("tar pit", [["tar","capitol"], ["pit","house"]]);
multi_replace ("xxx> yyy> <<",[["(\\S+)>","<>$1<\\>>"]])