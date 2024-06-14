// Jack Janzen
// Created: 6/9/2024
// Phaser: 3.70.0
//
// Squirmy Slug
//
// A game about a slug navigating the forest floor

"use strict"

// game config
let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: {
        pixelArt: true  // prevent pixel art from getting blurred when scaled
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    width: 480,
    height: 600,
    scene: [Load, MainMenu, TestLevel, Level1, Level3, Level2, LevelEnd, Credits, GameEnd]
}

var cursors;
const SCALE = 2.0;
var my = {sprite: {}, text: {}, vfx: {}};
var total_score = 0;
var level_score = 0;
var next_level = "level1";
var music;

const game = new Phaser.Game(config);