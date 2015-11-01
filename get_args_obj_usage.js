Promise.all([
  load_script_promise("namify.js"),
  load_script_promise("get_args_obj.js")
]).then(function(){
  function f(a,b,c){
    console.log(arguments)
    var named_args = get_args_obj(arguments)
    console.log(named_args)
  }
  console.log(f(5,9))
})