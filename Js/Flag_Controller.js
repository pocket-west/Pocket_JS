/*

player.weapondata.flaghit == rock damage





Tomorrow Morning Please Make sure player touches me goes to the horse function...

ensure on horse shoe 2.... it removes the horse shoe and says flag Pause with points 





*/

function onCreated() {
    this.onUpdated();
}

function onGetUpdatedHealth(player) {
        let flag = Server.searchnpcs({
        map: this.map,
        tag:"flag",
        area:{x:this.x-30, y:this.y-30, w:60, h:60}
    });
    for (let i in flag) {
        this.health = flag[i].health;
        this.maxhealth = flag[i].maxhealth
    }
}

function onGetLastSafeHolder(player) {
    let flag = Server.searchnpcs({
        map: this.map,
        tag:"flag",
        area:{x:this.x-30, y:this.y-30, w:60, h:60}
    });
    for (let i in flag) {
        this.baseholder = flag[i].baseholder;
    }
}

function onGetUpdatedClanInfo(player) {
        let flag = Server.searchnpcs({
        map: this.map,
        tag:"flag",
        area:{x:this.x-30, y:this.y-30, w:60, h:60}
    });
    for (let i in flag) {
        this.clanowner = flag[i].clanowner;
        this.points = flag[i].points
    }
}

function onSendHealthToFlag(player) {
        let flag = Server.searchnpcs({
        map: this.map,
        tag:"flag",
        area:{x:this.x-30, y:this.y-30, w:60, h:60}
    });
    for (let i in flag) {
        flag[i].health = this.health;
        flag[i].maxhealth = this.maxhealth
    }
}

function onSendClanToFlag(player) {
        let flag = Server.searchnpcs({
        map: this.map,
        tag:"flag",
        area:{x:this.x-30, y:this.y-30, w:60, h:60}
    });
    for (let i in flag) {
        flag[i].horseshoe = this.horseshoe
        flag[i].horseshoemax = this.horseshoemax;
        flag[i].newbaseowner = this.newbaseowner;
        flag[i].clanowner = this.clanowner;
        flag[i].points = this.points
    }
}

function onUpdated() {

    this.flagChanging = false;

    this.tags = ["hsflag"];
    
    this.rate = 0.3;
    this.hppush = false;
    
    //Set HP Push off/false
    this.hppush = false;
    this.pushamount = 2;
    
    //Flag's Image :P

    this.flaghealthmax = this.flaghealth = 100;
    
    this.onGetUpdatedClanInfo(player);
    this.onGetUpdatedHealth(player);
    this.say("Updated", 4); // <- this is just a debug test 
    
    //Horse Shoes - Start with 0 
    this.horseshoe = 0;
    this.horseshoemax = 3;
    
    //Adding a string for the placement of clan
    this.clanowner = "none";
    this.newbaseowner = "don\'t use";
    
    this.image = "westlaw_baseflag-" + this.horseshoe + ".png";


    //Name of the horse shoe flag
    this.name = this.horseshoe + "/" + this.horseshoemax + "- " + this.flaghealth + "/" + this.flaghealthmax + "- [" + this.clanowner + "]";
}

function onMouseDown(player) {
    this.say(this.clanowner + "|" + this.flaghealth + " Horse Shoes" + this.horseshoe + "  HP Push:" + this.hppush + "  flagchanging  -" + this.flagChanging + "  this new base owner:" + this.newbaseowner);
}
/*
function onSendPoint(player) {
        //if it's an enemy
        let npcs = Server.searchnpcs({
        map: this.map,
        tag:"dynamiteflag",
        area:{x:this.x-30, y:this.y-30, w:60, h:60}
    });
    for (let i in npcs) {
        npcs[i].points = "Attacking";  //---------------------------------
        npcs[i].flagpaused = true;
            health = npcs[i].health;
            maxhealth = npcs[i].maxhealth;
        //if player is in clan
        while (this.sendpoint == true ) {
         if (this.newclanname == npcs[i].clanowner) {
            if (health != (maxhealth - 1) && health != maxhealth) {
                npcs[i].health = npcs[i].health + this.flagpoint;
                npcs[i].name = npcs[i].clanowner + "- " + npcs[i].health + "/" + npcs[i].maxhealth + " - " + npcs[i].points;
                return
            }
            if (health > maxhealth) {
                npcs[i].scheduleevent(0, "maxheal", player)
                return;
            }
            if (health == (maxhealth - 1)) {
                npcs[i].health = npcs[i].health + this.flagpoint;
                npcs[i].name = npcs[i].clanowner + "- " + npcs[i].health + "/" + npcs[i].maxhealth + " - " + npcs[i].points;
                npcs[i].say("Max Heal!", 1);
                //this.sendpoint = false
                return;
            }
            if (health == maxhealth) {
                npcs[i].scheduleevent(0, "maxheal", player);
                return;
            }

            return;
        }       
                if (health <= this.flagpoint) {
                    this.scheduleevent(0, "searchitlol", player);
                    return;
                }
                //this.scheduleevent,(0, "sendpoint", player);
                npcs[i].health = npcs[i].health - this.flagpoint;
                npcs[i].name = npcs[i].clanowner + "- " + npcs[i].health + "/" + npcs[i].maxhealth + " - " + npcs[i].points;

        
        //this.scheduleevent(0, "hpchecker", player, health, maxhealth);
        if (npcs[i].health <= this.flagpoint) {
            this.scheduleevent(0, "takeover", player);
            return;
        }
        npcs[i].say("health-" + npcs[i].health, 1);
        npcs[i].name = npcs[i].clanowner + "- " + npcs[i].health + "/" + npcs[i].maxhealth + " - " + npcs[i].points;
        if (npcs[i].health < this.flagpoint) { 
            this.scheduleevent(0, "searchitlol", player);
            return;
        }
            if (npcs[i].health == npcs[i].maxhealth && npcs[i].clanowner == this.newclanname) { 
            player.say("Lekai");
            npcs[i].say("Lekai");
            return;
        }
        this.scheduleevent,(0, "sendpoint", player);
        this.sleep(1);
        }
    }
}

function onTakeOver(player) {
    this.say("Take Over", 3);
        let npcs = Server.searchnpcs({
        map: this.map,
        tag:"dynamiteflag",
        area:{x:this.x-30, y:this.y-30, w:60, h:60}
    });
        for (let i in npcs) {
        if (npcs[i].flagpaused == false) { 
    
            return;
        }
        //this.flagpaused = false;
        npcs[i].points = 0;
        npcs[i].flagpaused = false;
        this.sendpoint = true;
        npcs[i].health = npcs[i].maxhealth;
        //this.scheduleevent(0, "sendpoint", player)
        player.say("I took over the base!", 1);
        //doesn't use this
        npcs[i].clanowner = this.newclanname;
        npcs[i].points = 0;
        npcs[i].scheduleevent(0, "addpoints", player);
        }
}

function onSearchItLol(player) {
        this.say("YEEEE", 1);
        let npcs = Server.searchnpcs({
        map: this.map,
        tag:"dynamiteflag",
        area:{x:this.x-30, y:this.y-30, w:60, h:60}
    });
    for (let i in npcs) {
        // If health is 0 - take over base
        if (npcs[i].health <= this.flagpoint) {
        npcs[i].points = 0;
        npcs[i].flagpaused = true;
        this.sendpoint = true;
        npcs[i].health = npcs[i].maxhealth;
        //this.scheduleevent(0, "sendpoint", player)
        player.say("I took over the base!!!!!", 1);
        //doesn't use this
        //npcs[i].clanowner = this.newclanname;
        npcs[i].points = 0;
  
        //this.scheduleevent(0, "sendpoint", player);
        //npcs[i].scheduleevent(0, "addpoints", player);
            return;
        }
    }
} /*

function onGenerate() {
    if (this.horseshoe >= 0) {
        this.name = this.horseshoe + "/" + this.horseshoemax;
        this.say("", 1);

 
        return;
    }
    this.horseshoe++;
    this.name = this.horseshoe;
    this.image = "westlaw_baseflag-" + this.horseshoe + ".png";
} */

function onSetHSFlagOwner(player) {
    //this.clanowner = player.clanname;
    
    // Remove Weapon
        //this.flagChanging = true;
        //player.weapon = "fist";

    //If a player with the clan took charge
        if (this.flagChanging == true) {
            // if it's running and i touch it flagchanging will go to false
        //stops?
        this.flagChanging = false;
        
        //The part when the player stops the flag
        
        this.say("I Stopped it!", 1);
        
        
        //return;
        //this.onDestroyFlag(player);
        
        }
        if (this.flagChanging == false && player.clanname == this.clanowner) {
            this.flagChanging = true;
            //this.clanowner = player.clanname;
            this.say("Pos", 1);
            this.horseshoe++;
            this.flaghealth = this.flaghealthmax;
            
            this.image = "westlaw_baseflag-" + this.horseshoe + ".png";
            this.name = this.horseshoe + "/" + this.horseshoemax + "- " + this.flaghealth + "/" + this.flaghealthmax + "- [" + this.clanowner + "]";
            this.onHealFlag(player);
            return;
        } else if (this.flagChanging == false && player.clanname != this.clanowner) {
            //Make his clan rule
            // this.newbaseowner = player.clanname;
            
            
            this.flagChanging = true;
            this.say("Neg!", 1);
            this.horseshoe++;
            this.flaghealth = this.flaghealthmax;
            
            this.image = "westlaw_baseflag-" + this.horseshoe + ".png";
            this.name = this.horseshoe + "/" + this.horseshoemax + "- " + this.flaghealth + "/" + this.flaghealthmax + "- [" + this.clanowner + "]";
            this.onDestroyFlag(player);
            return;
        }
    

    
    //Update Name, Clan Owner, Added Horse Shoe & make health 100 ( Updated Image as well )
    //player.clanname = this.clanowner;
    
    this.horseshoe++;
    this.flaghealth = this.flaghealthmax;
    
    this.image = "westlaw_baseflag-" + this.horseshoe + ".png";
    this.name = this.horseshoe + "/" + this.horseshoemax + "- " + this.flaghealth + "/" + this.flaghealthmax + "- [" + this.clanowner + "]";
}

function onHorseShoeAttack(player) {
    //Pull Updated Variables :P
    //this.onGetUpdatedHealth(player);
    //this.onGetUpdatedClanInfo(player);
    
    if (this.horseshoe < (this.horseshoemax - 1)) {
            // If Horse Shoe count is 0 and 1
        player.say("+1", 1);
        this.horseshoe++
            // Remove Weapon
        player.weapon = "fist";
    } else if (this.horseshoe == (this.horseshoemax - 1)) {
        // Placing the horse shoe ( Setting Up New Onwer )

        player.weapon = "fist";
        this.horseshoe++;
        this.clanowner = player.clanname;
        //this.flagChanging = true;
        this.name = this.horseshoe + "/" + this.horseshoemax + "- " + this.flaghealth + "/" + this.flaghealthmax + "- [" + this.clanowner + "]";
        this.image = "westlaw_baseflag-" + this.horseshoe + ".png";

        // set up destroy to function
        this.flagChanging = true;
        // this made it work but only destroy on all occasions this.onDestroyFlag(player);
        this.onDamageOrHeal(player);
        return;
    } else if (this.horseshoe == this.horseshoemax) {
            // If Horse Shoe count is full
        this.say("Rack Full", 1);
            // Remove Weapon
        player.weapon = "fist";
            // Cry Animation
        player.ani = "westlaw_cry";
        
        //Added return so it does not carry outside statement functions
        return;
    } else {
        return;
    }
    this.health = this.healthmax;
    //On Horse Shoe Attack Update Name
    if (this.horseshoe == this.horseshoemax) {
        this.name = this.horseshoe + "/" + this.horseshoemax + "- " + this.flaghealth + "/" + this.flaghealthmax + "- [" + this.clanowner + "]";
        } else {
            this.name = this.horseshoe + "/" + this.horseshoemax + "- " + this.flaghealth + "/" + this.flaghealthmax + "- [none]";
        }
        this.image = "westlaw_baseflag-" + this.horseshoe + ".png";
    
    return;
}

function onRockKill(player) {
    if (this.horseshoe == this.horseshoemax) {
        if (this.flagChanging == true && player.clanname != this.clanowner) { this.say("Flag Paused!",1); this.flagChanging = false; }
        //If the player damages 3/3
        // - - -- - - - Just use a string, don't change variable xD this.clanowner = "none";
        //Remove Horse Shoe, Change to New Name
        this.flaghealth = this.flaghealthmax;
        this.showhp("","",this.flaghealth,this.flaghealthmax);

        this.horseshoe--
        this.name = this.horseshoe + "/" + this.horseshoemax + "- " + this.flaghealth + "/" + this.flaghealthmax + "- [none]";
        this.image = "westlaw_baseflag-" + this.horseshoe + ".png";
        return;
    } else if (this.horseshoe == 1) {
        this.horseshoe--
    } else {
        this.horseshoe--
    }
    //Update Name and Image
    this.flaghealth = this.flaghealthmax;
    this.showhp("","",this.flaghealth,this.flaghealthmax);

    // Fixed the flag name showing to none if it's not maxed
    if (this.horseshoe == this.horseshoemax) {
        this.name = this.horseshoe + "/" + this.horseshoemax + "- " + this.flaghealth + "/" + this.flaghealthmax + "- [" + this.clanowner + "]";
        } else {
            this.name = this.horseshoe + "/" + this.horseshoemax + "- " + this.flaghealth + "/" + this.flaghealthmax + "- [none]";
        }
    this.image = "westlaw_baseflag-" + this.horseshoe + ".png";
    
}

function onRockHeal(player) {
    if (this.flaghealth >= this.flaghealthmax ) {
        this.flaghealth = this.flaghealthmax;
        player.say("HP Full!", 1);
        return;
    }
    if (this.flaghealth > 0 && this.flaghealth < this.flaghealthmax) {
        this.flaghealth = this.flaghealth + player.weapondata.flaghit;
    }
    if (this.flaghealth <= player.weapondata.flaghit) {
        this.flaghealth = this.flaghealthmax;
        return;
    }
    // Fixed the flag name showing to none if it's not maxed
    if (this.horseshoe == this.horseshoemax) {
    this.name = this.horseshoe + "/" + this.horseshoemax + "- " + this.flaghealth + "/" + this.flaghealthmax + "- [" + this.clanowner + "]";
    } else {
        this.name = this.horseshoe + "/" + this.horseshoemax + "- " + this.flaghealth + "/" + this.flaghealthmax + "- [none]";
    }
}

function onRockAttack(player) {
    //If an enemy tries to attack on 0
    if (this.horseshoe == 0 && player.clanname != this.clanowner) {
        this.say("Place a Horse Shoe!", 1);
        return;
    }
    //If member tries to attack on 0
    if (this.horseshoe == 0 && player.clanname == this.clanowner) {
        this.say("", 1);
        return;
    }
    if (this.flaghealth <= player.weapondata.flaghit) {
        this.onRockKill(player);
        return;
    } else if (this.flaghealth == this.flaghealthmax) {
        // Check if HP Push is true so it doesn't scheduleevent again
        
        if (this.hppush == true) {
            //Just reduce Damage
            
            this.flaghealth -= player.weapondata.flaghit;
            //Updated name
            if (this.horseshoe == this.horseshoemax) {
                this.name = this.horseshoe + "/" + this.horseshoemax + "- " + this.flaghealth + "/" + this.flaghealthmax + "- [" + this.clanowner + "]";
                } else {
                    this.name = this.horseshoe + "/" + this.horseshoemax + "- " + this.flaghealth + "/" + this.flaghealthmax + "- [none]";
                }
            return;
        }
        // If HP Push is not set true, Set Push true
        this.say("", 1);
        this.flaghealth -= player.weapondata.flaghit;
        this.hppush = true;
        this.onHPPush(player);
    } else if (this.flaghealth > 0 && this.flaghealth < this.flaghealthmax) {
        this.flaghealth -= player.weapondata.flaghit;
    } else {
        return;
    }
    //Outside function
    
    if (this.horseshoe == this.horseshoemax) {
        this.name = this.horseshoe + "/" + this.horseshoemax + "- " + this.flaghealth + "/" + this.flaghealthmax + "- [" + this.clanowner + "]";
        } else {
            this.name = this.horseshoe + "/" + this.horseshoemax + "- " + this.flaghealth + "/" + this.flaghealthmax + "- [none]";
        }
}

function onPlayerAttacks(player) {

    //if player is not in a clan
    if (player.clanname == "") {
        this.say("You need to join a clan!", 1);
        return;
    }
    
    //this.flaghealth - player.weapondata.flaghit; - was testing
    if (player.weapondata.itemid.includes("horse")) {
        this.onHorseShoeAttack(player);
        return;
    } else if (player.weapondata.itemid.includes("rock")) {
        if (player.clanname == this.clanowner) {
            this.onRockHeal(player);
            return;
        }
        this.say("", 1);
        this.onRockAttack(player);
        
        //update name inside if statement
        if (this.horseshoe == this.horseshoemax) {
            this.name = this.horseshoe + "/" + this.horseshoemax + "- " + this.flaghealth + "/" + this.flaghealthmax + "- [" + this.clanowner + "]";
            } else {
                this.name = this.horseshoe + "/" + this.horseshoemax + "- " + this.flaghealth + "/" + this.flaghealthmax + "- [none]";
            }        return;
    } else {
        this.say("Place a Horse Shoe or Attack with a Rock!", 1);
        return;
    }
    //if player is not in a clan
    //Outside if statement
    
    
    this.name = this.horseshoe + "/" + this.horseshoemax + "- " + this.flaghealth + "/" + this.flaghealthmax + "- [" + this.clanowner + "]";
    
}

function onHPPush(player) { 
    // while hp push is set to true
    while (this.hppush == true) {
    //if health escapes
    if (this.flaghealth >= this.flaghealthmax || (this.flaghealthmax - this.flaghealth) <= this.pushamount) { this.flaghealth = this.flaghealthmax; this.hppush = false; return;}

    this.flaghealth = this.flaghealth + this.pushamount;
    this.showhp("","",this.flaghealth,this.flaghealthmax);
    if (this.horseshoe == this.horseshoemax) {
        this.name = this.horseshoe + "/" + this.horseshoemax + "- " + this.flaghealth + "/" + this.flaghealthmax + "- [" + this.clanowner + "]";
        } else {
            this.name = this.horseshoe + "/" + this.horseshoemax + "- " + this.flaghealth + "/" + this.flaghealthmax + "- [none]";
        }
    //this.say("PUSHHP- " + this.health + "PUSH: " + this.hppush, 1);
    this.sleep(this.rate);
    this.onHPPush(player);
    }
    //this.onUpdated();
}

function onDamageOrHeal(player) {
    //Test to see if function will show current flag info
        this.onGetLastSafeHolder(player);
        player.say("Damage/Heal", 1);
        //this.newbaseowner = player.clan;
        //this.flagChanging = false;
        // If statement to check if the flag should heal or attack
        
        if (player.clanname == this.baseholder) {
            this.say("Should Heal Now", 1);
            this.flagChanging = true;
            this.onHealFlag(player);
            return;
        } else if (player.clanname != this.baseholder) {
            this.say("Should Destroy Now", 1);
            this.flagChanging = true;
            this.onDestroyFlag(player);
            return;
        }
}

function onTakeFlag(player) {

    if (this.flagChanging == true) {
        this.flagChanging = false;
        this.onDamageOrHeal(player);
        return;
    }
    //this.flagChanging = true;
     //If Player is in Clan Heal, If Player is not, Destroy
      let flag = Server.searchnpcs({
        map: this.map,
        tag:"flag",
        area:{x:this.x-30, y:this.y-30, w:60, h:60}
    });
    for (let i in flag) {
        if (player.clanname == flag[i].clanowner) {
            this.say("Heal")
            this.onHealFlag(player);
        } else if (player.clanname != flag[i].clanowner) {
            this.say("Destroy");
            this.onDestroyFlag(player);
        }
        player.say("Going to Functions", 1);
    }
}

function onHealFlag(player) {
    while (this.flagChanging == true) {
        if (this.flagChanging == false) { break; }
      let flag = Server.searchnpcs({
        map: this.map,
        tag:"flag",
        area:{x:this.x-30, y:this.y-30, w:60, h:60}
    });
    for (let i in flag) {
        if (flag[i].health == (flag[i].healthmax - 1) || flag[i].health == flag[i].healthmax) { this.flagChanging = false; }
        if (this.flagChanging == false) {
            flag[i].health = flag[i].healthmax;
            flag[i].say(".....Back to 100");


            //this should set clan owner once completed;
            flag[i].clanowner = this.clanowner;
            
            //to make the flag back 100% HP
            flag[i].name = flag[i].clanowner + "- " + flag[i].health + "/" + flag[i].healthmax + "-"

            break;
        } else {
            flag[i].health++;
        }
        if (this.flagChanging == false) { break; }
        flag[i].name = "-Openning Safe " + flag[i].health;
    }
    this.sleep(1)
    this.onHealFlag(player);
    }
}

function onPlayerSays(player) {
    if (player.chat == "stop") {
        this.flagChanging = false
    }
    if (player.chat == "take") {
        this.onDamageOrHeal(player);
    }
}


function onDestroyFlag(player) {
    //this.onSendClanToFlag(player);
    
    //Update Clans
    while (this.flagChanging == true) {
    let flag = Server.searchnpcs({
      map: this.map,
      tag:"flag",
      area:{x:this.x-30, y:this.y-30, w:60, h:60}
  });
    for (let i in flag) {
        if (flag[i].health <= 0) { this.flagChanging = false; }
        if (this.flagChanging == false) {
            //this.onSendClanToFlag(player);
            flag[i].say("Owned by " + this.clanowner, 2);// - When Completed
            flag[i].baseholder = this.clanowner; // ------------------- I Think So
            flag[i].scheduleevent(0, "newbaseowner", player);
            break;
        } else {
            flag[i].health--;
        }
        if (this.flagChanging == false) { break; }
        flag[i].name = "-Openning Safe " + flag[i].health;
    }
    this.sleep(1)
    this.onDestroyFlag(player);
    }
}




/*
function onPlayerTouchsMe(player) {
    if (player.clanname == "") {return;}
    if (this.flagChanging == true) {
        // if it's running and i touch it flagchanging will go to false
    //stops?
    this.flagChanging = false;
    
    //The part when the player stops the flag
    
    this.say("I Stopped it!", 1);
    
    
    return;
    //this.onDestroyFlag(player);
    
    }
    if (this.flagChanging == false && player.clanname == this.clanowner) {
        this.flagChanging = true;
        this.say("I'm Healing the Safe guys!",)
        this.onHealFlag(player);
        return;
    } else if (this.flagChanging == false && player.clanname != this.clanowner) {
        this.flagChanging = true;
        this.say("I'm Destroying the Safe!",)
        this.onDestroyFlag(player);
        return;
    }
    //this.flagChanging = true;
    //this.onTakeFlag(player);
}*/
