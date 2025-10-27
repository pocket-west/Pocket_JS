function onCreated() {
    onUpdated();
}

function onUpdated() { 
     this.customer = 2;
    //up down so far =]
    this.customerDirection = "up";
    
    let customer = Server.searchnpcs({tag:`customer${this.customer}`})

    onOutfits(customer);
    this.image = "westlaw_pouch.png"

    onInitCustomer(customer);
    this.name = `Customer ${this.customer} Controller`;

}

function onPlayerTouchsMe(player) {
    let customer = Server.searchnpcs({tag:`customer${this.customer}`})
    
    customer[0].say("Hello", 1);
}

function onOutfits(customer) {
    this.gender = Math.floor(Math.random() * 2);
    if (this.gender == 0) {
        //this.say("male!!", 1);   
        onMaleOutfit(customer);
        //return;
    } else {
        //this.say("female!!", 1);
        onFemaleOutfit(customer);
        //return;
    }
    //customer[0].weapon = "hotdog_stand.png";
    customer[0].ani = "player_sit";

}

function onMaleOutfit(customer) {
    this.possiblemaleheads = ['bbuilder_head1.png', `bbuilder_headc235.png`, `bbuilder_headc218.png`]
    this.possiblemalebodies = ['bbuilder_body4.png']
    this.possiblemalehats = ['bbuilder_hat76.png','bbuilder_hat75.png','bbuilder_hat74.png','bbuilder_hat73.png','bbuilder_hat72.png','bbuilder_hat64.png','bbuilder_hat63.png','bbuilder_hat62.png','bbuilder_hat61.png','bbuilder_hat51.png', 'bbuilder_hat50.png', 'bbuilder_hat17.png']
    customer[0].head = this.possiblemaleheads[Math.floor(Math.random() * this.possiblemaleheads.length)];
    customer[0].body = this.possiblemalebodies[Math.floor(Math.random() * this.possiblemalebodies.length)];
    customer[0].hat = this.possiblemalehats[Math.floor(Math.random() * this.possiblemalehats.length)];
    //return;
}

function onFemaleOutfit(customer) {
    this.possiblefemaleheads = ['bbuilder_headc41.png', 'bbuilder_head2.png']
    this.possiblefemalebodies = ['bbuilder_body2.png']
    this.possiblefemalehats = ['bbuilder_hat6.png']
    customer[0].head = this.possiblefemaleheads[Math.floor(Math.random() * this.possiblefemaleheads.length)];
    customer[0].body = this.possiblefemalebodies[Math.floor(Math.random() * this.possiblefemalebodies.length)];
    customer[0].hat = this.possiblefemalehats[Math.floor(Math.random() * this.possiblefemalehats.length)];
    //return;
}

function onInitCustomer(customer) {

    //dir
    if (this.customerDirection == "up") {
        //face customer upwards onstart
        customer[0].dir = 0;
    } else if (this.customerDirection == "down") {
        //face customer upwards onstart
        customer[0].dir = 2;
    }
    //customer[0].ani = "player_sit";
}
