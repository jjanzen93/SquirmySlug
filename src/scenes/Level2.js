class Level2 extends Phaser.Scene {
    constructor() {
        super("level2");
    }

    init() {
        // variables and settings
        this.velocity = 100;
        this.inBush = false;
        //this.DRAG = 1000;
    }

    create() {
        // Create a new tilemap game object which uses 18x18 pixel tiles, and is
        // 45 tiles wide and 25 tiles tall.
        this.map = this.add.tilemap("level2", 32, 32, 30, 250);

        // Add a tileset to the map
        // First parameter: name we gave the tileset in Tiled
        // Second parameter: key for the tilesheet (from this.load.image in Load.js)
        this.tileset = this.map.addTilesetImage("gentle forest v01", "bright_tiles");

        this.groundLayer = this.map.createLayer("Ground", this.tileset, 0, 0);

        // set up player avatar
        my.sprite.player = this.physics.add.sprite(game.config.width/2, this.map.heightInPixels*1, "slug", "Slug_0.png").setScale(1)
        my.sprite.player.body.setMaxVelocity(300);

        // make bush objects for sound and particle emission
        this.bushes = this.map.createFromObjects("Bushes", {
            name: "bush",
            frame: 0,
            visible: false
        })

        this.physics.world.enable(this.bushes, Phaser.Physics.Arcade.STATIC_BODY);

        this.bushGroup = this.add.group(this.bushes);

        this.blockerLayer = this.map.createLayer("Blockers", this.tileset, 0, 0);


        // Make it collidable
        this.blockerLayer.setCollisionByProperty({
            collides: true
        });

        
        this.treeLayer = this.map.createLayer("Trees", this.tileset, 0, 0);


        // Enable collision handling
        this.physics.add.collider(my.sprite.player, this.blockerLayer);

        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        // debug key listener (assigned to D key)
        this.input.keyboard.on('keydown-D', () => {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this);

        // camera
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels*1);
        this.cameras.main.startFollow(my.sprite.player, true, 0.25, 0.25); // (target, [,roundPixels][,lerpX][,lerpY])
        this.cameras.main.setDeadzone(50, 0);
        this.cameras.main.setZoom(this.SCALE);
        this.cameras.main.followOffset.y = 275;

        // audio
        this.collision_sound = this.sound.add("impact");
        this.collision_sound.setVolume(.4);
        this.bush_sound = this.sound.add("foliage");
        this.bush_sound.setVolume(.4);


        

    }

    update() {
        
        if(cursors.left.isDown) {
            my.sprite.player.body.setVelocityX(-200);
            my.sprite.player.body.setAccelerationY(-50);
            my.sprite.player.resetFlip();
            my.sprite.player.anims.play('walk', true);

        } else if(cursors.right.isDown) {
            my.sprite.player.body.setVelocityX(200);
            my.sprite.player.body.setAccelerationY(-50);
            my.sprite.player.setFlip(true, false);
            my.sprite.player.anims.play('walk', true);

        } else {
            my.sprite.player.body.setAccelerationX(0);
            my.sprite.player.body.setVelocityX(0);
            //my.sprite.player.body.setDragX(this.DRAG);
        }

        // collision reset
        if(my.sprite.player.body.blocked.up) {
            my.sprite.player.x = game.config.width/2;
            my.sprite.player.y = this.map.heightInPixels;
            my.sprite.player.body.setVelocityX(0);
            this.collision_sound.play();
        }

        if (this.physics.overlap(my.sprite.player, this.bushGroup)) {
            if (!this.inBush) {
                this.bush_sound.play();
                this.inBush = true;
                my.sprite.player.body.setVelocityY(my.sprite.player.body.velocity.y* 3/4);
            }
        } else {
            this.inBush = false;
        }
    }
}