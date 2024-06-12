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
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    width: 800,
    height: 600,
    scene: [Load, TestLevel]
}

var cursors;
const SCALE = 2.0;
var my = {sprite: {}, text: {}};

const game = new Phaser.Game(config);