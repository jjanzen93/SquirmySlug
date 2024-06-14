class Level1 extends Phaser.Scene {
    constructor() {
        super("level1");
    }

    init() {
        // values
        this.velocity = 100;
        this.max_velocity = 300;
        //this.DRAG = 1000;

        // conditions
        this.inBush = false;
        this.inPuddle = false;
        this.dashed = false;
        this.right = false;
        this.left = false;

        // counters
        this.counter = 0;
        this.display_counter = 0;

        // score prep
        level_score = 5000;
        
    }

    create() {

        // creating new map with ground layer
        this.map = this.add.tilemap("level1", 32, 32, 30, 250);

        this.tileset = this.map.addTilesetImage("gentle forest v01", "bright_tiles");

        this.groundLayer = this.map.createLayer("Ground", this.tileset, 0, 0);

        // make bush objects for sound and slow down
        this.bushes = this.map.createFromObjects("Bushes", {
            name: "bush",
            frame: 0,
            visible: false
        })

        this.physics.world.enable(this.bushes, Phaser.Physics.Arcade.STATIC_BODY);
        this.bushGroup = this.add.group(this.bushes);

        // make puddle objects for sound and speed-up
        this.puddles = this.map.createFromObjects("Puddles", {
            name: "puddle",
            frame: 0,
            visible: false
        })

        this.physics.world.enable(this.puddles, Phaser.Physics.Arcade.STATIC_BODY);
        this.puddleGroup = this.add.group(this.puddles);

        // draw tree layer so that puddle objects are hidden and player doesn't go underground when in puddles
        this.treeLayer = this.map.createLayer("Trees", this.tileset, 0, 0);

        // set up player avatar
        my.sprite.player = this.physics.add.sprite(game.config.width/2, this.map.heightInPixels*1, "slug", "Slug_0.png").setScale(1)

        // draw blocker layer
        this.blockerLayer = this.map.createLayer("Blockers", this.tileset, 0, 0);

        // add blocker collision
        this.blockerLayer.setCollisionByProperty({
            collides: true
        });

        // Enable collision handling
        this.physics.add.collider(my.sprite.player, this.blockerLayer);

        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        // FOR DEBUGGING ONLY. SET DEBUG TO TRUE IN GAME CONFIG IN MAIN.JS TO USE
        // debug key listener (assigned to D key)
        //this.input.keyboard.on('keydown-D', () => {
        //    this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
        //    this.physics.world.debugGraphic.clear()
        //}, this);

        // camera
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels*1);
        this.cameras.main.startFollow(my.sprite.player, true, 0.25, 0.25);
        this.cameras.main.setDeadzone(50, 0);
        this.cameras.main.setZoom(this.SCALE);
        this.cameras.main.followOffset.y = 200;

        // create sfx
        this.collision_sound = this.sound.add("impact");
        this.collision_sound.setVolume(.2);
        this.bush_sound = this.sound.add("foliage");
        this.bush_sound.setVolume(.2);
        this.dash_sound = this.sound.add("swoosh");
        this.dash_sound.setVolume(.2);
        this.water_sound = this.sound.add("swoosh2");
        this.water_sound.setVolume(.6);

        // snail trail
        my.vfx.walking = this.add.particles(0, 0, "kenny-particles", {
            frame: "trace_04.png",
            random: true,
            scale: {start: 0.03, end: 0.03},
            lifespan: 75000,
            alpha: {start: 1, end: 0.3}
        });

        my.vfx.walking.stop();

        // dash smoke
        my.vfx.dash = this.add.particles(0, 0, "kenny-particles", {
            frame: ['smoke_09.png'],
            random: true,
            scale: {start: 0.1, end: 0.2},
            lifespan: 350,
            gravityY: -100,
            alpha: {start: 1, end: 0.1}, 
        })
        
        my.vfx.dash.stop();

        this.input.keyboard.on('keydown-SPACE', () => {
            my.vfx.dash.emitParticle();
            this.dash_sound.play();
            this.dashed = true;
        })

        // enable collision with game walls
        my.sprite.player.setCollideWorldBounds(true);
        this.physics.world.setBounds(0, 0, game.config.width, this.map.heightInPixels, true, true, false, true);

        // instruction pop-up
        this.bush_directions_1 = this.add.image(game.config.width*(1/2), this.cameras.main.worldView.y + 100, "bush_directions_1");
        this.bush_directions_1.setScale(.7);
    }

    update() {
        // update instruction location, delete after a certain amount of time
        if (this.display_counter <= 300) {
            this.display_counter++;
            this.bush_directions_1.y = this.cameras.main.worldView.y + 100;
        } else {
            this.bush_directions_1.visible = false;
        }

        // update score
        level_score--;

        // ensure snail trail continuing
        my.vfx.walking.startFollow(my.sprite.player, my.sprite.player.displayWidth-15.5  , my.sprite.player.displayHeight-17, false);
        my.vfx.walking.start();

        // ensure dash is following for when dash is activated
        my.vfx.dash.startFollow(my.sprite.player, my.sprite.player.displayWidth-12, my.sprite.player.displayHeight-10, false);

        // handle dashing, move extra fast for 10 ticks if currently dashing
        if (this.dashed) {
            this.counter += 1;
            if (this.counter >= 10) {
                console.log("reset");
                this.counter = 0;
                this.dashed = false;
                my.sprite.player.body.setVelocityX(0);
                my.sprite.player.body.setMaxVelocity(this.max_velocity);
            }
            else if (my.sprite.player.body.velocity.x < 0) {
                my.sprite.player.body.setVelocityX(-500);
                my.sprite.player.body.setMaxVelocity(10000);

            } else if (my.sprite.player.body.velocity.x > 0) {
                my.sprite.player.body.setVelocityX(500);
                my.sprite.player.body.setMaxVelocity(10000);
            }
            
        }

        // handle moving left
        else if(cursors.left.isDown && this.dashed == false) {
            my.sprite.player.body.setVelocityX(-200);
            my.sprite.player.body.setAccelerationY(-50);
            my.sprite.player.resetFlip();
            my.sprite.player.anims.play('walk', true);
            this.left = true;
            this.right = false;
            my.sprite.player.body.setMaxVelocity(this.max_velocity);

        // handle moving right
        } else if(cursors.right.isDown && this.dashed == false) {
            my.sprite.player.body.setVelocityX(200);
            my.sprite.player.body.setAccelerationY(-50);
            my.sprite.player.setFlip(true, false);
            my.sprite.player.anims.play('walk', true);
            this.right = true;
            this.left = false;
            my.sprite.player.body.setMaxVelocity(this.max_velocity);

        // handle no input
        } else if (this.dashed == false) {
            my.sprite.player.body.setAccelerationX(0);
            my.sprite.player.body.setVelocityX(0);
            this.right = false;
            this.left = false;
            //my.sprite.player.body.setDragX(this.DRAG);
            my.sprite.player.body.setMaxVelocity(this.max_velocity);
        }

        // collision reset
        if(my.sprite.player.body.blocked.up) {
            my.sprite.player.x = game.config.width/2;
            my.sprite.player.y = this.map.heightInPixels;
            my.sprite.player.body.setVelocityX(0);
            this.collision_sound.play();
        }

        // bush slowdown
        if (this.physics.overlap(my.sprite.player, this.bushGroup)) {
            if (!this.inBush) {
                this.bush_sound.play();
                this.inBush = true;
                my.sprite.player.body.setVelocityY(my.sprite.player.body.velocity.y* 3/4);
                this.max_velocity = 300;
            }
        } else {
            this.inBush = false;
        }

        // puddle speedup
        if (this.physics.overlap(my.sprite.player, this.puddleGroup)) {
            if (!this.inPuddle) {
                this.water_sound.play();
                this.inPuddle = true;
                my.sprite.player.body.setVelocityY(my.sprite.player.body.velocity.y* 4.5/4)
                this.max_velocity = 450;
            }
        } else {
            this.inPuddle = false;
        }

        // win condition
        if (my.sprite.player.y < 0) {
            console.log(level_score.toString());
            total_score += level_score;
            this.scene.start("level2");
        }
        
    }
}