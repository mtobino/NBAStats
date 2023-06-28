// Set the fetch to a GET
const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

// var pageIndex = 1
// const playerSet = new Set();
// const playerList = Array.from(getAllPlayerNames());
// /**
//  * Update the Player Name set to contain all of the players that the database page has
//  * 
//  * @param {*} jsonData 
//  */
// function updatePlayerSet(jsonData)
// {
//   let data = JSON.parse(jsonData);
//   for(let i = 0; i < data.results.length; i++)
//   {
//     let playerName = data.results[i].name;
//     playerSet.add(playerName);
//   }
// }



// /**
//  * Function to get all the Player names stored in the player data section of the API
//  */
// function getAllPlayerNames(){
//  do{
//   fetch("https://nba-stats-db.herokuapp.com/api/playerdata/?page=" + pageIndex,
//   requestOptions)
//     .then(response => response.text())
//     .then(result => updatePlayerSet(result))
//     .catch((error) => {
//       console.log("Error:", error);
//     });
//     pageIndex++;
//   }while(pageIndex <= 60);
//   console.log(playerSet);
//   return playerSet;
// }

const urlLink = "https://nba-stats-db.herokuapp.com/api/playerdata/?page=";

async function getData(url,pageIndex)
{
    const response = await fetch(url + pageIndex, requestOptions)
    return response.json()
}

async function getAllData(url)
{
    let dataArray = new Array();
    let pageIndex = 1;
    while(pageIndex <= 60 )
    {
        const data = await getData(url, pageIndex);
        dataArray.push(data);
        pageIndex++;
    }
    return dataArray
}

async function getAllPlayers(startingUrl)
{
    let playerSet = new Set();
    let dataArray = await getAllData(startingUrl);
    for(let i = 0; i < dataArray.length; i++)
    {
        for(let j = 0; j < dataArray[i].results.length; j++)
        {

            playerSet.add(dataArray[i].results[j].name);
        }
    }
    return playerSet;
}

const playerList = Array.from(await getAllPlayers(urlLink));
console.log(playerList);

export default playerList;