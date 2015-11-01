Promise.all([
  load_script_promise("handle_click_dblclick.js")
]).then(function(){
  var el=document.querySelector("a")
  handle(el, alert)
})
