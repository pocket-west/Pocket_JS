function onCreated() {
    this.onUpdated();
}

function onUpdated() {
    this.healTimer = 5;
    this.name = "Bandage";
    this.image = "westlaw_bandage-icon.png"
}

function onPlayerTouchsMe(player) {
    while (this.healTimer > 0) {
        player.say(`healing...(${this.healTimer})`);
        player.ani = "westlaw_bandage-atk";
        player.hp += 4
        this.healTimer--;
        player.showhp(0, 0, this.healTimer);
        this.sleep(1);
    }

    player.say("healing complete");
    player.ani = "player_idle";
    this.healTimer = 5;
}
