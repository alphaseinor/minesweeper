'use strict';

var generatePlayerBoard = function generatePlayerBoard(numberOfRows, numberOfColumns) {
  var board = [];
  for (var rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
    var row = [];
    for (var columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
      row.push(' ');
    }
    board.push(row);
  }
  return board;
};

var generateBombBoard = function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
  var board = [];
  var numberOfBombsPlaced = 0;

  for (var rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
    var row = [];
    for (var columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
      row.push(null);
    }
    board.push(row);
  }
  //random number generator for bomb map
  //control flow bug: more than one bomb can be assigned to the same square
  while (numberOfBombsPlaced < numberOfBombs) {
    var randomRowIndex = Math.floor(Math.random() * numberOfRows); //random number for rows
    var randomColumnIndex = Math.floor(Math.random() * numberOfColumns); //random number for columns
    if (board[randomRowIndex][randomColumnIndex] !== 'B') {
      //checks to see if there is already a bomb placed
      board[randomRowIndex][randomColumnIndex] = 'B'; //if bomb is not place then place a bomb
      numberOfBombsPlaced++; //if bomb is placed increment numberOfBombsPlaced
    }
  }
  return board;
};

var getNumberOfNeighborBombs = function getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex) {
  var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
  var numberOfRows = bombBoard.length;
  var numberOfColumns = bombBoard[0].length;
  var numberOfBombs = 0;
  neighborOffsets.forEach(function (offset) {
    var neighborRowIndex = rowIndex + offset[0];
    var neighborColumnIndex = columnIndex + offset[1];
    if (neighborRowIndex >= 0 && neighborRowIndex < numberOfColumns && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
      if (bombBoard[neighborRowIndex][neighborColumnIndex] == 'B') {
        numberOfBombs++;
      }
    }
  });
  return numberOfBombs;
};

var flipTile = function flipTile(playerBoard, bombBoard, rowIndex, columnIndex) {
  if (playerBoard[rowIndex][columnIndex] !== ' ') {
    console.log("This tile has already been flipped");
    return;
  } else if (bombBoard[rowIndex][columnIndex] == 'B') {
    playerBoard[rowIndex][columnIndex] = 'B';
  } else {
    playerBoard = getNumberOfNeighborBombs(bombBoard, playerBoard, rowIndex, columnIndex);
  }
};

var printBoard = function printBoard(board) {
  console.log(board.map(function (row) {
    return row.join(' | ');
  }).join('\n'));
};

var playerBoard = generatePlayerBoard(2, 2);
var bombBoard = generateBombBoard(2, 2, 2);
console.log('Current Board:');
printBoard(playerBoard);
console.log('Bomb Board:');
printBoard(bombBoard);
flipTile(playerBoard, bombBoard, 0, 0);
console.log('Updated Player Board:');
printBoard(playerBoard);