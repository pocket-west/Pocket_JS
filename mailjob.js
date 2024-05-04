/*

player.mailjobStatus
player.mailjobAmount
player.mailjobBuilding

*/

function onCreated() {
    this.onUpdated();
}

function onUpdated() {
    this.tags = ["cassidy"];
    this.playerids = [];
    //this.ongoingtask = [];
    this.specialitem = "mailbag";
    this.name = "Cassidy";
    this.ani = "player_sit";
    this.head = "bbuilder_headc19.png";
    this.hat = "bbuilder_hat7.png";
    this.body = "bbuilder_body3.png";
}

function onPlayerTouchsMe(player) {
    // If they have the mail bag and their status is true
    if (player.weapondata.itemid == this.specialitem && player.mailjobStatus == true) {
        this.say("You need to go to the " + player.mailjobBuilding + "!", 1);
    // If they have the mail bag and their status is "Reward"
    } else if (player.weapondata.itemid == this.specialitem && player.mailjobStatus == "Reward") {
        this.scheduleevent(0, "reward", player);
    // If Player does not have a mail bag
    } else if (player.weapondata.itemid != this.specialitem) {
        player.say("I need a Mail Bag!", 1);
        player.ani = "westlaw_cry";
        this.say("Sorry", 1);
        return;
    // If player has a mail bag and their status is true
    } else if (player.weapondata.itemid == this.specialitem && player.mailjobStatus == false) {
        // 50% Chance to be ignored by npc
        mailchance = Math.floor(Math.random() * 2 + 1);
        // Ignored
        if (mailchance == 1) {
            this.say("")
            return;
        }
        // Sends player to Checker function
        if (mailchance == 2) {
            this.scheduleevent(0, "occupiedcheck", player);
            return;
        }
    } else {
        return;
    }
}

function onPickTask(player) {
        mailbox = Math.floor(Math.random() * 2 + 1);
        switch(mailbox) {
        case 1:
            this.cashamount = 32;
        this.buildingname = "Events House";
            this.say("Picked Mail Box 1 Task", 1);
        break;
        case 2:
            this.cashamount = 17;
            this.buildingname = "Horse Stable";
            this.say("Picked Mail Box 2 Task", 1);
        break;
        case 3:
            this.say("Picked Mail Box 3 Task", 1);
        break;
        }
}

function onOccupiedCheck(player) {
    // If player is doing a mail job
    if (player.mailjobStatus == true) {
        player.say("You Already Have a Mail Job Pending!", 1);
        return;
    // If player is not doing a mail job
    } else if (player.mailjobStatus == false) {
        this.scheduleevent(0, "picktask", player);
        this.scheduleevent(0, "showlocation", player);
        return;
    } else {
        return;
    }

}

function onShowLocation(player) {
    player.mailjobStatus = true;
    player.mailjobAmount = this.cashamount;
    player.mailjobBuilding = this.buildingname;
    player.showpm("Hey could you deliver this mail to the " + this.buildingname + "\'s mail box? <img src=' https://files.iappsbeats.com/Servers/server_1/Files/icons/westlaw_mail-icon.png'>",
        {head:this.head, name:this.name},
        {show:true});
}

function onReward(player) {
    player.mailjobStatus = false;
    this.say("You got " + this.cashamount + "!!", 3);
}
