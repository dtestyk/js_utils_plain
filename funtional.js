var some_chain_func = function(str){
  console.log('inside some_label',str)
  return arguments.callee
}
some_chain_func('hello')('bye')
  
var some_curring_func = function(){
  var args = Array.prototype.slice.call(arguments);
  console.log('inside some_label',args)
  
  return Function.prototype.bind.apply(arguments.callee, [this].concat(args))
}
some_curring_func('hello')('bye')
  
  
function curry(f, n){
  var n = f.length || n || 0
  return function(){
    var args = Array.prototype.slice.call(arguments)
    if(args.length < n) return Function.prototype.bind.apply(arguments.callee, [this].concat(args))
    else return f.apply(this, args)
  }.bind(this)
}
var log = console.log.bind(console)
curry(log, 2)('hello')('bye')
curry(log, 3)('hello','lll')('bye')
curry(curry(some_chain_func)(1)('first'))(2)('second')

function mcurry(f, n){
  var n = f.length || n || 0
  return function(){
    var args = Array.prototype.slice.call(arguments)
    if(args.length == n){
      f.apply(this, args)
      args.length = 0
    }
    return Function.prototype.bind.apply(arguments.callee, [this].concat(args))
  }.bind(this)
}

mcurry(log, 2)('hello1')('bye1')('hello2')('bye2')

function ccurry(f, nIn){
  var n = f.length || nIn || 0
  return function(){
    var args = Array.prototype.slice.call(arguments)
    if(args.length == n){
      var res = f.apply(this, args)
      args.length = 0
      if(typeof res == 'function') return ccurry(res, nIn)
      else return res
    }
    return Function.prototype.bind.apply(arguments.callee, [this].concat(args))
  }.bind(this)
}

var some_chain_func = function(i,str){
  console.log('some_chain_func',i,str)
  return function(k,v){
    if(k) {
      console.log('k',k,str,v)
      return arguments.callee.bind(this, k-1)
    }
    else return 0
  }.bind(this,i)
}
ccurry(some_chain_func)(2)('pref')('v1')('v2')
ccurry(some_chain_func)(2)('pref')('v1')('v2')('v3')


ccurry(some_chain_func, 1)(1)('first')('logged')



