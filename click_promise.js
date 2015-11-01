window.click_promise = function(el, param){
  return new Promise(function(resolve, reject){
    el.addEventListener("click", function(e){
      el.removeEventListener(e.type, arguments.callee)
      resolve(param);
    })
  })
}