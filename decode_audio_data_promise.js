window.decode_audio_data_promise = function(audioContext, audioData){
  return new Promise(function(resolve, reject) {
    audioContext.decodeAudioData(audioData,
      function(buffer){
        console.log("decoded")
        resolve(buffer)
      },
      function(e){
        reject(new Error("decode audio data error"))
      }
    )
  })
}