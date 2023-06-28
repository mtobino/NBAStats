import Player from "./Player.js";
import playerList from "./PlayerList.js";
// set up the main document to be added to
var main = document.querySelector(".maincontent");
// set up the player document to be changed as needed
var playerDoc = document.createElement("article");

// Set the fetch to a GET
const requestOptions = {
  method: "GET",
  redirect: "follow",
};
/**
 * Update the player information with the new player
 * @param {*Player} player 
 */
function playerDisplayHTML(player) {
  playerDoc.classList.add("player");
  playerDoc.setAttribute("id", player.id);
  playerDoc.innerHTML = `
  <h1 class="playerName">${player.name}</h1>
  <ul class="player__stats">
    <li class="stat playerAge">Age: ${player.age} </li>
    <li class="stat playerTeam">Team: ${player.team}</li>
    <li class="playerGameStatsOverall"> 
      <h2>Overall Season Game Stats</h2>
      <ul>
        <li class="stat playerGames">Games: ${player.games} </li>
        <li class="stat playerGamesStarted">Games Started: ${
          player.gamesStarted
        } </li>
        <li class="stat playerMinutesPlayed">Minutes Played: ${
          player.minutesPlayed
        } </li>
        <li class="stat playerPoints">Points: ${player.points}</li>
        <li class="stat playerAssists">Assists: ${player.assists}</li>
        <li class="stat playerSteals">Steals: ${player.steals}</li>
        <li class="stat playerBlocks">Blocks: ${player.blocks}</li>
        <li class="stat playerTurnovers">Turnovers: ${player.turnovers}</li>
        <li class="stat playerPF">Personal Fouls: ${player.personalFouls}</li>
      </ul>
    </li>
    
    <li class="stat playerFieldGoalStats">
      <h2>Field Goal Stats</h2>
      <ul>
        <li class="stat playerFieldGoals">Field Goals: ${
          player.fieldGoals
        } </li>
        <li class="stat playerFieldAttempts">Field Goal Attempts: ${
          player.fieldAttempts
        } </li>
        <li class="stat playerThreeFG">Three Point Field Goals: ${
          player.threeFG
        } </li>
        <li class="stat playerThreeAttempts">Three Point Field Goal Attempts: ${
          player.threeAttempts
        } </li>
        <li class="stat playerThreePercent">Three Point Field Goal Percent: ${
          Math.round(player.threePercent * 1000) / 10
        }% </li>
        <li class="stat playerTwoFG">Two Point Field Goals: ${
          player.twoFG
        } </li>
        <li class="stat playerTwoAttempts">Two Point Field Goal Attempts: ${
          player.twoAttempts
        } </li>
        <li class="stat playerTwoPercent">Two Point Field Goal Percent: ${
          Math.round(player.twoPercent * 1000) / 10
        }% </li>
        <li class="stat playerEffectFGPercent">Effective Field Goal Percent: ${
          Math.round(player.effectFGPercent * 1000) / 10
        }% </li>    
      </ul>
    </li>
    <li class="stat playerFreeThrowStats"> 
      <h2>Free Throw Stats</h2>
      <ul>
      <li class="stat playerFreeThrowMade">Free Throws: ${
        player.freeThrow
      } </li>
      <li class="stat playerFreeThrowAttempts">Free Throw Attempts: ${
        player.freeThrowAttempts
      } </li>
      <li class="stat playerFreeThrowPercent">Free Throw Percent: ${
        Math.round(player.freeThrowPercent * 1000) / 10
      }% </li>
      </ul>
    </li>
    <li class="stat playerReboundStats">
      <h2>Rebound Stats</h2>
      <ul>
      <li class="stat playerOffensiveRebound">Offensive Rebounds: ${
        player.offensiveRebound
      } </li>
      <li class="stat playerDefensiveRebound">Defensive Rebounds: ${
        player.defensiveRebound
      } </li>
      <li class="stat playerTotalRebound">Total Rebounds: ${
        player.totalRebound
      } </li>     
      </ul>
    </li>
  </ul>
  `;
}


function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
              b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}
/*execute a function when someone clicks in the document:*/
document.addEventListener("click", function (e) {
    closeAllLists(e.target);
});
}

// get all of the NBA Player names from the API
const searchForm = document.createElement("form");
searchForm.classList.add(`search`);
searchForm.setAttribute("autocomplete", "off")
searchForm.setAttribute("action", "/action_page.php")

// Populate form with an input and a button
searchForm.innerHTML = `
  <div class="autocomplete" style="width:300px;">
    <input type="text" class="PlayerName" placeholder="Enter Player Name"/>
  </div>
    <select class="PlayerSeason" placeholder="Choose a Season">
    <option value=2023>2023</option>
    <option value=2022>2022</option>
    <option value=2021>2021</option>
    <option value=2020>2020</option>
    <option value=2019>2019</option>
    <option value=2018>2018</option>
    <option value=2017>2017</option>
    <option value=2016>2016</option>
    <option value=2015>2015</option>
    <option value=2014>2014</option>
    <option value=2013>2013</option>
    <option value=2012>2012</option>
    <option value=2011>2011</option>
    <option value=2010>2010</option>
  </select>
  <button>Search</button>
`;
// Add event listener to the form submit action
searchForm.addEventListener("submit", (e) => {
  // Stop form from reloading the page
  e.preventDefault();

  // get new name to search for
  let newName = searchForm.querySelector(".PlayerName").value.trim();

  //get the season of the player
  let newSeason = searchForm.querySelector(".PlayerSeason").value;

  // The new player
  let player;
  /**
   * API recommended method of getting
   */
  // GET the info
  fetch(
    "https://nba-stats-db.herokuapp.com/api/playerdata/name/" + newName,
    requestOptions
  )
    // if gotten, parse into text
    .then((response) => response.text())
    // spit out result
    .then((result) => {
      let playerInfo = JSON.parse(result);

      // are there any results
      if (playerInfo.count === 0) {
        playerDoc.innerText = "Could not find a player named: " + newName;
        return;
      }

      // is the season a valid season of the year
      let testDate = new Date();
      let testYear = testDate.getFullYear(testDate);
      if (newSeason > testYear || newSeason < 2010) {
        playerDoc.innerText =
          "Please search for a season between the current year and 2010\n" +
          "The season you tried searching for was: " +
          newSeason;
        return;
      }

      // search for that season
      let index = 0;
      let found = false;
      let seasonIndex = 0;
      let endOfResults = playerInfo.results.length;
      while (index < endOfResults && !found) {
        let currentSeason = playerInfo.results[index].season;
        if (currentSeason == newSeason) {
          found = true;
          seasonIndex = index;
        }
        index++;
      }
      // if season could not be found
      if (!found) {
        playerDoc.innerText =
          "Player: " + newName + " did not play in: " + newSeason;
        return;
      }

      // create a player who has the name and season year provided
      player = new Player(playerInfo.results[seasonIndex]);
      playerDisplayHTML(player);
    })
    //if not gotten, print error
    .catch((error) => {
      playerDoc.innerText = "Error: website connection failed";
      console.log("Error:", error);
    });
});

main.append(searchForm);
main.append(playerDoc);
console.log(playerList);
//var playerList = Array.from(getAllPlayerNames());
autocomplete(document.querySelector('.PlayerName'), playerList);