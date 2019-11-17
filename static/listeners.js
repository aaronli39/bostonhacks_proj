var is_first = true;

document.getElementById("addEv").addEventListener("click", function (e) {
    console.log("event added");
    var name = document.getElementById("name").value;
    var start = document.getElementById("start").value;
    var am = document.getElementById("am").value;
    var end = document.getElementById("end").value;
    var am1 = document.getElementById("am1").value;
    console.log(am1);
    if (am == "AM" && am1 == "AM")
        addEvent(name, start, end, true, true, is_first);
    else if (am == "AM" && am1 == "PM")
        addEvent(name, start, end, true, false, is_first);
    else if (am == "PM" && am1 == "AM")
        addEvent(name, start, end, false, true, is_first);
    else
        addEvent(name, start, end, false, false, is_first);
    is_first = false;
});