function draw_element_in_canvas(element, canvas){
	return new Promise(function(resolve, reject){
		var w = element.clientWidth*1.11
		var h = element.clientHeight
		console.log(w,h)
		var html = element.outerHTML
			.split('<br>').join('<br />')
			.split('&nbsp;').join(' ')
		canvas.width = w
		canvas.height = h
		var fs = getComputedStyle(element).fontSize
		var ctx = canvas.getContext("2d");
		var data = "data:image/svg+xml," +
				   "<svg xmlns='http://www.w3.org/2000/svg' width='"+w+"' height='"+h+"'>" +
					 "<foreignObject width='100%' height='100%'>" +
						"<div xmlns='http://www.w3.org/1999/xhtml' style='font-size:"+fs+"'>" +
						 html+
					   "</div>" +
					"</foreignObject>" +
				   "</svg>";
		var img = new Image();
		img.src = data;
		img.onload = function() { ctx.drawImage(img, 0, 0); resolve(canvas);}
	});
}