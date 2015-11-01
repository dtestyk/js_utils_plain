Promise.all([
  load_script_promise("namify.js")
]).then(function(){
  window.get_args_obj = function(args){
    var names = args.callee.toString()
      .replace(/^[^\(]*\(|\s|\)[^]+/g,'')
      .split(',')
    return namify(args, names)
  }
})