const rows = 10;
const cols = 10;

const board = new Array(rows).fill(new Array(cols).fill(false));

function createTable() {
  const table = document.getElementById("board");
  const tbody = document.createElement("tbody");

  for (let i = 0; i < rows; i++) {
    const tr = document.createElement("tr");

    for (let j = 0; j < cols; j++) {
      const td = document.createElement("td");
      td.setAttribute("id", `${i}-${j}`);
      td.addEventListener("click", (e) => {
        console.log("clicked on " + e.target.id);
      });

      tr.appendChild(td);
    }

    tbody.appendChild(tr);
  }

  table.appendChild(tbody);
}

createTable();
