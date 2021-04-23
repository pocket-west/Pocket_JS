//Reward door- Made by Pocket  

/*
function onPlayerTouchsMe(pl) {
    this.chat = pl.onlinetime; //3,600,000 = 1 thousand Hours
}
*/

function onCreated(){this.onUpdated();}

function onUpdated() {
    numberofhours = 1; //this is in thousands
    rewardtime = numberofhours * 3600000;
    this.name = 'Reward Door';
    rewardtimeConverted = (rewardtime / 3600000) * 1000; //1000
}

function onPlayerTouchsMe(pl) {
    if (pl.onlinetime >= rewardtime) {
        pl.say('Reward', 1);
    } else {
        pl.say('I do not have ' + rewardtimeConverted + ' Hours!', 1);
    }
}

/*

//Testing numbers

function onPlayerTouchsMe(pl) {
        pl.say('Reward ' + rewardtime + '!', 1);
        this.sleep(1);
        pl.say(rewardtimeConverted, 1);
        this.sleep(1);
        pl.say(pl.onlinetime, 1);
}
*/