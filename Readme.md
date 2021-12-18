# WitchQuest

A simple single player game for desktop based on Phaser 3.

## Setup

Clone or download the repository. A local web server is required in order to run the game (https://phaser.io/tutorials/getting-started-phaser3/index). It is also possible to start the application directly from an IDE with a built-in web server (e.g. WebStorm). 

## Architecture and Resources

This game uses the Matter.js Physics engine with the Phaser Matter Collision Plugin (https://github.com/mikewesthad/phaser-matter-collision-plugin) for a more realistic collision behavior.

All level scenes are based on tilemaps, created with the Tiled editor(https://www.mapeditor.org/). As for the graphics, I used the awesome Doodle Rogue Tileset by The Punk Collective (https://chr15m.itch.io/doodle-rogue-tileset).

PC and NPCs are rendered through sprite atlases and animated using corresponding animation notations.

## Gameplay

The objective of the game is to kill all enemies. Each enemy comes with a different health score and drops items which can later be collected by the player and add to the player's score. 

After destroying all enemies on one level, the player is immediately transported to the next one. The game currently has 3 levels. After completing all of them, the game can be restarted.

*Control Keys:*

* ARROW KEYS: Move PC around
* SPACE: Hit enemies 

