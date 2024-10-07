const gameBoard = document.querySelector('#gameBoard');
const playerDisplay = document.querySelector('#playerDisplay');
const infoDisplay = document.querySelector('#infoDisplay');
const width = 8;
let playerGo = 'black';
playerDisplay.textContent = 'black';

const startPieces = [
    rook, knight, bishop, queen, king, bishop, knight, rook,
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    rook, knight, bishop, queen, king, bishop, knight, rook,
]

/**
 * create the chess structure
 */
function createBoard() {
    startPieces.forEach((pice, i) => {
        const square = document.createElement('div');
        square.classList.add('square');
        square.innerHTML = pice
        square.firstChild?.setAttribute('draggable', true);
        square.setAttribute('square-id', i);
        const row = Math.floor((63 - i) / 8) + 1;
        if (row % 2 === 0) {
            square.classList.add(i % 2 === 0 ? 'beige' : 'brown');
        } else {
            square.classList.add(i % 2 === 0 ? 'brown' : 'beige');
        }

        // setting the pieces color
        if (i < 16) {
            square.firstChild.firstChild.classList.add('black');
        }
        if (i > 47) {
            square.firstChild.firstChild.classList.add('white');
        }
        gameBoard.appendChild(square);
    })
}

createBoard();

const all = document.querySelectorAll('#gameBoard .square');
all.forEach((square) => {
    square.addEventListener('dragstart', dragStart)
    square.addEventListener('dragover', dragOver)
    square.addEventListener('drop', dragDrop)
})

let startPosition;
let dragedElement
function dragStart(e) {
    startPosition = e.target.parentNode.getAttribute('square-id')
    dragedElement = e.target;
}

function dragOver(e) {
    e.preventDefault();
}

// todo : need to understand the login 
function dragDrop(e) {
    e.stopPropagation(); // need to un
    let taken = e.target.classList.contains('piece')
    changePlayer()
}

function changePlayer() {
    if (playerGo === 'black') {
        playerGo = 'white'
        playerDisplay.textContent = 'white'
        reverseIds()
    } else {
        playerGo = 'black'
        playerDisplay.textContent = 'black'
        revertId()
    }
}

// Need to understand
function reverseIds() {
    const allSquares = document.querySelectorAll('.square');
    allSquares.forEach((square, i) => {
        square.setAttribute('square-id', (width * width - 1) - i)
    })
}

// Need to understand
function revertId() {
    const allSquares = document.querySelectorAll('.square');
    allSquares.forEach((square, i) => {
        square.setAttribute('square-id', i)
    })
}
