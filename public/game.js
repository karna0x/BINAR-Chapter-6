const resultWin = document.querySelector(".you-win");
const resultDraw = document.querySelector(".draw");
const resultLose = document.querySelector(".pc-win");
const initialVS = document.querySelector(".init");

class Result {
    static whoWin(pInput, cInput) {
        if (
            (pInput === "rock" && cInput === "scissors1") ||
            (pInput === "scissors" && cInput === "paper1") ||
            (pInput === "paper" && cInput === "rock1")
        ) {
            resultWin.style.display = "flex";
            resultDraw.style.display = "none";
            resultLose.style.display = "none";
            initialVS.style.display = "none";
            return "win";
        } else if (
            (pInput === "scissors" && cInput === "rock1") ||
            (pInput === "paper" && cInput === "scissors1") ||
            (pInput === "rock" && cInput === "paper1")
        ) {
            resultWin.style.display = "none";
            resultDraw.style.display = "none";
            resultLose.style.display = "flex";
            initialVS.style.display = "none";
            return "lose";
        } else {
            resultWin.style.display = "none";
            resultDraw.style.display = "flex";
            resultLose.style.display = "none";
            initialVS.style.display = "none";
            return "draw";
        }
    }
}

class Choice {
    constructor(pChoice) {
        this.pInput = pChoice;
        this.cInput = this.drawcInput();
    }

    getpInput = () => this.pInput;
    getcInput = () => this.cInput;

    drawcInput() {
        const options = ["rock1", "paper1", "scissors1"];
        return options[Math.floor(Math.random() * options.length)];
    }
}

class Stats {
    constructor(wins, draws, loses) {
        this.status = {
            wins: wins,
            draws: draws,
            loses: loses,
        };
    }
    getStats = () => this.status;

    refreshStats(result) {
        switch (result) {
            case "win":
                console.log("PLAYER 1 WIN");
                break;
            case "draw":
                console.log("DRAW");
                break;
            case "lose":
                console.log("COM WIN");
                break;
        }
    }
}

class Game {
    constructor() {
        this.optionsImg = document.querySelectorAll("input");
        this.optionsBtns = document.querySelectorAll("input");
        this.optionsBtns.forEach((option) =>
            option.addEventListener("click", this.startGame.bind(this))
        );
        this.youWins = document.querySelector(".results > .you-win");
        this.draw = document.querySelector(".results > .draw");
        this.PcWins = document.querySelector(".results > .pc-win");

        this.stats = new Stats(0, 0, 0);
    }

    startGame(e) {
        this.optionsImg.forEach((choice) => (choice.className = "img"));
        if (this.draw.classList.contains("draw-animation")) {
            this.draw.classList.toggle("draw-animation");
        }

        this.choice = new Choice(e.target.dataset.option);

        const pInput = this.choice.getpInput(),
            cInput = this.choice.getcInput();

        if (pInput === cInput) {
            [...this.optionsImg]
                .find(
                    (choice) =>
                        choice.dataset.option === cInput &&
                        choice.dataset.option === cInput
                )
                .classList.add("draw-color");
            this.draw.classList.toggle("draw-animation");
        } else {
            [...this.optionsImg]
                .find((choice) => choice.dataset.option === pInput)
                .classList.add("player-choice");
            [...this.optionsImg]
                .find((choice) => choice.dataset.option === cInput)
                .classList.add("pc-choice");
        }

        this.stats.refreshStats(Result.whoWin(pInput, cInput));
        console.log(`Player memilih: ${pInput}`);
    }
}

const newGame = new Game();