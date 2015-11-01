Promise.all([
  load_script_promise("namify.js")
]).then(function(){
  var old_open = XMLHttpRequest.prototype.open
  XMLHttpRequest.prototype.open = function() {
    var detail = namify(arguments, ['method','url','isAsync','user','pass'])
    detail.emitter = this
    detail.onsend = null
    detail.onresponse = null
    var event = new CustomEvent('xhr open', {detail: detail})
    document.dispatchEvent(event)
    old_open.apply(this, arguments)
    var old_send = this.send
    this.send = function(data){
      detail.onsend&&detail.onsend.call(this, data)
      old_send.apply(this, arguments)
    }
    this.addEventListener('loadend', function(){
      detail.onresponse&&detail.onresponse.call(this, this.response)
    })
  }
})