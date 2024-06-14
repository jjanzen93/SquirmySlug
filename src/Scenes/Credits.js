class Credits extends Phaser.Scene {
    constructor() {
        super("credits");
    }


    create() {

        this.background = this.add.image(230, 200, "background"); 
        this.end_text = this.add.image(game.config.width/2, 100, "credits");
        this.space_end = this.add.image(game.config.width/2, 500, "space_back");
        this.space_end.setScale(.7);
        

        this.scoreText = this.add.text(77, 165, "Slug Animation and \n Sprite: Jack Janzen", { fontSize: '24px', fill: '#FF0', style: 'bold'});
        this.scoreText = this.add.text(77, 235, "Terrain: seliel-the-\n shaper on itch.io", { fontSize: '24px', fill: '#FF0', style: 'bold'});
        this.scoreText = this.add.text(77, 304, "Sound Effects: Kronbits\n on itch.io", { fontSize: '24px', fill: '#FF0', style: 'bold'});
        this.scoreText = this.add.text(77, 373, "Music: Jack Janzen", { fontSize: '24px', fill: '#FF0', style: 'bold'});
        this.scoreText = this.add.text(77, 409, "Game Programming: Jack \n Janzen", { fontSize: '24px', fill: '#FF0', style: 'bold'});

        // make listener for game start
        this.space_key = this.input.keyboard.addKey("SPACE");

    }

    update() {
        if (this.space_key.isDown) {
            this.scene.start("gameEnd");
        }
    }
}