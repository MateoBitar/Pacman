class Cell extends Sprite {
    constructor(row, col, size, x, y, type) {
        super();
        this.row = row;
        this.col = col;
        this.size = size;
        this.x = x;
        this.y = y;
        this.type = type;
    }

    update(sprites, keys) {
        return false;
    }

    render(ctx) {
        if (this.type === '#') {
            ctx.fillStyle = 'blue';
            ctx.fillRect(this.x, this.y, this.size, this.size);
        } else {
            ctx.fillStyle = 'black';
            ctx.fillRect(this.x, this.y, this.size, this.size);
        }
    }
}

class CellGenerator extends Sprite {
    constructor(maze) {
        super();
        this.maze = maze;
    }

    makeCells() {
        let cells = [];

        for (let r = 0; r < this.maze.map.length; r++) {
            for (let c = 0; c < this.maze.map[r].length; c++) {
                let x = this.maze.offsetX + c * this.maze.cellSize;
                let y = this.maze.offsetY + r * this.maze.cellSize;

                cells.push(new Cell(r, c, this.maze.cellSize, x, y, this.maze.map[r][c]));
            }
        }

        return cells;
    }
}

class Pellet extends Sprite {
    constructor(row, col, size, x, y) {
        super();
        this.row = row;
        this.col = col;
        this.size = size;
        this.x = x;
        this.y = y;
        this.eaten = false;
    }

    update(sprites, keys) {
        return false;
    }

    render(ctx) {
        if (this.eaten) {
            return false;
        }

        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x + this.size / 2, this.y + this.size / 2, 4, 0, Math.PI * 2);
        ctx.fill();
    }
}

class Ghost extends Sprite {
    constructor(row, col, size, x, y) {
        super();
        this.row = row;
        this.col = col;
        this.size = size;
        this.x = x;
        this.y = y;
    }

    update() {
        return false;
    }

    render(ctx) {
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.x + this.size / 2, this.y + this.size / 2, this.size / 2 - 5, 0, Math.PI * 2);
        ctx.fill();
    }
}

class Player extends Sprite {
    constructor(row, col, size, x, y, maze) {
        super();

        this.startRow = row;
        this.startCol = col;

        this.row = row;
        this.col = col;

        this.size = size;
        this.x = x;
        this.y = y;

        this.maze = maze;

        this.dx = 0;
        this.dy = 0;

        this.direction = -1;
        this.nextDirection = -1;

        this.speed = 1;
    }

    reset() {
        this.row = this.startRow;
        this.col = this.startCol;
        this.x = this.maze.offsetX + this.col * this.size;
        this.y = this.maze.offsetY + this.row * this.size;
        this.dx = 0;
        this.dy = 0;
        this.direction = -1;
        this.nextDirection = -1;
    }

    update(sprites, keys) {
        if (keys['ArrowUp']) {
            this.nextDirection = 0;
        }
        if (keys['ArrowLeft']) {
            this.nextDirection = 1;
        }
        if (keys['ArrowDown']) {
            this.nextDirection = 2;
        }
        if (keys['ArrowRight']) {
            this.nextDirection = 3;
        }

        if ((this.x - this.maze.offsetX) % this.size === 0 &&
            (this.y - this.maze.offsetY) % this.size === 0) {

            this.row = (this.y - this.maze.offsetY) / this.size;
            this.col = (this.x - this.maze.offsetX) / this.size;

            let nextRow = this.row;
            let nextCol = this.col;

            switch (this.nextDirection) {
                case 0:
                    nextRow = this.row - 1;
                    break;
                case 1:
                    nextCol = this.col - 1;
                    break;
                case 2:
                    nextRow = this.row + 1;
                    break;
                case 3:
                    nextCol = this.col + 1;
                    break;
            }

            if (!this.maze.isWall(nextRow, nextCol)) {
                this.direction = this.nextDirection;
            }

            switch (this.direction) {
                case 0:
                    if (!this.maze.isWall(this.row - 1, this.col)) {
                        this.dx = 0;
                        this.dy = -this.speed;
                    } else {
                        this.dx = 0;
                        this.dy = 0;
                    }
                    break;

                case 1:
                    if (!this.maze.isWall(this.row, this.col - 1)) {
                        this.dx = -this.speed;
                        this.dy = 0;
                    } else {
                        this.dx = 0;
                        this.dy = 0;
                    }
                    break;

                case 2:
                    if (!this.maze.isWall(this.row + 1, this.col)) {
                        this.dx = 0;
                        this.dy = this.speed;
                    } else {
                        this.dx = 0;
                        this.dy = 0;
                    }
                    break;

                case 3:
                    if (!this.maze.isWall(this.row, this.col + 1)) {
                        this.dx = this.speed;
                        this.dy = 0;
                    } else {
                        this.dx = 0;
                        this.dy = 0;
                    }
                    break;
            }
        }

        this.x += this.dx;
        this.y += this.dy;

        return false;
    }

    render(ctx) {
        ctx.fillStyle = 'yellow';
        ctx.beginPath();
        ctx.arc(this.x + this.size / 2, this.y + this.size / 2, this.size / 2 - 5, 0, Math.PI * 2);
        ctx.fill();
    }
}

class Maze extends Sprite {
    constructor() {
        super();

        this.cellSize = 40;
        this.offsetX = 100;
        this.offsetY = 60;

        this.score = 0;
        this.lives = 3;
        this.gameOver = false;
        this.win = false;

        this.audioUnlocked = false;
        this.winPlayed = false;
        this.gameOverPlayed = false;

        this.eatSound = new Audio('assets/sounds/eat.mp3');
        this.hitSound = new Audio('assets/sounds/hit.mp3');
        this.winSound = new Audio('assets/sounds/win.mp3');
        this.gameOverSound = new Audio('assets/sounds/lose.mp3');

        this.bgMusic = new Audio('assets/sounds/background.mp3');
        this.bgMusic.loop = true;
        this.bgMusic.volume = 0.4;
        this.bgMusicStarted = false;

        this.map = [
            '###############',
            '#P....#...G...#',
            '#.###.#.#####.#',
            '#.....#...#...#',
            '#.###.###.#.###',
            '#...#.....#...#',
            '###.#.###.#.###',
            '#.G.#.#G#.#...#',
            '#.###.#.#.###.#',
            '#.....#.#.....#',
            '#.#####.#####.#',
            '#.............#',
            '###############'
        ];

        this.cells = [];
        this.pellets = [];
        this.ghosts = [];
        this.player = null;

        this.rows = this.map.length;
        this.cols = this.map[0].length;

        let generator = new CellGenerator(this);
        this.cells = generator.makeCells();

        this.makeObjects();
    }

    makeObjects() {
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                let x = this.offsetX + c * this.cellSize;
                let y = this.offsetY + r * this.cellSize;

                switch (this.map[r][c]) {
                    case '.':
                        this.pellets.push(new Pellet(r, c, this.cellSize, x, y));
                        break;

                    case 'G':
                        this.ghosts.push(new Ghost(r, c, this.cellSize, x, y));
                        break;

                    case 'P':
                        this.player = new Player(r, c, this.cellSize, x, y, this);
                        break;
                }
            }
        }
    }

    isWall(row, col) {
        if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) {
            return true;
        }

        if (this.map[row][col] === '#') {
            return true;
        }

        return false;
    }

    update(sprites, keys) {
        if (!this.audioUnlocked &&
            (keys['ArrowUp'] || keys['ArrowDown'] || keys['ArrowLeft'] || keys['ArrowRight'])) {
            this.eatSound.play().catch(() => { });
            this.eatSound.pause();
            this.eatSound.currentTime = 0;
            this.audioUnlocked = true;

            if (!this.bgMusicStarted) {
                this.bgMusic.play().catch(() => { });
                this.bgMusicStarted = true;
            }
        }

        if (this.gameOver || this.win) {
            return false;
        }

        this.player.update(sprites, keys);

        let playerRow = Math.round((this.player.y - this.offsetY) / this.cellSize);
        let playerCol = Math.round((this.player.x - this.offsetX) / this.cellSize);

        for (let i = 0; i < this.pellets.length; i++) {
            if (this.pellets[i].eaten === false &&
                this.pellets[i].row === playerRow &&
                this.pellets[i].col === playerCol) {

                this.pellets[i].eaten = true;
                this.score += 10;

                clearTimeout(this.eatTimeout);

                this.eatSound.pause();
                this.eatSound.currentTime = 0;
                this.eatSound.play();

                this.eatTimeout = setTimeout(() => {
                    this.eatSound.pause();
                    this.eatSound.currentTime = 0;
                }, 1200);
            }
        }
        for (let i = 0; i < this.ghosts.length; i++) {
            if (this.ghosts[i].row === playerRow &&
                this.ghosts[i].col === playerCol) {

                this.lives--;

                this.hitSound.currentTime = 0;
                this.hitSound.play();

                if (this.lives <= 0) {
                    this.gameOver = true;
                    this.bgMusic.pause();

                    if (!this.gameOverPlayed) {
                        this.gameOverSound.currentTime = 0;
                        this.gameOverSound.play();
                        this.gameOverPlayed = true;
                    }
                } else {
                    this.player.reset();
                }

                break;
            }
        }

        this.win = true;

        for (let i = 0; i < this.pellets.length; i++) {
            if (this.pellets[i].eaten === false) {
                this.win = false;
                break;
            }
        }

        if (this.win && !this.winPlayed) {
            this.bgMusic.pause();
            this.winSound.currentTime = 0;
            this.winSound.play();
            this.winPlayed = true;
        }

        return false;
    }

    render(ctx) {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, 800, 600);

        for (let i = 0; i < this.cells.length; i++) {
            this.cells[i].render(ctx);
        }

        for (let i = 0; i < this.pellets.length; i++) {
            this.pellets[i].render(ctx);
        }

        for (let i = 0; i < this.ghosts.length; i++) {
            this.ghosts[i].render(ctx);
        }

        this.player.render(ctx);

        ctx.fillStyle = 'white';
        ctx.font = '24px Arial';
        ctx.fillText('Score: ' + this.score, 100, 35);
        ctx.fillText('Lives: ' + this.lives, 620, 35);

        if (this.gameOver) {
            ctx.fillStyle = 'red';
            ctx.font = '40px Arial';
            ctx.fillText('GAME OVER', 280, 300);
        }

        if (this.win) {
            ctx.fillStyle = 'green';
            ctx.font = '40px Arial';
            ctx.fillText('YOU WIN', 300, 300);
        }
    }
}

let game = new Game();
let maze = new Maze();
game.addSprite(maze);
game.loop();