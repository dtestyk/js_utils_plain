Promise.all([
  load_script_promise("dispatch_messages.js")
]).then(function(){
  canceled = !dispatchKeyboardEvent(element,
    'keydown', true, true,  // type, bubbles, cancelable
    null,  // window
    'h',  // key
    0, // location: 0=standard, 1=left, 2=right, 3=numpad, 4=mobile, 5=joystick
    '');  // space-sparated Shift, Control, Alt, etc.
  dispatchKeyboardEvent(element, 'keypress', true, true, null, 'h', 0, '');
  if (!canceled) {
    if (dispatchTextEvent(element, 'textInput', true, true, null, 'h', 0)) {
      element.value += 'h';
      dispatchSimpleEvent(element, 'input', false, false);
      // not supported in Chrome yet
      // if (element.form) element.form.dispatchFormInput();
      dispatchSimpleEvent(element, 'change', false, false);
      // not supported in Chrome yet
      // if (element.form) element.form.dispatchFormChange();
    }
  }


  dispatchKeyboardEvent(element, 'keyup', true, true, null, 'h', 0, '');
  dispatchMouseEvent(element, 'click', true, true);


dispatchKeyboardEvent2('#kinput', 'keydown', 49)

dispatchKeyboardEvent2('video', 'keydown', 'k')

dispatchKeyboardEvent2('body', 'keydown', 27)
dispatchKeyboardEvent2('body', 'keyup', 27)
})