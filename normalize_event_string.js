text = 'CORE.PlayerEvent(volume,0.6216)'
text = '"NEW YORK" (Reuters) U.S. stock index futures pointed to a slight rebound on Wall Street on Wednesday, with futures for the S&P 500 up 0.34 percent, Dow Jones futures up 0.12 percent and Nasdaq 100 futures up 0.51 percent at 0921 GMT.'

var vars = []
text
.replace(/[-+]?\d\.?\d*|"[^"]*"/g, function(x){var i=vars.length; vars.push(x); return "$"+i})
.replace(/\.+$/,'')

.replace(/(\w+)\./g,'$1: ')

.replace(/(\w+) *\(/g,'$1: ')
.replace(/([A-Z][a-z0-9]+)/g,' $1 ')
.replace(/[^\w.:$]/g,' ')
.replace(/ +/g,' ')
.toLowerCase()
.trim()
.replace(/\$(\d+)/g, function(x){var i=Number(x.slice(1)); return vars[i]})


//extract vars
var text = '"NEW YORK" (Reuters) U.S. stock index futures pointed to a slight rebound on Wall Street on Wednesday, with futures for the S&P 500 up 0.34 percent, Dow Jones futures up 0.12 percent and Nasdaq 100 futures up 0.51 percent at 0921 GMT.'
var vars = []
var format = text.replace(/[-+]?\d\.?\d*|"[^"]*"/g, function(x){var i=vars.length; vars.push(x); return "$"+i})
console.log("format : ", format)
console.log("vars: ", vars)