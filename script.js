// INITALIZATION ==========================================
window.addEventListener("load", function() {
  init(); 
});

const board = [];
const boardRows = 10;
const boardCols = 10;

const start = [0, 0];
const end = [9, 9];

let mode = 0 // 0 - no click, 1 - select start, 2 - select end

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

// GENERAL FUNCTIONS ======================================
function drawBoard() {
  const table = document.getElementById("board");
  const tbody = document.createElement("tbody");

  for (let i = 0; i < boardRows; i++) {
    const tr = document.createElement("tr");

    for (let j = 0; j < boardCols; j++) {
      const td = document.createElement("td");
      td.setAttribute("id", `${i}-${j}`);
      td.addEventListener("click", handleClick);

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
function setStart() {
  mode = 1;
}

function setEnd() {
  mode = 2;
}

function visualize() {
  bfs();
}

function reset() {
  for (let i = 0; i < boardRows; i++) {
    for (let j = 0; j < boardCols; j++) {
      board[i][j] = false;
    }
  }

  drawBoard();
}

// CLICK FUNCTIONS ========================================
function handleClick(e)  {
  const getCoord = (e) => {
    const coord = e.target.id.split("-");
    const row = parseInt(coord[0]);
    const col = parseInt(coord[1]);
  
    return [row, col];
  }

  let newRow, newCol;

  switch(mode) {
    case 1:
      // set new start point
      [newRow, newCol] = getCoord(e);
      start[0] = newRow;
      start[1] = newCol;
      break;
    case 2:
      // set ne end type
      [newRow, newCol] = getCoord(e);
      end[0] = newRow;
      end[1] = newCol;
      break;
    default:
      return;
  }

  mode = 0;
  drawBoard();
}

// PATHFINDING ALGORITHMS =================================
function bfs() {
  let visited = new Set();
  let queue = [];
  queue.push(start);

  while(queue.length > 0) {
    let cell = queue.shift();
    visited.add(cell.toString());

    if (cell.toString() === end.toString()) {
      console.log(visited);
      return;
    }

    for (let n of neighbors(cell[0], cell[1])) {
      if (!visited.has(n.toString())) {
        visited.add(n.toString());
        queue.push(n);

        board[n[0]][n[1]] = true;
        drawBoard();
      }
    }
  }
}

function astar() {}

function neighbors(x, y) {
  const cells = [];

  if (x > 0) {
    cells.push([x-1,y]);
  }

  if (x < boardRows - 1) {
    cells.push([x+1,y]);
  }

  if (y > 0) {
    cells.push([x,y-1]);
  }

  if (y < boardCols - 1) {
    cells.push([x,y+1]);
  }

  return cells;
}
