'use strict'
const PACMAN = '😷';

var gPacman;
function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}
function movePacman(ev) {

    if (!gGame.isOn) return;
    // console.log('ev', ev);
    var nextLocation = getNextLocation(ev)

    if (!nextLocation) return;
    // console.log('nextLocation', nextLocation);

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('NEXT CELL', nextCell);

    if (nextCell === WALL) return;
    if (nextCell === CHERRY) {
        updateScore(10);
        // if (gGame.score >= gMaxScore) { //isWin
        //     alert('winnn');
        //     gGame.isOn = false;
        //     clearInterval(gIntervalGhosts);
        //     clearInterval(gIntervalCherry);
        // }
    }
    if (nextCell === SFOOD) {
        //power food boolian
        updateScore(1);
        gPacman.isSuper = true;
        setTimeout(function () {
            gPacman.isSuper = false;
            reviveGhosts()
        }, 5000)
    }
    if (nextCell === FOOD) {
        updateScore(1);
        if (gGame.score === gMaxScore) { 
            alert('winnn');
            gameOver()
        }
    }
    else if (nextCell === GHOST && !gPacman.isSuper) {
        gameOver();
        renderCell(gPacman.location, EMPTY)
        return;
    } else if (nextCell === GHOST) {
        for (var i = 0; i < gGhosts.length; i++) {
            if (gGhosts[i].location.i === nextLocation.i && gGhosts[i].location.j === nextLocation.j) {
                if (gGhosts[i].currCellContent === FOOD) {
                    updateScore(1)
                    gGhosts[i].currCellContent = EMPTY
                }
                killGhost(gGhosts[i], i);
            }
        }
    }

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

    // update the dom
    renderCell(gPacman.location, EMPTY);

    gPacman.location = nextLocation;

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    // update the dom
    renderCell(gPacman.location, PACMAN);


}


function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            break;
        case 'ArrowDown':
            nextLocation.i++;
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            break;
        case 'ArrowRight':
            nextLocation.j++;
            break;
        default:
            return null;
    }
    return nextLocation;
}