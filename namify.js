window.namify = function(arr, names){
  var obj={}
  var n=Math.min(arr.length, names.length)
  for(var i=0; i<n; i++){
    var name = names[i]
    if(name) obj[name] = arr[i]
  }
  return obj
}