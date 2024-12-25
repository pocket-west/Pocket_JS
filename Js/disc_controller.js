//needs cleaning


function onUpdated() {
    //    if (this.client)
    //        this.client.destroy();
    
        let self = this;
        this.client = new Discord("West Law Online Server");
        onSend();
        this.client.on("messageCreate", msg => {
            echo("Discord " + msg.channel.name + ": " + msg.author.username + ": " + msg.content);
    //        if (msg.channel.name == "general" && !msg.author.bot)
    //            msg.channel.send({content:"Hello " + msg.author.username + "!"});
        });
        this.client.login();
    }
    
    function onSend() {
        ```         let self = this;
                    this.client.on("ready", () => {
                    echo("Discord onready");
                    self.client.sendtochannel("1310765449046392852", "Test");
            //        self.client.sendtochannel("889554389122052106", "Hello all!");
                });```
    }
    
    function onPlayerSays(player) {
        if (player.id != 5) { return; }
        if (player.chat.startsWith("!staff")) {
            this.client.sendtochannel("1291681602694545430", player.chat.substring(7));
            player.chat = "";
            return;
        }
        if (player.chat.startsWith("!saloon")) {
            this.client.sendtochannel("1145515397127348224", player.chat.substring(8));
            player.chat = "";
            return;
        }
        if (player.chat.startsWith("!offtopic")) {
            this.client.sendtochannel("1145165347322867722", player.chat.substring(10));
            player.chat = "";
            return;
        }
        if (player.chat.startsWith("!development")) {
            this.client.sendtochannel("1273396132956995664", player.chat.substring(6));
            player.chat = "";
            return;
        }
        if (player.chat.startsWith("!announce")) {  
            this.client.sendtochannel("1303022736624582809", player.chat.substring(10));
            player.chat = "";
            return;
        }
        if (player.chat.startsWith("!randomdev")) {
            this.client.sendtochannel("1310765449046392852", player.chat.substring(14));
            player.chat = "";
            return;
        }
        if (player.chat.startsWith("!workshop")) {
            this.client.sendtochannel("1303136151984672819", player.chat.substring(9));
            player.chat = "";
            return;
        }
    }
