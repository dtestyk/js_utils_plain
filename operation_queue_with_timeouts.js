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


_.do(function(){
	console.log("going to person page")
});
_.wait(500);
_.start();