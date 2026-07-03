class Sprite {
    constructor() { }
    update() { }
    render(ctx) { }
}

class Game {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.arrayOfSprites = [];
        this.keys = {};
        this.mouse = {
            x: 0,
            y: 0,
            clicked: false
        }
        this.bindMouseEvents();
        this.bindKeyboardEvents();
    }

    update() {
        let updatedSprites = [];
        for (let i = 0; i < this.arrayOfSprites.length; i++) {
            let sprite = this.arrayOfSprites[i];
            let shouldRemove = sprite.update(this.arrayOfSprites, this.keys, this.mouse);

            if (!shouldRemove) {
                updatedSprites.push(sprite);
            }
        }
        this.arrayOfSprites = updatedSprites;
    }

    render() {
        this.ctx.clearRect(0, 0, 800, 600);
        for (let i = 0; i < this.arrayOfSprites.length; i++) {
            this.arrayOfSprites[i].render(this.ctx);
        }
    }

    addSprite(sprite) {
        this.arrayOfSprites.push(sprite);
    }

    loop() {
        this.update();
        this.render();
        requestAnimationFrame(() => this.loop());
    }

    bindKeyboardEvents() {
        window.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
        });
    }

    bindMouseEvents() {
        this.canvas.addEventListener('click', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
            this.mouse.clicked = true;
        });
    }
}