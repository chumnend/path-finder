// Create initial visited array
const visited = [];
const rows = 10;
const cols = 10;

for (let i = 0; i < rows; i++) {
  visited.push(new Array(cols).fill(false));
}

// draw initial table to page
createTable();

function createTable() {
  const board = document.getElementById("board");
  const tbody = document.createElement("tbody");

  const numRows = visited.length;
  const numCols = visited[0].length;

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

  const numRows = visited.length;
  const numCols = visited[0].length;

  for (let i = 0; i < numRows; i++) {
    const tr = document.createElement("tr");

    for (let j = 0; j < numCols; j++) {
      const td = document.createElement("td");
      td.setAttribute("id", `${i}-${j}`);
      td.addEventListener("click", toggleVisited);

      if (visited[j][i] == true) {
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

  visited[row][col] = !visited[row][col];
  updateTable()
}

function visualize() {
  alert("Not yet implmented");
}

function reset() {
  visited.forEach((row, rowIdx) => {
    row.forEach((_, colIdx) => {
      visited[colIdx][rowIdx] = false;
    })
  });

  updateTable();
}
