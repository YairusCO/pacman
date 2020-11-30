'use strict'
const WALL = '#'
const FOOD = '.'
const SFOOD = '$'
const EMPTY = ' ';
const CHERRY = '🍒';


var gBoard;
var gGame = {
    score: 0,
    eatCount:0,
    isOn: false
}
var gIntervalCherry = 0;
var gMaxScore;

function init() {
    console.log('hello')
    gMaxScore = -1;
    gBoard = buildBoard()
    gGhosts = [];
    gGame.score = 0;
    if (gIntervalCherry) {
        clearInterval(gIntervalCherry);
    }
    if (gIntervalGhosts) {
        clearInterval(gIntervalGhosts)
    }
    gIntervalCherry = setInterval(placeCherry, 15000);
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container')
    gGame.isOn = true
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            gMaxScore++;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
                gMaxScore--;
            }
            if ((i === 1 && j === 1) || (i === 1 && j === SIZE - 2)
                || (i === SIZE - 2 && j === 1) || (i === SIZE - 2 && j === SIZE - 2)) {
                board[i][j] = SFOOD;

            }
        }
    }
    console.log(gMaxScore);
    return board;
}



function updateScore(diff) {
    gGame.score += diff;

    document.querySelector('h2 span').innerText = gGame.score
}

function gameOver() {
    console.log('Game Over');
    gGame.isOn = false;
    clearInterval(gIntervalGhosts)
    clearInterval(gIntervalCherry);
}


function placeCherry() {
    var i = getRandomIntInclusive(1, 9);
    var j = getRandomIntInclusive(1, 9);
    if (gBoard[i][j] === EMPTY) {
        gBoard[i][j] = CHERRY;
        renderCell({ i: i, j: j }, CHERRY);
    }
    else {
        placeCherry()
    }
}
