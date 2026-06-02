
//replace p1NumStrats and p2NumStrats with query parameters
let queryParams = new URLSearchParams(window.location.search);
const p1_NUM_STRATS = queryParams.get("p1NumStrats");
const p2_NUM_STRATS = queryParams.get("p2NumStrats");
const PAYOFF_CONTENTS = "(<input type='number'>,<input type='number'>)";


buildMatrix(); 

function buildMatrix() {
  let matrix = document.getElementById("matrix");
  
  //loop through (p1_NUM_STRATS + 1 ) times. each iteration, make a row div
  for (let i = 0; i < (p1_NUM_STRATS + 1); i++) {
    //create new row div
    let newRow = document.createElement("div");
    newRow.classList.add("matrix-row");
    matrix.append(newRow);

    //loop through (p2_NUM_STRATS + 1 ) times. each iteration, make a cell
    for (let j = 0; j < (p2_NUM_STRATS + 1); j++) {
    //create a new cell
    let newCell = document.createElement("div");
      if (i == 0 && j ==0) {
        newCell.classList.add("empty-cell");
      } else if (i == 0) {
        newCell.classList.add("strat-cell");
        newCell.innerHTML = "t<sub>" + j + "</sub>";
      } else if (j == 0) {
        newCell.classList.add("strat-cell");
        newCell.innerHTML = "s<sub>" + i + "</sub>";
      } else {
        newCell.classList.add("payoff-cell");
        newCell.innerHTML = PAYOFF_CONTENTS;
      }
    newRow.append(newCell);
      }
  }
}

function randomize() {
  let payoffArr = document.querySelectorAll(".payoff-cell input");
  const MIN = -5;
  const MAX = 15;
  
  for (const elem of payoffArr) {
    elem.value = Math.floor(Math.random() * (MAX + 1 - MIN) + MIN);
  }
}

function compute() {
  let p1PayArr = document.querySelectorAll(".payoff-cell input:first-child");
  let p2PayArr = document.querySelectorAll(".payoff-cell input:last-child");
  let payCellArr = document.querySelectorAll(".payoff-cell");
  
  for (const elem of payCellArr) {
    if (elem.classList.contains("eliminated") == true) elem.classList.remove("eliminated");
    if (elem.classList.contains("ne") == true) elem.classList.remove("ne");
  }
  
  //loop thru every column, finding p1's highest payoff out of the rows
  for (let j = 0; j < p2_NUM_STRATS; j++) {
    let largest = -Infinity;
    
    //identify highest payoff in column
    for (let i = 0; i < p2_NUM_STRATS; i++) {
      if (Number (p1PayArr[p2_NUM_STRATS*i + j].value) > Number(largest)) largest = p2PayArr[p2_NUM_STRATS * i + j].value;
    }
    
    //eliminate any cells which arent best responses
    for (let i = 0; i < p2_NUM_STRATS; i++) {
      if (Number (p1PayArr[p2_NUM_STRATS*i + j].value) != Number(largest)) payCellArr[p2_NUM_STRATS*i + j].classList.add("eliminated");
    }
  }
  
  //loop thru every row, finding p2's highest payoff out of the columns
  for (let i = 0; i < p1_NUM_STRATS; i++) {
    let largest = -Infinity;
    
    //identify highest payoff in row
    for (let j = 0; j < p2_NUM_STRATS; j++) {
      if (Number (p2PayArr[p2_NUM_STRATS*i + j].value) > Number(largest)) largest = p2PayArr[p2_NUM_STRATS * i + j].value;
    }
    
    //eliminate any cells which arent best responses
    for (let j = 0; j < p2_NUM_STRATS; j++) {
      if (Number(p2PayArr[p2_NUM_STRATS*i + j].value) > Number(largest)) payCellArr[p2_NUM_STRATS*i + j].classList.add("eliminated");
    }
  }
    
  
  //give ne class to any cells which are best responses for both players
    for(const elem of payCellArr) {
      if (elem.classList.contains("eliminated") == false) elem.classList.add("ne");
    }
}
