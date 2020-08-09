var myUI;

myUI = {
    runSplashScreen: function(){
        myUI.init();
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