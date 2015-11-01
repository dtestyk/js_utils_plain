Promise.all([
  load_script_promise("decode_audio_data_promise.js")
]).then(function(){
  xhr("tada.wav", {responseType: "arraybuffer"})
  .then(decode_audio_data_promise.bind(null, ac))
  .then(function(buffer){
    source.buffer = buffer;
    source.connect(ac.destination);
    source.loop = false;
    source.start(0);
  })
})