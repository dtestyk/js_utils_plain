function circle_timeout(time, process){
  const TIME_RESOLUTION = 500
  var arr_delta_time = [time]
  var arr_arr_records = [[]]
  var indexes = []
  var n = 1
  var i_next = 0
  var last_delay_time = Date.now()
  var last_pause_time = Date.now()
  var is_paused = true
  var tm_id

  function _insert(record){
    var record_time = is_paused? last_pause_time: Date.now()
    var dt = record_time - last_delay_time
    if(dt < TIME_RESOLUTION){
      var i_curr = (i_next-1+n)%n
      var m = arr_arr_records[i_curr].length
      arr_arr_records[i_curr][m] = record
      indexes[record.id] = [i_curr, m]
    }else{
      arr_delta_time[i_next%n] -= dt
      arr_delta_time.splice(i_next, 0, dt)
      arr_arr_records.splice(i_next, 0, [record])
      indexes[record.id] = [i_next, 0]
      
      i_next++  //skip added record
      n++
    }
    return this
  }

  function _remove(record){
    var i = indexes[record.id][0]
    var j = indexes[record.id][1]
    arr_arr_records[i].splice(j, 1)
    
    if(arr_arr_records.length > 1 && arr_arr_records[i].length == 0){
      var dt = arr_delta_time[i]
      arr_delta_time.splice(i, 1)
      arr_arr_records.splice(i, 1)
      n--
      i %= n
      arr_delta_time[i] += dt
    }
    return this
  }

  function _delay(){
    var i = i_next
    var dt = arr_delta_time[i]
    last_delay_time = Date.now()
    tm_id = setTimeout(_delay.bind(this), dt)
    var arr_records = arr_arr_records[i]
    for(var j=0; j<arr_records.length; j++){
      var record = arr_records[j]
      process(record)
    }
    i_next++
    i_next %= n
  }

  function _pause(){
    is_paused = true
    clearInterval(tm_id)
    last_pause_time = Date.now()
    return this
  }

  function _play(){
    if(!is_paused) return this
    var i = i_next
    var dt = arr_delta_time[i]
    dt -= last_pause_time - last_delay_time
    tm_id = setTimeout(_delay.bind(this), dt)
    is_paused = false
    return this
  }
  
  return{
    pause: _pause,
    play: _play,
    insert: _insert,
    remove: _remove
  }
}