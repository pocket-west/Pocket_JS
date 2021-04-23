//Street light script- Made by Pocket

function onCreated(){this.onUpdated();
}

function onUpdated(){
    light_switch = 'Off';
    this.chat = '';
    this.image = 'streetlight_off.png';
}

function onPlayerTouchsMe(pl, light_switch) {this.onToggle();
}

function onToggle() {
    if (light_switch == 'Off') {
        //If it's off and the player touchs it =]
        this.image = 'streetlight_on.png';
        this.play("lightswitch");
        light_switch = 'On';
    } else if (light_switch == 'On') {
        this.image = 'streetlight_off.png';
        this.play("lightswitch");
        light_switch = "Off";
    } else {
    }
}