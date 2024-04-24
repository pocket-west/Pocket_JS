function onCreated() {
    this.onUpdated();
}

function onPlayerSays(player) {
    if (player.chat == "changing") {
        this.flagChanging = true;
    }
    if (player.chat == "points") {
        this.points = false;
        return;
    }
    if (player.chat == "startpoints") {
        this.points = true;
        this.flagChanging = false;
        this.onPoint(player);
    }
        if (player.chat == "reset") {
        this.points = false;
        let flag = Server.searchnpcs({
        map: this.map,
        tag:"hsflag",
        area:{x:this.x-30, y:this.y-30, w:60, h:60}
    });
    for (let i in flag) {
        flag[i].scheduleevent(0, "updated");
    } 

    this.onUpdated();
    return;
    }
}

function onMouseDown(player) {
    this.say("This clanowner:" + this.clanowner + "|" + this.health + "/" + this.healthmax + " Base Owner:" + this.baseholder + "this newbaseowner :" + this.newbaseowner);

    //this.say("Points :" + this.points + " Flag Changing :" + this.flagChanging);
}


function onUpdated() {
    // flag name == flag
    this.tags = ["flag"];
    //this.points = "[0]";
    this.clanowner = "none";
    this.baseholder = "none";
    this.newbaseowner = "don\'t use";
    this.healthmax = 13;
    this.health = this.healthmax;
    this.name = this.baseholder + "- " + this.health + "/" + this.healthmax + "-";
    this.image = "westlaw_base-flag.gif";
    
    
    this.maxcurrentpoints = 5;
    this.currentpoints = 0;
    
    this.flagChanging = false;
    this.points = false;
    return;
}

function onNewBaseOwner(player) {
    this.health = this.healthmax;
    this.name = this.baseholder + "- " + this.health + "/" + this.healthmax + "-"
}

/*
Fix Sent Point to be true on New Base Owner 

False on Damage Or Heal

Both are inside hsflag script

*/


function onPoint(player) {
    //to Activate
    if (this.flagChanging == false && this.points == false) { this.points = true; }
    //points should set true from NewBase Owner
    while (this.points == true && this.flagChanging == false) {
        if (this.currentpoints == this.maxcurrentpoints) {
            this.currentpoints = 0;
        }
        if (this.points == true && this.flagChanging == true) { this.flagChanging = true; player.say("Flag is Changing", 2); }
        if (this.points == false) { player.say("Points Stopped", 2); this.onNewBaseOwner(player); break;}
        //gets point true/false from main flag
        let flag = Server.searchnpcs({
            map: this.map,
            tag:"hsflag",
            area:{x:this.x-30, y:this.y-30, w:60, h:60}
        });
        for (let i in flag) {
            this.points = flag[i].points
        }
        this.settimeout(1);
    }
    //this.say("Mhhm?", 1);
}
function onTimeout(player) {
    this.currentpoints++;
    this.name = this.clanowner + "- " + this.health + "/" + this.healthmax + "-" + this.currentpoints;
    this.onPoint(player);
}
