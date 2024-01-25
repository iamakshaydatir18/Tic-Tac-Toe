
import { useState } from 'react';

export function Player({name,symbol,isActive,nameChange}){

    const [isEditing,setEditing] = useState(false);
    const [changeName,setChangeName] = useState(name);


    function handleEditClick(){

        setEditing((editing) => !editing);

        if(isEditing){
            nameChange(symbol,changeName);
        }
        
    }

    function changeNameHandler(event){
        setChangeName(event.target.value);

    }
    
    let payerEditName = <span className="player-name">{changeName}</span>;

    if(isEditing){
        payerEditName = <input type="text" value={changeName} className='player input' onChange={changeNameHandler} required/>;
       
    }

    return (<li className={isActive?'active':undefined}>
        <span id="player">
        {payerEditName}
        <span className="player-symbol">{symbol}</span>
        </span> 
        <button onClick={handleEditClick}>{isEditing?'Save':'Edit'}</button>
      </li>);
}