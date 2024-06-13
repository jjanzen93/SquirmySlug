class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.setPath("./assets/");

        // Load slug spritesheet
        
        this.load.atlas("slug", "Slug.png", "Slug_atlas.json");
        this.load.audio("main_music", "SlugSong.mp3");
        this.load.audio("impact", "Retro Impact Punch 07.wav");
        this.load.audio("foliage", "Retro Impact Lofi 09.wav");
        console.log("looking good...");

        // Load tilemap information
        this.load.image("bright_tiles", "gentle forest v01.png");                         // Packed tilemap
        this.load.tilemapTiledJSON("testlevel", "testlevel.tmj");   // Tilemap in JSON
        this.load.tilemapTiledJSON("level2", "level2.tmj");
    }

    create() {
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

        // ...and pass to the next Scene
        console.log("anim generated...");
        this.music = this.sound.add("main_music");
        this.music.setLoop(true);
        this.music.volume = .4;
        this.music.play();

        this.scene.start("level2");

    }

    // Never get here since a new scene is started in create()
    update() {
    }
}