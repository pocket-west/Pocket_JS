function onUpdated(pl) {
    this.name = "Hospital Bed-[Test]";
    this.nonblocking = true;
    this.image = "bbuilder_bed-corl1.png";
  
  }
  function onPlayerTouchsMe(pl) {
    // pl.chat = "timeout!"
    this.onTimeout(); // trigger timeout
  }
  function onTimeout() {
    // player.chat = "time"
    if (this.isOnBed(player)) {
        player.chat = "Healing Process!";
        if (player.hp != 100) {
        player.seteffect(1, "heal", { hp: 25 });
        player.aniarg1 = "bed_heal.bani";
        // endless loop as long as player is touching the bed
        this.settimeout(1);
        } else {
            return;
        }
    }
  }
  function isOnBed(pl) {
    let bedwidth = 96; // ??
    let bedheight = 128; // ??
    // don't rmbr my math atm but, if player is in npc.x + widht and player is in npc.y + height, basically...
    if (pl.x >= this.x && pl.x <= this.x+bedwidth) {
        if (pl.y >= this.y && pl.y <= this.y+bedheight) {
            return true;
        }
    }
    pl.aniarg1 = "";
    if (player.hp == 100) {
        this.say("Healed!", 1);
    }
    return false;
  }