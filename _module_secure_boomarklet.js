javascript:(function(){
  window.load_script_path = 'https://rawgit.com/dtestyk/js_utils/master/';
  window.load_script_promise = function(file){
    var is_full_path = file.slice(0, 7) == 'http://'
      || file.slice(0, 8) == 'https://';
    var url = is_full_path? file: window.load_script_path + file;
    return new Promise(function(resolve, reject){
      var script = document.querySelector('script[src="'+url+'"]');
      if(script) resolve(script);
      else{
        var head = document.getElementsByTagName('head')[0];
        script = document.createElement('script');
        script.type = 'text/javascript';
        script.addEventListener('load', function(){
          this.removeEventListener('load', arguments.callee);
          resolve(script);
        });
        script.src = url;
        head.appendChild(script);
      };
    });
  };

  window.dom_ready_promise = new Promise(function(resolve, reject){
    var isReady = document.readyState=='loaded'||document.readyState=='complete';
    if(isReady){
      resolve();
    }else{
      document.addEventListener('DOMContentLoaded', function () {
        document.removeEventListener('DOMContentLoaded', arguments.callee);
        resolve();
      });
    }
  });

  window.execute_script_promise = function(name){
    return new Promise(function(resolve, reject){
      if(window[name+'_promise']) window[name+'_promise'].then(resolve);
      else load_script_promise(name+".js")
      .then(function(){
        window[name+'_promise'].then(resolve);
      });
    });
  };

  window.module = function(own_name, depencies, func){
    var execs = depencies.map(function(name){return execute_script_promise(name)});
    window[own_name+'_promise'] = Promise.all(execs).then(func);
  };
}())