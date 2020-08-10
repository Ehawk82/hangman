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
        alert("loadout run");
    }
}

window.onload = function(){
    myUI.runSplashScreen();
};