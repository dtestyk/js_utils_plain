window.dom_ready_promise = new Promise(function(resolve, reject){
  var isReady = document.readyState=='loaded'||document.readyState=='complete'
  if(isReady){
    resolve()
  }else{
    document.addEventListener('DOMContentLoaded', function () {
      document.removeEventListener('DOMContentLoaded', arguments.callee)
      resolve()
    })
  }
})