
function onCreated() {
    this.onUpdated();
}

function onUpdated() {
    //let image = "bbuilder_spargrounds-join.png";
    
    this.image = "bbuilder_spargrounds-join.png";
}

function onServerToggle(player) {
    
    if (this.image == "bbuilder_spargrounds-join.png") {
        this.image = "bbuilder_spargrounds-join-2.png";
    } else if (this.image == "bbuilder_spargrounds-join-2.png") {
        this.image = "bbuilder_spargrounds-join.png";
    } else {
        return;
    }
} 

//serverside below
//CONTORLLLLERR

/*

TODOO <=====

1)Lock the NPC while racing is happening
2)Ensure points array is sent over at the right moment
3)
*/
function onCreated() {
    this.onUpdated();
}

function onUpdated() {
    this.kickcordsx = 8.5;
    this.kickcordsy = 19;
    this.player1x = 5.5;
    this.player1y = 26; 
    this.player2x = 6;
    this.player2y = 30;
    this.tags = ['controller'];
    this.joined = ["none", "none"];
    this.name = "PvP Horse Race Controller";
}

function onMouseDown(player) {
    if (this.joined[0] == "none" && this.joined[1] == "none") {
        //no one joined, adding one
        this.joined.pop("none");
        this.joined.pop("none");
        this.joined.push(player.id);
        this.scheduleevent(0, "carrypoint", player);
        this.say(player.name + " Joined! Length:" + this.joined.length, 1);
        this.triggerclient(player, "toggle");
        //send joined
        return;
    }
    if (this.joined[0] == player.id && this.joined.length == 1) {
        this.joined.pop(player.id);
        this.say(player.name + " Left! Length:" + this.joined.length, 1);
        this.joined = ["none", "none"];
        this.scheduleevent(0, "carrypoint", player);
        this.triggerclient(player, "toggle");
            return;
        }
    if (this.joined[1].includes(player.id)) {
        this.joined.pop(player.id);
        this.say(player.name + " Left! Length:" + this.joined.length, 1);
        this.scheduleevent(0, "carrypoint", player);
        this.triggerclient(player, "toggle");
            return;
        }
        //this.scheduleevent(0, "carrypoint", player);
        //allow player to leave
        //player.chat ="Leave";
        //this.joined.pop(player.id);
        //this.scheduleevent(0, "carrypoint", player);
        //this.say("You Left! Length:" + this.joined.length, 1);
        //send joined to gate
    if (player.id != this.joined && this.joined.length == 1) {
        //Send Players
        this.joined.push(player.id);
        this.scheduleevent(0, "carrypoint", player);
        this.say(player.name + "Joined! Length:" + this.joined.length, 1);
        //send joined to gate
        this.scheduleevent(0, "begin", player);
        this.triggerclient(player, "toggle");
        return;
    }
    if (player.id.includes(this.joined) && this.joined.length == 2) {
        this.say("Horse Racing Already Occupied", 1);
        return;
    }
    if (!player.id.includes(this.joined) && this.joined.length == 2) {
        this.say("Check: " + this.joined, 1);
        return;
    }
}



function onCarryPoint(player) {
    // Carry Point to Gate
    let npcs = Server.searchnpcs({
        map: this.map,
        tag:"Yes",
        area:{x:this.x-30, y:this.y-30, w:60, h:60}
    });
    for (let i in npcs) {
                npcs[i].joined = this.joined;
    }
}

function onPlayerSays(player) {
    if (player.chat == "check") {
        this.say(this.joined, 1);
        return;
    }
    if (player.chat == "start" && !this.joined[0].includes("none") && !this.joined[1].includes("none")) {
        //Below stops start command if only 1 is in :P
        //if (this.joined.length == 1) { this.say("Nar", 1); return; }
        this.scheduleevent(0, "begin", player);
        return;
    }
    if (player.chat == "clear") {
        this.scheduleevent(0, "clearlist", player);
        return;
    }
    if (player.chat == "reset") {
        this.scheduleevent(0, "reset", player);
        return;
    }
}


function onBegin(player) {
    // Search Gate
    let npcs = Server.searchnpcs({
        map: this.map,
        tag:"Yes",
        area:{x:this.x-30, y:this.y-30, w:60, h:60}
    });
    for (let i in npcs) {
                npcs[i].racestart = true;
                this.racestart = true;
                npcs[i].scheduleevent(0, "startgate", player);
        }
}

function onClearList(player) {
    let players = Server.searchPlayers({id:this.joined})
        for (let i = 0; i < players.length; i ++) {
                players[i].lap = -1;
                players[i].say("Cleared- Player Lap: [" + players[i].lap + "]", 1);
        }
    this.joined = ["none", "none"];
}

function onStartOver(player) {
    // Search Gate
    let npcs = Server.searchnpcs({
        map: this.map,
        tag:"Yes",
        area:{x:this.x-30, y:this.y-30, w:60, h:60}
    });
    for (let i in npcs) {
                npcs[i].scheduleevent(0, "closegate", player);
    }
    //send the players
    this.say("SENT", 1);
    let player1 = Server.searchPlayers({id:[this.joined[0]]});
        for (let i = 0; i < player1.length; i ++) {
                player1[i].setmap(this.map.name, this.map.template, this.kickcordsx, this.kickcordsy);
                player1[i].say("Done", 1);
                player1[i].racing = false;
        }
    let player2 = Server.searchPlayers({id:[this.joined[1]]});
        for (let i = 0; i < player2.length; i ++) {
                player2[i].setmap(this.map.name, this.map.template, this.kickcordsx, this.kickcordsy);
                player2[i].say("Done", 1);
                player2[i].racing = false;
        }
    this.scheduleevent(0, "clearlist", player);
    //so it wouldn't call easily - if anyone accessed the gate
}
