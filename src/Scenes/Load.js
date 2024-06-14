class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.setPath("./assets/");

        // Load Main Menu
        this.load.image("logo", "logo.png");
        this.load.image("directions_1", "directions_1.png");
        this.load.image("directions_2", "directions_2.png");
        this.load.image("directions_3", "directions_3.png");
        this.load.image("background", "mainmenubackground.png");
        
        // Load Level End Menu
        this.load.image("end_text", "level_end.png");
        this.load.image("press_space_end", "press_space_end.png");

        // Load Credits
        this.load.image("space_back", "space_back.png");
        this.load.image("credits", "credits.png");

        // Load Game End Menu
        this.load.image("game_end_text", "game_end.png");
        this.load.image("game_end_options", "game_end_options.png ")

        // Load Level 1 Directions
        this.load.image("bush_directions_1", "bush_directions_1.png");

        // Load Level 2 Directions
        this.load.image("puddle_directions_1", "puddle_directions_1.png");

        // Load slug spritesheet
        
        this.load.atlas("slug", "Slug.png", "Slug_atlas.json");

        // Load sfx
        this.load.audio("main_music", "SlugSong.mp3");
        this.load.audio("impact", "Retro_Impact_Punch 07.wav");
        this.load.audio("foliage", "Retro_Impact_Lofi 09.wav");
        this.load.audio("swoosh", "Retro_Swooosh_07.wav");
        this.load.audio("swoosh2", "Retro_Swooosh_16.wav");

        // Load tilemap information
        this.load.image("bright_tiles", "gentle forest v01.png");                         // Packed tilemap
        this.load.tilemapTiledJSON("testlevel", "testlevel.tmj");   // Tilemap in JSON
        this.load.tilemapTiledJSON("level1", "level1.tmj");
        this.load.tilemapTiledJSON("level2", "level2.tmj");
        this.load.tilemapTiledJSON("level3", "level3.tmj");

        // Load particles
        this.load.multiatlas("kenny-particles", "kenny-particles.json");
    }

    create() {

        // create slug animation
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNames('slug', {
                prefix: "Slug_",
                start: 0,
                end: 3,
                suffix: ".png",
            }),
            frameRate: 10,
            repeat: -1
        });

        // make music loop
        if (music != null) {
            music.stop();
        }
        music = this.sound.add("main_music");
        music.setLoop(true);
        music.volume = .4;
        music.play();

        // reset scores
        level_score = 0;
        total_score = 0;

        // start game
        this.scene.start("mainMenu");

    }

    // Never get here since a new scene is started in create()
    update() {
    }
}