function debounce(ms, func){
    var timeout = null;
    return function(){
        if(timeout) clearTimeout(timeout);
        timeout = setTimeout(func, ms);
    }
}