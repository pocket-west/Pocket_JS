function onCreated() {
    this.onUpdated();
}

function onMouseDown(player) {
    this.say("Max People: " + player.maxpeoplelmfao + "/Current Score: " + player.currentscore + "....Need Help:" + this.needhelp + "|Waiter ID:" + this.waiterid + "|" ,3);
    player.say("Drink" + this.drinkchoices + "Occupied: " + this.occupied + " |Player Working:" + player.working + "|Player Busy:" + player.busy + "| Animation" + this.ani, 3);
}

function onUpdated() {
    this.npcposition = 30;
    this.drinkchoicemax = 4;
    this.drinkchoicemin = 1;
    this.namecolor = "white";
    this.currentscore = 2;
    this.occupied = false;
    //player.busy = false;
    //player.working = false;
    //player.customeramount = 2;
    this.npcdistance = 6;
    this.walkspeedmax = 4;
    this.walkspeedmin = 1;
    this.waittime = 3;
    this.waiterid = "fresh";
    this.waiterweapon = "Rock";
    this.needhelp = true;
    this.dir = 2;
    this.outfitmax = 3;
    this.outfitmin = 1;
    //player.currentscore = 2;
    this.ani = "westlaw_order-alarm";
    this.onOutfitSwap();
}



function onPlayerSays(player) {
    if (player.chat == "reset") {
        player.busy = true;
        player.working = true;
        this.waiterid = "fresh";
        player.currentscore = 1;
        this.onDitch(player);
    } else if (player.chat == "start") {
        this.onJobStart(player);
    } else if (player.chat == "ditch") {
        if (player.id == this.waiterid) {
            //this.occupied = false;
            this.sleep(0.01);
            this.count = 0;
            player.busy = true;
            player.working = true;
            this.say("Ughh..- didn't wana be here anyways!!!", 2);
            this.onDitch(player);
            //player.currentscore = 0;
            
        } else {
            this.say(this.ditchmessage, 3);
         }
    } else {
        return;
    }
}


function onPlayerTouchsMe(player) {
    this.sleep(0.3);
    if (player.currentscore == 1 && this.occupied == true && player.working == true && player.busy == true && this.waiterid == player.id && this.needhelp == false) {
        player.say("One " + this.drinkname + " coming right up!!", 2);
        return;
    }
    //Score 2,Fresh ID, F/F, Occupied false, need help false
    if (this.occupied == false && player.currentscore == 2 && player.working == false && player.busy == false && this.waiterid == "fresh" && this.needhelp == true) {
        player.working = true;
        player.busy = true;
        this.needhelp = false;
        this.occupied = true;
        this.waiterid = player.id;
        this.say("Hii", 2);
        player.currentscore = 1;
        this.scheduleevent(0.001, "jobstart", player);
        this.scheduleevent(0.001, "countdown", player);
        player.currentscore = 1;
        return;
    }
    if (this.occupied == false && player.currentscore == 2 && player.working == true && player.busy == true && this.waiterid == "fresh" && this.needhelp == true) {
        this.say("Yeahddd", 1);
        //player.working = true;
        //player.busy = true;
        //this.occupied = true;
        //this.needhelp = false;
        //player.currentscore = 1;
        return;
    }
    //mek sure it on the login  Fresh ID, T/T, Occupied false, need help false
    if (player.currentscore == -1 && this.occupied == true && player.working == false && player.busy == false && this.waiterid == player.id && this.needhelp == false) {
        player.working = true;
        player.busy = true;
        this.occupied = true;
        this.needhelp = false;
        player.currentscore = 1;
        this.say("YEE DUWG, yo backkk", 1);
        return;
    }
    //Occupied true, player working true true
    if (this.occupied == true && player.currentscore == 1 && player.working == true && player.busy == true && this.waiterid == "fresh" && this.needhelp == false) {
        this.say("Niceee fucking try", 1);
        return;
    }
    // if player has no job and somebody wants another persons's npc
    if (player.currentscore == 0 && player.working == false && player.busy == false && this.waiterid != player.id && this.needhelp == false) {
        this.say("This is not yours brother", 1);
        return;
    }
    // if player has a job and somebody wants another persons's npc
    if (player.currentscore == player.maxpeoplelmfao && player.working == true && player.busy == true && this.waiterid != player.id && this.needhelp == false) {
        this.say("This is not yours brother- yeahh you got one already bro", 1);
        return;
    }
    // if player touchs npc they already took
    if (this.occupied == false && player.currentscore == 1 && player.working == true && player.busy == true && this.waiterid == "fresh" && this.needhelp == true) {
        this.say("Bro, you already got an order", 1);
        return;
    }
    // Chcker- Can i get your Order
    // if i relogged and not mines
    if (this.occupied == false && player.currentscore == 1 && player.working == false && player.busy == false && this.waiterid == "fresh" && this.needhelp == true) {
        this.say("Hold on there buddy!", 1);
        return;
    }
    if (this.occupied == false && player.currentscore == -1 && player.working == false && player.busy == false && this.waiterid == "fresh" && this.needhelp == true) {
        this.say("Check in please", 1);
        return;
    }
}

function onJobStart(player) {
    this.namecolor = "#99ff99";
    this.walkspeed =  Math.floor(Math.random() * this.walkspeedmax + this.walkspeedmin);
    this.ani = "westlaw_order-" + this.drinkcolor; //gucci
    this.say(this.customermessage, 2);
    this.name = this.customername + "[" + player.name + "]";
    return;
}

function onCountdown(player) {
    this.countdownmax = 30;
    this.countdownmin = 20;
    this.count = Math.floor(this.countdownmin + Math.random() * this.countdownmax);
    this.counttipamount = this.count/4;
    this.hpmax = this.count;
        while (this.count > 0){
            this.hpbar = this.count;
            this.showhp("","", this.hpbar,this.hpmax);
            this.sleep(0.2);
            this.count--;
        }
    player.say("Count down finished", 2);
    player.working = false;
    player.busy = false;
    player.currentscore = 2;//HEREEEEEEE
    this.onDitch(player);
    return;
}

function onDitch(player) {
    player.say(this.goodbyemessage, 2);
    this.say(this.npcgoodbyemessage, 2);
    this.occupied = false;
    this.count = 0; // MAYBE
    player.currentscore = 2;
    player.working = false;
    player.busy = false;
    
    // walking up
    this.ani = "player_walk";
    this.move(5, this.x, this.y - this.npcdistance);
    this.sleep(5);
    this.ani = "";
    this.name = "";
    this.onOutfitSwap(player);
    this.namecolor = "white";
    this.sleep(this.waittime);
    this.currentscore = 2;
    this.scheduleevent(this.walkspeed, "newchar", player);
    return;
}

function onNewChar(player) {
    if (this.y == 30) {
        //this.name = this.customername;
        //this.onPickDrink(player);
        //this.onOutfitSwap(player); 
        return;
        } // - maybe
        // if it's not at 30
    if (this.y != 30) { this.y = this.npcposition; } // - maybe
    //player.walkspeed =  Math.floor(Math.random() * this.walkspeedmax + this.walkspeedmin);
    //this.name = this.customername;
    //player.currentscore = 2; ---------------------------------
    this.say(this.welcomemessage, 2);
    this.waiterid = "fresh";
    this.needhelp = false;
    this.ani = "player_walk";
    this.move(5, this.x, this.npcposition);
    this.sleep(5 - 0.3);
    this.needhelp = true;
    this.ani = "westlaw_order-alarm";
    return;
}

function onPlayerAttacks(player) {
    if (this.needhelp == false && this.occupied == true && player.working == true && player.busy == true && player.currentscore == 1 && player.weapon == this.drinkchoices && player.id == this.waiterid) { 
        this.counttip = this.counttipamount * 3;
        if (this.count > this.counttip) { 
            player.showmessage("You got a Serving Token!!");
        }
        this.showhp("+$" + this.cashoutamount, "lightgreen");
        player.addcoins(this.cashoutamount, "serving <img src=' https://files.iappsbeats.com/Servers/server_1/Files/icons/westlaw_moneybag.png'>");
        this.play("westlaw_cash"); 
        this.count = 0;
        this.occupied = false; // i think
        this.needhelp = false; 
        player.busy = false; 
        player.working = false; 
        this.say("Success!!!!", 1); 
        player.weapon = "waiter"; 
        player.currentscore = 2;
        this.scheduleevent(0.001, "ditch", player);
        return;
    }
    if (this.needhelp == false && this.occupied == true && player.working == true && player.busy == true && player.currentscore == 2 && player.weapon == this.drinkchoices && player.id == this.waiterid) {
        this.showhp("+$" + this.cashoutamount, "lightgreen");
        player.addcoins(this.cashoutamount, "serving <img src=' https://files.iappsbeats.com/Servers/server_1/Files/icons/westlaw_moneybag.png'>");
        this.count = 0;
        this.occupied = false; // i think
        this.play("westlaw_cash"); 
        this.needhelp = false; 
        player.busy = false; 
        player.working = false; 
        this.say("Success!", 1); 
        player.weapon = "waiter"; 
        player.currentscore = 2;
        this.scheduleevent(0.001, "ditch", player);
        return;
    }
    //something making it go to false but ima figure it outlmfao
    if (this.occupied == true && player.currentscore == 2 && player.working == true && player.busy == true && this.waiterid == "fresh" && this.needhelp == false) {
        this.triggerclient(player, "actionreward", 7.2);   //reward
        this.count = 0;
        this.occupied = false; // i think
        this.play("westlaw_cash"); 
        this.needhelp = false; 
        player.busy = false; 
        player.working = false; 
        player.say("BY PASSED!", 1); 
        player.weapon = "waiter"; 
        player.currentscore = 2;
        this.scheduleevent(0.001, "ditch", player);
        return;
    }
    if (this.occupied == true && player.currentscore == 2 && player.working == true && player.busy == true && this.waiterid == "fresh" && this.needhelp == true) {
        player.addcoins(this.cashoutamount, "serving <img src=' https://files.iappsbeats.com/Servers/server_1/Files/icons/westlaw_moneybag.png'>");
        this.count = 0;
        this.occupied = false; // i think
        this.play("westlaw_cash"); 
        this.needhelp = false; 
        player.busy = false; 
        player.working = false; 
        player.say("BY PASSED!", 1); 
        player.weapon = "waiter"; 
        player.currentscore = 2;
        this.scheduleevent(0.001, "ditch", player);
        return;
    }
}

function onOutfitSwap(player) {
    this.onPickDrink(player);
    this.namecolor = "white";
    this.say("OUTFIT SWAP", 1);
    const outfitnumber = Math.floor(Math.random() * this.outfitmax + this.outfitmin);
    switch(outfitnumber) {
      case 1:
        this.customername = "Dave";
        this.welcomemessage = "Hello my name is " + this.customername + "!!!";
        this.ditchmessage = "Woah";
        this.head = "bbuilder_head1.png";
        this.body = "bbuilder_body4.png";
        this.hat = "";
        this.customermessage = "Hurry up with my drink!!!";
        this.npccustomermessage = "Gimmie a " + this.drinkchoice + "";
        this.busymessage = "no.. tf?";
        this.goodbyemessage = "Byee!";
        this.npcgoodbyemessage = "Bye Bye!";
        break;
      case 2:
        this.customername = "Kiira";
        this.welcomemessage = "Yall already know what i'm here for";
        this.ditchmessage = "xD";
        this.head = "bbuilder_headc41.png";
        this.body = "bbuilder_body3.png";
        this.hat = "";
        this.customermessage = "Hurry up with my drink!!!";
        this.npccustomermessage = "Hey I would like a " + this.drinkchoice + " Please!!";
        this.busymessage = "Aren't you forgetting someone?";
        this.goodbyemessage = "Cya";
        this.npcgoodbyemessage = "Thank you very much!";
        break;
      case 3:
        this.customername = "Quan";
        this.welcomemessage = "Wa aya sayn' now";
        this.ditchmessage = "Leave!";
        this.head = "bbuilder_head1.png";
        this.body = "bbuilder_body4.png";
        this.hat = "bbuilder_hat11.png";
        this.customermessage = "Hurry up with my drink!!!";
        this.npccustomermessage = "My Usual dai";
        this.busymessage = "Aren't you forgetting someone?";
        this.goodbyemessage = "Do come back sometime!";
        this.npcgoodbyemessage = "Thanks!";

        break;
      default:
        // code block
    }
    this.name = this.customername;
    this.scheduleevent(0.0001, "pickdrink", player); 
    this.scheduleevent(0.001, "newchar", player); 
    return;
}

function onPickDrink(player) {
    this.say("drinkpick!", 1);
    drinkchoice = Math.floor(Math.random() * this.drinkchoicemax + this.drinkchoicemin);
    switch(drinkchoice) {
        case 1:
            drinkchoice = 1;
            this.drinkname = "Apple Drink";
            this.drinkcolor = "red";
            this.drinkchoices = "cup1";
            this.cashoutamount = 2;
            break;
        case 2:
            drinkchoice = 2;
            this.drinkname = "Blue Berry Drink";
            this.drinkcolor = "blue";
            this.drinkchoices = "cup2";
            this.cashoutamount = 4;
            break;
        case 3:
            drinkchoice = 3;
            this.drinkname = "Leprecaun Drink";
            this.drinkcolor = "green";
            this.drinkchoices = "cup3";
            this.cashoutamount = 9;
            break;
        case 4:
            drinkchoice = 4;
            this.drinkname = "Gold Drink";
            this.drinkcolor = "yellow";
            this.drinkchoices = "cup4";
            this.cashoutamount = 14;
            break;
            default:
    return;
    }
}
