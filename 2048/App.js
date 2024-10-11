const tileColors = [
    "#CDC1B4",  // Empty (0 or no number)
    "#EEE4DA",  // 2
    "#EDE0C8",  // 4
    "#F2B179",  // 8
    "#F59563",  // 16
    "#F67C5F",  // 32
    "#F65E3B",  // 64
    "#EDCF72",  // 128
    "#EDCC61",  // 256
    "#EDC850",  // 512
    "#EDC53F",  // 1024
    "#EDC22E",  // 2048
    "#3C3A32",  // 4096
    "#3C3A32",  // 8192
    "#3C3A32",  // 16384
    "#3C3A32",  // 32768
    "#3C3A32",  // 65536
    "#776E65",  // 131072
    "#776E65",  // 262144
    "#776E65",  // 524288
    "#7B7168",  // Custom for higher values
    "#5C5351",  // Custom for higher values
    "#B0A99F",  // Custom for higher values
    "#D6CEC3",  // Custom for higher values
    "#4A4743",  // Custom for higher values
];

// at a certain moment max-call stack become full identify and fix the bug
document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.grid');
    const scoreDisplay = document.querySelector('#score');
    const resultDisplay = document.querySelector('#result');
    const Reset = document.querySelector('#reset');
    const width = 4;
    let squares = [];
    let score = 0;

    Reset.addEventListener('click', () => {
        gridDisplay.innerHTML = '';
        score = 0;
        squares = [];
        createBoard();
    })

    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            const square = document.createElement('div');
            let bgColor = Math.floor(Math.random() * 24)
            square.style.backgroundColor = tileColors[bgColor];
            square.textContent = 0
            gridDisplay.appendChild(square);
            squares.push(square);
        }
        generateNumber();
        generateNumber();

    }
    createBoard();


    function generateNumber() {
        const randomNumber = Math.floor(Math.random() * squares.length)
        if (squares[randomNumber].innerHTML == 0) {
            squares[randomNumber].innerHTML = 2
        } else {
            generateNumber();
        }
    }

    function moveRight() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                // getting all the value of row
                let firstValue = parseInt(squares[i].innerHTML);
                let SecondValue = parseInt(squares[i + 1].innerHTML);
                let ThirdValue = parseInt(squares[i + 2].innerHTML);
                let fourthValue = parseInt(squares[i + 3].innerHTML);
                let rows = [firstValue, SecondValue, ThirdValue, fourthValue]

                // Creating a new row and moving non-zero value in right
                const filetRow = rows.filter(num => num);
                let missing = 4 - filetRow.length;
                let zeros = Array(missing).fill(0);
                let newRow = zeros.concat(filetRow);

                // displaying the element on right side
                squares[i].innerHTML = newRow[0]
                squares[i + 1].innerHTML = newRow[1]
                squares[i + 2].innerHTML = newRow[2]
                squares[i + 3].innerHTML = newRow[3]
            }
        }
    }

    function moveLeft() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 3) {
                let firstRow = parseInt(squares[i].innerHTML);
                let SecondRow = parseInt(squares[i - 1].innerHTML);
                let ThirdRow = parseInt(squares[i - 2].innerHTML);
                let fourthRow = parseInt(squares[i - 3].innerHTML);
                let rows = [firstRow, SecondRow, ThirdRow, fourthRow]

                // Creating a new row moving non-zero value in right
                const filetRow = rows.filter(num => num);
                let missing = 4 - filetRow.length;
                let zeros = Array(missing).fill(0);
                let newRow = filetRow.concat(zeros);

                // displaying in the left end after moving the value
                squares[i - 3].innerHTML = newRow[0]
                squares[i - 2].innerHTML = newRow[1]
                squares[i - 1].innerHTML = newRow[2]
                squares[i].innerHTML = newRow[3]
            }
        }
    }

    function moveTop() {
        for (let i = 0; i < 16; i++) {
            if (i < 4) {
                let firstColumn = parseInt(squares[i].innerHTML);
                let SecondColumn = parseInt(squares[i + 4].innerHTML);
                let ThirdColumn = parseInt(squares[i + 8].innerHTML);
                let fourthColumn = parseInt(squares[i + 12].innerHTML);
                let Columns = [firstColumn, SecondColumn, ThirdColumn, fourthColumn]
                console.log("rows Top", Columns)

                // Creating a new row and moving non-zero value at top
                const filterColumns = Columns.filter(num => num);
                let missing = 4 - filterColumns.length;
                let zeros = Array(missing).fill(0);
                let newColumns = filterColumns.concat(zeros);

                // displaying the element on the top row
                squares[i].innerHTML = newColumns[0]
                squares[i + 4].innerHTML = newColumns[1]
                squares[i + 8].innerHTML = newColumns[2]
                squares[i + 12].innerHTML = newColumns[3]
            }
        }
    }

    function moveDown() {
        for (let i = 0; i < 16; i++) {
            if (i > 11) {
                let firstColumn = parseFloat(squares[i].innerHTML);
                let SecondColumn = parseFloat(squares[i - 4].innerHTML);
                let ThirdColumn = parseFloat(squares[i - 8].innerHTML);
                let fourthColumn = parseFloat(squares[i - 12].innerHTML);
                let Columns = [firstColumn, SecondColumn, ThirdColumn, fourthColumn]

                // Creating a new Column value and moving non-zero value at end
                const filterColumns = Columns.filter(num => num);
                let missing = 4 - filterColumns.length;
                let zeros = Array(missing).fill(0);
                let newColumns = filterColumns.concat(zeros);

                //Displaying in the ele bottom row
                squares[i].innerHTML = newColumns[0]
                squares[i - 4].innerHTML = newColumns[1]
                squares[i - 8].innerHTML = newColumns[2]
                squares[i - 12].innerHTML = newColumns[3]

            }
        }
    }

    function combineRowValue() {
        for (let i = 0; i < 15; i++) {
            let bgColor = Math.floor(Math.random() * 24)
            squares[i].style.backgroundColor = tileColors[bgColor];
            if (squares[i].innerHTML == squares[i + 1].innerHTML) {
                let combineValue = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML)
                squares[i].innerHTML = combineValue;
                squares[i + 1].innerHTML = 0;
                score += combineValue;
                scoreDisplay.innerHTML = score;
            }
        }
        checkForWin();
    }

    function combineColumnValue() {
        for (let i = 0; i < 12; i++) {
            let bgColor = Math.floor(Math.random() * 24)
            squares[i].style.backgroundColor = tileColors[bgColor];
            if (squares[i].innerHTML == squares[i + 4].innerHTML) {
                let combineValue = parseInt(squares[i].innerHTML) + parseInt(squares[i + 4].innerHTML)
                squares[i].innerHTML = combineValue;
                squares[i + 4].innerHTML = 0;
                score += combineValue;
                scoreDisplay.innerHTML = score;
            }
        }
        checkForWin();
    }

    function checkForWin() {
        // let allRowFill = squares.some(num =>{ num.innerHTML != 0 })
        let allRowFill = squares.every(num => num.innerHTML != 0);
        if (allRowFill && score != 2048) {
            resultDisplay.style.color = "Red"
            resultDisplay.innerHTML = "Game Over"
            document.removeEventListener('keydown', control);
        }else if(score == 2048){
            resultDisplay.style.color = "Green"
            resultDisplay.innerHTML = "Hurry!, have won the Game"
            document.removeEventListener('keydown', control);
        }
    }

    // assign function to keys
    function control(e) {
        if (e.key === 'ArrowLeft') keyLeft()
        if (e.key === 'ArrowRight') keyRight()
        if (e.key === 'ArrowUp') keyUp()
        if (e.key === 'ArrowDown') keyDown()
    }

    document.addEventListener('keydown', control)

    function keyLeft() {
        moveLeft();
        combineRowValue();
        moveLeft();
        generateNumber();
    }

    function keyRight() {
        moveRight();
        combineRowValue();
        moveRight();
        generateNumber()
    }

    function keyUp() {
        moveTop();
        combineColumnValue();
        moveTop();
        generateNumber();
    }

    function keyDown() {
        moveDown();
        combineColumnValue();
        moveDown();
        generateNumber()
    }
})