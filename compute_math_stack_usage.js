Promise.all([
  load_script_promise("compute_math_stack.js")
]).then(function(){
  var mul = function(x,y){return x*y}
  result = compute_math_stack(["floor",mul,"random",256])
  console.log(result)
})