var myUI, startBtns, pageLabels;

startBtns = [
    "GO!",
    "LEVELS",
    "SETTINGS",
    "UPGRADE"
];
pageLabels = [
    "LEVEL #",
    "LEVEL PAGE",
    "SETTINGS AND OPTIONS",
    "UPGRADES AND SUPPORT"
];

myUI = {
    runSplashScreen: function(){
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

            xOut.innerHTML = "❌";
            xOut.className = "xOut";
            xOut.onclick = myUI.xOutFunc(divBase);

            pLabel.className = "pLabel";
            pLabel.innerHTML = pageLabels[x];
            pLabel.append(xOut);

            divBase.className = "divBase";
            divBase.append(pLabel);

            body.append(divBase);

            setTimeout(function(){
                makeFull(divBase);
            },100);
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