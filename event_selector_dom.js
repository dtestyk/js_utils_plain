function event_selector(e){
  var root=document.createElement('div')
  document.body.appendChild(root)

  var curr = root
  var n = 0

  function append(e, attrs){
    var attrs = attrs || Object.keys(e)
    var el=document.createElement('div')
    el.event = {}
    for(var i=0; i<attrs.length; i++){
      var attr = attrs[i]
      if(e.hasOwnProperty(attr)){
        var v = e[attr]
        el.event[attr] = v
        el.setAttribute(attr, v)
      }
    }
    el.className = e.type
    curr.appendChild(el)
    curr = el
    ++n
    return this
  }
  
  function handler(e){
    append(e)
  }
  
  function listen(el, event){
    el.addEventListener(event, handler)
    return this
  }
  
  function unlisten(el, event){
    el.removeEventListener(event, handler)
    return this
  }

  function query(sel){
    var els = root.querySelectorAll(sel)
    var es = Array.prototype.map.call(els, function(el){return el.event})
    return es
  }

  function clear(n_max){
    var n_max = n_max||0
    while(n>n_max){
      var has_child = root.hasChildNodes()
      var has_grand_child = has_child && root.firstChild.hasChildNodes()
      if(has_grand_child) root.appendChild(root.firstChild.firstChild)
      root.removeChild(root.firstChild)
      n--
      if(n==0)curr=root
    }
    return this
  }
  return {
    append: append,
    query: query,
    clear: clear,
    listen: listen,
    unlisten: unlisten
  }
}