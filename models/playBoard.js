const playBoard = (function () {
    //record the coordinates of the ships
    let bigShipCoordinates = [];
    let firstSmallShipCoordinates=[];
    let secondSmallShipCoordinates=[];

    const tableGenerator=()=>{
        let board = {};
        //assign a random starting point of the big ship
        let bigShipStartCol = helpers.colGenerator(9);
        let bigShipStartRow = helpers.rowGenerator(6);
        let bigShipSize = 0;
        let placeBig = false;

        //assign a random starting point of the first small ship
        let firstSmallShipStartCol = helpers.colGenerator(9,bigShipStartCol);
        let firstSmallShipStartRow = helpers.rowGenerator(7,bigShipStartRow);
        let firstSmallSize = 0;
        let placeFirst = false;

        //assign a random starting point of the second small ship
        let secondSmallShipStartCol = helpers.colGenerator(9,bigShipStartCol,firstSmallShipStartCol);
        let secondSmallShipStartRow = helpers.rowGenerator(7,bigShipStartRow,firstSmallShipStartRow);
        let secondSmallSize = 0;
        let placeSecond = false;



        //build the playground
        for (let i = 97; i < 107; i++) {

            let key = String.fromCharCode(i);
            board[key] = [];

            for (let j = 0; j < 10; j++) {
                let symbol = ".";

                if(key===bigShipStartRow){
                    placeBig=true;
                }
                if(key===firstSmallShipStartRow){
                    placeFirst=true
                }
                if(key===secondSmallShipStartRow){
                    placeSecond=true;
                }
                if((j===bigShipStartCol)&&bigShipSize<5&&placeBig){
                    let coordinates = `${key}${j}`;
                    bigShipCoordinates.push(coordinates);
                    symbol="X";
                    bigShipSize++
                }
                if((j===firstSmallShipStartCol)&&firstSmallSize<4&&placeFirst){
                    let coordinates = `${key}${j}`;
                    firstSmallShipCoordinates.push(coordinates)
                    symbol="X";
                    firstSmallSize++
                }
                if((j===secondSmallShipStartCol)&&secondSmallSize<4&&placeSecond){
                    let coordinates = `${key}${j}`;
                    secondSmallShipCoordinates.push(coordinates);
                    symbol="X";
                    secondSmallSize++
                }
                board[key].push(symbol)
            }
        }
        return board;
    };



    return {
        tableGenerator,
        bigShipCoordinates,
        firstSmallShipCoordinates,
        secondSmallShipCoordinates

    }
})();