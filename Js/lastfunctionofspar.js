function onCreated() {
    this.onUpdated();
}

function onPlayerTouchsMe(player) {
    this.onHuntPlayers(player);
}

function onMouseDown(player) {
    this.say(this.player1id + "|" + this.player2id)
}

function onUpdated() {
    this.maxx = 19.5 + 1;
    this.maxy = 17.5 + 1;
    this.hunt = false
    this.minx = 8 - 1;
    this.miny = 10.5 - 0.3;
    this.w = (this.maxx - this.minx) + 1
    this.h = (this.maxy - this.miny) + 1
    this.name = "Location Hunt(Last Funciton of Spar)";
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

function onHuntPlayers(player) {
    this.player1id = 5;
    this.player2id = 100;
    while (this.hunt == true) {
        if (this.hunt == false) { break; }
        let sparrers = Server.searchPlayers({        
            map: this.map
        });
        for (let i = 0; i < sparrers.length; i ++) {
            if (sparrers[i].id == this.player1id) {
                //trying to see if i can get player 1 id
                sparrers[i].say("{Player1}", 1);
                //forfeitplayer = this.player1id;
                
                if (sparrers[i].isdead == true) {winnerplayer = this.player2id; forfeitplayer = this.player1id; this.hunt = false; this.say("Got Killed!", 4);  this.onSparFinished(forfeitplayer, winnerplayer); break; }
                
                
                if (sparrers[i].x >= this.maxx) {winnerplayer = this.player2id; forfeitplayer = this.player1id; this.hunt = false; this.say("Right!!!!", 4); this.onSparFinished(forfeitplayer, winnerplayer); break; }
                if (sparrers[i].y >= this.maxy) {winnerplayer = this.player2id;forfeitplayer = this.player1id; this.hunt = false; this.say("Down!", 4); this.onSparFinished(forfeitplayer, winnerplayer); break; }
                if (sparrers[i].x <= this.minx) {winnerplayer = this.player2id;forfeitplayer = this.player1id; this.hunt = false; this.say("Left!", 4); this.onSparFinished(forfeitplayer, winnerplayer); break; }
                if (sparrers[i].y < this.miny) {winnerplayer = this.player2id;forfeitplayer = this.player1id; this.hunt = false; this.say("Up!", 4); this.onSparFinished(forfeitplayer, winnerplayer); break; }

            } 
            
            if (sparrers[i].id == this.player2id) {
                //trying to see if i can get player 1 id
                sparrers[i].say("{Player2}", 1)
                
                if (sparrers[i].isdead == true) {winnerplayer = this.player1id; forfeitplayer = this.player2id; this.hunt = false; this.say("Got Killed!", 4);  this.onSparFinished(forfeitplayer, winnerplayer); break; }
                
                if (sparrers[i].x >= this.maxx) {winnerplayer = this.player1id; forfeitplayer = this.player2id; this.hunt = false; this.say("Right!", 4); this.onSparFinished(forfeitplayer, winnerplayer); break; }
                if (sparrers[i].y >= this.maxy) {winnerplayer = this.player1id; forfeitplayer = this.player2id; this.hunt = false; this.say("Down!", 4); this.onSparFinished(forfeitplayer, winnerplayer); break; }
                if (sparrers[i].x <= this.minx) {winnerplayer = this.player1id; forfeitplayer = this.player2id; this.hunt = false; this.say("Left!", 4); this.onSparFinished(forfeitplayer, winnerplayer); break; }
                if (sparrers[i].y < this.miny) {winnerplayer = this.player1id; forfeitplayer = this.player2id; this.hunt = false; this.say("Up!", 4); this.onSparFinished(forfeitplayer, winnerplayer); break; }
            
            }
        sparrers[i].title = "X:" + sparrers[i].x + "| Y:" + sparrers[i].y;
        }
        this.sleep(0.01);
        this.onHuntPlayers(player);
    }
}


function onSparFinished(forfeitplayer, winnerplayer) { 
        let winner = Server.searchPlayers({        
            map: this.map,
            id:winnerplayer
        });
        for (let i = 0; i < winner.length; i ++) {
            winner[i].say("I WON ", 3);
            winner[i].joinedSpar = false
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
            loser[i].lost = true;
            loser[i].sparmapname = this.map.name;
            
            loser[i].joinedSpar = false;
            loser[i].setmap(this.winnerlocation, this.winnerlocation, 13.69, 23.01);
            //loser[i].setmap(this.map.name, this.map.name, 14, 15);
        }

}
