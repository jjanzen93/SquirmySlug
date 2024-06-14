class MainMenu extends Phaser.Scene {
    constructor() {
        super("mainMenu");
    }


    create() {

        // Load main menu text

        this.background = this.add.image(230, 200, "background");
        this.logo = this.add.image(game.config.width/2, 100, "logo");
        this.directions_1 = this.add.image(game.config.width*(1/4), 250, "directions_1");
        this.directions_1.setScale(.4);
        this.directions_2 = this.add.image(game.config.width*(3/4), 250, "directions_2");
        this.directions_2.setScale(.4);
        this.directions_3 = this.add.image(game.config.width/2, 450, "directions_3");

        // make listener for game start
        this.space_key = this.input.keyboard.addKey("SPACE");

    }

    update() {
        if (this.space_key.isDown) {
            this.scene.start("level2");
        }
    }
}