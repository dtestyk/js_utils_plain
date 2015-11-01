Promise.all([
  load_script_promise("intercept_xhr_open_send.js")
]).then(function(){
  document.addEventListener('xhr open', function (e) {
    console.log('xhr open handler: this: ', this)
    console.log('xhr open handler: url: ', e.detail.url)
    console.log(e)
    e.detail.onsend = function(data){
      console.log('xhr open handler: on send: this: ', this)
      console.log('send data: ', data)
    }
    e.detail.onresponse = function(response){
      console.log('xhr open handler: on response: response_0..99: ', response.slice(0, 100))
    }
  })
})


