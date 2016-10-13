var Novel = {};
Novel.chapters = [];

var currChap = 0;
var currScen = 0;

var chapMessThing = "";

function rmMessageB() {
  $("#message").hide();
  $("#edit").show();
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
  v.title = "Scene "+t;
  v.text = "";
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
    scenestext += "<a href='#' onclick='cs("+s+")'>"+Novel.chapters[c].scenes[s].title+"</a> , ";
  }
  scenestext += "<a href='#' onclick='createScen()'>+</a>";
  messageB("<h1>Chapter "+(c+1)+"</h1><div style='font-size: 18px'>"+Novel.chapters[c].text+"</div><h3>"+
  scenestext+"</h3>"+"<h2><a class='ob' onclick='delChap()'>delete</a></h2>");
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
  //$("#edit").hide();
  document.getElementById("message").innerHTML = content;
}

function editG() {
  //$("#message").hide();
  //$("#edit").show();
}
function scbuildS() {
  if (Novel.chapters[currChap]) {
    Novel.chapters[currChap].scenes[currScen].text = document.getElementById("edit").innerHTML;
    var scb = "";
    for (var s in Novel.chapters[currChap].scenes) {
      scb += Novel.chapters[currChap].scenes[s].text+"<br>";
    }
    Novel.chapters[currChap].text = scb;
  }
}
function scbuild() {
  if (Novel.chapters[currChap]) {
    var scb = "";
    for (var s in Novel.chapters[currChap].scenes) {
      scb += Novel.chapters[currChap].scenes[s].text+"<br>";
    }
    Novel.chapters[currChap].text = scb;
  }
}
function cs(s) {
  currScen = s;
  //document.getElementById("edit").innerHTML = Novel.chapters[currChap].scenes[currScen].text;
  //rmMessageB();
  messageB("<h1><a onclick='cc("+currChap+")' href='#'>Chapter "+(currChap+1)+"</a></h1><h2>"+  Novel.chapters[currChap].scenes[currScen].title+
  " | <input id='csn' class='coolInput' placeholder='change scene name'></input></h2>"+
  "<div id='edit' contenteditable style='font-size: 20px'></div>"+
  "<h2><a href='#' class='ob' onclick='delScene()'>delete</a></h2>");
  document.getElementById("edit").innerHTML = Novel.chapters[currChap].scenes[currScen].text;
  document.getElementById("edit").addEventListener("keyup", scbuildS);
  document.getElementById("csn").addEventListener("keydown", function(e) {
    if (e.keyCode == 13) {
      changeScenName();
    }
  });
}
function delScene() {
  Novel.chapters[currChap].scenes.splice(currScen, 1);
  scbuild();
  cc(currChap);
}
function delChap() {
  Novel.chapters.splice(currChap, 1);
  messageB("<h1 class='text-center'>Chapter Deleted!</h1>"+
  "<h6 class='text-center'>if this was a mistake you're screwed XD</h6>");
  for (var ch in Novel.chapters) {
    Novel.chapters[ch].title = parseInt(ch)+1;
    console.log(ch, "+1=", ch+1);
  }
  updateChapSel();
}

function changeScenName() {
  Novel.chapters[currChap].scenes[currScen].title = document.getElementById("csn").value;
  cs(currScen);
}

function addChap() {
  chapter(Novel.chapters.length+1);
  //cc(Novel.chapters.length-1);
  updateChapSel();
  showChapSel();
}

function removeOutput() {
  $("#output").hide(500);
}
function exportS() {
  var story = "";
  for (var c in Novel.chapters) {
    story+="<h2>"+Novel.chapters[c].title+"</h2><div style='font-size: 18px'>"+Novel.chapters[c].text+"</div><br><br>";
  }
  //document.body.innerHTML += ""+story+"</div>";
  $("#output").html("<h2 onclick='removeOutput()' style='text-align: right'>"+
  "<span style='color: #f22; cursor: pointer; border: 1px #f22 solid; padding: 5px; border-radius: 5px;'>X</span>"+
  "</h2><h1>My Story</h1><br><br>"+story);
  $("#output").show();
}

function updateChapSel() {
  //document.getElementById('select').style.wordWrap="break-word";
  //document.getElementById('select').innerHTML = "";
  var thing = "<h2 style='display: inline-block'><a href='#' class='ob' style='' onclick='addChap()'>+</a></h2> ";
  for (var c in Novel.chapters) {
    thing += "<h2 style='display: inline'><a href='#' onclick='cc("+(c)+")'>"+"Chapter "+Novel.chapters[c].title+"</a></h2>";
    if (c < Novel.chapters.length-1) {
      thing += " , "
    }
  }
  thing += "";
  chapMessThing = thing;
}
function showChapSel() {
  console.log(chapMessThing);
  messageB(chapMessThing);
}

//don't write code like this at home, kids '_'
//seriously dont its for your own good

//OH GOSH WHAT MONSTER HATH I BROUGHT UPON THIS WORLD -vnms, 10/12/16, 6:41pm

messageB("<div class='jumbotron text-center'><h1>NovelWriter</h1>"+
  "<h2>An early-stage writing app by <a href='https://github.com/vnms'>vnms</a></h2></div>");
