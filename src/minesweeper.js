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

    const randomRowIndex = Math.floor(Math.random() * numberOfRows);
    const randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
    board[randomRowIndex][randomColumnIndex] = 'B';
    numberOfBombsPlaced++;
  }


  return board;
};

const printBoard = (board) => {
  console.log(`Current Board:`);
  console.log(board.map(row => row.join(' | ')).join('\n'));
};

const playerBoard = generatePlayerBoard(6,4);
const bombBoard = generateBombBoard(6,4,4);
printBoard(playerBoard);
