# Pacman Game

**Pacman Game** is a browser-based 2D arcade game inspired by the classic **Pac-Man** experience, built using **JavaScript** and **HTML5 Canvas**.

The game features a maze-based environment where the player controls Pac-Man, collects pellets, avoids ghosts, tracks score and lives, and wins by clearing the maze. It also includes sound effects and background music to create a more engaging arcade-style gameplay experience.

This project was developed as a game programming / JavaScript project and demonstrates core concepts of **object-oriented game design**, **sprite-based rendering**, **collision handling**, **keyboard input management**, and **real-time game loops**.

---

## 🧠 About the Project

Pacman Game recreates the core mechanics of the classic Pac-Man formula in a custom browser-based implementation.

The player navigates through a maze, collects pellets to increase score, and must avoid collisions with ghosts. The game tracks the player’s remaining lives and ends either when all pellets are collected or when the player loses all lives.

The project was designed to practice and demonstrate game development fundamentals such as:

* **grid-based movement**
* **collision detection**
* **real-time rendering using HTML5 Canvas**
* **game state management**
* **object-oriented JavaScript design**
* **audio integration for game feedback**

The result is a lightweight but complete arcade game experience implemented entirely with front-end web technologies.

---

## 🧱 Project Structure

```bash id="quq7u1"
Pacman-Game/
├── index.html               # Main game page
├── game.js                  # Core game engine and rendering loop
├── myCode.js                # Pac-Man gameplay logic, maze, player, pellets, and ghosts
├── assets/
│   └── sounds/
│       ├── eat.mp3
│       ├── hit.mp3
│       ├── win.mp3
│       ├── gameover.mp3
│       └── bg-music.mp3
├── README.md
└── .gitignore
```
---

## 🎮 Gameplay Overview

The game takes place inside a maze made of walls and open paths.

### The player can:

* move Pac-Man using the **arrow keys**
* collect pellets scattered around the maze
* earn points for each pellet collected
* avoid ghosts to preserve lives
* win by collecting all pellets in the maze

### The game ends when:

* **all pellets are collected** → **You Win**
* **all lives are lost** after ghost collisions → **Game Over**

---

## 🚀 Features

* 🟡 **Pac-Man Player Movement** – smooth keyboard-controlled movement using arrow keys
* 🧱 **Maze System** – grid-based map with walls and navigable paths
* ⚪ **Pellet Collection** – pellets disappear when collected and increase the score
* 👻 **Ghost Enemies** – ghosts act as obstacles that reduce player lives on collision
* ❤️ **Lives System** – player has limited lives before game over
* 📊 **Score Tracking** – score increases as pellets are collected
* 🔊 **Sound Effects** – pellet, hit, win, and game-over audio feedback
* 🎵 **Background Music** – looping background soundtrack during gameplay
* 🏁 **Win / Lose States** – clear end-game messages for victory and defeat
* 🎨 **Canvas Rendering** – all visuals are drawn using HTML5 Canvas

---

## 🧩 Core Components

The project is built around several game classes:

### **Game**

Handles:

* the main canvas
* the game loop
* keyboard input
* sprite updates and rendering

### **Maze**

Responsible for:

* storing the map layout
* creating the maze cells
* generating pellets, ghosts, and the player
* tracking score, lives, win state, and game over state

### **Player**

Handles:

* Pac-Man movement
* direction changes
* collision with walls
* resetting position after losing a life

### **Ghost**

Represents enemy obstacles placed in the maze.

### **Pellet**

Represents collectible points that disappear once eaten by the player.

### **Cell / CellGenerator**

Used to generate and render the maze grid structure.

---

## 🗺️ Game Mechanics

### Movement

The player moves using the **Arrow Keys**:

* **Arrow Up**
* **Arrow Down**
* **Arrow Left**
* **Arrow Right**

Movement is grid-aware, meaning Pac-Man can only move into valid maze cells and cannot pass through walls.

### Pellet Collection

When Pac-Man moves onto a pellet tile:

* the pellet is marked as eaten
* the score increases
* the eat sound effect is played

### Ghost Collision

If Pac-Man collides with a ghost:

* one life is lost
* a hit sound plays
* Pac-Man resets to the starting position if lives remain
* if no lives remain, the game enters the **Game Over** state

### Winning

If all pellets are collected:

* the game is marked as won
* background music stops
* the win sound is played
* a **YOU WIN** message appears on screen

---

## 🧰 Tech Stack

| Category      | Technology                 |
| ------------- | -------------------------- |
| **Language**  | JavaScript                 |
| **Rendering** | HTML5 Canvas               |
| **Structure** | Object-Oriented JavaScript |
| **Audio**     | HTML5 Audio                |
| **Frontend**  | HTML, CSS, JavaScript      |

---

## ⚙️ Installation

### 1️⃣ Clone the repository

```bash id="0f6e4g"
git clone https://github.com/MarcoBitar/Pacman-Game.git
cd Pacman-Game
```

### 2️⃣ Make sure the project contains:

* `index.html`
* `game.js`
* `myCode.js`
* the `assets/sounds/` folder with all required sound files

---

## ▶️ Running the Game

Since this is a browser-based JavaScript game, you can run it by simply opening the main HTML file in your browser.

### Option 1: Open directly

Open:

```bash id="u1vqqe"
index.html
```

in your browser.

### Option 2: Run with VS Code Live Server

If you use **VS Code**, you can run the project with the **Live Server** extension for a smoother development experience.

---

## 🎮 Controls

| Key   | Action     |
| ----- | ---------- |
| **↑** | Move Up    |
| **↓** | Move Down  |
| **←** | Move Left  |
| **→** | Move Right |

---

## 📌 Current Game Logic Summary

The current implementation includes:

* a **custom maze map**
* a **player spawn point**
* **multiple ghosts**
* **pellet placement throughout the maze**
* **score counting**
* **3-life system**
* **win and game-over states**
* **sound effects and looping background music**
* **collision-based interaction with pellets and ghosts**

---

## 🌟 Possible Future Enhancements

The project can be expanded with more advanced Pac-Man mechanics, such as:

* 👻 **Moving Ghost AI** with pathfinding or random movement
* 💊 **Power Pellets** that let Pac-Man eat ghosts temporarily
* ⏸️ **Pause / Restart functionality**
* 🧭 **Multiple Levels** with increasing difficulty
* 🏆 **High Score system**
* 🎨 **Improved sprites and animations**
* 🌀 **Portal / tunnel mechanics**
* 📱 **Responsive layout for different screen sizes**
* 🎮 **Start screen / level selection menu**

---

## 🤝 Contributing

Contributions are welcome.

To contribute:

1. Fork the repository
2. Create a new branch (`feature/your-feature`)
3. Commit your changes
4. Push to your fork
5. Open a pull request

---

## 👨‍💻 Author

**Marco Bitar**
🎓 Computer Science Student
📧 [bitar.marco21@gmail.com](mailto:bitar.marco21@gmail.com)
🌐 [GitHub](https://github.com/MarcoBitar) | [LinkedIn](https://www.linkedin.com/in/marco-bitar-545046285)
