Promise.all([
  load_script_promise("namify.js")
]).then(function(){
  var old_open = XMLHttpRequest.prototype.open
  XMLHttpRequest.prototype.open = function() {
    var open_args_obj = namify(arguments, ['method','url','isAsync','user','pass'])
    old_open.apply(this, arguments)
    var old_send = this.send
    this.send = function(data){
      console.log(this)
      console.log("send: open args obj", open_args_obj)
      console.log("send data", data)
      old_send.apply(this, arguments)
    }
  }
})


