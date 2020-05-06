var gameArr = [
  [5, 1, 4, 6, 3, 2, 8, 9, 7],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0]
];

const numbers = [
  [
    [
      [".", ".", "."],
      [".", ".", "."],
      [".", ".", "."]
    ],
    [
      [".", ".", "."],
      [".", ".", "."],
      [".", ".", "."]
    ],
    [
      [".", ".", "."],
      [".", ".", "."],
      [".", ".", "."]
    ]
  ],
  [
    [
      [".", ".", "."],
      [".", ".", "."],
      [".", ".", "."]
    ],
    [
      [".", ".", "."],
      [".", ".", "."],
      [".", ".", "."]
    ],
    [
      [".", ".", "."],
      [".", ".", "."],
      [".", ".", "."]
    ]
  ],
  [
    [
      [".", ".", "."],
      [".", ".", "."],
      [".", ".", "."]
    ],
    [
      [".", ".", "."],
      [".", ".", "."],
      [".", ".", "."]
    ],
    [
      [".", ".", "."],
      [".", ".", "."],
      [".", ".", "."]
    ]
  ]
];

function solveSudoku(gameArr) {
  console.log("solve duo");
  let emptySpot = nextEmptySpot(gameArr);
  let { parentX, parentY, childX, childY } = emptySpot;
  let indexObj = emptySpot;
  if (isValidSudoku(gameArr)) return gameArr;

  if (r === -1) {
    return gameArr;
  }

  var possArr = possibilities(indexObj, gameArr);
  for (var k = 0; k < possArr.length && nextEmtySpot(gameArr)[0] !== -1; k++) {
    gameArr[parentY][parentX][childX][childY] = possArr[k];
    solveSudoku(gameArr);
  }
  if (nextEmtySpot(gameArr)[0] !== -1)
    gameArr[parentY][parentX][childX][childY] = 0;

  return gameArr;
}

/* function solveSudoku(gameArr) {
  var emptySpot = nextEmtySpot(gameArr);
  var r = emptySpot[0];
  var c = emptySpot[1];

  // if the game is unsolvable don't even try to solve it
  if (!isValidSudoku(gameArr)) return gameArr;

  // if no vacant spot is left, board is solved
  if (r === -1) {
    return gameArr;
  }

  var possArr = possiblities(r, c, gameArr);

  for (var k = 0; k < possArr.length && nextEmtySpot(gameArr)[0] !== -1; k++) {
    gameArr[r][c] = possArr[k];
    solveSudoku(gameArr);
  }

  // if no possible value leads to a solution reset this value
  if (nextEmtySpot(gameArr)[0] !== -1) gameArr[r][c] = 0;

  return gameArr;
}

function nextEmtySpot(gameArr) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (gameArr[i][j] === 0) return [i, j];
    }
  }
  return [-1, -1];
}

function possiblities(r, c, gameArr) {
  var possArr = [];
  var row = [];
  var col = [];
  var quad = [];
  var k = 0;
  var l = 0;
  if (r <= 2) k = 0;
  else if (r <= 5) k = 3;
  else k = 6;
  if (c <= 2) l = 0;
  else if (c <= 5) l = 3;
  else l = 6;

  for (var i = 0; i < 9; i++) {
    row.push(gameArr[i][c]);
  }
  for (var j = 0; j < 9; j++) {
    col.push(gameArr[r][j]);
  }
  for (var i = k; i < k + 3; i++) {
    for (var j = l; j < l + 3; j++) {
      quad.push(gameArr[i][j]);
    }
  }

  for (var n = 1; n < 10; n++) {
    if (
      row.indexOf(n) === -1 &&
      col.indexOf(n) === -1 &&
      quad.indexOf(n) === -1
    ) {
      possArr.push(n);
    }
  }
  return possArr;
}
function checkQuadrant(r, c, gameArr) {
  var qudarantArr = [];
  for (var i = r; i < r + 3; i++) {
    for (var j = c; j < c + 3; j++) {
      if (qudarantArr.indexOf(gameArr[i][j]) === -1 || gameArr[i][j] === 0) {
        qudarantArr.push(gameArr[i][j]);
      } else {
        return false;
      }
    }
  }
  return true;
}
function isValidSudoku(gameArr) {
  if (!checkQuadrant(0, 0, gameArr)) return false;
  if (!checkQuadrant(0, 3, gameArr)) return false;
  if (!checkQuadrant(0, 6, gameArr)) return false;

  if (!checkQuadrant(3, 0, gameArr)) return false;
  if (!checkQuadrant(3, 3, gameArr)) return false;
  if (!checkQuadrant(3, 6, gameArr)) return false;

  if (!checkQuadrant(6, 0, gameArr)) return false;
  if (!checkQuadrant(6, 3, gameArr)) return false;
  if (!checkQuadrant(6, 6, gameArr)) return false;

  for (var i = 0; i < gameArr.length; i++) {
    var rowNumbers = [];
    for (var j = 0; j < gameArr.length; j++) {
      if (rowNumbers.indexOf(gameArr[i][j]) === -1 || gameArr[i][j] === 0) {
        rowNumbers.push(gameArr[i][j]);
      } else {
        return false;
      }
    }
  }

  for (var i = 0; i < gameArr.length; i++) {
    var colNumbers = [];
    for (var j = 0; j < gameArr.length; j++) {
      if (colNumbers.indexOf(gameArr[j][i]) === -1 || gameArr[j][i] === 0) {
        colNumbers.push(gameArr[j][i]);
      } else {
        return false;
      }
    }
  }
  return true;
}
 */

/* function numbersMaker(obj) {
  while (checkGrid(obj)) {
    obj.forEach((outterNumbersX, parentY) => {
      outterNumbersX.forEach((outterNumbersY, parentX) => {
        outterNumbersY.forEach((innerNumbers, childX) => {
          innerNumbers.forEach((number, childY) => {
            if (obj[parentY][parentX][childX][childY] == ".") {
              const indexObj = { parentY, parentX, childX, childY };
              for (let k = 1; k <= 9; k++) {
                if (isValid(indexObj, obj, `${k}`)) {
                  obj[parentY][parentX][childX][childY] = `${k}`;
                  if (numbersMaker(obj)
                    return true;
                  } else {
                    obj[parentY][parentX][childX][childY] = ".";
                  }
                }
              }
              return false;
            }
          });
        });
      });
    });
  }
} */
/* function numbersMaker(obj) {
  obj.forEach((outterNumbersX, parentY) => {
    outterNumbersX.forEach((outterNumbersY, parentX) => {
      outterNumbersY.forEach((innerNumbers, childX) => {
        innerNumbers.forEach((number, childY) => {
          if ((obj[parentY][parentX][childX][childY] = ".")) {
            const indexObj = { parentY, parentX, childX, childY };
            for (let k = 1; k <= 9; k++) {
              if (isValid(indexObj, obj)) {
                obj[parentY][parentX][childX][childY] = k;
                if (numbersMaker(obj)) {
                  return true;
                } else {
                  obj[parentY][parentX][childX][childY] = ".";
                }
              }
            }
            return false;
          }
        });
      });
    });
  });

  return true;
} */
//first row
function firstArr() {
  for (let i = 0; i <= 2; i++) {
    for (let j = 0; j <= 2; j++) {
      let rowArr = findRowArr(0, 0, state.numbers);
      rowArr = filteredArr(rowArr);

      let num = rowArr[Math.floor(Math.random() * rowArr.length)];
      state.numbers[0][i][0][j] = {
        insert: num
      };
    }
  }
}

function randomArr(spots) {
  const coordinates = generateCords(spots);
  coordinates.forEach(coordinate => {
    const { parentX, parentY, childX, childY } = coordinate;
    const num = generateNumForCell(coordinate, state.numbers);
    state.numbers[parentY][parentX][childX][childY] = {
      insert: num
    };
  });
}
function getRandomInRange() {
  return (Math.random() * 2).toFixed(0) * 1;
}
function generateCords(num) {
  let coordinate = [];
  for (var i = 0; i < num; i++) {
    const obj = {
      parentX: getRandomInRange(),
      parentY: getRandomInRange(),
      childX: getRandomInRange(),
      childY: getRandomInRange()
    };
    coordinate.push(obj);
  }
  return coordinate;
}

function isValid(indexObj, obj, num) {
  const { parentX, parentY, childX, childY } = indexObj;

  const gridArr = obj[parentY][parentX].flat();
  const rowArr = findRowArr(parentY, childX, obj);
  const colArr = findColArr(parentX, childY, obj);

  const combineArr = [].concat(gridArr, rowArr, colArr);

  return !combineArr.includes(num) ? true : false;
}

function checkGrid(obj) {
  obj.forEach((outterNumbersX, parentY) => {
    outterNumbersX.forEach((outterNumbersY, parentX) => {
      outterNumbersY.forEach((innerNumbers, childX) => {
        innerNumbers.forEach((number, childY) => {
          if (obj[parentY][parentX][childX][childY] == ".") {
            return false;
          }
        });
      });
    });
  });
  return true;
}

function generateNumForCell(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function find_possibilities(indexObj, numObj) {
  const { parentX, parentY, childX, childY } = indexObj;

  const gridArr = numObj[parentY][parentX].flat();
  const rowArr = findRowArr(parentY, childX, state.numbers);
  const colArr = findColArr(parentX, childY, state.numbers);
  const combineArr = [].concat(gridArr, rowArr, colArr);

  return filteredArr(combineArr);
}

function filteredArr(arr) {
  // let nums = [...Array(10).keys()].map(x => x++);
  let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let newArr = [];
  arr.forEach(obj => {
    newArr.push(obj.insert);
  });
  nums = nums.filter(num => {
    return !newArr.includes(num);
  });
  return nums;
}

function findRowArr(parentIndex, childIndex, numObj) {
  let row = [];
  let row1 = [];
  let row2 = [];
  numObj[parentIndex].forEach(obj => {
    row.push(obj);
  });
  row.forEach(obj => {
    row1.push(obj[childIndex]);
  });
  row1 = row1.flat();
  row1.forEach(obj => {
    row2.push(obj.insert);
  });
  return row1;
}

function findColArr(parentIndex, childIndex, numObj) {
  let row = [];
  let row1 = [];
  let row2 = [];
  numObj.forEach(obj => {
    row.push(obj[parentIndex]);
  });
  row = row.flat();
  row.forEach(obj => {
    row1.push(obj[childIndex]);
  });
  row1.forEach(obj => {
    row2.push(obj.insert);
  });
  return row1;
}
const cell = { insert: ".", ans: 2, hint: 3, count: "" };

const state = {
  numbers: [
    [
      [
        [cell, cell, cell],
        [cell, cell, cell],
        [cell, cell, cell]
      ],
      [
        [cell, cell, cell],
        [cell, cell, cell],
        [cell, cell, cell]
      ],
      [
        [cell, cell, cell],
        [cell, cell, cell],
        [cell, cell, cell]
      ]
    ],
    [
      [
        [cell, cell, cell],
        [cell, cell, cell],
        [cell, cell, cell]
      ],
      [
        [cell, cell, cell],
        [cell, cell, cell],
        [cell, cell, cell]
      ],
      [
        [cell, cell, cell],
        [cell, cell, cell],
        [cell, cell, cell]
      ]
    ],
    [
      [
        [cell, cell, cell],
        [cell, cell, cell],
        [cell, cell, cell]
      ],
      [
        [cell, cell, cell],
        [cell, cell, cell],
        [cell, cell, cell]
      ],
      [
        [cell, cell, cell],
        [cell, cell, cell],
        [cell, cell, cell]
      ]
    ]
  ],
  select: { parentX: "", parentY: "", childX: "", childY: "" }
};

// getters
const getters = {};

// actions
const actions = {
  select(context, payload) {
    context.commit("select", payload);
  },
  createNumbers(context) {
    console.log("create numbers");
    context.commit("createNumbers");
  }
};

// mutations
const mutations = {
  select(state, payload) {
    state.select.parentX = payload.parentX;
    state.select.parentY = payload.parentY;
    state.select.childX = payload.childX;
    state.select.childY = payload.childY;
  },
  createNumbers(state, payload) {
    console.log("create");
    let counter = 0;
    console.time();

    //random first row
    firstArr();
    /* solveSudoku(grid, 9, 9);
    console.log(grid); */

    solveSudoku(gameArr);

    console.log("Solved");
    console.log(gameArr);
    console.log(isValidSudoku(gameArr));
    //random gnerate numbers
    /* randomArr(100); */
    /*    fillGrid(grid); */
    /*

*/
    /*
    // recursive algo
    function solveSudoku(grid, row, col) {
      var cell = findUnassignedLocation(grid, row, col);
      row = cell[0];
      col = cell[1];

      // base case: if no empty cell
      if (row == -1) {
        console.log("solved");
        return true;
      }

      for (var num = 1; num <= 9; num++) {
        if (noConflicts(grid, row, col, num)) {
          grid[row][col] = num;

          if (solveSudoku(grid, row, col)) {
            return true;
          }

          // mark cell as empty (with 0)
          grid[row][col] = 0;
        }
      }

      // trigger back tracking
      return false;
    }

    function findUnassignedLocation(grid, row, col) {
      var done = false;
      var res = [-1, -1];

      while (!done) {
        if (row == 9) {
          done = true;
        } else {
          if (grid[parentX][parentY][childX][childY] == "") {
            res[0] = row;
            res[1] = col;
            done = true;
          } else {
            if (col < 8) {
              col++;
            } else {
              row++;
              col = 0;
            }
          }
        }
      }

      return res;
    }
*/
    /* let num =
      filteredCombineArr[Math.floor(Math.random() * filteredCombineArr.length)];

    for (let i = 0; i <= 2; i++) {
      for (let j = 0; j <= 2; j++) {
        let rowArr = findRowArr(0, 0, state.numbers);
        rowArr = filteredArr(rowArr);
        let num = rowArr[Math.floor(Math.random() * rowArr.length)];
        state.numbers[0][i][0][j] = {
          insert: num
        };
      }
    } */

    console.timeEnd();
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
