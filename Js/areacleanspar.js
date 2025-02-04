function onUpdated() {
    this.areamaxx = 19.5 + 1;
    this.areamaxy = 17.5 + 1;
    this.areaminx = 8 - 1;
    this.areaminy = 10.5 - 0.3;
    this.areaw = (this.maxx - this.minx)
    this.areah = (this.maxy - this.miny)
}

function onCleanMapArea(player) {
        let area = Server.searchPlayers({        
            map: this.map,
        area:{x:this.areaminx, y:this.areaminy, w:this.areaw, h:this.areah}
        });
        for (let i = 0; i < area.length; i ++) {
                //trying to see if i can get player 1 id
                area[i].say("Cleaned", 0.3);
        }
}

function onPlayerTouchsMe(player) {
    this.onCleanMapArea(player)
}
