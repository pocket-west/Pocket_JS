function onUpdated() {
}

function onPlayerTouchsMe(player) {
    if (this.horseracing == true) {
        this.say("Wait, a race is being done!", 1);
        return;
    }
    if (player.name != "Lekai") {
        this.say("GTFO", 1);
        return;
    }
    this.horseracing = true;
    this.scheduleevent(this.racetime, "completed");
    this.chatintervaltime = 2;
    this.delaytime = 0;
    this.chatintervaltime = 2;
    this.onRaceStart();
    player.say(this.winninghorse, 1);
    let npcs = Server.searchnpcs({
        map: this.map,
        tag:"horse",
        area:{x:this.x-30, y:this.y-30, w:60, h:60}
    });
    for (let i in npcs) {
        npcs[i].chatintervaltime = this.chatintervaltime;
        npcs[i].scheduleevent(0, "racestart");
        npcs[i].horseracing = true;
        npcs[i].distance = 5;
        npcs[i].racetime = this.racetime + this.delaytime;
        //npcs[i].say("START", 1);
        if (npcs[i].horsenumber == 1) {
            npcs[i].speed = this.horse1speed;
            npcs[i].name = "Hor1";
        }
        if (npcs[i].horsenumber == 2) {
            npcs[i].speed = this.horse2speed;
            npcs[i].name = "Hor2";
        }
        if (npcs[i].horsenumber == 3) {
            npcs[i].speed = this.horse3speed;
            npcs[i].name = "Hor3";
        }
    player.say(this.winninghorse, 2);
    npcs[i].say(npcs[i].speed, 1);
    }
}

function onRaceStart() {
    this.horsepick = Math.floor(Math.random() * 2) + 1;
    switch (this.horsepick) {
        case 1:
            this.racetime = 10;
            this.winninghorse = "horse1";
            this.horse1speed = 4;
            this.horse2speed = 10;
            this.horse3speed = 6;
            break;
        case 2:
            this.racetime = 10;
            this.winninghorse = "horse2";
            this.horse1speed = 10;
            this.horse2speed = 6;
            this.horse3speed = 7;
            break;
        case 3:
            this.racetime = 10;
            this.winninghorse = "horse3";
            this.horse1speed = 10;
            this.horse2speed = 6;
            this.horse3speed = 3;
            break;
            default:
    }
}

function onCompleted() {
    this.horseracing = false;
}
