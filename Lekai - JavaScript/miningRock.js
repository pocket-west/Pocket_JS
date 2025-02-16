function onCreated() {
       this.onUpdated();
   }
   
   function onUpdated() {
       
       this.isdead = false;
       
       this.image = ""
       this.respawnTime = 5;
   
       this.drilling = false;
       this.name = " ";
   
       this.hasowner = false;
   
       this.maxhealth = 10;
       this.health = 0;
   
   }
   
   
   function onPlayerAttacks(player) {
       if (this.isdead == true) { return; }
       
       //Ownership
       if (!this.hasowner) {
           this.ownerid = player.id;
           this.hasowner = true;
       }
   
       if (player.weapondata.itemid === "drill") {
           let drillInfo = player.weapondata;
           onMining(player, drillInfo);
       }
   }
   
   function onMining(player, drillInfo) {
       
       if (this.drilling == true) { this.drilling = false; player.ani = "westlaw_drill-idle"; return; }
       this.drilling = true; 
       //Allows weapon time to show animation
       this.sleep(0.05);
   
        while (player.ani == drillInfo.atk) {
           //Check HP function
           onCheckHP();
           //this.say(`[${this.health}/${this.maxhealth}]`, 1);
   
           if (this.image == " " || this.drilling == false) { break; }
           onDrillBit(player, drillInfo)
           sleep(1);
       } 
       this.drilling = false;
   }
   
   // Extra Large Half Ham half Pepperoni
   
   function onCheckHP() {
       //make rangers for rock stages 0 to 3
       let stage1 = [0, 1, 2, 3];
       let stage2 = [4, 5, 6, 7];
       let stage3 = [8, 9, 10];
       if (stage1.includes(this.health)) {
           this.image = "rock-1.png";
       }
       if (stage2.includes(this.health)) {
           this.image = "rock-2.png";
       }
       if (stage3.includes(this.health)) {
           this.image = "rock-3.png";
       }
   }
   // Extra Large Half Garbage Half Ham half Pinnaple
   
   
   function onDrillBit(player, drillInfo) {
       //if max- Reward player
       if (this.health >= this.maxhealth && this.isdead == false) {
           onReward(player, drillInfo)
           return;
       }
   
       this.health++;
   
   }
   //Function to Add Each Time While Updating Level of Rock and show Progress , Dump to Reward function
   //eventually
   
   function onReward(player, drillInfo) {
       let message = "You've mined a rock! "
       player.showmessage(`${message} <img src='https://files.iappsbeats.com/Servers/server_1/Files/icons/rock-3.png'>`)
       this.drilling = false;
       this.say("Finished", 1);
       player.ani = "westlaw_drill-idle"
       this.image = " ";
       this.isdead = true;
       this.name = "";
       this.sleep(this.respawnTime)
       player.additem("rock", 1);
       onUpdated();
       //
   }
