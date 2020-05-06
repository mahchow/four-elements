// Things to add
// Console Log Output clean up

// If Replay = False & Display Scoreboard = True or False, end game
//                                           (endscreen 1: scoreboard, endscreen 2: none)
// Make second player not NPC
//
// Add player 3rd+ - Bonus: Be able to add as many players
// Introduce 4th+ elements - Bonus: Be able to add as many elements
// Change winner value logic system to allow more elements

// Gameplay
// Game Start -> Players Pick -> Display Wins? -> Continue -> Replay if yes, Display if no

var inquirer = require("inquirer");

const setupFourElements = async () => {
  try {
    const answer = await inquirer.prompt([
      {
        type: "list",
        name: "Multiplayer",
        message: "How many are playing?",
        choices: ["1", "2"],
      },
    ]);
    if (answer.Multiplayer === "2") {
      versus = true;
    }
    return versus;
  } catch (error) {
    console.error(error);
  }
};

const getUserChoice = async () => {
  try {
    const answer = await inquirer.prompt([
      {
        type: "list",
        name: "Player1",
        message: "Choose fire, earth, wind, or water",
        choices: ["fire", "earth", "wind", "water"],
      },
    ]);
    return answer.Player1;
  } catch (error) {
    console.error(error);
  }
};

const playAgain = async () => {
  try {
    const answer = await inquirer.prompt([
      {
        type: "list",
        name: "Replay",
        message: "Play Again?",
        choices: ["Yes", "No"],
      },
    ]);
    return answer.Replay === "Yes" ? true : false;
  } catch (error) {
    console.error(error);
  }
};

const displayScores = async () => {
  try {
    const answer = await inquirer.prompt([
      {
        type: "list",
        name: "Scores",
        message: "Show Scoreboard?",
        choices: ["Yes", "No"],
      },
    ]);
    return answer.Scores === "Yes" ? true : false;
  } catch (error) {
    console.error(error);
  }
};

const showScoreboard = ({ p1wins, p2wins }) => {
  console.log(
    "Scoreboard " +
      "\n" +
      "Player 1 Wins: " +
      p1wins +
      "\n" +
      "Player 2 Wins: " +
      p2wins +
      "\n"
  );
  if (p1wins > p2wins) {
    console.log("Current Leader: Player 1");
  } else if (p1wins < p2wins) {
    console.log("Current Leader: Player 2");
  } else if (p1wins === p2wins) {
    console.log("Currently A Draw!");
  }
  return { p1wins, p2wins };
};

const finalScores = ({ p1wins, p2wins }) => {
  if (p1wins > p2wins) {
    console.log("Champion: Player 1");
  } else if (p1wins < p2wins) {
    console.log("Champion: Player 2");
  } else if (p1wins === p2wins) {
    console.log("Ends As A Draw!");
  }
};

// Win Count (versus, aiChoice)
const getPlayer2pick = (versus) => {
  let randomNumber = Math.floor(Math.random() * 40);
  while (versus != true) {
    if (randomNumber < 10) {
      player2 = "fire";
    } else if (randomNumber >= 10 && randomNumber < 20) {
      player2 = "wind";
    } else if (randomNumber >= 20) {
      player2 = "earth";
    } else if (randomNumber >= 30) {
      player2 = "water";
    }
  }
  return player2;
};

const calculateWinner = (player1, player2) => {
  let winner;
  let A = "fire";
  let B = "wind";
  let C = "earth";
  let D = "water";
  if (player1 === player2) {
    winner = 0;
  } else if (player1 === A && player2 === B) {
    winner = 1;
  } else if (player1 === B && player2 === C) {
    winner = 1;
  } else if (player1 === C && player2 === D) {
    winner = 1;
  } else if (player1 === D && player2 === A) {
    winner = 1;
  } else {
    winner = 2;
  }
  return winner;
};

const addToWinCount = ({ p1wins, p2wins }, winner) => {
  if (winner === 1) {
    p1wins = p1wins + 1;
  } else if (winner === 2) {
    p2wins = p2wins + 1;
  } else if (winner === 0) {
    p1wins;
    p2wins;
  }
  return { p1wins, p2wins };
};

const showResults = (player1, player2, winner) => {
  let winnername = "";
  if (winner === 0) {
    winnername = "Draw";
  } else if (winner === 1) {
    winnername = "Player 1";
  } else {
    winnername = "Computer";
  }

  console.log(
    "Start " +
      "Match" +
      "\n" +
      "User picked " +
      player1 +
      "\n" +
      "Computer picked " +
      player2 +
      "\n" +
      "Winner: " +
      winnername
  );
};

// let p1wins = 0;
// let p2wins = 0;
let defaultscore = { p1wins: 0, p2wins: 0 };
const playFourElements = async (previousScore = defaultscore) => {
  try {
    let player1 = await getUserChoice();
    let player2 = getPlayer2pick();
    let winner = calculateWinner(player1, player2);
    let nextScore = addToWinCount(previousScore, winner);
    showResults(player1, player2, winner);
    //console.log(nextScore);
    let display = await displayScores();
    if (display === true) {
      showScoreboard(nextScore);
      //console.log(currentPoints);
    }
    let replay = await playAgain();
    if (replay === true) {
      await playFourElements(nextScore);
    } else {
      finalScores(nextScore);
    }
  } catch (error) {
    console.error(error);
  }
};

playFourElements();

//console.log("Win count: " + userWinCount);
module.exports.playFourElements = playFourElements;
module.exports.calculateWinner = calculateWinner;
module.exports.addToWinCount = addToWinCount;
module.exports.getPlayer2pick = getPlayer2pick;
module.exports.showResults = showResults;
module.exports.getUserChoice = getUserChoice;

//Current Issues
//Scoreboard populates after 1 round and not right after a round
//p1wins undefined error on console when no is entered on playagain
