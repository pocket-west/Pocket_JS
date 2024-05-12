function onPlayerTouchsMe(player) {
    pocket_choices = ['carrot cake', 'bake chicken', 'pizza', 'fries', 'bacon cheese burger'];
    choice = pocket_choices[Math.floor(Math.random() * pocket_choices.length)];
    player.say(choice);
}
