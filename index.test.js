const {
  calculateWinner,
  addToWinCount,
  getPlayer2pick,
  showResults,
  getUserChoice,
} = require("./index");

describe("rock-paper-scissors", () => {
  it("should take the user's input", () => {
    prompt = jest.fn();
    getUserChoice();
    expect(prompt).toHaveBeenCalled();
  });
  it("should determine comp's choice", () => {
    Math.floor = jest.fn(() => 9);
    let player2 = getPlayer2pick();
    expect(player2).toBe("rock");
    Math.floor = jest.fn(() => 19);
    player2 = getPlayer2pick();
    expect(player2).toBe("paper");
    Math.floor = jest.fn(() => 29);
    player2 = getPlayer2pick();
    expect(player2).toBe("scissors");
  });
  it("should figure out a winner", () => {
    let winner = calculateWinner("rock", "rock");
    expect(winner).toBe(null);
    winner = calculateWinner("paper", "paper");
    expect(winner).toBe(null);
    winner = calculateWinner("scissors", "scissors");
    expect(winner).toBe(null);
    winner = calculateWinner("rock", "scissors");
    expect(winner).toBe(1);
    winner = calculateWinner("scissors", "rock");
    expect(winner).toBe(2);
    winner = calculateWinner("paper", "scissors");
    expect(winner).toBe(2);
    winner = calculateWinner("scissors", "paper");
    expect(winner).toBe(1);
    winner = calculateWinner("paper", "rock");
    expect(winner).toBe(1);
    winner = calculateWinner("rock", "paper");
    expect(winner).toBe(2);
  });

  it("should count wins", () => {
    let count = addToWinCount({ p1wins: 0, p2wins: 0 }, 1);
    expect(count).toStrictEqual({ p1wins: 1, p2wins: 0 });

    count = addToWinCount({ p1wins: 0, p2wins: 0 }, 2);
    expect(count).toStrictEqual({ p1wins: 0, p2wins: 1 });

    count = addToWinCount({ p1wins: 3, p2wins: 5 }, 0);
    expect(count).toStrictEqual({ p1wins: 3, p2wins: 5 });
  });

  it("should display the final information", () => {
    console.log = jest.fn();
    showResults("rock", "scissors", "rock");
    expect(console.log).toHaveBeenCalledWith(
      "Start " +
        "Match" +
        "\n" +
        "User picked " +
        "rock" +
        "\n" +
        "Computer picked " +
        "scissors" +
        "\n" +
        "Winner: " +
        "rock"
    );
  });
});

//expect(["scissors", "rock", "paper"]).toContain(player2);
