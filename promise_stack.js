//promise stack:
//each node:
// gets array 
// modify array heads elements
// resolve modified array

var init=Promise.resolve.bind(Promise)
var join=Promise.all.bind(Promise)
var race=Promise.race.bind(Promise)

//#region debug
function view_stack(args){
	console.log(args)
	return Promise.resolve(args)
}
//#end

function reverse_stack(args){
	args.reverse()
	return Promise.resolve(args)
}

function wait(args){
	var time=args.shift()
	return new Promise(function(resolve, reject){
		setTimeout(function(args){
			resolve(args);
		}, time, args)
	});
}

function wait_event(args){
	var event=args.shift()
	return new Promise(function(resolve, reject){
		document.addEventListener(event, function (e) {
			document.removeEventListener(event, arguments.callee);
			resolve(args);
		});
	});
}

function emit(args){
	var type=args.shift()
	var event = document.createEvent('Event')
	event.initEvent(type, true, true)
	document.dispatchEvent(event)
	return Promise.resolve(args)
}

function plus(args){
	var a=args.shift()
	var b=args.shift()
	var sum=a+b
	args.unshift(sum)
	return Promise.resolve(args)
}

function show(args){
	var val=args.shift()
	console.log(val)
	return Promise.resolve(args)
}

function dup(args){
	var val=args.shift()
	args.unshift(val)
	args.unshift(val)
	return Promise.resolve(args)
}

function append(val){
	return function(args){
		args.unshift(val)
		return Promise.resolve(args)
	}
}

function unwrap(args){
	var plane_args=Array.prototype.concat.apply([],args)
	return Promise.resolve(plane_args)
}

function select(args){
	var arr=args.shift()
	var index=args.shift()
	Array.prototype.unshift.apply(args,arr[index])
	return Promise.resolve(args)
}

init([5,6,5000,"hello"])
.then(plus)
.then(dup)
.then(show)
.then(append(10))
.then(plus)
.then(show)
.then(wait)
.then(show)

join([
  wait([1000]).then(append(10)),
  plus([5,6])
]).then(unwrap)
.then(plus)
.then(show)

init(["some click","event occur"])
.then(wait_event)
.then(show)

join([
	wait([500]),
	race([
		wait([1000,0]),
		wait_event(["document click",1]),
		wait_event(["document right click",2]),
	])
]).then(unwrap)
.then(append([["nothing"],["usual"],["right"]]))
.then(select)
.then(show)
.then(append("some click")).then(emit)

init(["document click"]).then(emit)