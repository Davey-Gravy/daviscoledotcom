// CCK Ball field guide (/cck-ball/): layer map, task finder, key tester, practice ladder.
// Key tables mirror ~/z/src/config/cck_ball.keymap; positions mirror cck_ball-layouts.dtsi.
(function(){
  var COLX=[0,100,200,300,400,500,1200,1300,1400,1500,1600,1700];
  var STAG=[38,38,13,0,13,25,25,13,0,13,38,38];
  var POS=[],r,c;
  for(r=0;r<4;r++)for(c=0;c<12;c++)POS.push([COLX[c],STAG[c]+r*100]);
  [[0,438],[100,438],[200,438],[500,438],[600,463],[700,488],[1000,488],[1100,463],[1200,438],[1500,438],[1600,438],[1700,438]].forEach(function(p){POS.push(p);});
  var H=588;

  function k(m,s,code,mods,danger){return{m:m,s:s||"",code:code||null,mods:mods||"",danger:!!danger};}
  function L(ch){return k(ch,"","Key"+ch);}

  var BASE=[
    k("⎋","esc","Escape"),k("1","","Digit1"),k("2","","Digit2"),k("3","","Digit3"),k("4","","Digit4"),k("5","","Digit5"),
    k("6","","Digit6"),k("7","","Digit7"),k("8","","Digit8"),k("9","","Digit9"),k("0","","Digit0"),k("-","","Minus"),
    k("⇥","tab","Tab"),L("Q"),L("W"),L("E"),L("R"),L("T"),L("Y"),L("U"),L("I"),L("O"),L("P"),k("=","","Equal"),
    k("⌃","ctrl","ControlLeft"),L("A"),L("S"),L("D"),L("F"),L("G"),L("H"),L("J"),L("K"),L("L"),k(";","","Semicolon"),k("'","","Quote"),
    k("⇧","shift","ShiftLeft"),L("Z"),L("X"),L("C"),L("V"),L("B"),L("N"),L("M"),k(",","","Comma"),k(".","","Period"),k("/","","Slash"),k("⏎","return","Enter"),
    k("`","","Backquote"),k("⌥","opt","AltLeft"),k("⌘","cmd","MetaLeft"),k("⌫","bksp","Backspace"),k("␣","space","Space"),k("NAV","r-click"),
    k("FN","hold"),k("⇧","shift","ShiftRight"),k("⌘","cmd","MetaLeft"),k("[","","BracketLeft"),k("]","","BracketRight"),k("SPOT","⌘ space")
  ];
  var MODS={0:1,12:1,24:1,36:1,47:1,49:1,50:1,51:1,53:1,54:1,55:1,56:1,59:1};

  var NAV={
    8:k("PgUp","","PageUp"),
    15:k("↑","","ArrowUp"),19:k("⌥←","word","ArrowLeft","A"),20:k("↑","","ArrowUp"),21:k("⌥→","word","ArrowRight","A"),
    26:k("←","","ArrowLeft"),27:k("↓","","ArrowDown"),28:k("→","","ArrowRight"),29:k("⌦","fwd del","Delete"),
    30:k("⌘←","line","ArrowLeft","M"),31:k("←","","ArrowLeft"),32:k("↓","","ArrowDown"),33:k("→","","ArrowRight"),34:k("⌘→","line","ArrowRight","M"),
    41:k("⌥⌫","word","Backspace","A"),42:k("⌃↑","mission","ArrowUp","C"),43:k("⌃←","space","ArrowLeft","C"),
    44:k("PgDn","","PageDown"),45:k("⌃→","space","ArrowRight","C"),46:k("⌃↓","exposé","ArrowDown","C")
  };
  var FN={
    0:k("BOOT","left",null,"",true),3:k("shot","full"),4:k("shot","region"),5:k("shot","toolbar"),
    6:k("BT 0","slot"),7:k("BT 1","slot"),8:k("BT 2","slot"),9:k("BT 3","slot"),10:k("BT 4","slot"),11:k("BOOT","right",null,"",true),
    13:k("BT ✕","clear"),14:k("F10","","F10"),15:k("F9","","F9"),16:k("F8","","F8"),17:k("F7","","F7"),18:k("☼−","dimmer"),19:k("☼+","bright"),
    26:k("F11","","F11"),27:k("F6","","F6"),28:k("F5","","F5"),29:k("F4","","F4"),
    30:k("prev","track"),31:k("vol−",""),32:k("vol+",""),33:k("next","track"),34:k("SCRL","toggle"),35:k("\\","⇧ for |","Backslash"),
    37:k("BT ✕✕","clr all"),38:k("F12","","F12"),39:k("F3","","F3"),40:k("F2","","F2"),41:k("F1","","F1"),
    42:k("play","pause"),43:k("mute",""),46:k("SNIPE","toggle")
  };
  var CLICKS={51:k("MID","click"),52:k("LEFT","click"),53:k("RIGHT","click")};
  var LAYERS={base:BASE,nav:NAV,fn:FN,mouse:CLICKS,snipe:CLICKS,scroll:{}};
  var HOLD={nav:53,fn:54};
  var TABS=[["base","BASE","--ink"],["nav","NAV","--nav"],["fn","FN","--fn"],["mouse","MOUSE","--mouse"],["snipe","SNIPE","--snipe"],["scroll","SCROLL","--scroll"]];
  var CAPTION={
    base:"<b>BASE</b> — nothing held. Left thumb: <kbd>⌫</kbd> <kbd>space</kbd> <kbd>NAV</kbd>. Right thumb: <kbd>FN</kbd> <kbd>⇧</kbd> <kbd>⌘</kbd>, and it rolls the ball. Return is the right pinky's bottom corner of the letter block.",
    nav:"<b>NAV</b> — hold the left inner thumb. Arrows on <kbd>I</kbd><kbd>J</kbd><kbd>K</kbd><kbd>L</kbd> (mirrored on <kbd>E</kbd><kbd>S</kbd><kbd>D</kbd><kbd>F</kbd>); the keys around them jump by word, line and Space. Tap the thumb alone and it right-clicks.",
    fn:"<b>FN</b> — hold the right inner thumb. Left hand: F-keys and screenshots. Right hand: media and brightness. Red corners reboot a half into its flasher — leave them alone.",
    mouse:"<b>MOUSE</b> — switches itself on the moment the ball moves, and lingers 0.8 s after it stops. While it's on, the left thumb clicks instead of typing.",
    snipe:"<b>SNIPE</b> — <kbd>FN</kbd>+<kbd>/</kbd> toggles it. Half-speed pointer for precise work. Left thumb keys are clicks the whole time and the right knob scrolls sideways. <kbd>FN</kbd>+<kbd>/</kbd> again to leave.",
    scroll:"<b>SCROLL</b> — <kbd>FN</kbd>+<kbd>;</kbd> toggles it. The ball scrolls the page instead of moving the pointer. No keys change. <kbd>FN</kbd>+<kbd>;</kbd> again to leave."
  };

  var TASKS=[
    {g:"Editing text",q:"Arrow keys",layer:"nav",hold:[53],keys:[20,31,32,33,15,26,27,28],n:"Hold <kbd>NAV</kbd> with the left inner thumb. Arrows sit under the right hand on <kbd>I</kbd> <kbd>J</kbd> <kbd>K</kbd> <kbd>L</kbd>, mirrored on <kbd>E</kbd> <kbd>S</kbd> <kbd>D</kbd> <kbd>F</kbd>."},
    {g:"Editing text",q:"Jump a word left or right",layer:"nav",hold:[53],keys:[19,21],n:"<kbd>NAV</kbd>+<kbd>U</kbd> and <kbd>NAV</kbd>+<kbd>O</kbd> send ⌥← and ⌥→ — the keys just above the ← and → arrows."},
    {g:"Editing text",q:"Jump to the start or end of a line",layer:"nav",hold:[53],keys:[30,34],n:"<kbd>NAV</kbd>+<kbd>H</kbd> and <kbd>NAV</kbd>+<kbd>;</kbd> send ⌘← and ⌘→ — one step outside the arrows."},
    {g:"Editing text",q:"Select text",layer:"nav",hold:[53,55],keys:[20,31,32,33,19,21,30,34],n:"Hold <kbd>NAV</kbd> (left thumb) and <kbd>⇧</kbd> (right middle thumb) together, then move. <kbd>U</kbd>/<kbd>O</kbd> grow the selection by a word, <kbd>H</kbd>/<kbd>;</kbd> to the line ends."},
    {g:"Editing text",q:"Delete a whole word",layer:"nav",hold:[53],keys:[41],n:"<kbd>NAV</kbd>+<kbd>B</kbd> sends ⌥⌫."},
    {g:"Editing text",q:"Forward delete",layer:"nav",hold:[53],keys:[29],n:"<kbd>NAV</kbd>+<kbd>G</kbd>."},
    {g:"Editing text",q:"Page up and down",layer:"nav",hold:[53],keys:[8,44],knob:"R",n:"Turn the right knob. Or <kbd>NAV</kbd>+<kbd>8</kbd> / <kbd>NAV</kbd>+<kbd>,</kbd> — straight above and below the arrow cluster."},
    {g:"Editing text",q:"Backslash and pipe",layer:"fn",hold:[54],keys:[35],n:"There's no \\ on the base layer. <kbd>FN</kbd>+<kbd>'</kbd> types \\ — add <kbd>⇧</kbd> for |."},
    {g:"Editing text",q:"Return, Esc, Tab, backtick",layer:"base",keys:[47,0,12,48],n:"Return is the right pinky's bottom-row outer key, where right Shift normally lives. Esc, Tab, Ctrl and Shift run down the left outer column; <kbd>&#96;</kbd> is the bottom-left corner."},

    {g:"Getting around macOS",q:"⌘ shortcuts — copy, paste, undo",layer:"base",keys:[56,50],n:"Two <kbd>⌘</kbd> keys, same signal: right outer thumb and left bottom row. Use the right-thumb one for nearly everything — ⌘C, ⌘V, ⌘Z, even right-hand letters like ⌘L. Keep the left one for ⌘-clicks."},
    {g:"Getting around macOS",q:"Option and Control",layer:"base",keys:[49,24],n:"One of each, both on the left hand: <kbd>⌥</kbd> on the bottom row, <kbd>⌃</kbd> on the pinky home key where Caps Lock would be."},
    {g:"Getting around macOS",q:"Spotlight",layer:"base",keys:[59],n:"The bottom-right corner sends ⌘Space in one press."},
    {g:"Getting around macOS",q:"Switch apps and windows",layer:"base",hold:[56],keys:[12,48],n:"Right-thumb <kbd>⌘</kbd>+<kbd>tab</kbd> cycles apps; <kbd>⌘</kbd>+<kbd>&#96;</kbd> cycles the windows of one app. Both targets are on the left edge."},
    {g:"Getting around macOS",q:"Mission Control and Spaces",layer:"nav",hold:[53],keys:[42,43,45,46],n:"<kbd>NAV</kbd>+<kbd>N</kbd> Mission Control · <kbd>NAV</kbd>+<kbd>/</kbd> this app's windows · <kbd>NAV</kbd>+<kbd>M</kbd> and <kbd>NAV</kbd>+<kbd>.</kbd> one Space left or right. They send ⌃-arrows, so those shortcuts must be ticked in System Settings."},
    {g:"Getting around macOS",q:"Screenshot to the clipboard",layer:"fn",hold:[54],keys:[3,4,5],n:"<kbd>FN</kbd>+<kbd>3</kbd> whole screen, <kbd>FN</kbd>+<kbd>4</kbd> drag a region — both land on the clipboard, ready to ⌘V. <kbd>FN</kbd>+<kbd>5</kbd> opens the screenshot toolbar. For a file instead, type ⌘⇧3 / ⌘⇧4 by hand."},
    {g:"Getting around macOS",q:"Volume, media, brightness",layer:"fn",hold:[54],keys:[30,31,32,33,42,43,18,19],n:"Right hand while holding <kbd>FN</kbd>: <kbd>J</kbd>/<kbd>K</kbd> volume, <kbd>M</kbd> mute, <kbd>N</kbd> play/pause, <kbd>H</kbd>/<kbd>L</kbd> previous/next, <kbd>Y</kbd>/<kbd>U</kbd> brightness."},
    {g:"Getting around macOS",q:"F1 – F12",layer:"fn",hold:[54],keys:[41,40,39,29,28,27,17,16,15,14,26,38],n:"<kbd>FN</kbd> + left hand, laid out as a mirrored numpad: <kbd>B</kbd> <kbd>V</kbd> <kbd>C</kbd> = F1 F2 F3, <kbd>G</kbd> <kbd>F</kbd> <kbd>D</kbd> = F4 F5 F6, <kbd>T</kbd> <kbd>R</kbd> <kbd>E</kbd> = F7 F8 F9, then <kbd>W</kbd> <kbd>S</kbd> <kbd>X</kbd> = F10 F11 F12."},

    {g:"Ball, clicks, scroll",q:"Left, right and middle click",layer:"mouse",keys:[52,53,51],ball:1,n:"Roll the ball with your right thumb. The moment it moves, the left thumb keys become buttons — <kbd>space</kbd> = left click, <kbd>NAV</kbd> = right click, <kbd>⌫</kbd> = middle click — and stay that way for 0.8 s after the ball stops."},
    {g:"Ball, clicks, scroll",q:"Right-click without touching the ball",layer:"base",keys:[53],n:"Tap <kbd>NAV</kbd> on its own."},
    {g:"Ball, clicks, scroll",q:"Drag",layer:"mouse",keys:[52],ball:1,n:"Hold the left-click thumb, roll, let go."},
    {g:"Ball, clicks, scroll",q:"⌘-click, ⇧-click, ⌥-click",layer:"mouse",hold:[50,49,36,24],keys:[52],ball:1,n:"Your right thumb is busy with the ball, so use the left-hand modifiers: <kbd>⌘</kbd> or <kbd>⌥</kbd> on the bottom row, <kbd>⇧</kbd> or <kbd>⌃</kbd> on the pinky column. Hold one, roll, click with the left thumb."},
    {g:"Ball, clicks, scroll",q:"Scroll",layer:"fn",hold:[54],keys:[34],knob:"L",n:"Turn the left knob — one click, one small step. For long pages, <kbd>FN</kbd>+<kbd>;</kbd> turns the ball itself into the scroll wheel; <kbd>FN</kbd>+<kbd>;</kbd> again gets the pointer back."},
    {g:"Ball, clicks, scroll",q:"Pixel-precise pointer",layer:"fn",hold:[54],keys:[46],n:"<kbd>FN</kbd>+<kbd>/</kbd> toggles SNIPE: pointer at half speed, right knob scrolls sideways. While it's on the left thumb keys are clicks full-time — no space, no ⌫ — so toggle it off when you're done."},

    {g:"The board itself",q:"Switch Bluetooth device",layer:"fn",hold:[54],keys:[6,7,8,9,10],n:"Five pairing slots on <kbd>FN</kbd>+<kbd>6</kbd> <kbd>7</kbd> <kbd>8</kbd> <kbd>9</kbd> <kbd>0</kbd>. Pair the Mac on slot 0 (<kbd>FN</kbd>+<kbd>6</kbd>) and treat that as home. If Bluetooth goes deaf, you probably brushed one of the others."},
    {g:"The board itself",q:"Re-pair from scratch",layer:"fn",hold:[54],keys:[13,37],n:"<kbd>FN</kbd>+<kbd>Q</kbd> forgets the host on the current slot; <kbd>FN</kbd>+<kbd>Z</kbd> forgets all five. Do this <em>and</em> Forget This Device on the Mac — the board refuses to re-pair a slot it thinks is taken."},
    {g:"The board itself",q:"Cable or Bluetooth?",layer:"base",keys:[],n:"USB goes into the right half. While the cable is in, typing travels over USB; unplug and it falls back to Bluetooth. The halves always talk to each other wirelessly."},
    {g:"The board itself",q:"Flashing firmware (leave alone)",layer:"fn",hold:[54],keys:[0,11],n:"<kbd>FN</kbd> + a top corner reboots that half into its bootloader: it stops typing and, on USB, shows up as a NICENANO drive. Hit one by accident? Power-cycle that half."}
  ];

  var LADDER=[
    {t:"Thumbs and corners",c:"--ink",d:["Type three sentences. Space and ⌫ are both LEFT thumb; ⇧ is the right middle thumb.","End each sentence with Return — right pinky, bottom corner of the letters.","⌘C, ⌘V, ⌘Z, ⌘Tab using the right outer thumb for ⌘.","Find Esc, Tab, Ctrl and ` without looking. They're all on the left edge."]},
    {t:"NAV: moving through text",c:"--nav",d:["Hold NAV and walk around a paragraph with I J K L.","Add ⇧ (right thumb) to select. U and O select a word at a time.","NAV+H and NAV+; to line ends; NAV+B to delete a word; NAV+G to forward-delete.","Rewrite one sentence of an email using only NAV moves — no ball."]},
    {t:"Ball and clicks",c:"--mouse",d:["Roll, stop, click with the Space thumb inside a second. Repeat until the timing is dull.","Drag a window: hold the click thumb, roll, release.","Tap NAV alone for a right-click menu; Esc to dismiss.","⌘-click three files in Finder: left ⌘ (bottom row) + roll + thumb click.","Scroll a long page with the left knob."]},
    {t:"Getting around macOS",c:"--scroll",d:["Launch three apps from the Spotlight corner.","NAV+N for Mission Control, NAV+M and NAV+. to change Space, NAV+/ for app windows.","⌘Tab between apps, ⌘` between windows."]},
    {t:"FN: the extras",c:"--fn",d:["FN+4, drag a region, ⌘V it into a message.","FN+J/K volume, FN+N play/pause, FN+Y/U brightness.","FN+; and ball-scroll a long page. FN+; to leave.","FN+/ and park the cursor between two letters. FN+/ to leave — check Space types again.","Find F5 and F11 without looking at this page."]}
  ];

  var stage=document.getElementById("stage"),board=document.getElementById("board"),
      halfL=document.getElementById("halfL"),halfR=document.getElementById("halfR"),
      ball=document.getElementById("ball"),knobL=document.getElementById("knobL"),knobR=document.getElementById("knobR"),
      caption=document.getElementById("caption"),tabsEl=document.getElementById("tabs"),
      finder=document.getElementById("finder"),ladderEl=document.getElementById("ladder"),testerBtn=document.getElementById("tester");
  var cur="base",task=null,testing=false,els=[],tabBtns={},taskBtns=[];

  POS.forEach(function(p,i){
    var right=p[0]>=900,d=document.createElement("div");
    d.className="key";
    d.style.left=((right?p[0]-1000:p[0])/800*100)+"%";
    d.style.top=(p[1]/H*100)+"%";
    d.innerHTML='<div class="cap"><span class="m"></span><span class="s"></span></div>';
    (right?halfR:halfL).appendChild(d);
    els.push(d);
  });

  TABS.forEach(function(t){
    var b=document.createElement("button");
    b.type="button";b.className="tab";b.setAttribute("role","tab");b.id="tab-"+t[0];
    b.style.setProperty("--tabc","var("+t[2]+")");
    b.textContent=t[1];
    b.addEventListener("click",function(){clearTask();setLayer(t[0]);});
    tabsEl.appendChild(b);tabBtns[t[0]]=b;
  });

  function isLong(m){return m.length>=3||/^F\d/.test(m);}

  function paint(){
    var Lr=LAYERS[cur];
    stage.setAttribute("data-layer",cur);
    Object.keys(tabBtns).forEach(function(n){tabBtns[n].setAttribute("aria-selected",n===cur?"true":"false");});
    els.forEach(function(el,i){
      var own=cur!=="base"&&Lr[i]?Lr[i]:null,b=own||BASE[i],m=b.m,s=b.s,cls="key";
      if(MODS[i])cls+=" mod";
      if(cur!=="base"&&!own)cls+=" dim";
      if(own)cls+=b.danger?" danger":" live";
      if(cur==="base"&&i===53)cls+=" k-nav";
      if(cur==="base"&&i===54)cls+=" k-fn";
      if(HOLD[cur]===i){cls+=" hold";m=cur.toUpperCase();s="hold";}
      if(task){
        if(task.hold&&task.hold.indexOf(i)>=0)cls+=" hold";
        if(task.keys.indexOf(i)>=0)cls+=" hit";
      }
      el.className=cls;
      var me=el.firstChild.firstChild,se=el.firstChild.lastChild;
      me.textContent=m;me.className=isLong(m)?"m long":"m";se.textContent=s;
    });
    var focus=!!(task&&(task.keys.length||(task.hold&&task.hold.length)));
    board.classList.toggle("focus",focus);
    var ballMode=cur==="mouse"||cur==="snipe"||cur==="scroll";
    ball.classList.toggle("on",ballMode||!!(task&&task.ball));
    ball.textContent=cur==="scroll"?"scroll":cur==="snipe"?"slow":"ball";
    knobR.innerHTML=cur==="snipe"?"↔<br>scroll":"pg<br>↑↓";
    knobL.classList.toggle("on",!!(task&&task.knob==="L"));
    knobR.classList.toggle("on",cur==="snipe"||!!(task&&task.knob==="R"));
    if(!testing)caption.innerHTML=task?task.n:CAPTION[cur];
  }
  function setLayer(n){cur=n;paint();}
  function clearTask(){
    task=null;
    taskBtns.forEach(function(x){x.b.setAttribute("aria-pressed","false");x.p.hidden=true;});
  }

  var groups={};
  TASKS.forEach(function(t,idx){
    var g=groups[t.g];
    if(!g){
      g=document.createElement("div");g.className="group";
      var h=document.createElement("h3");h.textContent=t.g;g.appendChild(h);
      finder.appendChild(g);groups[t.g]=g;
    }
    var b=document.createElement("button"),p=document.createElement("p");
    b.type="button";b.className="task";b.id="task-"+idx;b.setAttribute("aria-pressed","false");b.textContent=t.q;
    p.className="note";p.innerHTML=t.n;p.hidden=true;
    b.addEventListener("click",function(){
      var was=task===t;
      clearTask();
      if(!was){
        task=t;b.setAttribute("aria-pressed","true");p.hidden=false;
        if(testing)setTesting(false);
        setLayer(t.layer);
        var rc=stage.getBoundingClientRect();
        if(rc.bottom<120||rc.top>window.innerHeight-120)stage.scrollIntoView({behavior:"smooth",block:"start"});
      }else paint();
    });
    g.appendChild(b);g.appendChild(p);taskBtns.push({b:b,p:p});
  });

  var done={};
  try{done=JSON.parse(localStorage.getItem("cck-ladder")||"{}")||{};}catch(e){done={};}
  LADDER.forEach(function(step,si){
    var li=document.createElement("li"),h=document.createElement("h4");
    li.style.setProperty("--c","var("+step.c+")");
    h.textContent=step.t;li.appendChild(h);
    step.d.forEach(function(txt,di){
      var id="drill-"+si+"-"+di,lab=document.createElement("label"),inp=document.createElement("input"),sp=document.createElement("span");
      inp.type="checkbox";inp.id=id;inp.checked=!!done[id];sp.textContent=txt;
      inp.addEventListener("change",function(){
        done[id]=inp.checked;
        try{localStorage.setItem("cck-ladder",JSON.stringify(done));}catch(e){}
      });
      lab.appendChild(inp);lab.appendChild(sp);li.appendChild(lab);
    });
    ladderEl.appendChild(li);
  });

  /* key tester */
  var INDEX={};
  function addIdx(layer,pos,b){if(!b||!b.code)return;var sig=b.mods+"+"+b.code;(INDEX[sig]=INDEX[sig]||[]).push({layer:layer,pos:pos});}
  BASE.forEach(function(b,i){addIdx("base",i,b);});
  Object.keys(NAV).forEach(function(i){addIdx("nav",+i,NAV[i]);});
  Object.keys(FN).forEach(function(i){addIdx("fn",+i,FN[i]);});
  var timers={};
  function flash(pos){
    els[pos].classList.add("pressed");
    clearTimeout(timers[pos]);
    timers[pos]=setTimeout(function(){els[pos].classList.remove("pressed");},420);
  }
  function setTesting(on){
    testing=on;
    testerBtn.setAttribute("aria-pressed",on?"true":"false");
    testerBtn.textContent="Key tester: "+(on?"on":"off");
    if(on){clearTask();caption.innerHTML="<b>KEY TESTER</b> — press anything, layers included. The key lights up where it lives. macOS swallows media keys, screenshots, Spotlight and ⌃-arrows before a web page sees them, so those stay dark.";paint();}
    else paint();
  }
  testerBtn.addEventListener("click",function(){setTesting(!testing);testerBtn.blur();});
  window.addEventListener("keydown",function(e){
    if(!testing)return;
    if(!e.metaKey)e.preventDefault();
    var mods=(e.ctrlKey?"C":"")+(e.altKey?"A":"")+(e.metaKey?"M":"");
    var hits=INDEX[mods+"+"+e.code]||INDEX["+"+e.code];
    if(!hits){caption.innerHTML="<b>KEY TESTER</b> — got <kbd>"+(e.code||"?")+"</kbd>, which isn't on the map.";return;}
    if(hits[0].layer!==cur)setLayer(hits[0].layer);
    hits.forEach(function(h){flash(h.pos);});
    var where=hits[0].layer==="base"?"base layer":hits[0].layer.toUpperCase()+" layer — you're holding "+hits[0].layer.toUpperCase();
    caption.innerHTML="<b>KEY TESTER</b> — <kbd>"+LAYERS[hits[0].layer][hits[0].pos].m+"</kbd> · "+where+(hits.length>1?" (lives in "+hits.length+" places)":"");
  });

  paint();
})();
