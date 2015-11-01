Promise.all([
  load_script_promise("wait_custom_event_promise.js")
]).then(function(){
  wait_event_promise('test')
  .then(function(time) {
    console.log('first test event time: ' + time)
  })

  var test_event = new CustomEvent('test', { 'detail':  Date.now()})
  document.dispatchEvent(test_event)
})