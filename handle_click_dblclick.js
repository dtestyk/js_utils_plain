Promise.all([
  load_script_promise("click_promise.js"),
  load_script_promise("wait_promise.js")
]).then(function(){
  window.handle = function(el, h){
    click_promise(el)
    .then(function(){
      return Promise.race([
        wait_promise(700, 1),
        click_promise(el, 2)
      ])
    }).then(function(n){
      h(n)
      handle(el, h)
    })
  }
})