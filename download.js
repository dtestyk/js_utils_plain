var str_text='sometext'
var str_file_name='some.txt'

var a = document.createElement('a')
a.download = str_file_name;
var oUrl = URL.createObjectURL(new Blob([str_text], {type: 'text/plain'}))
a.href = oUrl
a.click()
delete a
URL.revokeObjectURL(oUrl)


var str_url='sometext'
var str_file_name='loopback.wav'

var a = document.createElement('a')
a.download = str_url
a.href = "http://127.0.0.1:8081/loopback.wav"
a.click()
delete a

