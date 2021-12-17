export default class Button {

    constructor(x, y, label, scene, callback) {
        const button = scene.add.text(x, y, label)
            .setOrigin(0.5)
            .setPadding(20)
            .setStyle({ fontSize: 50 , backgroundColor: '#434252ff' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => callback())
            .on('pointerover', () => button.setStyle({ fill: '#923f28ff' }))
            .on('pointerout', () => button.setStyle({ fill: '#fff' }));
    }
}

