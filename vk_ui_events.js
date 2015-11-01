//# region planner
var _=(function(){
 var queue=[];
 var play=function(){
   var item=queue.shift();
    if(item){
		if(typeof(item) == "function") item(), play();
		else if(typeof(item) == "number") setTimeout(play, item);
    }
   }
 return {
   do:function(f){
    queue.push(f);
   },
   wait:function(t){
    queue.push(t);
   },
   start:play 
 }
})();
//#end

//#region dispatch events
var dispatchMouseEvent = function(target, var_args) {
  var e = document.createEvent("MouseEvents");
  // If you need clientX, clientY, etc., you can call
  // initMouseEvent instead of initEvent
  e.initEvent.apply(e, Array.prototype.slice.call(arguments, 1));
  target.dispatchEvent(e);
};
var dispatchKeyboardEvent = function(target, initKeyboradEvent_args) {
  var e = document.createEvent("KeyboardEvents");
  e.initKeyboardEvent.apply(e, Array.prototype.slice.call(arguments, 1));
  target.dispatchEvent(e);
};
var dispatchTextEvent = function(target, initTextEvent_args) {
  var e = document.createEvent("TextEvent");
  e.initTextEvent.apply(e, Array.prototype.slice.call(arguments, 1));
  target.dispatchEvent(e);
};
var dispatchSimpleEvent = function(target, type, canBubble, cancelable) {
  var e = document.createEvent("Event");
  e.initEvent.apply(e, Array.prototype.slice.call(arguments, 1));
  target.dispatchEvent(e);
};
//#region

//# reion scroll to bottom
(function(){
	var scrollY_before = scrollY;
	scrollTo(0,scrollY_before+100)
	//console.log(scrollY,scrollY_before)
	if(scrollY_before < scrollY){
		setTimeout(arguments.callee, 10)
	}
})()
//#region

var units = document.evaluate("//a[contains(., 'Дима Сорокин')]", document.documentElement, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i=0; i<units.snapshotLength; i++) {
	var unit = units.snapshotItem(i)
	//process_unit(unit);
    console.log(unit.outerHTML);
}

var process_unit = function(unit){
	_.do(function(){
		console.log("going to person page")
		dispatchMouseEvent(unit, 'click', true, true);
	});
	_.wait(500);

	_.do(function(){
		console.log("send message button clicking")
		var result = document.evaluate("//button[contains(., 'Отправить сообщение')]", document.documentElement, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var element = result.snapshotItem(0);
		dispatchMouseEvent(element, 'click', true, true);
	})
	_.wait(500);
	
	_.do(function(){
		console.log("insert invitation text")
		var result = document.evaluate("//div[@id='mail_box_editable']", document.documentElement, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var editor = result.snapshotItem(0)
		dispatchTextEvent(editor, 'textInput', true, true, null, 'Привет, вступай в группу Дим Сорокиных!', 0)
	})
	_.wait(100);

	_.do(function(){
		console.log("send invitation")
		var result = document.evaluate("//button[contains(., 'Отправить')]", document.documentElement, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var element = result.snapshotItem(0);
		//dispatchMouseEvent(element, 'click', true, true);
	})
	_.wait(500);
	
	_.do(function(){
		console.log("return to list")
		history.back();
	})
	_.wait(500);
	
	_.start();
}