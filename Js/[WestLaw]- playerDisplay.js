function onCreated() {
    this.onUpdated();
}

function onNoMatch(player) {
    this.head = this.defaulthead;
    this.hat = this.defaulthat;
    this.ani = "spar_show"
    this.showhp("",player.hp,player.maxhp, 1)
    this.chat = ""
    this.name = "?"
    
    //this.name = "(" + player.sparwins + ")";
    this.namecolor = "#568630";
}

function onUpdated() {
    this.defaulthead =  "head1"
    this.defaulthat = "hat3"
    this.onNoMatch(player);
    this.tags = ["player_ui"]
    //this.name = "player " + this.player;
    this.player = 1;
}
