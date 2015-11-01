javascript:(function(){
  var scrollY_before = scrollY;
  scrollTo(0,scrollY_before+1);
  if(scrollY_before < scrollY){
    setTimeout(arguments.callee, 300)
  }
}())