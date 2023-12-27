var currentPlayer = 'X';

function makeMove(cellId) 
{
  var cell = document.getElementById(cellId);

  if (cell.value === '' && !isGameFinished()) 
  {
    cell.value = currentPlayer;
    cell.disabled = true;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateGameStatus();
  }
}

function isGameFinished() 
{
  return (
    isWinner('X') || isWinner('O') || document.querySelectorAll('.cell[disabled]').length === 9
  );
}

function isWinner(player) 
{
  var lines = [
    ['b1', 'b2', 'b3'],
    ['b4', 'b5', 'b6'],
    ['b7', 'b8', 'b9'],
    ['b1', 'b4', 'b7'],
    ['b2', 'b5', 'b8'],
    ['b3', 'b6', 'b9'],
    ['b1', 'b5', 'b9'],
    ['b3', 'b5', 'b7'],
  ];

  for (var i = 0; i < lines.length; i++) 
  {
    var [a, b, c] = lines[i];
    if (document.getElementById(a).value === player &&
      document.getElementById(b).value === player &&
      document.getElementById(c).value === player) 
    {
      highlightWinnerCells(a, b, c);
      return true;
    }
  }

  return false;
}

function highlightWinnerCells(cell1, cell2, cell3) 
{
  document.getElementById(cell1).style.color = '#FF5200';
  document.getElementById(cell2).style.color = '#FF5200';
  document.getElementById(cell3).style.color = '#FF5200';
}

function updateGameStatus() 
{
  if (isWinner('X')) 
  {
    document.getElementById('print').innerHTML = 'Player X won';
    disableAllCells();
  } 
  else if (isWinner('O')) 
  {
    document.getElementById('print').innerHTML = 'Player O won';
    disableAllCells();
  } 
  else if (document.querySelectorAll('.cell[disabled]').length === 9) 
  {
    document.getElementById('print').innerHTML = 'Match Tie';
  } 
  else 
  {
    document.getElementById('print').innerHTML = `Player ${currentPlayer} Turn`;
  }
}

function disableAllCells() 
{
  var cells = document.querySelectorAll('.cell');
  cells.forEach(cell => 
  {
    cell.disabled = true;
  });
}

function resetGame() 
{
  var cells = document.querySelectorAll('.cell');
  cells.forEach(cell => 
  {
    cell.value = '';
    cell.style.color = '';
    cell.disabled = false;
  });

  document.getElementById('print').innerHTML = '';
  currentPlayer = 'X';
}
