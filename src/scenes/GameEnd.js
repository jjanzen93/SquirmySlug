class GameEnd extends Phaser.Scene {
    constructor() {
        super("gameEnd");
    }


    create() {

        this.background = this.add.image(230, 200, "background"); 
        this.end_text = this.add.image(game.config.width/2, 100, "game_end_text");
        this.space_end = this.add.image(game.config.width/2, 500, "game_end_options");
        this.space_end.setScale(.7);
        
        this.scoreText = this.add.text(16, 245, "Level Score: " + level_score, { fontSize: '32px', fill: '#FFF'});
        this.scoreText = this.add.text(16, 295, "Total Score: " + total_score, { fontSize: '32px', fill: '#FFF'});

        // make listener for game start
        this.space_key = this.input.keyboard.addKey("SPACE");
        this.c_key = this.input.keyboard.addKey("C");

    }

    update() {
        if (this.space_key.isDown) {
            music.stop();
            this.scene.start("loadScene");
        }
        if (this.c_key.isDown) {
            this.scene.start("credits");
        }
    }
}