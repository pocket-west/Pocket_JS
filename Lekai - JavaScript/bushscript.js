// ================================
// Bush Script: Spawns Gralat Rupee on Attack
// Bush stays separate, rupee spawned as independent NPC
// ================================

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


    this.respawnTime = 4;
    //this.respawnTime = Server.getconfig("job").bushRespawnTime;

    let job = Server.getconfig("job");
    this.gralatValues = [
        { image: "westlaw_coin1.png", min: job.gralat1Min, max: job.gralat1Max },
        { image: "westlaw_coin5.png", min: job.gralat2Min, max: job.gralat2Max },
        { image: "westlaw_coin30.png", min: job.gralat3Min, max: job.gralat3Max },
        { image: "westlaw_coin100.png", min: job.gralat4Min, max: job.gralat4Max },
        { image: "westlaw_coin500.png", min: job.gralat5Min, max: job.gralat5Max },
        { image: "westlaw_coin1000.png", min: job.gralat6Min, max: job.gralat6Max },
        { image: "westlaw_coin2500.png", min: job.gralat7Min, max: job.gralat7Max },
        { image: "westlaw_coin5000.png", min: job.gralat8Min, max: job.gralat8Max }
    ];

    this.possibleGralatValues = [10, 0, 0, 1, 3, 2, 10, 1, 1, 3, 2];
}

function onPlayerAttacks(player) {
    echo(`DEBUG: Bush attacked by ${player.name}, health before attack: ${this.health}`);

    if (this.health <= this.damage) {
        echo("DEBUG: Bush destroyed! Processing rupee spawn...");

        // Hide bush, mark dead
        this.isdead = true;
        this.image = " ";

        // Spawn a new rupee NPC independently
        let rupeeX = this.x + 0.17;
        let rupeeY = this.y + 0.17;

        // Create rupee NPC
        let rupee = this.map.addnpc({
            x: rupeeX,
            y: rupeeY,
            image: "westlaw_coin1.png", // default, will adjust
            npcclass: "npc",
            scriptclasses: ["rupeeclass"],
            nosave: true
        });

        // Assign gralat value
        let gralatPlus = this.possibleGralatValues[Math.floor(Math.random() * this.possibleGralatValues.length)];
        rupee.gralatValue = gralatPlus;
        if (rupee.gralatValue <= 0) rupee.gralatValue = 1;

        // Assign image based on value
        let assigned = false;
        for (let g of this.gralatValues) {
            if (rupee.gralatValue <= g.max) {
                rupee.image = g.image;
                assigned = true;
                break;
            }
        }
        if (!assigned) rupee.image = "westlaw_coin5000.png";

        echo(`DEBUG: Rupee spawned at (${rupeeX}, ${rupeeY}) with value ${rupee.gralatValue}, image ${rupee.image}`);

        // Schedule bush respawn
        this.scheduleevent(this.respawnTime, "respawn");
        echo(`DEBUG: Bush will respawn in ${this.respawnTime} seconds`);
    } else {
        this.health -= this.damage;
        echo(`DEBUG: Bush damaged, health after attack: ${this.health}`);
    }
}

function onRespawn() {
    echo("DEBUG: Bush respawning...");

    this.name = "bush";
    this.image = "westlaw_bush-1.gif";
    this.isdead = false;
    this.health = this.maxhealth;

    echo(`DEBUG: Bush fully respawned — Health: ${this.health}/${this.maxhealth}`);
}
