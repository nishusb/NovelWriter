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
}

//Saving and loading
{
  function saveCodeToTxt() {
    var blob = new Blob([JSON.stringify(Novel)], {type: "text/plain;charset=utf-8"});
    saveAs(blob, Novel.title+".novelwriter.txt");
  } function saveN() {
    messageB("<div class='container'><h1>save story</h1><div class='ob'>"+JSON.stringify(Novel)+"</div>Copy then paste (or <a onclick='saveCodeToTxt()'>save</a>) that code in a text file then load it in when you come back to the site</div>");
  } function uploadN() {
    messageB("<div class='container'><h1>load story</h1>"+
    "<input id='text' style='outline: 0; min-width: 500; min-height: 200' class='ob' placeholder=''></input><a href='#' class='ob' id='upNov'>load</a></div>");
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

//I need to remove this (old variable stuff)
{
  var currChap = 0;
  var currScen = 0;
  var currChar = 0;
  var chapMessThing = "";
}

//Message board (old and needs changes)
{
  function messageB(content) {
    $("#message").show();
    $("#message").html(content);
  }
  function rmMessageB() {
    $("#message").hide();
  }
}

//Refreshing of certain important variables
{
  function scbuild() {
    if (Novel.chapters[currChap]) {
      var scb = "";
      for (var s in Novel.chapters[currChap].scenes) {
        scb += Novel.chapters[currChap].scenes[s].text+"<br>";
      }
      Novel.chapters[currChap].text = scb;
    }
  }

  function exportS() {
    var story = "";
    for (var c in Novel.chapters) {
      story+="<h2>chapter "+Novel.chapters[c].title+"</h2><div style='font-size: 18px'>"+Novel.chapters[c].text+"</div><br><br>";
    }
    return story;
  }

  function updateChapSel() {
    var thing = "<div class='container'><h1>chapters <a href='#' class='ob' style='' onclick='addChap()'>+</a></h1><h2 style='display: inline-block'></h2> ";
    for (var c in Novel.chapters) {
      thing += "<h2 style='display: inline'><a href='#' onclick='cc("+(c)+")'>"+"chapter "+Novel.chapters[c].title+"</a></h2>";
      if (c < Novel.chapters.length-1) {
        thing += " , "
      }
    }
    thing += "</div>";
    chapMessThing = thing;
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
    Novel.chapters[currChap].scenes.push(v);
  } function createScen() {
    scene(Novel.chapters[currChap].scenes.length+1);
    cc(currChap);
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
}

//Pages
{
  function cc(c) {
    currChap = c;
    //document.getElementById("edit").innerHTML = Novel.chapters[c].text;
    var scenestext = "Scenes: ";
    for (var s in Novel.chapters[c].scenes) {
      scenestext += "<a href='#' onclick='cs("+s+")'>"+Novel.chapters[c].scenes[s].title+"</a> , ";
    }
    scenestext += "<a href='#' onclick='createScen()'>+</a>";
    messageB("<div class='container'><h1>chapter "+(c+1)+"</h1><div style='font-size: 18px'>"+Novel.chapters[c].text+"</div><h3>"+
    scenestext+"</h3>"+"<h2><a class='ob' onclick='delChap()'>delete</a></h2></div>");
  }

  function cchar(c) {
    currChar = c;
    messageB("<div class='container'>"+
      "<h1>"+Novel.characters[currChar].name+"</h1>"+
      "<h2><a href='#' class='ob' onclick='deleteChar("+c+")'>delete</a></h2></div>");
  }

  function showMainPage() {
    messageB("<div class='container'>"+
      "<h1>"+Novel.title+" <input id='changeTitle' style='display: inline' placeholder='change'></input></h1>"+
      "<h2>by "+Novel.author+" <input id='changeAuthor' style='display: inline' placeholder='change'></input></h2>"+
      "<h2><a class='ob' onclick='saveStoryAsHTML()'>save to file</a></h2><div>"+exportS()+"</div>"+
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
    messageB("<div class='container textcenter'>"+
      "<h1>characters "+
      "<input id='addCharacter' placeholder='add'></input>"+chr+"</h1></div>");
    document.getElementById("addCharacter").addEventListener("keydown", function(e) {
      if (e.keyCode == 13) {
        addCharacter(document.getElementById("addCharacter").value);
        showCharacterPage();
        updateChapSel();
      }
    });
  }

  function showChapSel() {
    messageB(chapMessThing);
  }
}

//Characters
{
  function addCharacter(n) {
    Novel.characters.push({name: n, desc: ""});
  } function deleteChar(c) {
    Novel.characters.splice(c, 1);
    showCharacterPage();
  }
}

//Don't write code like this at home, kids :|
//Seriously dont its for your own good

messageB("<div class='container'><h1>NovelWriter</h1>"
  +"<h2>An early-stage writing app by <a href='https://github.com/vnms'>vnms</a></h2>"
  +"<h2>Hover over the gray bar at the top for menu options</h2><p>Press enter to activate a text input when there is no button</div>");
