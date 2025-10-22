function onCreated() {
    this.onUpdated();
}
function onUpdated() {
    this.image = "westlaw_crate.png";
    this.name = "Race Controller";
    this.horseracing = false;
}
function onPlayerTouchsMe(player) {
    if (this.horseracing == true) { 
        this.say("Wait, a race is being done!", 1);
        return;
    }
    //RaceHorse();
    OpenGUI(player);
}

function RaceHorse() {
        onRaceStart(horsepick) 
        this.onHorseSpeech();
        this.scheduleevent(this.racetime, "reset");
        this.scheduleevent(this.speed - 0.75, "stop");
    
    
        let npcs = Server.searchnpcs({
        map: this.map,
        tag:"horse"})
    for (let i in npcs)
        npcs[i].dir = 1;
        npcs[i].ani = "horse_walk";
        npcs[i].move(this.speed, this.x, this.y - this.distance);
}

function onReset() {
    this.dir = 0;
    this.move(0, this.x, this.y + this.distance);
}

function onStop() {
    this.horseracing = false;
    this.dir = 0;

    this.ani = "horse_idle";
}
function OpenGUI(player) {
    let cashrequired = 500;
    this.triggerclient(player, "race", cashrequired);
}
function onClientRaceTrig(player, horsepick) {
    player.horsepick = horsepick.horsepick
    player.say(`TESTTT ${this.horsepick} ${test} ${horsepick.horsepick}`, 4);
    this.horseracing = true;
    this.scheduleevent(this.racetime + this.delaytime, "completed");
    this.chatintervaltime = 2;
    this.delaytime = 1;
    //player.say(this.winninghorse, 1);
    let npcs = Server.searchnpcs({
        map: this.map,
        tag:"horse",
        area:{x:this.x-30, y:this.y-30, w:60, h:60}
    });
    for (let i in npcs) {
        npcs[i].chatintervaltime = this.chatintervaltime;
        npcs[i].horseracing = true;
        npcs[i].distance = 20;
        npcs[i].racetime = this.racetime + this.delaytime;
        //npcs[i].say("START", 1);
        if (npcs[i].horsenumber == 1) {
            npcs[i].speed = this.horse1speed;
            npcs[i].name = "Horse[1]";
        }
        if (npcs[i].horsenumber == 2) {
            npcs[i].speed = this.horse2speed;
            npcs[i].name = "Horse[2]";
        }
        if (npcs[i].horsenumber == 3) {
            npcs[i].speed = this.horse3speed;
            npcs[i].name = "Horse[3]";
        }
        if (npcs[i].horsenumber == 4) {
            npcs[i].speed = this.horse4speed;
            npcs[i].name = "Horse[4]";
        }
        if (npcs[i].horsenumber == 5) {
            npcs[i].speed = this.horse5speed; 
            npcs[i].name = "Horse[5]";
        }
    //player.say(this.winninghorse, 2);
    npcs[i].say(npcs[i].speed, 1);
    npcs[i].scheduleevent(0, "racestart");
    }
}

function onRaceStart(horsepick) {
    this.horsepick = Math.floor(Math.random() * 5) + 1;
    switch (horsepick) {
        case 1:
            this.racetime = 6;
            this.winninghorse = "horse1";
            this.horse1speed = 4;
            this.horse2speed = 6;
            this.horse3speed = 6;
            this.horse4speed = 5;
            this.horse5speed = 6;
            break;
        case 2:
            this.racetime = 6;
            this.winninghorse = "horse2";
            this.horse1speed = 4;
            this.horse2speed = 3;
            this.horse3speed = 6;
            this.horse4speed = 5;
            this.horse5speed = 6;
            break;
        case 3:
            this.racetime = 7;
            this.winninghorse = "horse3";
            this.horse1speed = 4;
            this.horse2speed = 7;
            this.horse3speed = 3;
            this.horse4speed = 5;
            this.horse5speed = 6;
            break;
        case 4:
            this.racetime = 7;
            this.winninghorse = "horse4";
            this.horse1speed = 7;
            this.horse2speed = 7;
            this.horse3speed = 6;
            this.horse4speed = 4;
            this.horse5speed = 6;
            break;
        case 5:
            this.racetime = 6;
            this.winninghorse = "horse5";
            this.horse1speed = 4;
            this.horse2speed = 6;
            this.horse3speed = 6;
            this.horse4speed = 5;
            this.horse5speed = 3;
            break;
            default:
    }
}

function onCompleted() {
    CallHorse();
    this.horseracing = false;
}
