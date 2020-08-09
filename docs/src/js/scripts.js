var myUI;

myUI = {
    init: function(){
        myUI.loadout();
    },
    loadout: function(){
        alert("loadout run");
    }
}

window.onload = function(){
    myUI.init();
};