const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  let board = [];
  for(let rowIndex = 0; rowIndex < numberOfRows; rowIndex++ ){
    let row = [];
    for (var columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
      row.push(' ');
    }
    board.push(row);
  }
  return board;
};

const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  let board = [];
  let numberOfBombsPlaced = 0;

  for(let rowIndex = 0; rowIndex < numberOfRows; rowIndex++ ){
    let row = [];
    for (var columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
      row.push(null);
    }
    board.push(row);
  }
  //random number generator for bomb map
  //control flow bug: more than one bomb can be assigned to the same square
  while (numberOfBombsPlaced < numberOfBombs) {
    const randomRowIndex = Math.floor(Math.random() * numberOfRows); //random number for rows
    const randomColumnIndex = Math.floor(Math.random() * numberOfColumns); //random number for columns
    if(board[randomRowIndex][randomColumnIndex] !== 'B'){ //checks to see if there is already a bomb placed
    board[randomRowIndex][randomColumnIndex] = 'B'; //if bomb is not place then place a bomb
    numberOfBombsPlaced++; //if bomb is placed increment numberOfBombsPlaced
    }
  }
  return board;
};

const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) =>{
    const offsets = [
    [-1,-1],
    [-1,0],
    [-1,1],
    [0,-1],
    [0,1],
    [1,-1],
    [1,0],
    [1,1],
  ];
  const numberOfRows = bombBoard.length;
  const numberOfColumns = bombBoard[0].length;

  let numberOfBombs = 0;
  offsets.forEach(offset =>{
    const neighborRow = rowIndex + offset[0];
    const neighborColumn = columnIndex + offset[1];
    if(neighborRow >= 0 && neighborRow < numberOfRows && neighborColumn >= 0 && neighborColumn < numberOfColumns){
      if(bombBoard[neighborRow][neighborColumn] === 'B' ){
        numberOfBombs++;

      }
    }
  });
  return numberOfBombs;
};

const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
  if(playerBoard[rowIndex][columnIndex] !== ' '){
    console.log("This tile has already been flipped");
    return;
  } else if(bombBoard[rowIndex][columnIndex] == 'B'){
      playerBoard[rowIndex][columnIndex] = 'B';
  } else {
    playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
  }
};

const printBoard = (board) => {
  console.log(board.map(row => row.join(' | ')).join('\n'));
};

const playerBoard = generatePlayerBoard(6,6);
const bombBoard = generateBombBoard(6,6,3);
console.log(`Current Board:`);
printBoard(playerBoard);
console.log(`Bomb Board:`);
printBoard(bombBoard);
flipTile(playerBoard, bombBoard, 0,5);
console.log('Updated Player Board:');
printBoard(playerBoard);
