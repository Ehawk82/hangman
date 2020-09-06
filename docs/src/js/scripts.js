var myUI, startBtns, pageLabels,w,count = 0;
startBtns = [
    "GO!",
    "LEVELS",
    "SETTINGS",
    "EXTRAS"
];

pageLabels = [
    "&nbsp;",
    "LEVELS",
    "SETTINGS",
    "EXTRAS"
];

myUI = {
    runSplashScreen: function(){
        var settings = parseLS("settings");
        if(settings){
            if (settings.splash === true) {
                myUI.splashRuns();
            } else {
                myUI.init();
            }
        }else{ 
            myUI.splashRuns();
        }
    },
    splashRuns: function(){
        var splash = createEle("div");

            splash.innerHTML = "HANGMAN/BOT";
            splash.className = "splash";

            body.append(splash);

            setTimeout(function(){
                makeFull(splash);
                setTimeout(function(){
                    takeFull(splash);
                    deleteThis(splash, 1010);
                    setTimeout(function(){
                        myUI.init();
                    },1020);
                },2000);
            },10);
    },
    init: function(){
        LSinit("userdata",userdata);
        LSinit("lsStash",lsStash);
        LSinit("settings",settings);
        myUI.loadout();
    },
    loadout: function(){
        var startPage = createEle("div"),
            startBtnHolder = createEle("div");

        startBtnHolder.className = "startBtnHolder";
        
        for (var i = 0; i < startBtns.length; i++) {
            var btn = createEle("button");

            btn.innerHTML = startBtns[i];
            btn.onclick = myUI.stBtnClicked(i,startPage);

            startBtnHolder.append(btn);
        }

        startPage.className = "startPage";
        startPage.append(startBtnHolder);

        body.append(startPage);

        setTimeout(function(){
            makeFull(startPage);
        },10);
    },
    stBtnClicked: function(x,startPage){
        return function(){
            deleteThis(startPage, 0);
            var divBase = createEle("div"), 
                pLabel = createEle("h2"),
                xOut = createEle("button");

            xOut.innerHTML = "✖️";
            xOut.className = "xOut";
            xOut.onclick = myUI.xOutFunc(divBase);

            pLabel.className = "pLabel";
            pLabel.innerHTML = pageLabels[x];
            pLabel.append(xOut);

            divBase.className = "divBase";
            divBase.append(pLabel);

            body.append(divBase);

            myUI.genPage(x,divBase);

            setTimeout(function(){
                makeFull(divBase);
            },100);
        }
    },
    genPage: function(x,divBase) {
        var settings = parseLS("settings"),
            uData = parseLS("userdata");

        if(x===0){
            myUI.genHangmanSession(divBase,settings,uData);
        }
        if(x===1){
            myUI.genLevels(divBase,settings,uData);
        }
        if(x===2){
            myUI.genSettings(divBase,settings,uData);
        }
        if(x===3){
            myUI.genExtras(divBase,settings,uData);
        }
    },
    genExtras: function(divBase,settings,uData) {
        var extrasHolder = createEle("div");

        extrasHolder.innerHTML = "extra shit";

        divBase.append(extrasHolder);
    },
    genLevels: function(divBase,settings,uData) {
        var levels = createEle("div"),
            lvHolder = createEle("div");

        lvHolder.className = "lvHolder";
        for (var i = 1; i < 31; i++) {
            var box = createEle("div"),t,
                stars = createEle("div");

            if (uData.level >= i) {
                t = "box_full";
            } else {
                t = "box";
            }
            for (var k = 1; k < 4; k++) {
                var star = createEle("span");

                if (uData.stars >= k) {
                    s = "star_full";
                } else {
                    s = "star";
                }
                star.innerHTML = "⭐";
                star.className = s;
                star.setAttribute("data-index", k);

                stars.append(star);
            }

            box.append(i,stars);
            box.className = t;

            lvHolder.append(box);
        }

        levels.append(lvHolder);

        divBase.append(levels);
    },
    genSettings: function(divBase,settings,uData) {
        var settPage = createEle("div"),
            splashBtn = createEle("button"),spl;

        if(settings.splash === true){
            spl = "ON";
        } else {
            spl = "OFF";
        }
        splashBtn.innerHTML = "Splash Screen: " + spl;
        splashBtn.onclick = myUI.toggleSplash(settings,splashBtn,spl);

        settPage.append(splashBtn);

        divBase.append(settPage);
    },
    genHangmanSession: function(divBase,settings,uData) {
        var lsStash = parseLS("lsStash");

        var hangBox = createEle("div"),
            letterBox = createEle("div"),
            blankletterGrid = createEle("div"),
            botBtn = createEle("div"),r;

        botBtn.className = "botBtn";
        for (var p = 0; p < 5; p++) {
            var part = createEle("div");

            part.innerHTML = "&nbsp;";
            part.className = "bot" + parts[p];
            part.style.backgroundImage = "url(src/assets/bot" + parts[p] + ".png)";

            botBtn.append(part);
        }

        blankletterGrid.className = "blankletterGrid";
        myUI.randomWord(basicStash,blankletterGrid,lsStash,uData);

        letterBox.className = "letterBox";
        for (var i = 0; i < alphabet.length; i++) {
            var lttr = createEle("div");

            lttr.innerHTML = alphabet[i];
            lttr.className = "lttr";
            lttr.onclick = myUI.checkLetter(lttr);

            letterBox.append(lttr);
        }

        hangBox.className = "hangBox";
        hangBox.append(blankletterGrid,botBtn);

        divBase.append(hangBox,letterBox);
    },
    randomWord: function(r,blG,lsStash,uData){
        var n = Math.floor(Math.random() * (r.length)) + 0;

        var w = r[n];
        
        if(lsStash.length === basicStash.length){
            //win scenario
            myUI.runWin();
        }
        for (var i = 0; i < w.length; i++) {
            var letter = createEle("div");

            letter.innerHTML = "_";
            letter.className = "letter";
            letter.setAttribute("data-index", n);

            blG.append(letter);


        }
    },
    runWin: function(){
        var winPage = createEle("div");

        winPage.innerHTML = "YOU HAVE SOLVED EVERY WORD!";
        winPage.className = "winPage";

        body.append(winPage);
    },
    checkLetter: function(x) {
        return function() {
            var lsStash = parseLS("lsStash");
            var stashLen = lsStash.length;

            x.onclick = null;
            x.style.opacity = 0.2;
            x.style.cursor = "default";

            var letter = bySelAll(".letter"),
                myLetter = x.innerHTML;

            for (var l = 0; l < letter.length; l++) {
                var n = letter[l].getAttribute("data-index");
            }

            var bs = basicStash[n];
            var bsLen = bs.length;

            for (var i = 0; i < bsLen; i++) {
                if (myLetter === bs[i]) {
                    letter[i].innerHTML = myLetter;
                    count++;
                } else {
                    //limb added
                }
            }

            if(count === bsLen) {
                //word solved
                lsStash[stashLen++] = bs;
                saveLS("lsStash",lsStash);
            }
        }
    },
    toggleSplash: function(settings,splashBtn,spl){
        return function() {
            settings.splash = (settings.splash === true)? false : true;
            spl = (spl === "ON")? "OFF" : "ON";
            splashBtn.innerHTML = "Splash Screen: " + spl;
            saveLS("settings",settings);

        }
    },
    xOutFunc: function(divBase) {
        return function(){ 
            deleteThis(divBase,0);
            myUI.loadout();
        }
    }
}

window.onload = function(){
    myUI.runSplashScreen();
};