function getMachines(){
 /* $.ajax({
      url: "http://localhost:8000/getTableMachine?callback=?",
      dataType: "jsonp",
      success: function(ps) {
        alert(ps);
      },
  });*/
  return ["fridge","radiateur","pompe a chaleur","cuisine"]
}

function getUserProfiles(){
 /* $.ajax({
      url: "http://localhost:8000/getTableProfile?callback=?",
      dataType: "jsonp",
      success: function(ps) {
        alert(ps);
      },
  });*/
  return ["forever alone","root couple","family","big family"]
}

function setMachineList(id){
  var sel = $('#' + id)[0];
  var opts = getMachines();
  for(i = 0; i < opts.length ; i++) {
    var opt = $('<option>'+opts[i]+'</option>')[0]; 
    sel.add(opt,null);
  }
}
