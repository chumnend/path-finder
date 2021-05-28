// INITALIZATION ==========================================
window.addEventListener("load", function () {
  init();
});

const state = {
  clickMode: 0, // 0 - no click, 1 - select start, 2 - select end
  board: [],
  rowCount: 10,
  colCount: 10,
  startPos: [0, 0],
  endPos: [9, 9],
};

function init() {
  // create empty board
  for (let i = 0; i < state.rowCount; i++) {
    let row = [];
    for (let j = 0; j < state.colCount; j++) {
      row.push(false);
    }

    state.board.push(row);
  }

  // draw the initial empty board
  drawBoard();
}

// BUTTON FUNCTIONS =======================================
function setStart() {
  state.clickMode = 1;
}

function setEnd() {
  state.clickMode = 2;
}

function solve() {
  // get the computed path
  const path = bfs();

  // mark the path on the board
  for(let [i, j] of path) {
    state.board[i][j] = true;
  }

  // draw the path
  drawBoard();
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
function handleClick(e) {
  const getCoord = (e) => {
    const coord = e.target.id.split("-");
    const row = parseInt(coord[0]);
    const col = parseInt(coord[1]);

    return [row, col];
  };

  let newRow, newCol;

  switch (state.clickMode) {
    case 1: // set start position
      [newRow, newCol] = getCoord(e);
      state.startPos[0] = newRow;
      state.startPos[1] = newCol;
      break;
    case 2: // set end position
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

// PATHFINDING ALGORITHM =================================
function bfs() {
  const visited = new Set();
  const queue = [];
  queue.push(state.startPos);

  while (queue.length > 0) {
    let cell = queue.shift();
    visited.add(cell.toString());

    if (cell.toString() === state.endPos.toString()) {
      // convert the visited set into a path array
      const visitedCells = [];
      for(let cell of visited) {
        const [x, y] = cell.split(",");
        visitedCells.push([parseInt(x), parseInt(y)]);
      }

      return visitedCells;
    }

    for (let n of getNeighbors(cell[0], cell[1])) {
      if (!visited.has(n.toString())) {
        visited.add(n.toString());
        queue.push(n);
      }
    }
  }
}

function djikstra() {
  alert('Not Yet Implmented');
}

// HELPERS ================================================
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
      if (i === startX && j === startY) {
        td.classList.add("start");
      }

      let [endX, endY] = state.endPos;
      if (i === endX && j === endY) {
        td.classList.add("end");
      }

      if (state.board[i][j] == true) {
        td.classList.add("visited");
      }

      tr.appendChild(td);
    }

    tbody.appendChild(tr);
  }

  table.textContent = "";
  table.appendChild(tbody);
}

function getNeighbors(x, y) {
  const cells = [];

  if (x > 0) {
    cells.push([x - 1, y]);
  }

  if (x < state.rowCount - 1) {
    cells.push([x + 1, y]);
  }

  if (y > 0) {
    cells.push([x, y - 1]);
  }

  if (y < state.colCount - 1) {
    cells.push([x, y + 1]);
  }

  return cells;
}
