// ===============================
// Bush Script — Smart AF + Proper Grab + bushID + Centered Rupee + Lock for All
// ===============================

function onCreated() {
    this.onUpdated();
}

function onUpdated() {
    this.name = " ";  // Hidden name for the bush
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
}

// ===============================
// Helper: find rupee near this bush using rupeeID
// ===============================
function getNearbyRupee() {
    let rupeeOffset = 0.17; // matches spawn offset
    let rupees = Server.searchnpcs({
        map: this.map,
        area: {
            x: this.x + rupeeOffset - 0.1,
            y: this.y + rupeeOffset - 0.1,
            w: 0.2,
            h: 0.2
        },
        name: " " // No need to use name, we rely on ID
    });
    for (let r of rupees) {
        if (r.bushID === this.id) return r;
    }
    return null;
}

// ===============================
// Player attacks bush
// ===============================
function onPlayerAttacks(player) {
    if (this.isdead) return;

    if (this.health <= this.damage) {
        this.isdead = true;
        this.image = " "; // hide bush

        // Spawn or get rupee
        let rupee = getNearbyRupee();
        if (!rupee) {
            rupee = this.map.addnpc({
                x: this.x + 0.17, // rupee offset
                y: this.y + 0.17,
                image: "westlaw_coin1.png",
                npcclass: "npc",
                scriptclasses: [],
                nosave: true,
                name: " ", // Hidden name for rupee
                rupeeValue: 1,
                ownerID: player.id,
                ownerName: player.name,
                locked: false,
                bushID: this.id,
                rupeeID: Math.random().toString(36).substring(2) // Unique ID for rupee
            });
        }

        // Add value when bush is slashed
        let addVal = this.possibleAdd[Math.floor(Math.random() * this.possibleAdd.length)];
        rupee.rupeeValue = (rupee.rupeeValue || 0) + addVal;

        // Assign owner if none
        if (!rupee.ownerID) {
            rupee.ownerID = player.id;
            rupee.ownerName = player.name;
        }

        // Update image based on value
        let assigned = false;
        for (let r of this.rupeeImages) {
            if (rupee.rupeeValue <= r.max) {
                rupee.image = r.image;
                assigned = true;
                break;
            }
        }
        if (!assigned) rupee.image = "westlaw_coin5000.png";

        echo(`DEBUG: Rupee at (${rupee.x},${rupee.y}) value=${rupee.rupeeValue}, owner=${rupee.ownerName}, locked=${rupee.locked}`);
        echo(`DEBUG: Bush center = (${this.x},${this.y})`);

        // Schedule respawn
        if (!this._respawnScheduled) {
            this._respawnScheduled = true;
            this.scheduleevent(this.respawnTime, "respawn");
        }
    } else {
        this.health -= this.damage;
    }
}

// ===============================
// Player grabs bush — collect coins
// ===============================
function onPlayerGrabs(player) {
    // Find nearby rupee using rupeeID
    let rupee = getNearbyRupee();
    if (!rupee) {
        player.showmessage("No rupee to collect!");
        return;
    }

    // Locked rupees cannot be grabbed by anyone
    if (rupee.locked) {
        player.showmessage(`This rupee is locked by ${rupee.ownerName}`);
        return;
    }

    // Amount of coins to give
    let amount = rupee.rupeeValue || 1;

    // Add coins to player inventory
    player.additem("coin1", amount);

    // Inform player
    player.showmessage(`You collected ${amount} coin${amount > 1 ? "s" : ""} from ${rupee.ownerName || "Unclaimed"}!`);

    // Remove rupee from map
    rupee.destroy();
}

// ===============================
// Player touches bush — show rupee info
// ===============================
function onPlayerTouchsMe(player) {
    let rupee = getNearbyRupee();
    if (!rupee) {
        player.showmessage("No rupee here yet!");
        return;
    }

    let displayOwner = rupee.ownerName || "Unclaimed";
    let displayValue = rupee.rupeeValue || 0;

    if (rupee.locked) {
        player.showmessage(`Locked by ${displayOwner} — Value ${displayValue}`);
    } else {
        player.showmessage(`${displayOwner}'s Rupee — Value ${displayValue}`);
    }
}

// ===============================
// Mouse down — lock/unlock rupee
// ===============================
function onMouseDown(player) {
    let rupee = getNearbyRupee();
    if (!rupee) return;

    if (rupee.ownerID && String(rupee.ownerID) === String(player.id)) {
        rupee.locked = !rupee.locked;
        let status = rupee.locked ? "locked" : "unlocked";
        player.showmessage(`Rupee is now ${status}`);
    } else {
        player.showmessage("You cannot lock/unlock this rupee.");
    }
}

// ===============================
// Respawn bush
// ===============================
function onRespawn() {
    this.name = " ";  // Hidden name for the bush
    this.image = "westlaw_bush-1.gif";
    this.isdead = false;
    this.health = this.maxhealth;
    this._respawnScheduled = false;
}
