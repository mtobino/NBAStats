// Set the fetch to a GET
const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

const urlLink = "https://nba-stats-db.herokuapp.com/api/playerdata/?page=";

/**
 * Get the JSON data from the given URL
 * 
 * @param {*} url       The url the data needed is from 
 * @param {*} pageIndex What page the data will be on
 * @returns             The data needed
 */
async function getData(url,pageIndex)
{
    const response = await fetch(url + pageIndex, requestOptions)
    return response.json()
}
/**
 * Gets all of the data from all of the pages
 * 
 * @param {*} url   the starting url 
 * @returns         all JSON data stored into an array
 */
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

/**
 * Gets all of the player names available from the API
 * 
 * @param {*} startingUrl   the start point 
 * @returns                 a set containing exactly one copy of each name the API provided
 */
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