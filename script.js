// Create initial gBoard array
let gBoard;

initializeBoard(10, 10);
createTable();

function initializeBoard(rows, cols) {
  const newBoard = [];

  for (let i = 0; i < rows; i++) {
    newBoard.push(new Array(cols).fill(false));
  }

  gBoard = newBoard;
}

function createTable() {
  const board = document.getElementById("board");
  const tbody = document.createElement("tbody");

  const numRows = gBoard.length;
  const numCols = gBoard[0].length;

  for (let i = 0; i < numRows; i++) {
    const tr = document.createElement("tr");

    for (let j = 0; j < numCols; j++) {
      const td = document.createElement("td");
      td.setAttribute("id", `${i}-${j}`);
      td.addEventListener("click", toggleVisited);

      tr.appendChild(td);
    }

    tbody.appendChild(tr);
  }

  board.appendChild(tbody);
}

function updateTable() {
  const board = document.getElementById("board");
  const prevBody = document.getElementsByTagName("tbody")[0];
  const tbody = document.createElement("tbody")

  const numRows = gBoard.length;
  const numCols = gBoard[0].length;

  for (let i = 0; i < numRows; i++) {
    const tr = document.createElement("tr");

    for (let j = 0; j < numCols; j++) {
      const td = document.createElement("td");
      td.setAttribute("id", `${i}-${j}`);
      td.addEventListener("click", toggleVisited);

      if (gBoard[j][i] == true) {
        td.classList.add("visited");
      }

      tr.appendChild(td);
    }

    tbody.appendChild(tr);
  }

  board.replaceChild(tbody, prevBody);
}

function toggleVisited(e) {
  const coord = e.target.id.split("-");
  const col = parseInt(coord[0]);
  const row = parseInt(coord[1]);

  gBoard[row][col] = !gBoard[row][col];
  updateTable()
}

function visualize() {
  alert("Not yet implmented");
}

function reset() {
  gBoard.forEach((row, rowIdx) => {
    row.forEach((_, colIdx) => {
      gBoard[colIdx][rowIdx] = false;
    })
  });

  updateTable();
}
