window.addEventListener("load", function() {
  init(); 
});

const board = [];
const boardRows = 10;
const boardCols = 10;

const start = [0, 0];
const end = [9, 9];

function init() {
  // create empty board
  for (let i = 0; i < boardRows; i++) {
    let row = [];
    for(let j = 0; j < boardCols; j++) {
      row.push(false);
    }
    board.push(row);
  }

  // draw the initial empty board
  drawBoard();
}

function drawBoard() {
  const table = document.getElementById("board");
  const tbody = document.createElement("tbody");

  for (let i = 0; i < boardRows; i++) {
    const tr = document.createElement("tr");

    for (let j = 0; j < boardCols; j++) {
      const td = document.createElement("td");
      td.setAttribute("id", `${i}-${j}`);
      td.addEventListener("click", toggleVisited);

      let [startX, startY] = start;
      if(i === startX && j === startY) {
        td.classList.add("start")
      } 

      let [endX, endY] = end;
      if(i === endX && j === endY) {
        td.classList.add("end")
      } 

      if (board[i][j] == true) {
        td.classList.add("visited");
      }

      tr.appendChild(td);
    }

    tbody.appendChild(tr);
  }

  table.textContent = '';
  table.appendChild(tbody);
}

// BUTTON FUNCTIONS =======================================
function visualize() {
  alert("Not implemented");
}

function reset() {
  for (let i = 0; i < boardRows; i++) {
    for (let j = 0; j < boardCols; j++) {
      board[i][j] = false;
    }
  }

  drawBoard();
}

function toggleVisited(e) {
  const coord = e.target.id.split("-");
  const row = parseInt(coord[0]);
  const col = parseInt(coord[1]);

  board[row][col] = !board[row][col];
  drawBoard()
}

// PATHFINDING ALGORITHMS =================================
function bfs() {}