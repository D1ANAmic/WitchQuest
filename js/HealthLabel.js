const formatHealth = (health) => `Health: ${health}/10`

export default class HealthLabel extends Phaser.GameObjects.Text {

    constructor(scene, x, y, health, style) {
        super(scene, x, y, formatHealth(health), style)

        this.health = health
    }

    setHealth(health) {
        this.health = health
        this.updateHealthText()
    }

    updateHealthText() {
        this.setText(formatHealth(this.health))
    }
}

