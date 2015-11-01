Promise.all([
  load_script_promise("wait_promise.js")
]).then(function(){
  Promise.all([
    wait_promise(1000, "1 first late"),
    wait_promise(800, "2 second early")
  ])
  .then(function(args){
    console.log(args)
    is_order_saved = args[0].split(' ')[0] < args[1].split(' ')[0]
    console.log("is_order_saved: ", is_order_saved)
  })
})


Promise.all([
  load_script_promise("wait_promise.js")
]).then(function(){
  Promise.all([
    wait_promise(800, "1 first early"),
    wait_promise(1000, "2 second late")
  ])
  .then(function(args){
    console.log(args)
    is_order_saved = args[0].split(' ')[0] < args[1].split(' ')[0]
    console.log("is_order_saved: ", is_order_saved)
  })
})