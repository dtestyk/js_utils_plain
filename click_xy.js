function click(x,y){
    var ev = document.createEvent("MouseEvent");
    var el = document.elementFromPoint(x,y)||document;
    ev.initMouseEvent(
        "click",
        true /* bubble */, true /* cancelable */,
        window, null,
        x, y, 0, 0, /* coordinates */
        false, false, false, false, /* modifier keys */
        0 /*left*/, null
    );
    el.dispatchEvent(ev);
}