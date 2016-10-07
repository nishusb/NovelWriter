var Novel = {};
Novel.chapters = [];

var currChap = 0;
var currScen = 0;

function rmMessageB() {
  $("#message").hide();
  $("#edit").show();
}

function cs(s) {
  currScen = s;
  document.getElementById("edit").innerHTML = Novel.chapters[currChap].scenes[currScen].text;
  rmMessageB();
}

function chapter(t) {
  var v = {};
  v.scenes = [];
  v.title = t;
  v.text = "";
  Novel.chapters.push(v);
}

function scene(t) {
  var v = {};
  v.title = t;
  v.text = "edit here";
  Novel.chapters[currChap].scenes.push(v);
}
function createScen() {
  scene(Novel.chapters[currChap].scenes.length+1);
  cc(currChap);
}
function cc(c) {
  currChap = c;
  //document.getElementById("edit").innerHTML = Novel.chapters[c].text;
  var scenestext = "Scenes: ";
  for (var s in Novel.chapters[c].scenes) {
    scenestext += "<a href='#edit' onclick='cs("+s+")'>"+Novel.chapters[c].scenes[s].title+"</a> ";
  }
  scenestext += "<a href='#edit' onclick='createScen()'>+</a>";
  messageB("<h1>Chapter "+(c+1)+"</h1>"+Novel.chapters[c].text+"<h3>"+scenestext+"</h3>");
}

/*function sceneUpdate(t, c, s) {
  Novel.chapters[c].scenes[s].text = t;
  Novel.chapters[c].text = "";
  for (var a in Novel.chapters[c].scenes) {
    Novel.chapters[c].text += "\n"+Novel.chapters[c].scenes[a].text;
  }
}*/

function messageB(content) {
  $("#message").show();
  $("#edit").hide();
  document.getElementById("message").innerHTML = content;
}
function rmMessageB() {
  $("#message").hide();
  $("#edit").show();
}

function addChap() {
  chapter(Novel.chapters.length+1);
  cc(Novel.chapters.length-1);
  updateChapSel();
}

function removeOutput() {
  $("#output").hide(500);
}
function exportS() {
  var story = "";
  for (var c in Novel.chapters) {
    story+="<h2>"+Novel.chapters[c].title+"</h2><br>"+Novel.chapters[c].text+"<br><br>";
  }
  //document.body.innerHTML += ""+story+"</div>";
  $("#output").html("<h2 class='text-center' onclick='removeOutput()' style='color: #f22; cursor: pointer'>X</h2><br><br>"+story);
  $("#output").show();
}

function updateChapSel() {
  document.getElementById('select').style.wordWrap="break-word";
  document.getElementById('select').innerHTML = "Chapters:<br>";
  for (var c in Novel.chapters) {
    document.getElementById('select').innerHTML += "<h3 style='display: inline'><a href='#' onclick='cc("+(c)+")'>"+Novel.chapters[c].title+"</a></h3>";
    if (c < Novel.chapters.length-1) {
      document.getElementById('select').innerHTML += " , "
    }
  }
  document.getElementById('select').innerHTML += "";
}

function toggleCCN() {
  $("#changechaptern").toggle(400);
  document.getElementById("ccnmessage").innerText = "";
}
function closeCCN() {
  $("#changechaptern").hide(400);
  document.getElementById("ccnmessage").innerText = "";
}
function CCN() {
  try {
    document.getElementById("ccnmessage").innerText = "";
    Novel.chapters[parseInt(document.getElementById("ccncn").value)-1].title = document.getElementById("ccncn").value+": "+document.getElementById("ccnnn").value;
  } catch (e) {
    document.getElementById("ccnmessage").innerText = "enter a valid chapter number";
  }
  document.getElementById("ccncn").value = "";
  document.getElementById("ccnnn").value = "";
  updateChapSel();
}

document.getElementById("edit").addEventListener("keyup", function (e) {
  if (Novel.chapters[currChap]) {
    Novel.chapters[currChap].scenes[currScen].text = document.getElementById("edit").innerHTML;
    var scbuild = "";
    for (var s in Novel.chapters[currChap].scenes) {
      scbuild += Novel.chapters[currChap].scenes[s].text+"<br>";
    }
    Novel.chapters[currChap].text = scbuild;
  }
});

//don't write code like this at home, kids '_'

messageB("<h1 class='text-center jumbotron'>NovelWriter"
+"<h2>An early-stage writing app by <a href='https://github.com/vnms'>vnms</a></h2><h2>Click the chapter one button to start.</h2>");
