'use strict'
const GHOST = '&#9781;';
var gDeadGhosts = []
var gGhosts = []
var gIntervalGhosts;

function createGhost(board) {
    var ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        color: getRandomColor()
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}
function createGhosts(board) {
    createGhost(board)
    createGhost(board)
    createGhost(board)
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        moveGhost(ghost, i);
    }
}
function moveGhost(ghost, index) {
    var moveDiff = getMoveDiff();
    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    if (nextCell === WALL) return;
    if (nextCell === GHOST) return;
    if (nextCell === PACMAN && !gPacman.isSuper) {
        gameOver();
        return;
    } else if (nextCell === PACMAN && gPacman.isSuper) {
        killGhost(ghost, index);
        return;
    }

    // model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // dom
    renderCell(ghost.location, ghost.currCellContent)

    // model
    ghost.location = nextLocation;
    ghost.currCellContent = gBoard[ghost.location.i][ghost.location.j]
    gBoard[ghost.location.i][ghost.location.j] = GHOST;
    // dom
    renderCell(ghost.location, getGhostHTML(ghost))
}

function getMoveDiff() {
    var randNum = getRandomIntInclusive(0, 100);
    if (randNum < 25) {
        return { i: 0, j: 1 }
    } else if (randNum < 50) {
        return { i: -1, j: 0 }
    } else if (randNum < 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}


function getGhostHTML(ghost) {
    return `<span style="color:${gPacman.isSuper ? 'gray' : ghost.color};">${GHOST}</span>`
}

function killGhost(ghost, index) {
    gBoard[ghost.location.i][ghost.location.j] = EMPTY;
    renderCell(ghost.location, EMPTY);
    var deadGhost = gGhosts.splice(index, 1)[0]
    deadGhost.location.i = 3
    deadGhost.location.j = 3
    gDeadGhosts.push(deadGhost)

    // setTimeout(function () {
    //     createGhost(gBoard)
    // }, 5000)
}
function reviveGhosts() {
    gGhosts.push(...gDeadGhosts)
    gDeadGhosts = []
}