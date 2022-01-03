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




http://public.beuth-hochschule.de/dianaschilling/rma/WitchQuest/

WitchQuest

Ein einfaches Single Player Game für den Desktop, basierend auf Phaser 3.

Das Repository zum Spiel ist auf GitHub als privates Repository verfügbar. Gern kann ich Sie zu dem Projekt einladen, falls gewünscht.
Architektur und Ressourcen

Das Spiel nutzt die Matter.js Physics Engine zusammen mit dem Phaser Matter Collision Plugin (https://github.com/mikewesthad/phaser-matter-collision-plugin), um ein realistischeres Verhalten der Spielelemente zu simulieren.

Alle Level Scenes basieren auf Tilemaps, die ich mir dem Editor Tiled (https://www.mapeditor.org/) erstellt habe. Für die grafischen Assets habe ich das Doodle Rogue Tileset des The Punk Collective (https://chr15m.itch.io/doodle-rogue-tileset) genutzt.

PC und NPCs werden durch Sprite-Atlanten gerendert und durch entsprechende Animations-JSONs animiert.
Gameplay

Ziel des Spiel ist es, alle Feinde eines Levels zu besiegen. Jeder Feind hat eine unterschiedliche Anzahl an Leben und verliert Münzen, sobald diese aufgebraucht sind. Diese können eingesammelt werden und tragen zum Score des Players bei.

Sobald alle Feinde eines Levels besiegt sind, beginnt automatisch das nächste Level. Aktuell hat das Spiel 3 Level. Werden diese erfolgreich durchgespielt, kann das Spiel von vorn begonnen werden.

Control Keys:

    ARROW KEYS: PC bewegen
    SPACE: Feinde angreifen




