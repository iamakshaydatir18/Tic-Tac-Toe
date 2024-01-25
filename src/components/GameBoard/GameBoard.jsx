

export function GameBoard({onSelecteSquare,gameTurns}){

    // const[chnageBoard,setChangeBoard] = useState(initialBoard);

    // function ChangeBoard(rowIndex,colIndex){

    //     setChangeBoard((prevBoard) => {
    //         const updatebord =[...prevBoard.map(row => [...row])];

    //         updatebord[rowIndex][colIndex] = activePlayerSymbol;

    //         return updatebord;
    //     });
    //     onSelecteSquare();
        
    // }

    // let gameBoard = initialBoard;

    // for(const turn of turns){
    //     const {square ,player} = turn;
    //     const {col,row} = square;
    //     gameBoard[row][col] = player;
    // }

    return (<ol id="game-board">
        {gameTurns.map((row,rowIndex) => (
            <li key={rowIndex}>
                <ol>
                    {row.map((playerSyambol,colIndex)=>
                    <li key={colIndex}>
                        <button onClick={() => onSelecteSquare(rowIndex,colIndex)} disabled ={playerSyambol !== null}>{playerSyambol}</button>
                    </li>
                    )}
                </ol>
            </li>
        ) )}
        </ol>);
    
} 