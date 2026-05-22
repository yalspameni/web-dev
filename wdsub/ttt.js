
let gameOverDiv = document.getElementById("game-over");
let winnerText = document.querySelector("#game-over p");
let squareArr = document.querySelectorAll(".ttt-square");
let currentPlayer = "x";


for(const elem of squareArr) {
  elem.addEventListener("click", (event) => drawSymbol(event));
}

function drawSymbol(event) {
  let clickedSquare = event.target;
  
  
  if (clickedSquare.innerText == "") { clickedSquare.innerText = currentPlayer;
    if (checkForWinner() == false) checkForDraw();
    changePlayer();                            
  }
}
  
function checkForWinner() {
  let isGameOver = false; 
  
  //check for 3 in a column
  for(let i = 0; i < 3; i++) {
    if (squareArr[i].innerText == currentPlayer
      && squareArr[i + 3].innerText == currentPlayer
      && squareArr[i + 6].innerText == currentPlayer) isGameOver = true;
  }
  
  
  //check for 3 in a row
  for(let i = 0; i < 3; i++) {
    if (squareArr[i * 3].innerText == currentPlayer
      && squareArr[i * 3 + 1].innerText == currentPlayer
      && squareArr[i * 3 + 2].innerText == currentPlayer) isGameOver = true;
  }
  
  
  //check for 3 in a diagonal
  if (squareArr[0].innerText == currentPlayer
      && squareArr[4].innerText == currentPlayer
      && squareArr[8].innerText == currentPlayer) isGameOver = true;
  else if (squareArr[2].innerText == currentPlayer
      && squareArr[4].innerText == currentPlayer
      && squareArr[6].innerText == currentPlayer) isGameOver = true;
    
  
  if (isGameOver) showWinner();
  return isGameOver;
}


  function showWinner() {
    gameOverDiv.style.display = "block";
    winnerText.innerText = currentPlayer + " player has won!";
  }


function checkForDraw() {
  let isDraw = true;
  
  for (const elem of squareArr) { 
  if (elem.innerText == "") isDraw = false; 
  }
  
if (isDraw) showDraw();

}

function showDraw() {
    gameOverDiv.style.display = "block";
    winnerText.innerText = "draw!";
  }

  function changePlayer() {
   currentPlayer = ((currentPlayer == "x") ? "o" : "x");
  }


function clearBoard() {
  //hide game over div
  gameOverDiv.style.display = "none";
  
  //clear symbols from board
  for (const elem of squareArr) {
    elem.innerText = " ";
  }
  
}
