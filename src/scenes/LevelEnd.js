class LevelEnd extends Phaser.Scene {
    constructor() {
        super("levelEnd");
    }


    create() {

        this.background = this.add.image(230, 200, "background"); 
        this.end_text = this.add.image(game.config.width/2, 100, "end_text");
        this.space_end = this.add.image(game.config.width/2, 500, "press_space_end");
        this.space_end.setScale(.7);
        

        this.scoreText = this.add.text(16, 245, "Level Score: " + level_score, { fontSize: '32px', fill: '#FFF'});
        this.scoreText = this.add.text(16, 295, "Total Score: " + total_score, { fontSize: '32px', fill: '#FFF'});

        // make listener for game start
        this.space_key = this.input.keyboard.addKey("SPACE");

    }

    update() {
        if (this.space_key.isDown) {
            this.scene.start(next_level);
        }
    }
}