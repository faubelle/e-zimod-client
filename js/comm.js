function getMachines() {
 /* $.ajax({
      url: "http://localhost:8000/getTableMachine?callback=?",
      dataType: "jsonp",
      success: function(ps) {
        alert(ps);
      },
  });*/
  return ["frigo","radiateur","pompe a chaleur","cuisine"]
}

function getUserProfiles() {
  /*$.ajax({
      url: "http://localhost:8000/getTableProfile?callback=?",
      dataType: "jsonp",
      success: function(ps) {
        alert(ps)
      },
  });*/
  return [[0,{frigo:["off",[[10,"on"],[50,"off"],[220,"on"]]]}],
          [1,{frigo:["off",[[10,"on"],[50,"off"],[220,"on"]]],
              radiateur:["on",[[200,"off"],[400,"on"]]]}]] 
}

function getUserProfilesNames() {
  var res = getUserProfiles();
  return res.map(function(e){return e[0]})
}

function setMachineList(id) {
  var sel = $('#' + id)[0];
  var opts = getMachines();
  for(i = 0; i < opts.length ; i++) {
    var opt = $('<option>'+opts[i]+'</option>')[0]; 
    sel.add(opt,null);
  }
}

function setUserPList(id) {
  var sel = $('#' + id)[0];
  var opts = getUserProfilesNames();
  for(i = 0; i < opts.length ; i++) {
    var opt = $('<option>'+opts[i]+'</option>')[0]; 
    sel.add(opt,null);
  }
}
