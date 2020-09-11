var myUI, soundboard, startBtns, pageLabels,w,count = 0, limbs = 0;

var tick = new Audio("./src/assets/tic.wav");
var ding = new Audio("./src/assets/ding.wav");
var bleep = new Audio("./src/assets/bleep.wav");
var success = new Audio("./src/assets/success.wav");
var gameoverSound = new Audio("./src/assets/gameover.wav");

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
        //window.screen.lockOrientation(orientation);

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
        var donateForm = bySel(".donateForm_full");
            console.log(donateForm);
            if(donateForm){
                takeFull(donateForm);
            }
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
            soundboard.runTick();
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
        var donateForm = bySel(".donateForm");
        var extrasHolder = createEle("div");

        extrasHolder.innerHTML = "If you can, please help us keep developing!";

        divBase.append(extrasHolder);

        setTimeout(function(){
            makeFull(donateForm);
        },1000);
    },
    genLevels: function(divBase,settings,uData) {
        var levels = createEle("div"),
            lvHolder = createEle("div");
        var uData = parseLS("userdata");
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

                if (uData.levels[uData.level].stars >= k) {
                    s = "star_full";
                } else {
                    if(i < uData.level){
                        s = "star_full";
                    } else {
                        s = "star";
                    }
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
            splashBtn = createEle("button"),spl,
            audBtn = createEle("button"),tgl;

        if(settings.sound.on === true){
            tgl = "ON";
        } else {
            tgl = "OFF";
        }

        audBtn.innerHTML = "Audio: " + tgl;
        audBtn.onclick = myUI.toggleAudio(settings,audBtn,tgl);

        if(settings.splash === true){
            spl = "ON";
        } else {
            spl = "OFF";
        }
        splashBtn.innerHTML = "Splash Screen: " + spl;
        splashBtn.onclick = myUI.toggleSplash(settings,splashBtn,spl);

        settPage.className = "settPage";
        settPage.append(splashBtn,audBtn);

        divBase.append(settPage);
    },
    genHangmanSession: function(divBase,settings,uData) {
        var lsStash = parseLS("lsStash");

        var hangBox = createEle("div"),
            letterBox = createEle("div"),
            blankletterGrid = createEle("div"),
            botBtn = createEle("div"),r;

        botBtn.className = "botBtn";
        for (var b = 0; b < 3; b++) {
            var row = createEle("div");

            row.className = "row";
            row.innerHTML = "&nbsp;";

            if(b === 0){
                var head = createEle("div");
                head.innerHTML = "&nbsp;";
                head.className = "bot" + parts[0];
                head.style.backgroundImage = "url(src/assets/bot" + parts[0] + ".png)";
                row.append(head);
            }

            if (b === 1) {
                var armL = createEle("div");
                    armL.innerHTML = "&nbsp;";
                    armL.className = "bot" + parts[2];
                    armL.style.backgroundImage = "url(src/assets/bot" + parts[2] + ".png)";
                var bodyM = createEle("div");
                    bodyM.innerHTML = "&nbsp;";
                    bodyM.className = "bot" + parts[1];
                    bodyM.style.backgroundImage = "url(src/assets/bot" + parts[1] + ".png)";
                var armR = createEle("div");
                    armR.innerHTML = "&nbsp;";
                    armR.className = "bot" + parts[3];
                    armR.style.backgroundImage = "url(src/assets/bot" + parts[3] + ".png)";

                row.append(armL,bodyM,armR);
            }

            if (b === 2) {
                var legL = createEle("div");
                    legL.innerHTML = "&nbsp;";
                    legL.className = "bot" + parts[4];
                    legL.style.backgroundImage = "url(src/assets/bot" + parts[4] + ".png)";
                var legR = createEle("div");
                    legR.innerHTML = "&nbsp;";
                    legR.className = "bot" + parts[5];
                    legR.style.backgroundImage = "url(src/assets/bot" + parts[5] + ".png)";


                row.append(legL,legR);
            }
            botBtn.append(row);
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
        var lsStash = parseLS("lsStash");
        var n = Math.floor(Math.random() * (r.length)) + 0;
        var gtg = false;
        var w = r[n];

        const found = lsStash.find(element => element === w);

        if (found){
            if(lsStash.length === basicStash.length){
                //win scenario
                myUI.runWin();
            } else {
                return myUI.randomWord(r,blG,lsStash,uData);
            }
        } else {
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
        }
    },
    runWin: function(){
        var winPage = createEle("div");

        winPage.innerHTML = "YOU HAVE SOLVED EVERY WORD!";
        winPage.className = "winPage";

        body.append(winPage);

        soundboard.runSuccess();

    },
    checkLetter: function(x) {
        return function() {
            var lsStash = parseLS("lsStash");
            var stashLen = lsStash.length;
            var y = null;

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
                    y = myLetter;
                    soundboard.runDing();
                    count++;
                }                
            }

            if(y === null){
                limbs++;
                if(limbs === 6) {
                    myUI.gameoverPage();
                } else {
                    myUI.runLimb(limbs);
                }
            }
            if(count === bsLen) {
                //word solved

                lsStash[stashLen++] = bs;
                saveLS("lsStash",lsStash);
                myUI.wordWon();
                soundboard.runSuccess();
            }

        }
    },
    gameoverPage: function(){
        soundboard.runGameOver();
        var gameOver = createEle("div"),
            msg = createEle("h2"),
            btn = createEle("button");

        msg.innerHTML = "GAME OVER!";

        btn.innerHTML = "RESTART!";
        btn.onclick = function(){ return location.reload() };

        gameOver.className = "gameOver";
        gameOver.append(msg,btn);

        body.append(gameOver);

        setTimeout(function() {
            makeFull(gameOver);
        },100);
    },
    runLimb: function(limbs){
        soundboard.runBleep();
        var l = limbs - 1;
        limbs++;
        var part = bySel(".bot" + parts[l]);
        makeFull(part);
    },
    wordWon: function(){
        var wordWinPage = createEle("div"),
            winMessage = createEle("p"),
            bigStar = createEle("div");
            homeBtn = createEle("button");
        var uData = parseLS("userdata");

        homeBtn.innerHTML = "HOME";
        homeBtn.onclick = function(){ return location.reload() };

        winMessage.innerHTML = "YOU HAVE WON A STAR!";

        bigStar.innerHTML = "⭐";
        bigStar.style.fontSize = "8rem";

        if (uData.levels[uData.level].stars >= 2) {
            uData.levels[uData.level].stars = 3;
            uData.level++;
            var obj = {
                stars: 0
            }
            uData.levels[uData.level] = obj;        
        } else {
            uData.levels[uData.level].stars++;
        }
        

        saveLS("userdata", uData);

        wordWinPage.className = "wordWinPage";
        wordWinPage.append(winMessage,bigStar,homeBtn);

        body.append(wordWinPage);

        setTimeout(function(){
            makeFull(wordWinPage);
        },10);
        
    },
    toggleAudio: function(settings,audBtn,tgl){
        return function() {
            soundboard.runTick();
            settings.sound.on = (settings.sound.on === true)? false : true;
            tgl = (tgl === "ON")? "OFF" : "ON";
            audBtn.innerHTML = "Audio: " + tgl;
            saveLS("settings",settings);

        }
    },
    toggleSplash: function(settings,splashBtn,spl){
        return function() {
            soundboard.runTick();
            settings.splash = (settings.splash === true)? false : true;
            spl = (spl === "ON")? "OFF" : "ON";
            splashBtn.innerHTML = "Splash Screen: " + spl;
            saveLS("settings",settings);

        }
    },
    xOutFunc: function(divBase) {
        return function(){
            soundboard.runTick();
            deleteThis(divBase,0);
            myUI.loadout();
        }
    }
}
soundboard = {
    runTick: function(){
        var settings = parseLS("settings");
        if (settings.sound.on === true) {
            tick.volume = settings.sound.vol;
            tick.play();
        }
    },
    runDing: function() {
        var settings = parseLS("settings");
        if (settings.sound.on === true) {
            ding.volume = settings.sound.vol;
            ding.play();
        }
    },
    runBleep: function(){
        var settings = parseLS("settings");
        if (settings.sound.on === true) {
            bleep.volume = settings.sound.vol;
            bleep.play();
        }
    },
    runSuccess: function() {
        var settings = parseLS("settings");
        if (settings.sound.on === true) {
            ding.play();
            setTimeout(function(){
                success.volume = settings.sound.vol;
                success.play();
            },100);
        }
    },
    runGameOver: function() {
        var settings = parseLS("settings");
        if (settings.sound.on === true) {
            gameoverSound.play();
            setTimeout(function(){
                gameoverSound.volume = settings.sound.vol;
                gameoverSound.play();
            },100);
        }
    }
}

window.onload = function(){
    myUI.runSplashScreen();
};