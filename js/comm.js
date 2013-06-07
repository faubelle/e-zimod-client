function removeMachine(id) {
  $.ajax({
      url: "http://localhost:8000/deleteMachine?callback=?",
      data: {'id' : parseInt(id)},
      dataType: "jsonp",
      success: function(ps) {
        //something
      },
  });
  alert("remove machine");
}

function addMachine(mach) {
  $.ajax({
      url: "http://localhost:8000/addMachine?callback=?",
      data: {'machine' : JSON.stringify(mach)},
      dataType: "jsonp",
      success: function(ps) {
        //something
      },
  });
  alert("added machine");
}

function removeUserProfile(id) {
  $.ajax({
      url: "http://localhost:8000/deleteUserProfile?callback=?",
      data: {'id' : parseInt(id)},
      dataType: "jsonp",
      success: function(ps) {
        //ad libe
      },
  });
  alert("removed profile");
}

function addUserProfile(prof) {
  $.ajax({
      url: "http://localhost:8000/addUserProfile?callback=?",
      data: {'profile' : JSON.stringify(prof)},
      dataType: "jsonp",
      success: function(ps) {
        //ad libe
      },
  });
  alert("added profile");
}

function getquarter(id,from,callback) {
  $.ajax({
      url: "http://localhost:8000/quarter?callback=?",
      data: {'id' : id, 'from' : from},
      dataType: "jsonp",
      success: callback 
  });
}

function getday(id,from,callback) {
  $.ajax({
      url: "http://localhost:8000/day?callback=?",
      data: {'id' : id, 'from' : from},
      dataType: "jsonp",
      success: callback 
  });
}

function getweek(id,from,callback) {
  $.ajax({
      url: "http://localhost:8000/week?callback=?",
      data: {'id' : id, 'from' : from},
      dataType: "jsonp",
      success: callback 
  });
}

function setMachineList(id) {
  var sel = $('#' + id)[0];
  $.ajax({
      url: "http://localhost:8000/getTableMachine?callback=?",
      dataType: "jsonp",
      success: function(macLis) {
        for(i = 0; i < macLis.length ; i++) {
          sel.add(mkOption(macLis[i][0]+'-'+macLis[i][1].name),null);
        }
      },
  });
}

function setUserPList(id) {
  var sel = $('#' + id)[0];
  $.ajax({
      url: "http://localhost:8000/getTableProfile?callback=?",
      dataType: "jsonp",
      success: function(profLis) {
        for(i = 0; i < profLis.length ; i++) {
          sel.add(mkOption(profLis[i][0]+'-'+profLis[i][1].name),null);
        }
        $('#'+id).prop('selectedIndex', -1)
      },
  });
}

function mkOption(value) {
  return $('<option>'+value+'</option>')[0];
}
