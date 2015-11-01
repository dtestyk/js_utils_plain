var time = 10*1000
var process = function(record){console.log(record)}
var ct = circle_timeout(time, process)
.play()
.insert({id:5})

ct.insert({id:6})
ct.remove({id:5})

ct.pause()
ct.play()

http://jsfiddle.net/gj93btc5/