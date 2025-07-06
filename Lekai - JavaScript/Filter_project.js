

//Make an ID whitelist

function onCreated() {

    this.onUpdated();
    }
    
    function onUpdated() {
        const tempClient = Discord.get("West Law Online Server");

        if (tempClient) {
            tempClient.destroy();
        }

        this.client = new Discord("West Law Online Server");
        this.client.on("ready", () => {
            echo("Discord onready");
        })
        this.client.login();
    
    this.filterWhitelist = [2, 1];
    this.filter = ["additems"];
    this.name = "Filter Tool"
    this.tags = ["filterTool"]
    }
     
     function onPlayerSays(player) {
    
    this.command = player.chat.split(" ");
    let keyword = this.command[0];
    let person = this.command[1];
    let playerjailcount = this.jailCount
    this.spawnedItem = this.command[2];
    let playermap = this.map.name;
    let playername = this.name
    let playerchat = this.chat;
    let playerid = this.id
    
    let filterTool = Server.searchnpcs({
        map: "westlaw_overworld",
        area:{x:134 - 20, y:96 - 20, w:40, h:40},
        tag:["filterTool"]
    });
    for (let i in filterTool)

        filterTool[i].scheduleevent(0, "filterchat", playerjailcount, playeritem, playername, playerchat, playerid);
}

     
     
     
     
    function onFilterChat(playerjailcount, playeritem, playername, playerchat, playerid) {


        //loading 


            if (!this.client) {
            this.client.destroy();
        let self = this;
        this.client = new Discord("West Law Online Server");
                    this.client.on("ready", () => {
                    echo("Discord onready");
                })
            }
        
    
    
    let embeds = [
        {
            title: `[Alert] Item Spawned by Admin -🚨`,
            description: 
            '```\n' +
            `Staff Member: ${playername}` + '\n' +
            `Item Spawned: ${this.spawnedItem}` + '\n' +
            `Spawned To: ${this.command[1]}` +
            '\n```',
            color: 15418782
        }
    ]
    
    for (let i = 0; i < this.filter.length; i++) {
        if (this.command[1] == null && this.command[2] == null) { 
            this.say("You're missing player ID and Item! ", 1);
            return;
        } else if (this.command[1] != null && this.command[2] == null) {
            this.say("SADAD", 1);
            return;
        }
    if (playerchat.toLowerCase().includes(this.filter[i].toLowerCase())) {
        this.client.sendtochannel("1330401972012060744", { embeds: embeds });
        return;
    } else if (this.filterWhitelist.includes(playerid)) { return; }
    }
    
    }
