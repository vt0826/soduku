var gameArr = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0]
];

function createSuduku() {
  const initArr = firstArr();

  gameArr[0] = initArr;
  console.log(initArr);
  const newgameArr = solveSudoku(gameArr);
  console.log(gameArr);
  return solveSudoku(newgameArr);
}

function solveSudoku(gameArr) {
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

const memoize = fn => {
  let cache = {};
  return (...args) => {
    let n = args[0];
    if (n in cache) {
      return cache[n];
    } else {
      let result = fn(n);
      cache[n] = result;
      return result;
    }
  };
};
const factorial = memoize(x => {
  if (x === 0) {
    return 1;
  } else {
    return x * factorial(x - 1);
  }
});

function randomizeLists(fn) {
  return function(...args) {
    var nums = [...Array(args[0] + 1).keys()];
    nums.shift();
    let listNum = args[1];
    let ranNums = [],
      i = nums.length,
      j = 0;

    while (i--) {
      j = fn(i);
      ranNums.push(nums[j]);
      nums.splice(j, 1);
      if (ranNums.length == listNum) {
        console.log(i, listNum);
        break;
      }
    }
    return ranNums;
  };
}

function randomNumbers(num) {
  return Math.floor(Math.random() * (num + 1));
}

const getRandNums = randomizeLists(randomNumbers);

export function firstArr1() {
  const firstRowRandNums = getRandNums(9, 9);
  const RandomSpots = getRandNums(81, 7);
  console.log(firstRowRandNums, RandomSpots);
}

export {
  /* solveSudoku, */
  createSuduku
};
