
export function GameOver({winner, onRestart,name}){

    return <div id ="game-over">
        <h2>game Over!</h2>
        {winner?<p>{winner} won!</p>:<p>It's a draw</p>}
        <p>
            <button onClick={onRestart} >Rematch!</button>
        </p>
    </div>
}