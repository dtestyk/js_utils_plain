is_arrays_equal = function(arr1, arr2){
  var a1 = arr1.slice()
  var a2 = arr2.slice()
  while(a1.length>0 && a2.length>0 && a1.pop()===a2.pop()){}
  return a1.length==0 && a2.length==0
}

is_arrays_equal = function(arr1, arr2){
  if(arr1.length !== arr2.length) return false
  for(var i=0; i<arr1.length; i++){
    if(arr1[i] !== arr2[i]) return false
  }
  return true
}

is_arrays_equal([1,2,3],[1,2,3])===true
is_arrays_equal([1,2],[1,2,3])===false
is_arrays_equal([1,2,4],[1,2,3])===false

is_array_symmetric = function(arr){
  var rev_arr=arr.slice().reverse()
  return is_arrays_equal(arr, rev_arr)
}

is_array_symmetric = function(arr){
  var a = arr.slice()
  while(a.length>1 && a.shift()===a.pop()){}
  return a.length<2
}

is_array_symmetric([1,2,3,2,1])===true
is_array_symmetric([1,2,2,1])===true
is_array_symmetric([1,2,1,2,1])===true
is_array_symmetric([1,2,1,2,2])===false