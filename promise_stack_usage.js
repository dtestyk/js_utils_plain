Promise.all([
  load_script_promise("promise_stack.js")
]).then(function(){
  init([5,6,5000,"hello"])
  .then(plus)
  .then(dup)
  .then(show)
  .then(append(10))
  .then(plus)
  .then(show)
  .then(wait)
  .then(show)

  join([
    wait([1000]).then(append(10)),
    plus([5,6])
  ]).then(unwrap)
  .then(plus)
  .then(show)

  init(["some click","event occur"])
  .then(wait_event)
  .then(show)

  join([
    wait([500]),
    race([
      wait([1000,0]),
      wait_event(["document click",1]),
      wait_event(["document right click",2]),
    ])
  ]).then(unwrap)
  .then(append([["nothing"],["usual"],["right"]]))
  .then(select)
  .then(show)
  .then(append("some click")).then(emit)

  init(["document click"]).then(emit)
})