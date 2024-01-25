
import {useState} from 'react';
import { GameBoard } from './components/GameBoard/GameBoard.jsx';
import {Player} from './components/Player/Player.jsx'
import { Log } from './components/Log/Log.jsx'
import { WINNING_COMBINATIONS} from './winning-combinations.jsx'
import { GameOver } from './components/GameOver/GameOver.jsx';

const PLAYERS={
  X:'PLAYER 1',
  O:'PLAYER 2'
}
const initialBoard =[
  [null,null,null],
  [null,null,null],
  [null,null,null],
];

function helpDerivedPlayer(gameTurns){

      let currentPlayers = 'X';

      if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
        currentPlayers = 'O';
      }

      return currentPlayers;
}

function getWinner(gameBoard,playerName){
  let winner;

  for(const combination of WINNING_COMBINATIONS){
   const first = gameBoard[combination[0].row][combination[0].column];
   const second = gameBoard[combination[1].row][combination[1].column];
   const third = gameBoard[combination[2].row][combination[2].column];


   if(first && first === second && second === third){
    winner = playerName[first];
   }
  }

  return winner;
}

function derivedBoard(gameturns){
  let gameBoard = [...initialBoard.map((row) => [...row])];

      for(const turn of gameturns){
        const {square ,player} = turn;
        const {col,row} = square;
        gameBoard[row][col] = player;
      }

      return gameBoard;
}

function App() {
  const [gameturns,setGameTurns] = useState([]);
  const [playerName,setPlayerName] = useState(PLAYERS);
  //const [currentPlayer,setCurrentplayer] = useState('X');

  let currentPlayers = helpDerivedPlayer(gameturns);

  function changePlayer(rowIndex,colIndex){

   // setCurrentplayer((value) => value === 'X'?'O':'X');

    setGameTurns((prevVal) => {
      // let currentPlayers = 'X';

      // if(prevVal.length > 0 && prevVal[0].player === 'X'){
      //   currentPlayers = 'O';
      // }
      let currentPlayers = helpDerivedPlayer(prevVal);

      const UpdateTurns =[
          {square : {row:rowIndex,col:colIndex}, player :currentPlayers},
          ...prevVal
      ];

      return UpdateTurns;
    });
  }

      const gameBoard = derivedBoard(gameturns);
      const winner = getWinner(gameBoard,playerName);
      const hasDraw = !winner && gameturns.length === 9;
      

      function reMatch(){
        setGameTurns([]);
        console.log("inside reMatch state changed");
      }

      function nameChange(symbol,newName){
        setPlayerName(prePlayer => {
          return {
            ...prePlayer,
             [symbol]: newName 
          }
        });
    }

  return (
   <main>
    <div id ="game-container">
      <ol id ="players" className='highlight-player'>
        <Player name={PLAYERS.X} symbol="X" isActive={currentPlayers ==='X'} nameChange ={nameChange}></Player>
        <Player name={PLAYERS.O} symbol="O" isActive={currentPlayers ==='O'} nameChange ={nameChange}></Player>
      </ol>
      {
        ((winner || hasDraw) && <GameOver winner={winner} onRestart={reMatch}></GameOver>)
      }
      <GameBoard onSelecteSquare={changePlayer} gameTurns={gameBoard}></GameBoard>
    </div>
    <Log gameTurns ={gameturns}></Log>
   </main>
  );
}

export default App
