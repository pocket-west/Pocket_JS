function onCreated() {
    this.onUpdated();
}

function onUpdated() {
    this.image = "westlaw_mailbox.png";
    this.number = 1;
    this.buildingname = "Events House";
    this.name = "";
    this.tags = ["mailbox", "box" + this.number];
    //this.players = [];
}

function onPlayerTouchsMe(player) {
    if (player.mailjobStatus == true && player.mailjobBuilding == this.buildingname) {
        player.mailjobStatus = "Reward";
        this.say("Delivered", 1);
        this.players.pop(player.id);
        //this.scheduleevent(0, "sendpush", player);
        return;
    } else if (!this.players.includes(player.id)) {
        this.say("Not Available", 1);
        return;
    } else {
        return;
    }
}

