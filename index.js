let index=(function () {
    const information = document.getElementById('information');
    let totalShots = 0;
    let hits = 13;
    let shots=[];

    //assign the playing board
    let board = playBoard.tableGenerator()
    let container = document.getElementById('container');

    //create and render the playing board
    boardController.createStartingBoard(board,container);

return function takeShot() {
    try{

            //get the user's input
            const command = document.getElementById('command').value.toLowerCase().toString();
            const row = command.slice(0, 1);
            const col = Number(command.substr(1) - 1);
            //check for cheat mode
            if(command.toLowerCase()==="show"){
                let showView = true;
                boardController.createStartingBoard(board,container,showView);
                document.getElementById('command').value = ""
                return
            }



            //assign the value from the board
            const curValue = board[row][col];

            //assign the value of the rendered board
            const field = document.getElementById(`${row}${col}`);

            //compare the user's value and the board's value
            if (curValue === "."||curValue===" ") {
                totalShots++;
                //inform the user
                helpers.informationBar(information, "*** Miss ***");

                //update the board and the user's play board
                boardController.miss(row, col, field, board);

            } else if (curValue === "X"||curValue==="-") {
                totalShots++;
                //check for duplicate shot
                if(shots.includes(command)){
                    //inform the user
                    helpers.informationBar(information,"You've tried here already");

                }else{
                    //check for sunk
                    let sunk = helpers.coordinatesCheck(row,col,information);
                    hits--
                    //inform the user
                    if(!sunk){
                        boardController.hit(field);
                        document.getElementById('command').value = ""

                    }else{
                        helpers.informationBar(information, "*** Hit ***");
                        //update the board and the user's play board
                        boardController.hit(field);
                    }
                }
            }
            else {
                //check for wrong commands
                document.getElementById('command').value = ""
                throw new Error("Wrong command")
            }
            shots.push(command);
            document.getElementById('command').value = ""
        if(hits===0) {
            //hide input field and button and end the game
            document.getElementById("command").classList.add("display-none");
            document.getElementById("fireButton").classList.add("display-none");
            document.getElementById("lable").textContent = `Well done! You completed the game in ${totalShots} shots`
        }
    }catch (e) {
        //error handling
        helpers.informationBar(information,"Please enter correct coordinates");
        console.log(e)
    }


}
})();
//attach the shooting function
document.getElementById('fireButton').addEventListener('click', index);