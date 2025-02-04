function onCreated() {
    this.onUpdated();
}

function onUpdated() {
    this.pushRate = 0.1;
    this.pushAmount = 1;
    this.pushDamage = 5;
    this.trashMaxHealth = 100;
    this.trashHealth = this.trashMaxHealth;
    this.HPPush = false;
}

//Trigger
function onPlayerAttacks(player) {
    this.trashHealth -= this.pushDamage;
    onPushHP(player);
    this.name = `${this.trashHealth}/${this.trashMaxHealth}`;
}

function onPushHP(player) {
    //Function Lock'
    if (this.HPPush) {
        return;
    }

    this.HPPush = true;

    while (this.trashHealth < this.trashMaxHealth) {
        this.trashHealth += this.pushAmount;
        this.name = `${this.trashHealth}/${this.trashMaxHealth}`;
        if (this.trashHealth >= this.trashMaxHealth) {
            this.HPPush = false;
        }
        //Health Push Rate
        this.sleep(this.pushRate);
    }
    
}