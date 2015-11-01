window.get_user_media_promise = function(params){
  return new Promise(function(resolve, reject){
    navigator.getUserMedia(params, resolve, reject)
  });
}