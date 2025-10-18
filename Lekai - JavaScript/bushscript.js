// ================================
// Bush Script: Single Rupee per Spot
// ================================

function onPlayerGrabs(olayer) {
    this.say("TESTT", 1);
}

function onCreated() {
    this.onUpdated();
    this.triggerclient("bush_drawunder", { id: this.id });
}

function onUpdated() {
    this.name = "bush";
    this.image = "westlaw_bush-1.gif";
    this.isdead = false;

    this.maxhealth = 20;
    this.health = this.maxhealth;
    this.damage = 20;

    this.width = 0.5;
    this.height = 0.5;

    this.respawnTime = Server.getconfig("job").bushRespawnTime;

    let job = Server.getconfig("job");
    this.rupeeImages = [
        { image: "westlaw_coin1.png", max: job.gralat1Max },
        { image: "westlaw_coin5.png", max: job.gralat2Max },
        { image: "westlaw_coin30.png", max: job.gralat3Max },
        { image: "westlaw_coin100.png", max: job.gralat4Max },
        { image: "westlaw_coin500.png", max: job.gralat5Max },
        { image: "westlaw_coin1000.png", max: job.gralat6Max },
        { image: "westlaw_coin2500.png", max: job.gralat7Max },
        { image: "westlaw_coin5000.png", max: job.gralat8Max }
    ];

    this.possibleAdd = [10, 0, 0, 1, 3, 2, 10, 1, 1, 3, 2];
}

function onPlayerAttacks(player) {
    if (this.health <= this.damage && !this.isdead) {
        // Flag immediately to prevent stacking
        this.isdead = true;
        this.image = " "; // hide bush

        let rupeeX = this.x + 0.17;
        let rupeeY = this.y + 0.17;

        // Search for existing rupee
        let nearby = Server.searchnpcs({
            map: this.map,
            area: { x: rupeeX, y: rupeeY, w: 0.1, h: 0.1 },
            name: "rupee"
        });

        let rupee;
        if (nearby.length > 0) {
            rupee = nearby[0];
        } else {
            rupee = this.map.addnpc({
                x: rupeeX,
                y: rupeeY,
                image: "westlaw_coin1.png",
                npcclass: "npc",
                scriptclasses: ["rupeeclass"],
                nosave: true,
                name: "rupee",
                rupeeValue: 0,
                ownerID: null,
                ownerName: null,
                locked: false
            });
        }

        // Only add value when bush is slashed
        let addVal = this.possibleAdd[Math.floor(Math.random() * this.possibleAdd.length)];
        rupee.rupeeValue = (rupee.rupeeValue || 0) + addVal;
        if (!rupee.ownerID) {
            rupee.ownerID = player.id;
            rupee.ownerName = player.name;
        }

        // Update rupee image based on value
        let assigned = false;
        for (let r of this.rupeeImages) {
            if (rupee.rupeeValue <= r.max) {
                rupee.image = r.image;
                assigned = true;
                break;
            }
        }
        if (!assigned) rupee.image = "westlaw_coin5000.png";

        // Trigger client to update
        rupee.triggerclient("update_rupee_value", { value: rupee.rupeeValue, locked: rupee.locked });

        echo(`DEBUG: Rupee at (${rupeeX},${rupeeY}) value=${rupee.rupeeValue}, owner=${rupee.ownerName || "unclaimed"}`);

        // Schedule respawn once
        this.scheduleevent(this.respawnTime, "respawn");
    } else if (!this.isdead) {
        this.health -= this.damage;
    }
}

function onRespawn() {
    this.name = "bush";
    this.image = "westlaw_bush-1.gif";
    this.isdead = false;
    this.health = this.maxhealth;
}

// ================================
// Rupee NPC Script
// ================================

function onCreated() {
    this.image = this.image || "westlaw_coin1.png";
    this.rupeeValue = this.rupeeValue || 0;
    this.name = "rupee";
    this.ownerID = this.ownerID || null;
    this.ownerName = this.ownerName || null;
    this.locked = this.locked || false;
}

// MouseDown toggles lock for owner
function onMouseDown(player) {
    if (this.ownerID === player.id) {
        this.locked = !this.locked;
        let status = this.locked ? "locked" : "unlocked";
        player.showmessage(`Rupee is now ${status}`);
    } else {
        player.showmessage("You cannot lock/unlock this rupee.");
    }
}

// PlayerTouchsMe collects rupee info
function onPlayerTouchsMe(player) {
    let rupeesHere = Server.searchnpcs({
        map: this.map,
        area: { x: this.x - 0.3, y: this.y - 0.3, w: 0.6, h: 0.6 },
        name: "rupee"
    });

    if (rupeesHere.length === 0) {
        player.showmessage("Unclaimed, Value 0");
        return;
    }

    let rupee = rupeesHere[0];
    let displayOwner = rupee.ownerName || "Unclaimed";
    let displayValue = rupee.rupeeValue || 0;

    if (rupee.locked && rupee.ownerID !== player.id) {
        player.showmessage(`Locked, Value ${displayValue}`);
        return;
    }

    player.showmessage(`${displayOwner} belongs to ${displayOwner}, Value ${displayValue}`);
}

// Client-side update trigger
function onTriggeredClient(event, data) {
    if (event === "update_rupee_value") {
        this.rupeeValue = data.value;
        this.locked = data.locked;
    }
}
