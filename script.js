// INITALIZATION ==========================================
window.addEventListener("load", function() {
  init(); 
});

const state = {
  clickMode: 0, // 0 - no click, 1 - select start, 2 - select end
  visualizeMode: 0, // 0 - bfs
  board: [],
  rowCount: 10,
  colCount: 10,
  startPos: [0, 0],
  endPos: [9, 9],
}

function init() {
  // create empty board
  for (let i = 0; i < state.rowCount; i++) {
    let row = [];
    for(let j = 0; j < state.colCount; j++) {
      row.push(false);
    }

    state.board.push(row);
  }

  // draw the initial empty board
  drawBoard();
}

// GENERAL FUNCTIONS ======================================
function drawBoard() {
  const table = document.getElementById("board");
  const tbody = document.createElement("tbody");

  for (let i = 0; i < state.rowCount; i++) {
    const tr = document.createElement("tr");

    for (let j = 0; j < state.colCount; j++) {
      const td = document.createElement("td");
      td.setAttribute("id", `${i}-${j}`);
      td.addEventListener("click", handleClick);

      let [startX, startY] = state.startPos;
      if(i === startX && j === startY) {
        td.classList.add("start")
      } 

      let [endX, endY] = state.endPos;
      if(i === endX && j === endY) {
        td.classList.add("end")
      } 

      if (state.board[i][j] == true) {
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
  state.clickMode = 1;
}

function setEnd() {
  state.clickMode = 2;
}

function visualize() {
  switch(state.visualizeMode) {
    case 0:
      bfs();
      break;
    default:
      // do nothing
  }
}

function reset() {
  for (let i = 0; i < state.rowCount; i++) {
    for (let j = 0; j < state.colCount; j++) {
      state.board[i][j] = false;
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

  switch(state.clickMode) {
    case 1:
      // set new start point
      [newRow, newCol] = getCoord(e);
      state.startPos[0] = newRow;
      state.startPos[1] = newCol;
      break;
    case 2:
      // set ne end type
      [newRow, newCol] = getCoord(e);
      state.endPos[0] = newRow;
      state.endPos[1] = newCol;
      break;
    default:
      return;
  }

  state.clickMode = 0;
  drawBoard();
}

// PATHFINDING ALGORITHMS =================================
function bfs() {
  let visited = new Set();
  let queue = [];
  queue.push(state.startPos);

  while(queue.length > 0) {
    let cell = queue.shift();
    visited.add(cell.toString());

    if (cell.toString() === state.endPos.toString()) {
      console.log(visited);
      return;
    }

    for (let n of neighbors(cell[0], cell[1])) {
      if (!visited.has(n.toString())) {
        visited.add(n.toString());
        queue.push(n);

        state.board[n[0]][n[1]] = true;
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

  if (x < state.rowCount - 1) {
    cells.push([x+1,y]);
  }

  if (y > 0) {
    cells.push([x,y-1]);
  }

  if (y < state.colCount - 1) {
    cells.push([x,y+1]);
  }

  return cells;
}
