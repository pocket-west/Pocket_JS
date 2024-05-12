function onCreated(player) {
    this.onUpdated(player);
}
function onLekaiTest(player) {
    this.say("This should give everyone their weapons", 4);
}
function onCompletedVariables() {
        this.updateplayerui = false;
        this.session = false;
        this.player1 = "none";
        this.player2 = "none";
        this.hunt = false;
}
function onUpdated(player) {

    this.maxhealthplayer = 140;

    this.updateplayerui = false;
    this.tags = ["spar_controller"]

    this.scheduleevent(0, "defaultplayeruis", player);
    
    this.maxx = 19.5 + 1;
    this.maxy = 17.5 + 1;
    this.minx = 8 - 1;
    this.miny = 10.5 - 0.3;
    this.w = (this.maxx - this.minx) + 1
    this.h = (this.maxy - this.miny) + 1

        //area/box of spar map 
    this.player1spawnx = 9.17
    this.player1spawny = 14.15;
    this.player2spawnx = 18.13;
    this.player2spawny = 14.15;
    
        //this variable used for player 1 automatic detector
    this.player1present = false;
    player.joinedSpar = false;

        //if spar session has started
    this.session = false;
    this.hunt = false;

        //default (MUST BE SET TO NONE)
    this.player1 = "none";
    this.player2 = "none";
    
    
    this.triggerclient(player, "correctimage");
    //player.showmessage("Joined! <img src=' https://files.iappsbeats.com/Servers/server_1/Files/icons/westlaw_vector-icon.png'>", 1);

    
    this.name = "";
}
function onHuntPlayers(player) {
    while (this.hunt == true) {
        if (this.hunt == false) { break; }
        let sparrers = Server.searchPlayers({        
            map: this.map
        });
        for (let i = 0; i < sparrers.length; i ++) {
            if (sparrers[i].id == this.player1) {
                //trying to see if i can get player 1 id
                sparrers[i].say("{Player1}", 1);
                //forfeitplayer = this.player1;
                
                if (sparrers[i].isdead == true) {winnerplayer = this.player2; forfeitplayer = this.player1; this.hunt = false; this.say("Got Killed!", 4);  this.onSparFinished(forfeitplayer, winnerplayer); break; }
                
                
                if (sparrers[i].x >= this.maxx) {winnerplayer = this.player2; forfeitplayer = this.player1; this.hunt = false; this.say("Right!!!!", 4); this.onSparFinished(forfeitplayer, winnerplayer); break; }
                if (sparrers[i].y >= this.maxy) {winnerplayer = this.player2;forfeitplayer = this.player1; this.hunt = false; this.say("Down!", 4); this.onSparFinished(forfeitplayer, winnerplayer); break; }
                if (sparrers[i].x <= this.minx) {winnerplayer = this.player2;forfeitplayer = this.player1; this.hunt = false; this.say("Left!", 4); this.onSparFinished(forfeitplayer, winnerplayer); break; }
                if (sparrers[i].y < this.miny) {winnerplayer = this.player2;forfeitplayer = this.player1; this.hunt = false; this.say("Up!", 4); this.onSparFinished(forfeitplayer, winnerplayer); break; }

            } 
            
            if (sparrers[i].id == this.player2) {
                //trying to see if i can get player 1 id
                sparrers[i].say("{Player2}", 1)
                
                if (sparrers[i].isdead == true) {winnerplayer = this.player1; forfeitplayer = this.player2; this.hunt = false; this.say("Got Killed!", 4);  this.onSparFinished(forfeitplayer, winnerplayer); break; }
                
                if (sparrers[i].x >= this.maxx) {winnerplayer = this.player1; forfeitplayer = this.player2; this.hunt = false; this.say("Right!", 4); this.onSparFinished(forfeitplayer, winnerplayer); break; }
                if (sparrers[i].y >= this.maxy) {winnerplayer = this.player1; forfeitplayer = this.player2; this.hunt = false; this.say("Down!", 4); this.onSparFinished(forfeitplayer, winnerplayer); break; }
                if (sparrers[i].x <= this.minx) {winnerplayer = this.player1; forfeitplayer = this.player2; this.hunt = false; this.say("Left!", 4); this.onSparFinished(forfeitplayer, winnerplayer); break; }
                if (sparrers[i].y < this.miny) {winnerplayer = this.player1; forfeitplayer = this.player2; this.hunt = false; this.say("Up!", 4); this.onSparFinished(forfeitplayer, winnerplayer); break; }
            
            }
        sparrers[i].title = "X:" + sparrers[i].x + "| Y:" + sparrers[i].y;
        }
        this.sleep(0.01);
        this.onHuntPlayers(player);
    }
}


function onSparFinished(forfeitplayer, winnerplayer) {
        /*this.hunt = false;
        this.updateplayerui = false;
        this.player1present = false;
        //player.joinedSpar = false;

        //if spar session has started
        this.session = false;*/
        this.onCompletedVariables()
        
        
        let winner = Server.searchPlayers({        
            map: this.map,
            id:winnerplayer
        });
        for (let i = 0; i < winner.length; i ++) {
            winner[i].say("I WON ", 3);
            winner[i].joinedSpar = false;
            this.winnerlocation = winner[i].map.name;
            this.oldmapname = winner[i].map.name
            winner[i].setmap(this.map.name, this.map.name, 13.69, 23.01);

        }
        let loser = Server.searchPlayers({        
            map: this.map,
            id:forfeitplayer
        });
        for (let i = 0; i < loser.length; i ++) {
            loser[i].oldmapname = this.oldmapname
            loser[i].say("I LOST", 3);
            loser[i].hp = 140;
            loser[i].joinedSpar = false;
            loser[i].lost = true;
            loser[i].sparmapname = this.map.name
            //loser[i].setmap(this.winnerlocation, this.winnerlocation, 13.69, 23.01);
            //loser[i].setmap(this.map.name, this.map.name, 14, 15);
        }

}
function onDefaultPlayerUis(player) {
    this.say("test function", 3);
    let npcs = Server.searchnpcs({
        tag:"player_ui"
    });
    for (let i in npcs) {
        npcs[i].scheduleevent(0, "nomatch", player);
    }
    
}
function onPlayerSays(player) {
    if (player.chat == "reset") {
        this.onUpdated(player);
        return;
    }
}
function onMouseDown(player) {
    if (this.session == true) {
        player.say("Spar Session Currently Ongoing", 1);
        return;
    }
    if (player.joinedSpar == false) {
        this.triggerclient(player, "join")
    } else if (player.joinedSpar == true) {
        this.triggerclient(player, "leave")
    }
    this.triggerclient(player, "correctimage");
    this.onAddRemove(player);
}
function onPlayerTouchsMe(player) {
    //player.say(player.test);
    player.say(this.player1 + "|" + this.player2);
}
function onAddRemove(player) {
        //if there is an available spot
    if (this.player1 == "none" || this.player2 == "none") {
        this.onAdd(player);
        return;
    }
}
function onRemove(player) {
        //player is player 1
    if (this.player1 == player.id) {
            //if it has a player 2 and player 1 left
        if (this.player2 != "none") {
                //carry player 2 into player 1 slot
            this.player1 = this.player2;
            return;
        }
        //basically flipping the variables, so player 2 now becomes player 1 inna sense
        
        
        
        //if it's just player 1
        //this.say("Left!", 1);
        this.player1 = "none";

            //theoretically player1 search should stop
        this.player1present = false;
        player.joinedSpar = false;
        return;
    } else if (this.player2 == player.id) {
            //if player 2 is occupied
        this.player2 = "none";
        player.joinedSpar = false;
        return;
    }
    //this.say("Start", 1)

}
function onAdd(player) {
    // if player is player 1 or 2
    if (this.player1 == player.id || this.player2 == player.id) {
        this.onRemove(player);
        return;
    }
    if (this.player1 == "none") {
        //if slot one is available
        this.say("Added player 1", 1)
        this.player1 = player.id;
        player.joinedSpar = true;
        
        this.player1present = true;
        
        this.onCheckPlayerOne(player);
        return;
    } else if (this.player1 != "none") {
        //if slot two is available
        this.player2 = player.id;
        this.onWarp(player);
        //this.player1 = "none";
        //this.player2 = "none";
        this.updateplayerui = true;
        this.session = true;
        player.joinedSpar = true;
        this.hunt = true;
        this.onHuntPlayers(player);
        this.onUpdateUI(player);
        return;
    }
}
function onCheckPlayerOne(player) {
    //use if player is here
    while (this.player1present == true) {
        this.onUpdatedPlayerUI(player);
        if (this.player1present == false) { this.say("FUCKER LEFT!",4); this.player1present = false; break; }
            player.say(player.x, 1);
            if (player.map.name != this.map.name) {
                this.say("left!",4);
                this.player1present = false;
                // if it has a second player
                if (this.player2 != "none") {
                    this.player2 = this.player1;
                    this.player2 = "none";
                    player.joinedSpar = false;
                    break;
                }
                this.player1 = "none";
                player.joinedSpar = false;
                break;
        }
        this.sleep(1);
        this.onCheckPlayerOne(player);
    }
}
function onUpdatedPlayerUI(player) {
    //get player hp
    let player1 = Server.searchPlayers({map:player.map.name, id:this.player1});
    
    for (let i = 0; i < player1.length; i ++) {
        this.player1hp = player1[i].hp
        player1[i].name = 12;
    }
    
    let player2 = Server.searchPlayers({map:player.map.name, id:this.player2});
    
    for (let i = 0; i < player2.length; i ++) {
        this.player2hp = player1[i].hp
    }
}
function onWarp(player) {
    this.player1present = false;
    let player1 = Server.searchPlayers({map:player.map.name, id:this.player1});
    
    for (let i = 0; i < player1.length; i ++) {
        player1[i].say("player 1!", 2);
        player1[i].setmap(player.map.name, player.map.name, this.player1spawnx, this.player1spawny)
        player1[i].oldweapon = player1[i].weapon;
        player1[i].weapon = "spar_start-weapon";
    }
    
    let player2 = Server.searchPlayers({map:player.map.name, id:this.player2});
    
    for (let i = 0; i < player2.length; i ++) {
        player2[i].say("player 2!", 2);
        player2[i].setmap(player.map.name, player.map.name, this.player2spawnx, this.player2spawny)
        player2[i].oldweapon = player2[i].weapon;
        player2[i].weapon = "spar_start-weapon";
    }
    this.scheduleevent(5, "giveweapon", player);
}
function onUpdateUI(player) {

    while (this.updateplayerui == true) {
        this.onGetPlayerHPAndLook(player);
     if (this.updateplayerui == false) { break; }
    let npcs = Server.searchnpcs({
        tag:"player_ui"
    });
    for (let i in npcs)
        if (npcs[i].player == 1) {
            //npcs[i].sparwins = this.player1spars;
            //npcs[i].clanname = this.player1clanname;
        
  
            npcs[i].name = this.player1name + "...(" + this.player1spars + ")";
            npcs[i].head = this.player1head;
            npcs[i].hat = this.player1hat;
            npcs[i].say("(" + this.player1hp + "/" + this.maxhealthplayer + ")", 0.4);
            
        } else if (npcs[i].player == 2) {
            //npcs[i].sparwins = this.player2spars;
            npcs[i].name = this.player2name + "...(" + this.player2spars + ")";
            npcs[i].head = this.player2head;
            npcs[i].hat = this.player2hat;
            npcs[i].say("(" + this.player2hp + "/" + this.maxhealthplayer + ")", 0.4);
        }
         this.sleep(0.001);
    this.onUpdateUI(player);//npcs[i].say("HIII", 1);
    }
    this.onDefaultPlayerUis(player);
}
function onGiveWeapon(player) {
    let player1 = Server.searchPlayers({map:player.map.name, id:this.player1});
    
    for (let i = 0; i < player1.length; i ++) {
        player1[i].weapon = player1[i].oldweapon
        player1[i].say("Got my weapon!", 1);
    }
    let player2 = Server.searchPlayers({map:player.map.name, id:this.player2});
    
    for (let i = 0; i < player1.length; i ++) {
        player2[i].weapon = player2[i].oldweapon
        player1[i].say("Got my weapon!", 1);
    }
}
function onGetPlayerHPAndLook(player) {


    let player1 = Server.searchPlayers({map:player.map.name, id:this.player1});
    
    for (let i = 0; i < player1.length; i ++) {
        this.player1spars = player1[i].sparwins;
        this.player1name = player1[i].name
        //this.playeroneofficialname = this.player1name;
        this.player1clanname = player1[i].clanname.slice(0,5);
        this.playeroneofficialclanname = this.player1clanname;
        this.player1hp = player1[i].hp;
        this.player1head = player1[i].head;
        this.player1hat = player1[i].hat;
    }
    let player2 = Server.searchPlayers({map:player.map.name, id:this.player2});
    
    for (let i = 0; i < player2.length; i ++) {
        this.player2spars = player2[i].sparwins;
        this.player2clanname = player2[i].clanname.slice(0,5);
        this.player2name = player2[i].name.slice(0,7)
        this.player2hp = player2[i].hp;
        this.player2head = player2[i].head;
        this.player2hat = player2[i].hat;
    }
    
}
/*
function onJoinedMap(player) {
    if (player.id == this.player1 && this.player2 == "none") {
        this.player1 = "none";
        player.joinedSpar = false
        return;
    } else if (player.id == this.player1 && this.player2 != "none") {
        this.player1 = this.player2;
        this.player2 = "none";
        player.joined = false;
        return;
    }
}*/
