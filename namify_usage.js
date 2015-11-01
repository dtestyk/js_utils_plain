Promise.all([
  load_script_promise('namify.js')
]).then(function(){
  arr=[10,9,8,7]
  obj=namify(arr,['first',,'third'])
  console.log(obj)
})