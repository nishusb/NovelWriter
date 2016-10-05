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
  if (Novel.chapters.length == 0) {
    var nl0 = true;
  }
  chapter(Novel.chapters.length+1+": "+prompt("Chapter Name:"));
  if (nl0) {
    Novel.chapters[0].text = document.getElementById("edit").value;
    cc(0);
  }
  updateChapSel();
}

function exportS() {
  var story = "";
  for (var c in Novel.chapters) {
    story+="Chapter "+(parseInt(c)+1)+"\n"+Novel.chapters[c].text+"\n \n";
  }
  alert(story);
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
  document.getElementById('select').innerHTML += "<br><h2><a href='#' onclick='addChap()'>+</a> , <a href='#' onclick='exportS()'>export</a></h2>"
}

document.getElementById("edit").addEventListener("keyup", function () {
  if (Novel.chapters[currChap]) {Novel.chapters[currChap].text = document.getElementById("edit").value;}
});
