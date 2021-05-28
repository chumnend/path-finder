// INITALIZATION ==========================================
window.addEventListener("load", function () {
  createBoard();
  drawBoard();
});

const CELL_TYPE_NONE = 0;
const CELL_TYPE_MARKED = 1;
const CELL_TYPE_OBSTACLE = 2;
const CELL_TYPE_START = 3;
const CELL_TYPE_END = 4;

const CLICK_MODE_OFF = 0;
const CLICK_MODE_START = 1;
const CLICK_MODE_END = 2;
const CLICK_MODE_OBSTACLE = 3;

const state = {
  clickMode: CLICK_MODE_OFF,
  board: [],
  rowCount: 10,
  colCount: 10,
  startPos: [0, 0],
  endPos: [9, 9],
};

// BUTTON FUNCTIONS =======================================
function setStart() {
  state.clickMode = CLICK_MODE_START;
  clearBoard();
}

function setEnd() {
  state.clickMode = CLICK_MODE_END;
  clearBoard();
}

function setObstacle() {
  state.clickMode = CLICK_MODE_OBSTACLE;
}

function solve() {
  // get the computed path
  const path = djikstra();
  if(path.length === 0) {
    alert('Unable to find a path');
  }

  // mark the path on the board
  for (let [i, j] of path) {
    state.board[i][j] = CELL_TYPE_MARKED;
  }

  // draw the path
  drawBoard();
}

function reset() {
  clearBoard();

  state.startPos[0] = 0;
  state.startPos[1] = 0;

  state.endPos[0] = 9;
  state.endPos[1] = 9;

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

  let i, j;

  switch (state.clickMode) {
    case CLICK_MODE_START:
      [i, j] = getCoord(e);
      state.board[i][j] = CELL_TYPE_START;
      state.startPos[0] = i;
      state.startPos[1] = j;
      break;
    case CLICK_MODE_END:
      [i, j] = getCoord(e);
      state.board[i][j] = CELL_TYPE_END;
      state.endPos[0] = i;
      state.endPos[1] = j;
      break;
    case CLICK_MODE_OBSTACLE:
      [i, j] = getCoord(e);
      state.board[i][j] = CELL_TYPE_OBSTACLE;
      break;
    default:
      return;
  }

  state.clickMode = CLICK_MODE_OFF;
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
      for (let cell of visited) {
        const [i, j] = parseArrayString(cell);
        visitedCells.push([i, j]);
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
  const queue = new PriorityQueue();
  const distances = {}; // stores shortest distance to start
  const previous = {}; // stores previous node to get to this node
  const path = [];

  // build initial state
  for (let i in state.board) {
    for (let j in state.board[0]) {
      const cell = [i, j];
      const type = state.board[i][j];

      if (cell.toString() === state.startPos.toString()) {
        distances[cell.toString()] = 0;
        queue.enqueue(cell.toString(), 0);
      } else if(type !== CELL_TYPE_OBSTACLE) {
        distances[cell.toString()] = Infinity;
        queue.enqueue(cell.toString(), Infinity);
      }

      previous[cell.toString] = null;
    }
  }

  while (queue.size()) {
    let temp = queue.dequeue();

    // if at end, capture the path to get there and return
    if (temp === state.endPos.toString()) {
      while (previous[temp]) {
        const [i, j] = parseArrayString(temp);
        path.push([i, j]);
        temp = previous[temp];
      }
      
      return path.slice(1);
    }

    if (temp || distances[temp] !== Infinity) {
      const [i, j] = parseArrayString(temp);
      for (let n of getNeighbors(i, j)) {
        let distance = distances[temp] + 1;
        if (distance < distances[n.toString()]) {
          distances[n.toString()] = distance;
          previous[n.toString()] = temp;
          queue.enqueue(n.toString(), distance);
        }
      }
    }
  }
}

// HELPERS ================================================
function createBoard() {
  // create empty board
  for (let i = 0; i < state.rowCount; i++) {
    let row = [];
    for (let j = 0; j < state.colCount; j++) {
      row.push(false);
    }

    state.board.push(row);
  }
}

function drawBoard() {
  const table = document.getElementById("board");
  const tbody = document.createElement("tbody");

  // mark start and end positions
  state.board[state.startPos[0]][state.startPos[1]] = CELL_TYPE_START;
  state.board[state.endPos[0]][state.endPos[1]] = CELL_TYPE_END;

  // update each cell in table
  for (let i = 0; i < state.rowCount; i++) {
    const tr = document.createElement("tr");

    for (let j = 0; j < state.colCount; j++) {
      const td = document.createElement("td");
      td.setAttribute("id", `${i}-${j}`);
      td.addEventListener("click", handleClick);

      switch (state.board[i][j]) {
        case CELL_TYPE_MARKED:
          td.classList.add("visited");
          break;
        case CELL_TYPE_OBSTACLE:
          td.classList.add("obstacle");
          break;
        case CELL_TYPE_START:
          td.classList.add("start");
          break;
        case CELL_TYPE_END:
          td.classList.add("end");
          break;
        default:
          break;
      }

      tr.appendChild(td);
    }

    tbody.appendChild(tr);
  }

  table.textContent = "";
  table.appendChild(tbody);
}

function clearBoard() {
  for (let i = 0; i < state.rowCount; i++) {
    for (let j = 0; j < state.colCount; j++) {
      state.board[i][j] = CELL_TYPE_NONE;
    }
  }
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

function parseArrayString(cell) {
  const [i, j] = cell.split(",");
  return [parseInt(i), parseInt(j)];
}

class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  enqueue(value, priority) {
    this.queue.push({ value, priority });
    this.sort();
  }

  dequeue() {
    if (!this.queue.length) return null;
    return this.queue.shift().value;
  }

  sort() {
    this.queue.sort((a, b) => a.priority - b.priority);
  }

  size() {
    return this.queue.length;
  }
}
