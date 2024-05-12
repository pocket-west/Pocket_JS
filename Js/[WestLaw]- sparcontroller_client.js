function onCreated() {
    this.onUpdated();
}

function onUpdated(player) { 
    //this.name = "test"
    
    //default, false joined image
    this.image = "bbuilder_spargrounds-join.png"; 
    this.scheduleevent(0.1, "servercorrectimage", player);
}

function onServerCorrectImage(player) {
    if (player.joinedSpar == false) {
        this.onJoined(player);
    } else if (player.joinedSpar == true) { 
        this.onLeave(player); 
    }
}

function onServerJoin(player) {
        this.image = "bbuilder_spargrounds-join-2.png";
        player.showmessage("You've Joined! <img src=' https://files.iappsbeats.com/Servers/server_1/Files/icons/westlaw_vector-icon.png'>", 1);
        player.joinedSpar = true;

}

function onServerLeave(player) {
        this.image = "bbuilder_spargrounds-join.png"; 
        player.showmessage("You've Left! <img src=' https://files.iappsbeats.com/Servers/server_1/Files/icons/westlaw_vector-icon.png'>", 1);
        player.joinedSpar = false;
}
