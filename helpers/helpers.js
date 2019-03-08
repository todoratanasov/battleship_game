const helpers = (function () {
    //generate a random starting column
    const colGenerator=(num,restriction1, restriction2)=>{
        let output = Math.floor((Math.random() * num));
        //check for duplicating starting column
        if(restriction1!==undefined&&restriction2===undefined) {
            do {
                output = Math.floor((Math.random() * num));
            }
            while (output === restriction1)
        }else if(restriction1||restriction2){
            do {
                output = Math.floor((Math.random() * num));
            }
            while (output === restriction1||output===restriction2)
        }
        return output;
    };
    //generate a random starting row
    const rowGenerator=(num, restriction1, restriction2)=>{
        let output=String.fromCharCode(Math.floor(Math.random() * num) + 97);
        //check for duplicating starting row
        if(restriction1!==undefined&&restriction2===undefined){
            do {
                output = String.fromCharCode(Math.floor(Math.random() * num) + 97);
            }
            while (output === restriction1)
        }else if(restriction1||restriction2){
            do {
                output = String.fromCharCode(Math.floor(Math.random() * num) + 97);
            }
            while (output === restriction1||output===restriction2)
        }
        return output;
    };
    //display any messages
    const informationBar = (bar, msg)=>{
        bar.textContent = msg;

    };

    //create a red impression of a shot at the fired field
    const shot = (field)=>{
        field.classList.add("shot");
        setTimeout(()=>{
            field.classList.remove("shot")
        },100)
    };

    //remove the fired coordinate from the coordinate array of a ship
    const removeCoor = (ship,coor)=>{
        for(let i=0;i<ship.length;i++){
            if(ship[i]===coor){
                ship.splice(i,1)
            }
        }
    };

    //check if all coordinates of a ship are fired
    const coordinatesCheck=(row,col,information)=>{
        let coor=`${row}${col}`;
        if(playBoard.bigShipCoordinates.includes(coor)){
            removeCoor(playBoard.bigShipCoordinates,coor);
            if(playBoard.bigShipCoordinates.length===0){
                informationBar(information,"*** Sunk ***")
                return false;
            }
        }
        if(playBoard.firstSmallShipCoordinates.includes(coor)){
            removeCoor(playBoard.firstSmallShipCoordinates,coor);
            if(playBoard.firstSmallShipCoordinates.length===0){
                informationBar(information,"*** Sunk ***")
                return false;
            }
        }
        if(playBoard.secondSmallShipCoordinates.includes(coor)){
            removeCoor(playBoard.secondSmallShipCoordinates,coor);
            if(playBoard.secondSmallShipCoordinates.length===0){
                informationBar(information,"*** Sunk ***")
                return false;
            }
        }
        return true;
    };

    //creating elements for the rendering function
    const renderBoard = (id,x)=>{
        const element = document.createElement("td")
        const span=document.createElement("span");
        span.setAttribute("id",id);
        span.textContent = x;
        element.appendChild(span)
        return element;
    };
    return {
        colGenerator,
        rowGenerator,
        informationBar,
        shot,
        coordinatesCheck,
        renderBoard,
    }
})();