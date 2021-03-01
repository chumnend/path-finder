const rows = 10;
const cols = 10;

const visited = [];
for (let i = 0; i < rows; i++) {
  visited.push(new Array(cols).fill(false));
}

function createTable() {
  const board = document.getElementById("board");
  const tbody = document.createElement("tbody");

  for (let i = 0; i < rows; i++) {
    const tr = document.createElement("tr");

    for (let j = 0; j < cols; j++) {
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

  for (let i = 0; i < rows; i++) {
    const tr = document.createElement("tr");

    for (let j = 0; j < cols; j++) {
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

createTable();
