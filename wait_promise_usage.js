Promise.all([
  load_script_promise("wait_promise.js")
]).then(function(){
  wait_promise(5000, "hello")
  .then(alert)
})