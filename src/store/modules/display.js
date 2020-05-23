import { createSuduku, firstArr1 } from "../../store/modules/soduku";

function solveSudoku(gameObj) {
  firstArr();
  const emptySpot = nextEmtySpot(gameObj);
  console.log(emptySpot);
  const { parentY, parentX, childX, childY } = emptySpot;

  console.log(parentY, parentX, childX, childY);
  // if the game is unsolvable don't even try to solve it
  /* if (!isValidSudoku(gameArr)) return gameArr;

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

  return gameArr; */
}
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
/* 
function nextEmtySpot(obj) {
  obj.forEach((outterNumbersX, parentY) => {
    outterNumbersX.forEach((outterNumbersY, parentX) => {
      outterNumbersY.forEach((innerNumbers, childX) => {
        innerNumbers.forEach((number, childY) => {
          if (obj[parentY][parentX][childX][childY].insert === ".") {
            console.log("hihi");
            return { parentY, parentX, childX, childY };
            break;
          }
        });
      });
    });
  });

  return -1;
} */

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
const cell = { insert: "2", ans: 2, hint: 3, count: "" };

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
  enterNumber(contex, payload) {
    contex.commit("enterNumber", payload);
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

  enterNumber(state, payload) {
    let selected = state.select;
    state.numbers[selected.parentY][selected.parentX][selected.childX][
      selected.childY
    ];
  },
  createNumbers(state, payload) {
    console.log("create");
    let counter = 0;
    console.time();

    //random first row
    firstArr1();
    /*  solveSudoku(state.numbers);

    const arr = createSuduku().flat();
 */
    /*  let index = 0;
    state.numbers.forEach((outterNumbersX, parentY) => {
      outterNumbersX.forEach((outterNumbersY, parentX) => {
        outterNumbersY.forEach((innerNumbers, childX) => {
          innerNumbers.forEach((number, childY) => {
            state.numbers[parentY][parentX][childX][childY] = {
              insert: arr[index]
            };
            index++;
          });
        });
      });
    });
 */

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
