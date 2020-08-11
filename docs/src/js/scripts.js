var myUI, startBtns;

startBtns = [
    "GO!",
    "LEVELS",
    "SETTINGS",
    "UPGRADE"
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
            var divBase = createEle("div");

            divBase.innerHTML = startBtns[x];
            divBase.className = "divBase";

            body.append(divBase);

            setTimeout(function(){
                makeFull(divBase);
            },100);
        }
    }
}

window.onload = function(){
    myUI.runSplashScreen();
};