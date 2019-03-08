const boardController = (function () {
    //render the starting board
    const createStartingBoard=(board,container,showView)=>{

        let created = true;

        //check for cheat mode and prepare the container
        if(showView){
            container.innerHTML = ""
        }
        //loop through the board of the game
        for(let arr in board){
            let output = "."
            let counter = 0;
            let row = document.createElement("tr");
            //loop trough every array of the board
            board[arr].forEach((content)=>{
                //check for cheat mode
                if(showView){
                    if(content==="X"){
                        output=`${content}`
                    }else{
                        output=" "
                    }
                }
                //create the X coordinate of the displayed board
                if(arr==="a"&&created){
                    const firstRow = document.createElement("tr");
                    for (let i=1; i<11; i++){
                        let td=document.createElement("td");
                        if(i===1){
                            let empty = document.createElement("td")
                            firstRow.appendChild(empty);
                        }
                        td.textContent = `${i}`;
                        firstRow.appendChild(td);
                    }
                    created=false;
                    container.appendChild(firstRow)
                }

                //create the Y coordinates of the displayed board
                if(counter===0){
                    const tab=document.createElement("td");
                    tab.textContent = `${arr.toUpperCase()}`;
                    row.appendChild(tab);
                }
                let id=arr+counter;
                row.appendChild(helpers.renderBoard(id,output));
                counter++

                //render the current row
                if(counter===10){
                    container.appendChild(row);
                }
            })
        }
    };

    //changing the field if there is a miss
    const miss = (row,col,field,board)=>{
        helpers.shot(field);
        board[row][col] = "-";
        field.textContent = "-"
    };

    //changing the field if there is a hit
    const hit = (field)=>{
        helpers.shot(field);
        field.textContent="X"
    };
    return {
        createStartingBoard,
        miss,
        hit,
    };
}());