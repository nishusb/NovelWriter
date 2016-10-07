var Novel = {};
Novel.chapters = [];

var currChap = 0;
var currScen = 0;

function cc(c) {
  currChap = c;
  document.getElementById("edit").value = Novel.chapters[c].text;
}

function chapter(t) {
  var v = {};
  v.scenes = [];
  v.title = t;
  v.text = "";
  Novel.chapters.push(v);
}

/*function scene(t, c) {
  var v = {};
  v.title = t;
  v.text = "";
  Novel.chapters[c].scenes.push(v);
}

function sceneUpdate(t, c, s) {
  Novel.chapters[c].scenes[s].text = t;
  Novel.chapters[c].text = "";
  for (var a in Novel.chapters[c].scenes) {
    Novel.chapters[c].text += "\n"+Novel.chapters[c].scenes[a].text;
  }
}*/

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
  document.getElementById("edit").addEventListener("keyup", function () {
    if (Novel.chapters[currChap]) {Novel.chapters[currChap].text = document.getElementById("edit").value;}
  });

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

document.getElementById("edit").addEventListener("keyup", function () {
  if (Novel.chapters[currChap]) {Novel.chapters[currChap].text = document.getElementById("edit").value;}
});
addChap();
