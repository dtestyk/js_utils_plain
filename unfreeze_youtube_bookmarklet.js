javascript:(function(){
  function check_freeze(){
    v=document.querySelector('video');
    c=document.querySelector('canvas');
    nx=document.querySelector('.ytp-button-next');
    r=document.querySelector('.ytp-button-replay');

    var is_freeze1 = c.style.display == 'block' && v.currentTime==0;
    var is_freeze2 = v.ended && !!r;
    if(is_freeze1) nx.click();
    else if(is_freeze2) document
    .querySelector('li.currently-playing')
    .nextElementSibling
    .querySelector('a')
    .click();
  }
  setInterval(check_freeze.bind(this), 1000);
}())