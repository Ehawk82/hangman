var myUI;

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
        var startPage = createEle("div");

        startPage.innerHTML = "start page";
        startPage.className = "startPage";

        body.append(startPage);

        setTimeout(function(){
            makeFull(startPage);
        },10);
    }
}

window.onload = function(){
    myUI.runSplashScreen();
};