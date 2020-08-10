var myUI;

myUI = {
    runSplashScreen: function(){
        var splash = createEle("div");

        splash.innerHTML = "HANGMAN/BOT";
        splash.className = "splash";

        body.append(splash);

        //myUI.init();
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