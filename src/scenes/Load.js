class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.setPath("./assets/");

        // Load slug spritesheet
        
        this.load.atlas("slug", "Slug.png", "Slug_atlas.json");
        this.load.audio("main_music", "SlugSong.mp3");
        console.log("looking good...");

        // Load tilemap information
        //this.load.image("tilemap_tiles", "tilemap_packed.png");                         // Packed tilemap
        //this.load.tilemapTiledJSON("platformer-level-1", "platformer-level-1.tmj");   // Tilemap in JSON
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
         console.log("anim generated...")
         this.scene.start("testLevel");
    }

    // Never get here since a new scene is started in create()
    update() {
    }
}