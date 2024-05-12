
function onUpdated(player) {
    this.maxx = 19.5
    this.hunt = false;
    this.maxy = 17.5
    this.name = "hunter script in here"
    this.minx = 8
    this.miny = 10.5
    this.w = (this.maxx - this.minx) + 1
    this.h = (this.maxy - this.miny) + 1



    this.head = player.head;
    this.hat = player.hat;
    this.ani = "spar_show"
    this.showhp("",player.hp,player.maxhp, 1)
    //this.name = "(" + player.sparwins + ")";
    //this.namecolor = "#568630";
    this.namecolor = "white"
}

function onPlayerSays(player) {
    if (player.chat == "starthunt") {
        this.hunt = true;
        return;
    } else if (player.chat == "stophunt") {
        this.hunt = false;
        return;
    }
}

function onPlayerTouchsMe(player) {
    this.onStartFeeding(player);
    player.say(this.joined, 1)
}

function onStartFeeding(player) {
    this.joined = ["5"];
    while (this.hunt == true) {
        //if player goes beyond the map 
        if (player.x > this.maxx) { this.onForfeit(player); break; }
        if (this.hunt == false) { break; }
        let sparrers = Server.searchPlayers({        
            map: this.map,
            area:{x:this.minx, y:this.miny, w:this.w, h:this.h}
        });
        for (let i = 0; i < sparrers.length; i ++) {
        this.showhp("",1,player.hp,player.maxhp)
        player.say(player.hp + "|" + player.maxhp, 1)
        }
        this.sleep(0.001);
        this.onStartFeeding(player);
    }
}

function onForfeit(player) {
        let loser = Server.searchPlayers({        
            map: this.map,
            area:{x:this.minx, y:this.miny, w:this.w, h:this.h}
        });
        for (let i = 0; i < loser.length; i ++) {
            loser[i].say("I LOST", 3);
            loser[i].setmap(this.map.name, this.map.name, 20, 20)
        }
        let winner = Server.searchPlayers({        
            map: this.map,
            area:{x:this.minx, y:this.miny, w:this.w, h:this.h}
        });
        for (let i = 0; i < winner.length; i ++) {
            winner[i].say("I WON", 3);
        }
}
