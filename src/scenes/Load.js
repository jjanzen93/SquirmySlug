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

        // Load Level 1 Directions
        this.load.image("bush_directions_1", "bush_directions_1.png");

        // Load slug spritesheet
        
        this.load.atlas("slug", "Slug.png", "Slug_atlas.json");
        this.load.audio("main_music", "SlugSong.mp3");
        this.load.audio("impact", "Retro Impact Punch 07.wav");
        this.load.audio("foliage", "Retro Impact Lofi 09.wav");
        this.load.audio("swoosh", "Retro Swooosh 07.wav");
        this.load.audio("swoosh2", "Retro Swooosh 16.wav");

        console.log("looking good...");

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
        this.music = this.sound.add("main_music");
        this.music.setLoop(true);
        this.music.volume = .4;
        this.music.play();

        // start game
        this.scene.start("mainMenu");

    }

    // Never get here since a new scene is started in create()
    update() {
    }
}