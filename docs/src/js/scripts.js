var myUI, startBtns, pageLabels;

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
        var allWords = createEle("div");

            for (var i = 0; i < basicStash.length; i++) {
                allWords.innerHTML += "<p>"+basicStash[i]+"</p>";
            }
            divBase.append(allWords);
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