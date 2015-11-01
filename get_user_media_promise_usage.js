Promise.all([
  load_script_promise("get_user_media_promise.js")
]).then(function(){
  var ac = new AudioContext()
  get_user_media_promise({audio:true})
  .then(function(stream){
    var src = URL.createObjectURL(stream)
    var source = audio_context.createMediaStreamSource(stream)
    source.connect(ac.destination)
  })
})