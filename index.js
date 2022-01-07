const grid = document.querySelector('.grid')
const rollDice1 = document.getElementById("rollDice1")
const rollDice2 = document.getElementById("rollDice2")
const number1 = document.getElementById("number1")
const number2 = document.getElementById("number2")
const gameEnd = document.getElementById("gameover")
const width = 40  //40*10 matrix
let squares = []
let evenSquares = []
let oddSquares = []

let snakes = [[13,7],[38,17],[51,27],[55,36],[91,65],[98,76]]
let snake_head = []
let snake_tail = []
let ladder = [[34,3],[41,19],[48,30],[60,33],[72,69],[93,63]]
let ladder_head = []
let ladder_tail = []
let currentSquare1 = 0
let currentSquare2 = 0 //initial position of every player corresponds to squares[0]
let oddInit = 100
let evenInit = 81
let diceNum = 0
let start = true


function createGrid(){
    for ( let j= 1; j <= 10; j++){
        if ( j % 2 == 0){
            // even sequence 
            // start from 81 go to 90
            let counter = evenInit

            for (let i=counter; i<= counter+9; i++){
                const square = document.createElement("div")
                square.classList.add("square")
                grid.appendChild(square)  
                square.textContent = i    
                evenSquares.push(square) 
            }
            evenInit = evenInit - 20
            squares = squares.concat(evenSquares.reverse())
            evenSquares = []
        } else {
            // odd sequence
            // start from 100 go to 91
            let counter = oddInit

            for ( let i=counter; i>= counter-9; i--){
                const square = document.createElement("div")
                square.classList.add("square")
                grid.appendChild(square)    
                square.textContent = i    
                oddSquares.push(square)  
                
            } 
            oddInit = oddInit - 20
            squares = squares.concat(oddSquares)
            oddSquares = []
        }
        
    }
    
}
createGrid()
squares = squares.reverse() //reverse 
squares[currentSquare1].classList.add("currentPos_1")
squares[currentSquare2].classList.add("currentPos_2")

function createSnakes(){
    for (let i = 0; i < snakes.length; i++){
        snake_head.push(snakes[i][0])
        snake_tail.push(snakes[i][1])  
        squares[snakes[i][0]].classList.add("snakeHead")
        squares[snakes[i][1]].classList.add("snakeTail")
    }
    console.log(snake_head, snake_tail)
}
createSnakes()

function createLadder(){
    for (let i = 0; i<ladder.length; i++){
        ladder_head.push(ladder[i][0])
        ladder_tail.push(ladder[i][1])
        squares[ladder[i][0]].classList.add("ladderHead")
        squares[ladder[i][1]].classList.add("ladderTail")
    }
    console.log(ladder_head, ladder_tail)
}
createLadder()

function diceRoll(evt){
if (start === true){
    if (evt.target.id === "rollDice1"){
        diceNum = Math.floor(Math.random()*6 + 1)
        number1.innerText = diceNum
        let target = "rollDice1"
        move(target)
    } else if (evt.target.id === "rollDice2"){
        diceNum = Math.floor(Math.random()*6 + 1)
        number2.innerText = diceNum
        let target = "rollDice2"
        move(target)
    } else {
        gameEnd.textContent = "Please refresh the page to restart the game."
    }
    }

}

function move(target){
    if (start === true){
        if (target === "rollDice1"){
            if (currentSquare1+diceNum < 99){
                if (snake_head.includes(currentSquare1+diceNum)){
                    console.log("Snake Head reached")
                    let k = snake_head.indexOf(currentSquare1+diceNum) // capture the index of the element in array
                    squares[currentSquare1].classList.remove("currentPos_1")
                    currentSquare1 = snake_tail[k]
                    squares[currentSquare1].classList.add("currentPos_1")
                    
                } else {
                    if (ladder_tail.includes(currentSquare1+diceNum)){
                        console.log("ladder reached")
                        let k = ladder_tail.indexOf(currentSquare1+diceNum) 
                        squares[currentSquare1].classList.remove("currentPos_1")
                        currentSquare1 = ladder_head[k]
                        squares[currentSquare1].classList.add("currentPos_1")
                    }
                    squares[currentSquare1].classList.remove("currentPos_1")
                    squares[currentSquare1 + diceNum].classList.add("currentPos_1")
                    currentSquare1 = currentSquare1 + diceNum
                    console.log(currentSquare1)
                }
                
            } else {
                if (currentSquare1+diceNum === 99){
                    squares[currentSquare1].classList.remove("currentPos_1")
                    squares[99].classList.add("currentPos_1")
                    gameEnd.textContent = "Congratulations player 1 has Won!"
                    start = false
                }
            }
        } else if (target === "rollDice2"){
            if (currentSquare2+diceNum < 99){
                if (snake_head.includes(currentSquare2+diceNum)){
                    console.log("Snake Head reached")
                    let k = snake_head.indexOf(currentSquare2+diceNum) // capture the index of the element in array
                    squares[currentSquare2].classList.remove("currentPos_2")
                    currentSquare2 = snake_tail[k]
                    squares[currentSquare2].classList.add("currentPos_2")
                    
                } else {
                    if (ladder_tail.includes(currentSquare2+diceNum)){
                        console.log("ladder reached")
                        let k = ladder_tail.indexOf(currentSquare2+diceNum) 
                        squares[currentSquare2].classList.remove("currentPos_2")
                        currentSquare2 = ladder_head[k]
                        squares[currentSquare2].classList.add("currentPos_2")
                    }
                    squares[currentSquare2].classList.remove("currentPos_2")
                    squares[currentSquare2 + diceNum].classList.add("currentPos_2")
                    currentSquare2 = currentSquare2 + diceNum
                    console.log(currentSquare2)
                }
                
            } else {
                if (currentSquare2+diceNum === 99){
                    squares[currentSquare2].classList.remove("currentPos_2")
                    squares[99].classList.add("currentPos_2")
                    gameEnd.textContent = "Congratulations player 2 has Won!"
                    start = false
                }
            }
        }
        
    }
    
    
}

rollDice1.addEventListener("click", diceRoll)
rollDice2.addEventListener("click", diceRoll)