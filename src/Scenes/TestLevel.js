class TestLevel extends Phaser.Scene {
    constructor() {
        super("testLevel");
    }

    init() {
        // variables and settings
        this.velocity = 100;
        this.DRAG = 1000;
    }

    create() {
        // Create a new tilemap game object which uses 18x18 pixel tiles, and is
        // 45 tiles wide and 25 tiles tall.
        this.map = this.add.tilemap("testlevel", 16, 16, 30, 180);

        // Add sounds
        this.collision_sound = this.sound.add("impact");
        this.bush_sound = this.sound.add("foliage");

        // Add a tileset to the map
        // First parameter: name we gave the tileset in Tiled
        // Second parameter: key for the tilesheet (from this.load.image in Load.js)
        this.tileset = this.map.addTilesetImage("gentle forest v01", "bright_tiles");

        // Create a layer
        this.groundLayer = this.map.createLayer("Ground", this.tileset, 0, 0);
        this.groundLayer.setScale(1.666);

        this.blockerLayer = this.map.createLayer("Blockers", this.tileset, 0, 0);
        this.blockerLayer.setScale(1.666);

        // Make it collidable
        this.blockerLayer.setCollisionByProperty({
            collides: true
        });

        // set up player avatar
        my.sprite.player = this.physics.add.sprite(game.config.width/2, this.map.heightInPixels + 950, "slug", "Slug_0.png").setScale(SCALE)

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
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels + 950);
        this.cameras.main.startFollow(my.sprite.player, true, 0.25, 0.25); // (target, [,roundPixels][,lerpX][,lerpY])
        this.cameras.main.setDeadzone(50, 0);
        this.cameras.main.setZoom(this.SCALE);
        this.cameras.main.followOffset.y = 275;

    }

    update() {
        
        if(cursors.left.isDown) {
            // TODO: have the player accelerate to the left
            my.sprite.player.body.setAccelerationX(-1000);
            my.sprite.player.body.setAccelerationY(-50)
            my.sprite.player.resetFlip();
            my.sprite.player.anims.play('walk', true);

        } else if(cursors.right.isDown) {
            // TODO: have the player accelerate to the right
            my.sprite.player.body.setAccelerationX(1000);
            my.sprite.player.body.setAccelerationY(-50)
            my.sprite.player.setFlip(true, false);
            my.sprite.player.anims.play('walk', true);

        } else {
            // TODO: set acceleration to 0 and have DRAG take over
            my.sprite.player.body.setAccelerationX(0);
            my.sprite.player.body.setDragX(this.DRAG);
        }

        // collision reset
        // note that we need body.blocked rather than body.touching b/c the former applies to tilemap tiles and the latter to the "ground"
        if(my.sprite.player.body.blocked.up) {
            my.sprite.player.x = game.config.width/2;
            my.sprite.player.y = this.map.heightInPixels + 950;
            my.sprite.player.body.setVelocityX(0);
        }
        //if(my.sprite.player.body.blocked.down && Phaser.Input.Keyboard.JustDown(cursors.up)) {
        //    // TODO: set a Y velocity to have the player "jump" upwards (negative Y direction)
        //    my.sprite.player.body.setVelocityY(this.JUMP_VELOCITY);
        //}
    }
}