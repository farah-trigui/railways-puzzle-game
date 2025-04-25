/*
MBR for mountain buttom-right
MBL for mountain bottom-left
MTL for mountain top-left
MTR for mountain top-right
BV for  vertical bridge
BH for horizontal bridge
O for oasis
E for empty tile
========================
DE empty desert
DR desert with rail
DC desert with curved rail
ME empty mountain
MR mountain with rail
O  oasis
BE empty bridge
BR bridge with rail 
*/
const maps = {
  easy: [
    [
      ["E", "MBL", "E", "E", "O"],
      ["E", "E", "E", "BV", "O"],
      ["BV", "E", "MTL", "E", "E"],
      ["E", "E", "E", "O", "E"],
      ["E", "E", "MTR", "E", "E"],
    ],
    [
      ["O", "E", "BH", "E", "E"],
      ["E", "MTL", "E", "E", "MTL"],
      ["BV", "O", "MTR", "E", "E"],
      ["E", "E", "E", "O", "E"],
      ["E", "E", "E", "E", "E"],
    ],
    [
      ["E", "E", "BH", "E", "E"],
      ["E", "E", "E", "E", "BV"],
      ["E", "MTL", "BV", "E", "E"],
      ["E", "O", "E", "E", "E"],
      ["E", "BH", "E", "E", "MTL"],
    ],
    [
      ["E", "E", "E", "BH", "E"],
      ["E", "E", "E", "E", "E"],
      ["BV", "E", "MBL", "E", "MBL"],
      ["E", "E", "E", "E", "E"],
      ["E", "E", "O", "MTR", "E"],
    ],
    [
      ["E", "E", "BH", "E", "E"],
      ["E", "MBR", "E", "E", "E"],
      ["BV", "E", "E", "MTR", "E"],
      ["E", "E", "BV", "O", "E"],
      ["E", "MTL", "E", "E", "E"],
    ],
  ],
  hard: [
    [
      ["E", "MBL", "O", "O", "E", "BH", "E"],
      ["BV", "E", "E", "E", "E", "E", "E"],
      ["E", "E", "BV", "E", "E", "E", "E"],
      ["E", "E", "E", "MTR", "E", "E", "E"],
      ["MTR", "E", "MBR", "E", "BH", "E", "O"],
      ["E", "E", "E", "E", "E", "E", "E"],
      ["E", "E", "E", "BH", "E", "E", "E"],
    ],
    [
      ["E", "E", "O", "E", "E", "E", "E"],
      ["BV", "E", "BH", "E", "E", "MTL", "E"],
      ["E", "E", "BH", "E", "E", "E", "BV"],
      ["MBR", "E", "E", "E", "E", "E", "E"],
      ["E", "O", "E", "MBL", "E", "E", "E"],
      ["E", "MBR", "E", "E", "E", "E", "E"],
      ["E", "E", "O", "E", "E", "E", "E"],
    ],
    [
      ["E", "E", "BH", "E", "E", "E", "E"],
      ["E", "E", "E", "E", "E", "E", "BV"],
      ["O", "E", "MTR", "E", "E", "E", "E"],
      ["E", "E", "E", "E", "E", "E", "E"],
      ["E", "O", "MTR", "E", "BH", "E", "E"],
      ["BV", "E", "E", "E", "E", "MBL", "E"],
      ["E", "E", "O", "MTR", "E", "E", "E"],
    ],
    [
      ["E", "E", "E", "E", "E", "E", "E"],
      ["E", "E", "E", "BV", "E", "MTL", "E"],
      ["E", "E", "MTR", "E", "E", "E", "E"],
      ["E", "BH", "E", "O", "E", "BH", "E"],
      ["E", "E", "MTL", "E", "MBL", "E", "E"],
      ["BV", "E", "E", "E", "E", "MTR", "E"],
      ["E", "E", "E", "E", "E", "E", "E"],
    ],
    [
      ["E", "E", "E", "E", "E", "E", "E"],
      ["E", "E", "E", "E", "E", "MBR", "E"],
      ["E", "BH", "BH", "E", "MBL", "E", "E"],
      ["E", "E", "E", "E", "E", "E", "E"],
      ["E", "E", "MBR", "E", "O", "E", "E"],
      ["E", "MTL", "E", "BV", "E", "E", "E"],
      ["E", "E", "E", "E", "E", "E", "E"],
    ],
  ],
};

const images = {
  Desert: {
    empty: "starter_eng/pics/tiles/empty.png",
    straightRail: "starter_eng/pics/tiles/straight_rail.png",
    curvedRail: "starter_eng/pics/tiles/curve_rail.png",
  },
  Mountain: {
    empty: "starter_eng/pics/tiles/mountain.png",
    mountainRail: "starter_eng/pics/tiles/mountain_rail.png",
  },
  Oasis: {
    oasis: "starter_eng/pics/tiles/oasis.png",
  },
  Bridge: {
    empty: "starter_eng/pics/tiles/bridge.png",
    bridgeRail: "starter_eng/pics/tiles/bridge_rail.png",
  },
};

const tileOptions = {
  O: ["oasis"],
  B: ["empty", "bridgeRail"],
  M: ["empty", "mountainRail"],
  E: ["empty", "straightRail", "curvedRail"],
};
function getCategory(initialElement) {
  switch (initialElement) {
    case "O":
      return "Oasis";
    case "B":
      return "Bridge";
    case "M":
      return "Mountain";
    default:
      return "Desert";
  }
}

let timerInterval;
let startTime;
let selectedDifficulty = "easy";
let rows = 5;
let cols = 5;

const mapContainer = document.querySelector(".map_container");
const usernameInput = document.querySelector("#menu #username");
const easyButton = document.querySelector(".difficulty-labels .easy_button");
const hardButton = document.querySelector(".difficulty-labels .hard_button");
const rulesButton = document.querySelector(".rules-start-container .rules-button");
const startGameButton = document.querySelector(".rules-start-container .start-button");
const leaderboardButton = document.querySelector(".rules-start-container .leaderboard-button");
const getBackToMainbutton = document.querySelector("#rules .back-button");
const finishButton = document.querySelector("#game .finish-button");
const restartButton = document.querySelector("#game .restart-button");

document.querySelector(".save-button").addEventListener("click", loadGameState);

leaderboardButton.addEventListener("click", () => {
  displayLeaderboard(); 
});

easyButton.addEventListener("click", () => {
  selectedDifficulty = "easy";
  rows = cols = 5;
  easyButton.style.backgroundColor = "#bfd09b";
  easyButton.classList.add("selectedLevel");
  hardButton.style.backgroundColor = ""
  hardButton.classList.remove("selectedLevel");
});

hardButton.addEventListener("click", () => {
  selectedDifficulty = "hard";
  rows = cols = 7;
  hardButton.style.backgroundColor = "#bfd09b";
  easyButton.classList.remove("selectedLevel");
  easyButton.style.backgroundColor = ""
  hardButton.classList.add("selectedLevel");
});

getBackToMainbutton.addEventListener("click", () => {
  showPage("menu");
});

restartButton.addEventListener("click", () => {
  showPage("menu");
});

startGameButton.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  const errorMessage = document.querySelector("#error-message");
  if (!username) {
    errorMessage.style.display = "block";
    return;
  } else {
    errorMessage.style.display = "none"; 
  }
  createMap(selectedDifficulty);
  document.querySelector(".name").textContent = username;
  startTime = Date.now();
  updateElapsedTime();
  showPage("game");
});

rulesButton.addEventListener("click", () => {
  showPage("rules");
});

finishButton.addEventListener("click", () => {

  const gameWon = evaluateGame();

  if (gameWon) {
    const endTime = Date.now();
    const elapsedTime = endTime - startTime; 
    const formattedTime = formatElapsedTime(elapsedTime); 

    showGameStatus(`You Won! Total Time: ${formattedTime}`, true);

    const username = usernameInput.value;
    updateLeaderboard(username, elapsedTime, selectedDifficulty);

    setTimeout(() => {
      displayLeaderboard(selectedDifficulty); 
    }, 2000);

    clearInterval(timerInterval);
  } else {
    showGameStatus("Try Again", false);
    finishButton.disabled = false;
  }
});


/////// HELPER FUNCTIONS FOR THE ELPASED TIME/////////////////////////////
function updateElapsedTime() {
  const elapsedTimeElement = document.querySelector(".time");
  timerInterval = setInterval(() => {
    const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
    const minutes = String(Math.floor(elapsedSeconds / 60)).padStart(2, "0");
    const seconds = String(elapsedSeconds % 60).padStart(2, "0");
    elapsedTimeElement.textContent = `${minutes}:${seconds}`;
  }, 1000);
}

function formatElapsedTime(elapsedTime) {
  const seconds = Math.floor(elapsedTime / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
}

////////////////////////////////////////////////

//////////////////////////LEADERBOARD UPDATE ////////////////////////////////////////////////
const leaderboardContainer = document.querySelector("#leaderboardContent");

const getLeaderboard = (difficulty) =>
  new Map(
    JSON.parse(localStorage.getItem(`leaderboard_${difficulty}`) || "[]")
  );
const saveLeaderboard = (difficulty, map) =>
  localStorage.setItem(`leaderboard_${difficulty}`, JSON.stringify([...map]));

function updateLeaderboard(username, time, difficulty) {
  const leaderboard = getLeaderboard(difficulty);
  if (!leaderboard.has(username) || time < leaderboard.get(username))
    leaderboard.set(username, time);
  const sortedEntries = [...leaderboard.entries()]
    .sort((a, b) => a[1] - b[1])
    .slice(0, 5);
  saveLeaderboard(difficulty, new Map(sortedEntries));
}

function displayLeaderboard() {
  leaderboardContainer.innerHTML = "";
  ["easy", "hard"].forEach((difficulty) => {
    const leaderboard = getLeaderboard(difficulty);
    const header = document.createElement("h4");
    header.textContent = `${
      difficulty.charAt(0).toUpperCase() + difficulty.slice(1)
    } Difficulty`;
    leaderboardContainer.appendChild(header);

    if (leaderboard.size === 0) {
      const noLeaders = document.createElement("div");
      noLeaders.textContent = "No Leaders";
      leaderboardContainer.appendChild(noLeaders);
    } else {
      leaderboard.forEach((time, username) => {
        const entry = document.createElement("div");
        entry.textContent = `${username}: ${formatElapsedTime(time)}`;
        leaderboardContainer.appendChild(entry);
      });
    }
  });
  showPage("leaderboard");
}

const backToMenuButton = document.querySelector("#backToMenuButton");
backToMenuButton.addEventListener("click", () => {
  showPage("menu");
});
//////////////////////////////SHOW PAGES AND SHOW GAME STATUS/////////////////////////////////////////////

function showPage(pageId) {
  const pages = document.querySelectorAll("body > *");
  pages.forEach((page) => {
    if (pageId === page.id) page.classList.remove("inactive");
    else page.classList.add("inactive");
  });
}

function showGameStatus(message, isSuccess) {
  const statusDiv = document.querySelector("#gameStatus");
  const statusText = document.querySelector("#statusText");

  statusText.textContent = message;
  statusDiv.classList.add("show", isSuccess ? "success" : "error");
 

  setTimeout(() => {
    if (statusDiv.classList.contains("success")) showPage("menu");
    statusDiv.classList.remove("show", "success", "error");
  }, 2000);
}
///////////////////////MAP CREATION////////////////////////////////////

function createMap(difficulty) {
  const randomMap =
    maps[difficulty][Math.floor(Math.random() * maps[difficulty].length)];
  mapContainer.innerHTML = ""; 

  mapContainer.style.display = "grid";
  mapContainer.style.gridTemplateColumns = `repeat(${randomMap[0].length}, 100px)`;
  mapContainer.style.gap = "0px";

  let isDrawing = false; 

  randomMap.forEach((row) => {
    row.forEach((elem) => {
      const Button = document.createElement("button");
      Button.style.width = "100px";
      Button.style.height = "100px";

      let bgImg;
      switch (elem[0]) {
        case "M":
          bgImg = images["Mountain"]["empty"];
          break;
        case "B":
          bgImg = images["Bridge"]["empty"];
          break;
        case "O":
          bgImg = images["Oasis"]["oasis"];
          break;
        default:
          bgImg = images["Desert"]["empty"];
      }

      Button.style.backgroundImage = `url('${bgImg}')`;
      Button.style.backgroundSize = "cover";
      Button.style.backgroundPosition = "center";
      Button.style.border = "none";

      let initialRotation = "0";
      if (elem === "MBL") {
        initialRotation = "90";
      } else if (elem === "MTL") {
        initialRotation = "180";
      } else if (elem === "MTR") {
        initialRotation = "270";
      } else if (elem === "BH") {
        initialRotation = "90";
      }
      Button.style.transform = `rotate(${initialRotation}deg)`;

      Button.dataset.initialElement = elem;
      Button.dataset.rotation = Button.dataset.initialRotation =
        initialRotation;
      Button.dataset.elementIndex = 0;

      Button.addEventListener("click", () => changeImage(Button));

      Button.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        if (e.shiftKey) {
          deleteElement(Button);
        } else {
          rotateElement(Button);
        }
      });

      Button.addEventListener("mousedown", (e) => {
        isDrawing = true;
        drawElement(Button);
      });

      Button.addEventListener("mouseover", () => {
        if (isDrawing) {
          drawElement(Button);
        }
      });

      document.addEventListener("mouseup", () => {
        isDrawing = false;
      });

      mapContainer.append(Button);
    });
  });
}

function drawElement(Button) {
  if (!Button.dataset.initialElement) return;

  const initialElement = Button.dataset.initialElement[0];
  const category = getCategory(initialElement); 
  const options = tileOptions[initialElement]; 

  const elementIndex = Button.dataset.elementIndex? parseInt(Button.dataset.elementIndex): 0;
  const elementType = options[elementIndex];

  if (images[category] && images[category][elementType]) {
    Button.style.backgroundImage = `url('${images[category][elementType]}')`;
    Button.style.backgroundSize = "cover";
    Button.style.backgroundPosition = "center";
  } 
}

function rotateElement(cellButton) {
  if (cellButton.dataset.initialElement === "E") {
    const currentRotation = cellButton.dataset.rotation
      ? parseInt(cellButton.dataset.rotation)
      : 0;
    const newRotation = (currentRotation + 90) % 360;
    cellButton.dataset.rotation = newRotation;
    cellButton.style.transform = `rotate(${newRotation}deg)`;
  }
}

function deleteElement(cellButton) {
  const emptyImage = images["Desert"]["empty"]; 

  cellButton.style.backgroundImage = `url('${emptyImage}')`;
  cellButton.style.backgroundSize = "cover";
  cellButton.style.backgroundPosition = "center";
  cellButton.style.transform = "rotate(0deg)"; 
  cellButton.dataset.elementIndex = 0;
}

function changeImage(Button) {
  const initialElement = Button.dataset.initialElement;
  let currentIndex = Button.dataset.elementIndex? parseInt(Button.dataset.elementIndex): 0;

  if (initialElement[0] in tileOptions) {
    const options = tileOptions[initialElement[0]];

    if (options.length > 0) {
      const newIndex = (currentIndex + 1) % options.length;
      Button.dataset.elementIndex = newIndex;
      const currentOption = options[newIndex];

      Button.style.backgroundImage = `url('${
        images[getCategory(initialElement[0])][currentOption]
      }')`;
    }
  }
}



///////////SAVE THE GAME STATE/////////////////////

setInterval(saveGameState, 5000); 

window.addEventListener("beforeunload", saveGameState);


function saveGameState() {
  const gameState = {
    selectedDifficulty,
    rows,
    cols,
    map: Array.from(mapContainer.children).map(cell => ({
      element: cell.dataset.initialElement,
      rotation: cell.dataset.rotation,
      elementIndex: cell.dataset.elementIndex,
    })),
    elapsedTime: Date.now() - startTime,
    username: usernameInput.value
  };
  localStorage.setItem("railwaysGameState", JSON.stringify(gameState));
}


function loadGameState() {
  const savedState = JSON.parse(localStorage.getItem("railwaysGameState"));
  if (!savedState) return;

  selectedDifficulty = savedState.selectedDifficulty;
  rows = savedState.rows;
  cols = savedState.cols;
  

  usernameInput.value = savedState.username;
  document.querySelector(".name").textContent = savedState.username; 


  startTime = Date.now() - savedState.elapsedTime;
  updateElapsedTime();


  createMap(selectedDifficulty);
  savedState.map.forEach((cellData, index) => {
    const cell = mapContainer.children[index];
    cell.dataset.initialElement = cellData.element;
    cell.dataset.rotation = cellData.rotation;
    cell.dataset.elementIndex = cellData.elementIndex;
    cell.style.transform = `rotate(${cellData.rotation}deg)`;
    drawElement(cell); 
  });
  

  showPage("game");
}

///////////ENDING THE GAME //////////////////////

function evaluateGame() {
  if (!checkRails()) return false;
  const { adjacencyMatrix, visited } = prepareDFS();

  let start = 0;
  while (visited[start]) start++;
  if (!dfs(adjacencyMatrix, visited, start)) {
    return false;
  }

  for (let vis of visited) {
    if (!vis) return false;
  }
  return true;
}

function checkRails() {
  for (const child of mapContainer.children) {
    if (
      child.dataset.initialElement[0] !== "O" &&
      child.dataset.elementIndex == 0
    ) {
      return false;
    }
  }
  return true;
}

function getEdges(child) {
  const type = child.dataset.initialElement[0];
  const elementIndex = parseInt(child.dataset.elementIndex) || 0;
  const rotation = parseInt(child.dataset.rotation) % 360;
  let edges = [];

  switch (type) {
    case "O":
      edges = [];
      break;

    case "B":
      edges =
        elementIndex === 1
          ? rotation % 180 === 0
            ? ["top", "bottom"]
            : ["left", "right"]
          : [];
      break;

    case "M":
      edges =
        elementIndex === 1
          ? rotation === 0
            ? ["right", "bottom"]
            : rotation === 90
            ? ["left", "bottom"]
            : rotation === 180
            ? ["left", "top"]
            : ["top", "right"]
          : []; 
      break;

    case "E":
      if (elementIndex === 1) {
        edges = rotation % 180 === 0 ? ["top", "bottom"] : ["left", "right"];
      } else if (elementIndex === 2) {
        edges =
          rotation === 0
            ? ["right", "bottom"]
            : rotation === 90
            ? ["left", "bottom"]
            : rotation === 180
            ? ["left", "top"]
            : ["top", "right"];
      } else {
        edges = [];
      }
      break;
  }

  return edges;
}

function prepareDFS() {
  console.log(rows, cols);
  const adjacencyMatrix = Array(rows * cols)
    .fill(null)
    .map(() => []);
  const visited = Array(rows * cols).fill(false);

  Array.from(mapContainer.children).forEach((child, index) => {
    const row = Math.floor(index / cols);
    const col = index % cols;
    const currentNode = row * cols + col;

    if (child.dataset.initialElement[0] === "O") {
      visited[currentNode] = true;
    }

    const edges = getEdges(child);

    if (edges.includes("top") && row > 0) {
      const topNode = (row - 1) * cols + col;
      adjacencyMatrix[currentNode].push(topNode);
    }
    if (edges.includes("bottom") && row < rows - 1) {
      const bottomNode = (row + 1) * cols + col;
      adjacencyMatrix[currentNode].push(bottomNode);
    }
    if (edges.includes("left") && col > 0) {
      const leftNode = row * cols + (col - 1);
      adjacencyMatrix[currentNode].push(leftNode);
    }
    if (edges.includes("right") && col < cols - 1) {
      const rightNode = row * cols + (col + 1);
      adjacencyMatrix[currentNode].push(rightNode);
    }
  });

  return { adjacencyMatrix, visited };
}

function dfs(adjacencyMatrix, visited, currentNode) {
  visited[currentNode] = true;

  let res = true;
  for (let x of adjacencyMatrix[currentNode]) {
    if (!visited[x]) {
      if (!adjacencyMatrix[x].includes(currentNode)) return false;
      res &&= dfs(adjacencyMatrix, visited, x);
    }
  }
  return res;
}
