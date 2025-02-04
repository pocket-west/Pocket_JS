function onOtherEvent(caller) {
    this.say("Horse1: " + this.horse1speed + " Horse2: " + this.horse2speed + " Horse3: " + this.horse3speed, 1);
}

function onCreated() {
    this.onUpdated();
}

function onUpdated() {
    this.horsenumber = 1
    this.name = "Horse" + this.horsenumber;
    this.tags = ["horse"];
}

function onPlayerSays(player) {
    if (player.chat == "race") {
        this.scheduleevent(this.racetime, "reset");
        this.move(this.speed, this.x, this.y - this.distance);
    }
}


function onHorseSpeech() {
    if (this.horseracing == false) { return; } 
    else if (this.horseracing == true) {
    this.speech = Math.floor(Math.random() * 5) + 1;
    switch (this.speech) {
        case 1:
            this.horsechat = "neighh";
            break;
        case 2:
            this.horsechat = "IM TRYINGG";
            break;
        case 3:
            this.horsechat = "NEIGHHH";
            break;
        case 4:
            this.horsechat = "🐎";
            break;
        case 5:
            this.horsechat = "almost there";
            break;
            default:
    }
    this.say(this.horsechat, 0.5);
    this.scheduleevent(this.chatintervaltime, "horsespeech");
    } else {
        return;
    }
}

function onRaceStart() {
    this.onHorseSpeech();
    this.scheduleevent(this.racetime, "reset");
    this.scheduleevent(this.speed - 0.75, "stop");
    this.dir = 1;
    this.ani = "horse_walk1";
    this.move(this.speed, this.x, this.y - this.distance);
}

function onReset() {
    this.dir = 0;
    this.move(0, this.x, this.y + this.distance);
}

function onStop() {
    this.horseracing = false;
    this.dir = 0;
    this.ani = "horse_idle1";
}
