'use strict';
console.log('script.js loaded');

// set game object
const game = {
  title: 'Game',
  players: [],
  activePlayer: 0,
  isRunning: false,

  // function to add a player
  addPlayer(playerName) {
    const player = {
      name: playerName,
      score: 0,
    };
    this.players.push(player);
    this.displayPlayer();
  },
  //fuction to display players
  displayPlayer() {
    const playerList = document.getElementById('player_list');
    playerList.innerHTML = '';

    this.players.forEach((player, index) => {
      const playerDiv = document.createElement('div');
      playerDiv.textContent = `${player.name} -  ${player.score}`;

      if (this.isRunning && index === this.activePlayer) {
        playerDiv.style.color = 'red';
      } else {
        playerDiv.style.color = '';
      }
      playerList.appendChild(playerDiv);
    });
  },

  //start and pause the game
  runGame() {
    this.isRunning = !this.isRunning;
    const gameTitle = document.getElementById('game_title');
    const joinButton = document.getElementById('join_button');
    const startButton = document.getElementById('start_button');
    const switchButton = document.getElementById('switch_button');
    const pointButton = document.getElementById('point_button');

    if (this.isRunning) {
      gameTitle.textContent = 'Game Running';
      startButton.textContent = 'Pause Game';

      joinButton.style.backgroundColor = 'lightgrey'; // Change join button color
      joinButton.disabled = true;

      // Change game buttons to blanchedalmond
      startButton.style.backgroundColor = 'blanchedalmond';
      switchButton.style.backgroundColor = 'blanchedalmond';
      pointButton.style.backgroundColor = 'blanchedalmond';

      if (this.players.length > 0) {
        this.displayPlayer();
      }
    } else {
      gameTitle.textContent = 'Game Paused';
      startButton.textContent = 'Resume';

      joinButton.style.backgroundColor = ''; // Reset join button color
      joinButton.disabled = false;

      // Reset game buttons color
      switchButton.style.backgroundColor = 'lightgrey';
      pointButton.style.backgroundColor = 'lightgrey';
      this.displayPlayer();
    }
  },

  //add a point to active player
  addPoint() {
    if (this.isRunning && this.players.length > 0) {
      this.players[this.activePlayer].score++; // Increment the score of the active player
      this.displayPlayer(); // Update the display
    }
  },

  //switch player
  switchPlayer() {
    if (this.isRunning && this.players.length > 0) {
      this.activePlayer = (this.activePlayer + 1) % this.players.length; // Switch to the next player
      this.displayPlayer();
    }
  },
};

//event
const joinButton = document.getElementById('join_button');
const startButton = document.getElementById('start_button');
const switchButton = document.getElementById('switch_button');
const pointButton = document.getElementById('point_button');
const playerNameInput = document.getElementById('player_name');

joinButton.addEventListener('click', function () {
  const playerName = playerNameInput.value;
  if (playerName) {
    game.addPlayer(playerName);
    startButton.style.backgroundColor = 'blanchedalmond';

    playerNameInput.value = '';
  }
});

startButton.addEventListener('click', function () {
  game.runGame();
});

pointButton.addEventListener('click', function () {
  game.addPoint();
});

switchButton.addEventListener('click', function () {
  game.switchPlayer();
});
