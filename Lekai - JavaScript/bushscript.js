// ===============================
// Bush Script — Smart AF + Proper Grab + bushID + Centered Rupee + Lock System (Cancelable + Auto Unlock after 2s) + Slash Effect
// ===============================

function onCreated() {
    this.onUpdated();
}

function onUpdated() {
    this.name = " ";  // Hidden bush
    this.image = "westlaw_bush-1.gif";
    this.isdead = false;

    this.maxhealth = 20;
    this.health = this.maxhealth;
    this.damage = 20;

    this.respawnTime = Server.getconfig("job").bushRespawnTime || 10;

    let job = Server.getconfig("job") || {};
    this.rupeeImages = [
        { image: "westlaw_coin1.png", max: job.gralat1Max || 1 },
        { image: "westlaw_coin5.png", max: job.gralat2Max || 5 },
        { image: "westlaw_coin30.png", max: job.gralat3Max || 30 },
        { image: "westlaw_coin100.png", max: job.gralat4Max || 100 },
        { image: "westlaw_coin500.png", max: job.gralat5Max || 500 },
        { image: "westlaw_coin1000.png", max: job.gralat6Max || 1000 },
        { image: "westlaw_coin2500.png", max: job.gralat7Max || 2500 },
        { image: "westlaw_coin5000.png", max: job.gralat8Max || 5000 }
    ];

    this.possibleAdd = [10, 0, 0, 1, 3, 2, 10, 1, 1, 3, 2];
    this._respawnScheduled = false;
    this._lockCooldown = {};  // cooldowns per rupee ID
}

// ===============================
// Helper: find rupee near this bush
// ===============================
function getNearbyRupee() {
    let rupeeOffset = 0.17;
    let rupees = Server.searchnpcs({
        map: this.map,
        area: {
            x: this.x + rupeeOffset - 0.1,
            y: this.y + rupeeOffset - 0.1,
            w: 0.2,
            h: 0.2
        },
        name: " " // hidden
    });
    for (let r of rupees) {
        if (r.bushID === this.id) return r;
    }
    return null;
}

// ===============================
// Player clicks to lock/unlock rupee
// ===============================
function onMouseDown(player) {
    let rupee = getNearbyRupee();
    if (!rupee) return;

    if (rupee.ownerID && String(rupee.ownerID) === String(player.id)) {

        if (!rupee.locked) {
            if (this._lockCooldown[rupee.rupeeID]) {
                player.showmessage("Please wait for the rupee to unlock before locking it again.");
                return;
            }

            rupee.locked = true;
            player.showmessage("Rupee is now locked! It will automatically unlock in 2 seconds.");

            this._lockCooldown[rupee.rupeeID] = true;

            // Schedule auto unlock and store event ID
            rupee._unlockEventID = this.scheduleevent(2, "unlockrupee", {
                rupeeID: rupee.rupeeID,
                playerID: player.id
            });

        } else {
            // Manual unlock — cancel timer
            rupee.locked = false;
            player.showmessage("Rupee is now unlocked.");

            if (rupee._unlockEventID) {
                this.cancelevent(rupee._unlockEventID);
                rupee._unlockEventID = null;
            }

            this._lockCooldown[rupee.rupeeID] = false;
        }

    } else {
        player.showmessage("You cannot lock/unlock this rupee. It doesn't belong to you.");
    }
}

// ===============================
// Auto unlock after 2 seconds (safe + iAppsBeats-compatible)
// ===============================
function onUnlockRupee(params) {
    let rupeeID = params.rupeeID;
    let playerID = params.playerID;

    let rupee = getNearbyRupee();
    if (!rupee || !rupee.locked || rupee.rupeeID !== rupeeID) return;

    let players = Server.searchplayers({ map: this.map, id: playerID });
    let player = players.length ? players[0] : null;

    rupee.locked = false;
    rupee._unlockEventID = null;
    this._lockCooldown[rupeeID] = false;

    if (player) player.showmessage("Rupee has been unlocked automatically after 2 seconds!");
}

// ===============================
// Player attacks bush (spawn rupee + slash animation)
// ===============================
function onPlayerAttacks(player) {
    if (this.isdead) return;

    if (this.health <= this.damage) {
        this.isdead = true;

        // 🌿 Slash animation before bush disappears
        this.image = "westlaw_bush-slash.gif";
        this.sleep(0.72); // match animation length
        this.image = " "; // hide after slash
        this.sleep(0.3); // small delay before rupee appears

        let rupee = getNearbyRupee();
        if (!rupee) {
            rupee = this.map.addnpc({
                x: this.x + 0.17,
                y: this.y + 0.17,
                image: "westlaw_coin1.png",
                npcclass: "npc",
                scriptclasses: [],
                nosave: true,
                name: " ",
                rupeeValue: 1,
                ownerID: player.id,
                ownerName: player.name,
                locked: false,
                bushID: this.id,
                rupeeID: Math.random().toString(36).substring(2)
            });
        }

        let addVal = this.possibleAdd[Math.floor(Math.random() * this.possibleAdd.length)];
        rupee.rupeeValue = (rupee.rupeeValue || 0) + addVal;

        if (!rupee.ownerID) {
            rupee.ownerID = player.id;
            rupee.ownerName = player.name;
        }

        let assigned = false;
        for (let r of this.rupeeImages) {
            if (rupee.rupeeValue <= r.max) {
                rupee.image = r.image;
                assigned = true;
                break;
            }
        }
        if (!assigned) rupee.image = "westlaw_coin5000.png";

        if (!this._respawnScheduled) {
            this._respawnScheduled = true;
            this.scheduleevent(this.respawnTime, "respawn");
        }

    } else {
        this.health -= this.damage;
    }
}

// ===============================
// Player grabs — collect rupee
// ===============================
function onPlayerGrabs(player) {
    let rupee = getNearbyRupee();
    if (!rupee) {
        player.showmessage("No rupee to collect!");
        return;
    }

    if (rupee.locked) {
        player.showmessage(`This rupee is locked by ${rupee.ownerName}`);
        return;
    }

    let amount = rupee.rupeeValue || 1;
    player.additem("coin1", amount);
    player.showmessage(`You collected ${amount} coin${amount > 1 ? "s" : ""} from ${rupee.ownerName || "Unclaimed"}!`);
    rupee.destroy();
}

// ===============================
// Touch bush — show info
// ===============================
function onPlayerTouchsMe(player) {
    let rupee = getNearbyRupee();
    if (!rupee) return;

    let displayOwner = rupee.ownerName || "Unclaimed";
    let displayValue = rupee.rupeeValue || 0;

    if (rupee.locked) {
        player.showmessage(`Locked by ${displayOwner} — Value ${displayValue}`);
    } else {
        player.showmessage(`${displayOwner}'s Rupee — Value ${displayValue}`);
    }
}

// ===============================
// Respawn bush
// ===============================
function onRespawn() {
    this.name = " ";
    this.image = "westlaw_bush-1.gif";
    this.isdead = false;
    this.health = this.maxhealth;
    this._respawnScheduled = false;
}
