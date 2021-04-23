//Made by Pocket

//Server Side

function onUpdated() {
    this.zoom = 3;
    this.name = "JackPot(ClickMe)";
    this.image = "jackpot.png"
}
function onPlayerTouchsMe(pl) {
    Option = (Math.floor(Math.random() * 5));
        if (Option == 0) {
            this.chat = "Click me! To Gamble!";
            this.sleep(1);
            this.chat = "";
        } else if (Option == 1) {
            this.chat = "Be sure to have 50$ Atleast!";
            this.sleep(2);
            this.chat = "";
        } else if (Option == 2) {
            this.chat = "Play Smart! :)";
            this.sleep(1);
            this.chat = "";
        } else if (Option == 3) {
            this.chat = "The last guy lost 50k :(";
            this.sleep(2);
            this.chat = "";
        } else if (Option == 4) {
            this.chat = "Goodluck! " + pl.name + "!";
            this.sleep(1);
            this.chat = "";
        } else {
            return;
        }
}
function onClientClicked(pl, action, coins) {
    switch (action) {
        case "50💸": {

    if (player.coins < 50) {
        player.chat = "I have no money :(";
        this.sleep(1);
        return; //so it doesn't go on another switch :)
    } else {
    this.play("casino");         
    player.removecoins(50, "<font color=red>Casino Fee!");
    this.say("🎲Rolling🎲 -3");
    this.sleep(0.05);
    this.say("🎲Rolling🎲 -2");
    this.sleep(0.05);
    this.say("🎲Rolling🎲 -1")
    this.sleep(0.05);
    this.say(pl.name + " Played " + action);
    Option = (Math.floor(Math.random() * 6));
        if (Option == 0) {
            player.addcoins(132,"<font size=12> -<font color=green>JackPot!!!");
            pl.chat = "Oooo I got a JACKPOT!";
            pl.aniarg1 = "jackpot-particle.bani";
            this.sleep(6);
            pl.aniarg1 = "";
        } else if (Option == 1) {
            player.showmessage("You won Nothing!");
        } else if (Option == 2) {
            player.showmessage("You won Nothing!");
        } else if (Option == 3) {
            player.showmessage("You won Nothing!");
        } else if (Option == 4) {
            player.showmessage("You won Nothing!");
        } else if (Option == 5) {
            player.addcoins(5,"You won Coins!");
        } else {
            player.showmessage("You won Nothing!");
        }
            break;
        }
        }
        case "250💸": {

    if (player.coins < 250) {
        player.chat = "I have no money :(";
        this.sleep(1);
        return; //so it doesn't go on another switch :)
    } else {
    this.play("casino");   
    player.removecoins(250, "<font color=red>Casino Fee!");
    this.say("🎲Rolling🎲 -3");
    this.sleep(0.1);
    this.say("🎲Rolling🎲 -2");
    this.sleep(0.1);
    this.say("🎲Rolling🎲 -1")
    this.sleep(0.1);
    this.say(pl.name + " Played " + action);
    Option = (Math.floor(Math.random() * 6));
        if (Option == 0) {
            player.addcoins(582,"<font size=12> -<font color=green>JackPot!!!");
            pl.chat = "Oooo I got a JACKPOT!";
            pl.aniarg1 = "jackpot-particle.bani";
            this.sleep(6);
            pl.aniarg1 = "";
        } else if (Option == 1) {
            player.showmessage("You won Nothing!");
        } else if (Option == 2) {
            player.showmessage("You won Nothing!");
        } else if (Option == 3) {
            player.showmessage("You won Nothing!");
        } else if (Option == 4) {
            player.showmessage("You won Nothing!");
        } else if (Option == 5) {
            player.addcoins(64,"You won Coins!");
        } else {
            player.showmessage("You won Nothing!");
        }
            break;
        }
        }
        case "500💸": {

    if (player.coins < 500) {
        player.chat = "I have no money :(";
        this.sleep(1);
        return; //so it doesn't go on another switch :)
    } else {
    this.play("casino");   
    player.removecoins(500, "<font color=red>Casino Fee!");
    this.say("🎲Rolling🎲 -3");
    this.sleep(0.2);
    this.say("🎲Rolling🎲 -2");
    this.sleep(0.2);
    this.say("🎲Rolling🎲 -1")
    this.sleep(0.2);
    this.say(pl.name + " Played " + action);
    Option = (Math.floor(Math.random() * 6));
        if (Option == 0) {
            player.addcoins(1023,"<font size=12> -<font color=green>JackPot!!!");
            pl.chat = "Oooo I got a JACKPOT!";
            pl.aniarg1 = "jackpot-particle.bani";
            this.sleep(6);
            pl.aniarg1 = "";
        } else if (Option == 1) {
            player.showmessage("You won Nothing!");
        } else if (Option == 2) {
            player.showmessage("You won Nothing!");
        } else if (Option == 3) {
            player.showmessage("You won Nothing!");
        } else if (Option == 4) {
            player.showmessage("You won Nothing!");
        } else if (Option == 5) {
            player.addcoins(298,"You won Coins!");
        } else {
            player.showmessage("You won Nothing!");
        }
            break;
        }
        }
        case "2500💸": {

    if (player.coins < 2500) {
        player.chat = "I have no money :(";
        this.sleep(1);
        return; //so it doesn't go on another switch :)
    } else {
    this.play("casino");   
    player.removecoins(2500, "<font color=red>Casino Fee!");
    this.say("🎲Rolling🎲 -3");
    this.sleep(0.25);
    this.say("🎲Rolling🎲 -2");
    this.sleep(0.25);
    this.say("🎲Rolling🎲 -1")
    this.sleep(0.25);
    this.say(pl.name + " Played " + action);
    Option = (Math.floor(Math.random() * 6));
        if (Option == 0) {
            player.addcoins(5342,"<font size=12> -<font color=green>JackPot!!!");
            pl.chat = "Oooo I got a JACKPOT!";
            pl.aniarg1 = "jackpot-particle.bani";
            this.sleep(6);
            pl.aniarg1 = "";
        } else if (Option == 1) {
            player.showmessage("You won Nothing!");
        } else if (Option == 2) {
            player.showmessage("You won Nothing!");
        } else if (Option == 3) {
            player.showmessage("You won Nothing!");
        } else if (Option == 4) {
            player.showmessage("You won Nothing!");
        } else if (Option == 5) {
            player.addcoins(1723,"You won Coins!");
        } else {
            player.showmessage("You won Nothing!");
        }
            break;
        }
        }
        case "5000💸": {

    if (player.coins < 5000) {
        player.chat = "I have no money :(";
        this.sleep(1);
        return; //so it doesn't go on another switch :)
    } else {
    this.play("casino");   
    player.removecoins(5000, "<font color=red>Casino Fee!");
    this.say("🎲Rolling🎲 -3");
    this.sleep(0.3);
    this.say("🎲Rolling🎲 -2");
    this.sleep(0.3);
    this.say("🎲Rolling🎲 -1")
    this.sleep(0.3);
    this.say(pl.name + " Played " + action);
    Option = (Math.floor(Math.random() * 7));
        if (Option == 0) {
            player.addcoins(23354,"<font size=12> -<font color=green>JackPot!!!");
            pl.chat = "Oooo I got a JACKPOT!";
            pl.aniarg1 = "jackpot-particle.bani";
            this.sleep(6);
            pl.aniarg1 = "";
        } else if (Option == 1) {
            player.showmessage("You won Nothing!");
        } else if (Option == 2) {
            player.showmessage("You won Nothing!");
        } else if (Option == 3) {
            player.showmessage("You won Nothing!");
        } else if (Option == 4) {
            player.showmessage("You won Nothing!");
        } else if (Option == 5) {
            player.showmessage("You won Nothing!");
        } else if (Option == 6) {
            player.addcoins(2314,"You won Coins!");
        } else {
            player.showmessage("You won Nothing!");
        }
            break;
        }
        }
        case "25000💸": {

    if (player.coins < 25000) {
        player.chat = "I have no money :(";
        this.sleep(1);
        return; //so it doesn't go on another switch :)
    } else {
    this.play("casino");   
    player.removecoins(25000, "<font color=red>Casino Fee!");
    this.say("🎲Rolling🎲 -3");
    this.sleep(0.4);
    this.say("🎲Rolling🎲 -2");
    this.sleep(0.4);
    this.say("🎲Rolling🎲 -1")
    this.sleep(0.4);
    this.say(pl.name + " Played " + action);
    Option = (Math.floor(Math.random() * 7));
        if (Option == 0) {
            player.addcoins(100332,"<font size=12> -<font color=green>JackPot!!!");
            pl.chat = "Oooo I got a JACKPOT!";
            pl.aniarg1 = "jackpot-particle.bani";
            this.sleep(6);
            pl.aniarg1 = "";
        } else if (Option == 1) {
            player.showmessage("You won Nothing!");
        } else if (Option == 2) {
            player.showmessage("You won Nothing!");
        } else if (Option == 3) {
            player.showmessage("You won Nothing!");
        } else if (Option == 4) {
            player.showmessage("You won Nothing!");
        } else if (Option == 5) {
            player.showmessage("You won Nothing!");
        } else if (Option == 6) {
            player.addcoins(17834,"You won Coins!");
        } else {
            player.showmessage("You won Nothing!");
        }
            break;
        }
        }
        case "50000💸": {

    if (player.coins < 50000) {
        player.chat = "I have no money :(";
        this.sleep(1);
        return; //so it doesn't go on another switch :)
    } else {
    this.play("casino");   
    player.removecoins(50000, "<font color=red>Casino Fee!");
    this.say("🎲Rolling🎲 -3");
    this.sleep(2);
    this.say("🎲Rolling🎲 -2");
    this.sleep(2);
    this.say("🎲Rolling🎲 -1")
    this.sleep(2);
    this.say(pl.name + " Played " + action);
    Option = (Math.floor(Math.random() * 8));
        if (Option == 0) {
            player.addcoins(243091,"<font size=12> -<font color=green>JackPot!!!");
            pl.chat = "Oooo I got a JACKPOT!";
            pl.aniarg1 = "jackpot-particle.bani";
            this.sleep(6);
            pl.aniarg1 = "";
        } else if (Option == 1) {
            player.showmessage("You won Nothing!");
        } else if (Option == 2) {
            player.showmessage("You won Nothing!");
        } else if (Option == 3) {
            player.showmessage("You won Nothing!");
        } else if (Option == 4) {
            player.showmessage("You won Nothing!");
        } else if (Option == 5) {
            player.showmessage("You won Nothing!");
        } else if (Option == 6) {
            player.showmessage("You won Nothing!");
        } else if (Option == 7) {
            player.addcoins(48324,"You won Coins!");
        } else {
            player.showmessage("You won Nothing!");
        }
            break;
        }
        }
}
}

//Client- Side

function onMouseDown(pl) {
    var popup = GUI.showpopup({
        title: "JackPot!🎲💸",
        width: 270,
        height: 400
    });
    popup.innerHTML = '<br><font size=5>Info</center>' +
        '<input id="help" type="submit" class="button" style="background-color: ##DFFFF5;left:-20px;top:40px;width:123px;height:55px;" value="-Info"></input>' +
        '<input id="fifty" type="submit" class="button" style="background-color: #919191;left:-20px;top:140px;width:123px;height:55px;" value="50💸!"></input>' +
        '<input id="twofifty" type="submit" class="button" style="background-color: #919191;left:-20px;top:210px;width:123px;height:55px;" value="250💸!"></input>' +
        '<input id="fivehundread" type="submit" class="button" style="background-color: #919191;left:120px;top:140px;width:105px;height:55px;" value="500💸!"></input>' +
        '<input id="twentyfivehundread" type="submit" class="button" style="background-color: #919191;left:120px;top:210px;width:105px;height:55px;" value="2500💸!"></input>' +
        '<input id="fivethousand" type="submit" class="button" style="background-color: #ffed91;left:240px;top:98px;width:110px;height:172px;" value="5000💸!"></input>' +
        '<input id="twentyfivethousand" type="submit" class="button" style="background-color: #ff9191;left:1px;top:300px;width:120px;height:120px;" value="25000💸!"></input>' +
        '<input id="fiftythousand" type="submit" class="button" style="background-color: #91fffa;left:155px;top:300px;width:290px;height:120px;" value="50000💸!"></input>';


    var self = this;
    GUI.onclick("fifty", function(event) {
        GUI.hidepopup();
        self.triggerserver("clicked", "50💸");
    });
    GUI.onclick("twofifty", function(event) {
        GUI.hidepopup();
        self.triggerserver("clicked", "250💸");
    });
    GUI.onclick("fivehundread", function(event) {
        GUI.hidepopup();
        self.triggerserver("clicked", "500💸");
    });
    GUI.onclick("twentyfivehundread", function(event) {
        GUI.hidepopup();
        self.triggerserver("clicked", "2500💸");
    });
    GUI.onclick("fivethousand", function(event) {
        GUI.hidepopup();
        self.triggerserver("clicked", "5000💸");
    });
    GUI.onclick("twentyfivethousand", function(event) {
        GUI.hidepopup();
        self.triggerserver("clicked", "25000💸");
    });
    GUI.onclick("fiftythousand", function(event) {
        GUI.hidepopup();
        self.triggerserver("clicked", "50000💸");
    });
    GUI.onclick("help", function(event) {
        popup.innerHTML = '<br><a href="https://docs.google.com/spreadsheets/d/1bXICdgr8xTmplChgjKdCm84Hu91F18vhoF_OcymUwzs/edit?usp=sharing" target="_blank">JackPot Stats Sheet</a><center>' +
            '<img src="../files/npcs/jackpot.png"> :  ' +
            "Select a Number to gamble on(making sure you have the right amount of coins) - Depending on how much money you spend, the machine takes longer to spin(Info on Excel Link) by Default you have a 17% Chance to hitjack pot!<br></center>";
    }
)}
