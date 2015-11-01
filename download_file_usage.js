Promise.all([
  load_script_promise("download_file.js")
]).then(function(){
  download_file("http://www.pulsradio.com/pls/puls-adsl.m3u")
})