// Don't even look at the code

//save your eyes

var Novel = {};
Novel.chapters = [];
Novel.title = "story";
Novel.author = "anonymous";
Novel.characters = [];

function saveN() {
  //var blob = new Blob([JSON.stringify(Novel)], {type: "text/plain;charset=utf-8"});
  //saveAs(blob, Novel.title+".txt");
  messageB("<div class='jumbotron'><div class='ob'>"+JSON.stringify(Novel)+"</div>Save that code in a text file then load it in when you come back to the site</div>");
}
function uploadN() {
  messageB("<div class='jumbotron'><h1>load story</h1>"+
  "<input id='text' style='outline: 0; min-width: 500; min-height: 200' class='ob' placeholder='paste code'></input><a href='#' class='ob' id='upNov'>load</a></div>");
  var tempun = document.getElementById("upNov");
  tempun.addEventListener("mousedown",function() {
    Novel = JSON.parse(text.value);
    showMainPage();
    updateChapSel();
  });
}
function loadN() {
  var sf = document.getElementById('input').files[0];
}

var currChap = 0;
var currScen = 0;
var currChar = 0;

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
  messageB("<div class='jumbotron'><h1>chapter "+(c+1)+"</h1><div style='font-size: 18px'>"+Novel.chapters[c].text+"</div><h3>"+
  scenestext+"</h3>"+"<h2><a class='ob' onclick='delChap()'>delete</a></h2></div>");
}

function messageB(content) {
  $("#message").show();
  //$("#edit").hide();
  document.getElementById("message").innerHTML = content;
}

function deleteChar(c) {
  Novel.characters.splice(c, 1);
  showCharacterPage();
}
function addCharacter(n) {
  Novel.characters.push({name: n, desc: ""});
}
function cchar(c) {
  currChar = c;
  messageB("<div class='jumbotron'>"+
    "<h1>"+Novel.characters[currChar].name+"</h1>"+
    "<h2><a href='#' class='ob' onclick='deleteChar("+c+")'>delete</a></h2></div>");
}

function showMainPage() {
  messageB("<div class='jumbotron'>"+
    "<h1>"+Novel.title+"</h1><input id='changeTitle' placeholder='change title'></input>"+
    "<h2>by "+Novel.author+"</h2><input id='changeAuthor' placeholder='change author'></input>"+
    "<div>"+exportS()+"</div>"+
    "</div>");
    document.getElementById("changeTitle").addEventListener("keydown", function(e) {
      if (e.keyCode==13) {
        Novel.title = document.getElementById("changeTitle").value;
        showMainPage();
      }
    });
    document.getElementById("changeAuthor").addEventListener("keydown", function(e) {
      if (e.keyCode==13) {
        Novel.author = document.getElementById("changeAuthor").value;
        showMainPage();
      }
    });
}
function showCharacterPage() {
  var chr = "<h2>";
  for (var cc in Novel.characters) {
    chr += "<a href='#' class='ob' onclick='cchar("+cc+")'>"+Novel.characters[cc].name+"</a>";
  }
  chr += "</h2>";
  messageB("<div class='jumbotron textcenter'>"+
    "<h1>characters</h1>"+
    "<h2><input id='addCharacter' placeholder='add character'></input>"+chr+"</h2></div>");
  document.getElementById("addCharacter").addEventListener("keydown", function(e) {
    if (e.keyCode == 13) {
      addCharacter(document.getElementById("addCharacter").value);
      showCharacterPage();
      updateChapSel();
    }
  });
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
  messageB("<div class='jumbotron'><h1>"+Novel.chapters[currChap].scenes[currScen].title+
  "<p style='display:inline'><input id='csn' class='coolInput' placeholder='change'></input></p></h1><h2>"+
  "</h2><h2><a onclick='cc("+currChap+")' href='#'>chapter "+(currChap+1)+"</a></h2>"+
  "<div id='edit' contenteditable style='font-size: 20px'></div>"+
  "<h2><a href='#' class='ob' onclick='delScene()'>delete</a></h2></div>");
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
  for (var ch in Novel.chapters) {
    Novel.chapters[ch].title = parseInt(ch)+1;
  }
  updateChapSel();
  showChapSel();
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
    story+="<h2>chapter "+Novel.chapters[c].title+"</h2><div style='font-size: 18px'>"+Novel.chapters[c].text+"</div><br><br>";
  }
  return story;
  //document.body.innerHTML += ""+story+"</div>";
  /*$("#output").html("<h2 onclick='removeOutput()' style='text-align: right'>"+
  "<span style='color: #f22; cursor: pointer; border: 1px #f22 solid; padding: 5px; border-radius: 5px;'>X</span>"+
  "</h2><h1>"+Novel.title+"</h1><h2>by "+Novel.author+"</h2><br>"+story);
  $("#output").show();*/
}

function updateChapSel() {
  //document.getElementById('select').style.wordWrap="break-word";
  //document.getElementById('select').innerHTML = "";
  var thing = "<div class='jumbotron'><h1>chapters <a href='#' class='ob' style='' onclick='addChap()'>+</a></h1><h2 style='display: inline-block'></h2> ";
  for (var c in Novel.chapters) {
    thing += "<h2 style='display: inline'><a href='#' onclick='cc("+(c)+")'>"+"chapter "+Novel.chapters[c].title+"</a></h2>";
    if (c < Novel.chapters.length-1) {
      thing += " , "
    }
  }
  thing += "</div>";
  chapMessThing = thing;
}
function showChapSel() {
  messageB(chapMessThing);
}

//don't write code like this at home, kids '_'
//seriously dont its for your own good

messageB("<div class='jumbotron text-center'><h1>NovelWriter</h1>"+
  "<h2>An early-stage writing app by <a href='https://github.com/vnms'>vnms</a></h2></div>");
