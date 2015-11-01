function execute_script_promise(name){
  return new Promise(function(resolve, reject){
    load_script_promise(name+".js")
    .then(function(){
      window[name+'_promise'].then(resolve)
    })
  })
}