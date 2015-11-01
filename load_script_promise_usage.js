load_script_promise("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.js")
 .then(function(){
	html2canvas(document.body, {
	  onrendered: function(canvas) {
		document.body.appendChild(canvas);
	  }
	});
})

load_script_promise("https://cdn.rawgit.com/dtestyk/0d2650dcfb2248b4a13b/raw/1b7098db922379348443ce88d7580d21c621fcd1/compute_math_stack.js")
  .then(function(){
    console.log("compute math stack loaded")
    return load_script_promise("https://cdn.rawgit.com/dtestyk/a4f9754c95281546dbbc/raw/84c5214e4d26226dde18ac397713d66ddaf8957a/click_xy.js")
  }).then(function(){
    var mul = function(x, y){return x*y}
    var val = compute_math_stack(["floor",mul,"random",256])
    console.log("val",val)
    var log=function(e){console.log(e)}
    document.addEventListener('click', log)
    click(val, 300)
    document.removeEventListener('click', log)
  })

Promise.all([
  load_script_promise("http://dtestyk.github.io/js_utils/compute_math_stack.js"),
  load_script_promise("http://dtestyk.github.io/js_utils/click_xy.js")
]).then(function(){
    console.log("compute math stack and click xy loaded")
    var mul = function(x, y){return x*y}
    var val = compute_math_stack(["floor",mul,"random",256])
    console.log("val",val)
	
    var log=function(e){console.log(e)}
    document.addEventListener('click', log)
    click(val, 300)
    document.removeEventListener('click', log)
})