//Novel Variables
{
  var Novel = {};
  Novel.chapters = [];
  Novel.title = "story";
  Novel.author = "anonymous";
  Novel.characters = [];
}

//Editor Variables
{
  var Editor = {};
  Editor.scen = 0;
  Editor.chap = 0;
  Editor.char = 0;
  Editor.chapSelText = "";
  Editor.message = function(c) {
    $("#message").html(c);
  }
}

//Saving and loading
{
  function saveCodeToTxt() {
    var blob = new Blob([JSON.stringify(Novel)], {type: "text/plain;charset=utf-8"});
    saveAs(blob, Novel.title+".novelwriter.txt");
  } function saveN() {
    Editor.message("<h1>save story</h1>Copy then paste (or <a onclick='saveCodeToTxt()'>save</a>) this code in a text file then load it in when you come back to the site<div class='ob'>"+JSON.stringify(Novel)+"</div>");
  } function uploadN() {
    Editor.message("<h1>load story</h1>"+
    "<input id='text' style='outline: 0; min-width: 500; min-height: 200' class='ob' placeholder=''></input><a href='#' class='ob' id='upNov'>load</a>");
    var tempun = document.getElementById("upNov");
    tempun.addEventListener("mousedown",function() {
      Novel = JSON.parse(text.value);
      showMainPage();
      updateChapSel();
    });
  } function loadN() {
    var sf = document.getElementById('input').files[0];
  }

  function saveStoryAsHTML() {
    var blob = new Blob([Novel.title+" by "+Novel.author+"\n"+exportS()+"<style>*{font-family:arial;font-weight:0}</style>"], {type: "text/plain;charset=utf-8"});
    saveAs(blob, Novel.title+".html");
  }
}

//Generation/Refreshing of certain important variables
{
  function scbuild(edit) {
    if (edit) {
      Novel.chapters[Editor.chap].scenes[Editor.scen].text = $("#edit").html();
    }
    if (Novel.chapters[Editor.chap]) {
      var scb = "";
      for (var s in Novel.chapters[Editor.chap].scenes) {
        scb += Novel.chapters[Editor.chap].scenes[s].text+"<br>";
      }
      Novel.chapters[Editor.chap].text = scb;
    }
  }

  function exportS() {
    var story = "";
    for (var c in Novel.chapters) {
      story+="<h2>Chapter "+Novel.chapters[c].title+"</h2><div style='font-size: 18px'>"+Novel.chapters[c].text+"</div><br><br>";
    }
    return story;
  }

  function updateChapSel() {
    var thing = "<h1>chapters <a href='#' class='ob' style='' onclick='addChap()'>+</a></h1><h2 style='display: inline-block'></h2> ";
    for (var c in Novel.chapters) {
      thing += "<h2 style='display: inline'><a href='#' onclick='cc("+(c)+")'>"+"Chapter "+Novel.chapters[c].title+"</a></h2>";
      if (c < Novel.chapters.length-1) {
        thing += " , "
      }
    }
    Editor.chapSelText = thing;
  }
}

//Scene & chapter stuff
{
  function chapter(t) {
    var v = {};
    v.scenes = [];
    v.title = t;
    v.text = "";
    Novel.chapters.push(v);
  } function addChap() {
    chapter(Novel.chapters.length+1);
    updateChapSel();
    showChapSel();
  }

  function scene(t) {
    var v = {};
    v.title = "Scene "+t;
    v.text = "";
    Novel.chapters[Editor.chap].scenes.push(v);
  } function createScen() {
    scene(Novel.chapters[Editor.chap].scenes.length+1);
    cc(Editor.chap);
  }

  function delScene() {
    Novel.chapters[Editor.chap].scenes.splice(Editor.scen, 1);
    scbuild();
    cc(Editor.chap);
  }

  function delChap() {
    Novel.chapters.splice(Editor.chap, 1);
    for (var ch in Novel.chapters) {
      Novel.chapters[ch].title = parseInt(ch)+1;
    }
    updateChapSel();
    showChapSel();
  }

  function changeScenName() {
    Novel.chapters[Editor.chap].scenes[Editor.scen].title = document.getElementById("csn").value;
    cs(Editor.scen);
  }
}

//Pages
{
  function cc(c) {
    Editor.chap = c;
    var scenestext = "Scenes: ";
    for (var s in Novel.chapters[c].scenes) {
      scenestext += "<a href='#' onclick='cs("+s+")'>"+Novel.chapters[c].scenes[s].title+"</a> , ";
    }
    scenestext += "<a href='#' onclick='createScen()'>+</a>";
    Editor.message("<h1>Chapter "+(c+1)+"<a class='ob' onclick='delChap()'>delete</a></h1><h3>"+
    scenestext+"</h3>"+"<div style='font-size: 18px'>"+
    Novel.chapters[c].text+"</div>");
  }
  function cs(s) {
    Editor.scen = s;
    Editor.message("<h1>"+Novel.chapters[Editor.chap].scenes[Editor.scen].title+
    " <p style='display:inline'><input id='csn' class='coolInput' placeholder='change'></input></p> <a href='#' class='ob' onclick='delScene()'>delete</a></h1><h2>"+
    "</h2><h2><a onclick='cc("+Editor.chap+")' href='#'>chapter "+(Editor.chap+1)+"</a></h2>"+
    "<div id='edit' contenteditable style='font-size: 20px'></div>"+
    "<h2></h2>");
    document.getElementById("edit").innerHTML = Novel.chapters[Editor.chap].scenes[Editor.scen].text;
    document.getElementById("edit").addEventListener("keyup", function(){scbuild(true)});
    document.getElementById("csn").addEventListener("keydown", function(e) {
      if (e.keyCode == 13) {
        changeScenName();
      }
    });
  }

  function cchar(c) {
    Editor.char = c;
    var tiv = "Unimportant";
    Editor.message("<h3 class='ob' onclick='showCharacterPage()'>all characters</h3>"+
      "<h1>"+Novel.characters[Editor.char].name+"<a href='#' class='ob' onclick='deleteChar("+c+")'>delete</a></h1>"+
      "<h3>description:<h3><div id='edit' contenteditable style='font-size: 20px'></div>");
    $("#edit").html(Novel.characters[Editor.char].desc);
    document.getElementById("edit").onkeyup = function() {
      Novel.characters[Editor.char].desc = $("#edit").html();
    }
  }

  function showMainPage() {
    Editor.message("<h1>"+Novel.title+" <input id='changeTitle' style='display: inline' placeholder='change'></input></h1>"+
      "<h2>by "+Novel.author+" <input id='changeAuthor' style='display: inline' placeholder='change'></input></h2>"+
      "<h2><a class='ob' onclick='saveStoryAsHTML()'>save to file</a></h2><div style='font-family: sans-serif'>"+exportS()+"</div>");
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
      if (Novel.characters[Editor.char].important == false) {
        chr += "<a href='#' class='ob' onclick='cchar("+cc+")'>"+Novel.characters[cc].name+"</a>";
      } else {
        chr += "<a href='#' class='ob' onclick='cchar("+cc+")' style='color: #286'>"+Novel.characters[cc].name+"</a>";
      }
    }
    chr += "</h2>";
    Editor.message("<h1>characters "+
      "<input id='addCharacter' placeholder='add'></input>"+chr+"</h1>");
    document.getElementById("addCharacter").addEventListener("keydown", function(e) {
      if (e.keyCode == 13) {
        addCharacter(document.getElementById("addCharacter").value);
        showCharacterPage();
        updateChapSel();
      }
    });
  }

  function showChapSel() {
    Editor.message(Editor.chapSelText);
  }
}
//Editor Pages
{
  Editor.settings = function() {
    Editor.message("<h1>settings</h1>"+
      "<h3>theme: <a href='#' class='ob'>dark</a><a class='ob' href='#'>coming soon</a></h3><h4>More is coming later, hang tight :]</h4>"+
      "<h3>about:</h3><h4>NovelWriter v0.1 by vnms</h4>");
  }
}

//Characters
{
  function addCharacter(n) {
    Novel.characters.push({name: n, desc: "", important: false});
  } function deleteChar(c) {
    Novel.characters.splice(c, 1);
    showCharacterPage();
  }
}

/* Don't write code like this at home, kids :|

Seriously dont its for your own good */

Editor.message("<h1>NovelWriter</h1>"
  +"<h2>An early-stage writing app by <a href='https://github.com/vnms'>vnms</a></h2>"
  +"<h2>Hover over the gray bar at the top for menu options</h2><h3>Press enter to activate a text input when there is no button</h3>");
