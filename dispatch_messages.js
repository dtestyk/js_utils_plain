window.dispatchMouseEvent = function(target, var_args) {
  var e = document.createEvent("MouseEvents");
  // If you need clientX, clientY, etc., you can call
  // initMouseEvent instead of initEvent
  e.initEvent.apply(e, Array.prototype.slice.call(arguments, 1));
  target.dispatchEvent(e);
}
window.dispatchKeyboardEvent = function(target, initKeyboradEvent_args) {
  var e = document.createEvent("KeyboardEvents");
  e.initKeyboardEvent.apply(e, Array.prototype.slice.call(arguments, 1));
  target.dispatchEvent(e);
}
window.dispatchTextEvent = function(target, initTextEvent_args) {
  var e = document.createEvent("TextEvent");
  e.initTextEvent.apply(e, Array.prototype.slice.call(arguments, 1));
  target.dispatchEvent(e);
}
window.dispatchSimpleEvent = function(target, type, canBubble, cancelable) {
  var e = document.createEvent("Event");
  e.initEvent.apply(e, Array.prototype.slice.call(arguments, 1));
  target.dispatchEvent(e);
}
window.dispatchChangeEvent = function(target) {
  var evt = document.createEvent("HTMLEvents")
  evt.initEvent("change", false, true)
  target.dispatchEvent(evt)
}

function dispatchKeyboardEvent2(el, type, code, key_id){
  var el = typeof el=='string'? document.querySelector(el): el
  var code = typeof code=='string'? code.charCodeAt(0): code
  
  var hex = code.toString(16)
  var key_id = key_id || "U+0000".slice(0,-hex.length)+hex

  var e = document.createEvent('Event');
  var params = {
    altKey: false,
    bubbles: true,
    charCode: code,
    ctrlKey: false,
    cancelable: true,
    detail: 0,
    keyCode: code,
    keyIdentifier: key_id,
    keyLocation: 0,
    layerX: 0,
    layerY: 0,
    location: 0,
    metaKey: false,
    pageX: 0,
    pageY: 0,
    repeat: false,
    shiftKey: false,
    type: "keydown",
    view: window,
    which: code
  }
  for(var i in params) e[i]=params[i]
  e.initEvent('keydown', params.bubbles, params.cancelable);
  el.dispatchEvent(e);
}