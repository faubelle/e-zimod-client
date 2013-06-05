function getMachines() {
 /* $.ajax({
      url: "http://localhost:8000/getTableMachine?callback=?",
      dataType: "jsonp",
      success: function(ps) {
        alert(ps);
      },
  });*/
  return ["0-frigo","1-radiateur","2-pompe a chaleur","3-cuisine"]
}

function removeMachine(id) {
  $.ajax({
      url: "http://localhost:8000/deleteMachine?callback=?",
      data: JSON.Stringify({'id' : parseInt(id)}),
      dataType: "jsonp",
      success: function(ps) {
        alert(ps)
      },
  });
  alert("remove machine");
}

function addMachine(mach) {
  $.ajax({
      url: "http://localhost:8000/addMachine?callback=?",
      data: JSON.Stringify({'machine' : mach}),
      dataType: "jsonp",
      success: function(ps) {
        alert(ps)
      },
  });
  alert("added machine");
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

function removeUserProfile(id) {
  $.ajax({
      url: "http://localhost:8000/deleteUserProfile?callback=?",
      data: JSON.Stringify({'id' : parseInt(id)}),
      dataType: "jsonp",
      success: function(ps) {
        alert(ps)
      },
  });
  alert("removed profile");
}

function addUserProfile(prof) {
  $.ajax({
      url: "http://localhost:8000/addUserProfile?callback=?",
      data: JSON.Stringify({'profile' : prof}),
      dataType: "jsonp",
      success: function(ps) {
        alert(ps)
      },
  });
  alert("added profile");
}

function getUserProfilesNames() {
  var res = getUserProfiles();
  return res.map(function(e){return e[0] + '  ' + Object.keys(e[1])})
}

function setMachineList(id) {
  var sel = $('#' + id)[0];
  var opts = getMachines();
  for(i = 0; i < opts.length ; i++) {
    sel.add(mkOption(opts[i]),null);
  }
}

function setUserPList(id) {
  var sel = $('#' + id)[0];
  var opts = getUserProfilesNames();
  for(i = 0; i < opts.length ; i++) {
    sel.add(mkOption(opts[i]),null);
  }
}

function mkOption(value) {
  return $('<option>'+value+'</option>')[0];
}
