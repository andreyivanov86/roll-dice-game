/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, activePlayer, roundScore, gameIsAcitve, lastRoll, winScore;

init();

//event listener function for "Roll the Dice" button
document.querySelector('.btn-roll').addEventListener('click', function(){
	// set the stopper for the game
	if (gameIsAcitve){
		// 1. get the random number
		var dice1 = Math.floor(Math.random() * 6 + 1);
		var dice2 = Math.floor(Math.random() * 6 + 1);
		// 2. display random result
		var dice1DOM = document.querySelector('.dice1');
		var dice2DOM = document.querySelector('.dice2');
		dice1DOM.style.display = 'block';
		dice2DOM.style.display = 'block';
		dice1DOM.src = 'dice-' + dice1 + '.png';
		dice2DOM.src = 'dice-' + dice2 + '.png';

		// 3. update the total score if the dice was not 1
		if (dice1 === 1 || dice2 === 1){
			// switch player
			nextPlayer();
		} else if ((dice1 + dice2) === 12 && lastRoll === 12){
			// player looses Entire score
			scores[activePlayer] += roundScore;
			//2. Updaye User Interface
			document.getElementById('score-' + activePlayer).innerHTML = '0';
			nextPlayer();
		} else {
			//Add score
			roundScore += dice1 + dice2;	
			//display current roll score
			document.getElementById('current-' + activePlayer).innerHTML = roundScore;
		}
		lastRoll = dice1 + dice2;
	}
	
});
// add event listener for HOLD buttom.
document.querySelector('.btn-hold').addEventListener('click', function(){
	//set the stoper for the game
	if (gameIsAcitve){
		// set winning score
		winScore = document.querySelector('.win-score').value;
		//1. Add current score
		scores[activePlayer] += roundScore;
		//2. Updaye User Interface
		document.getElementById('score-' + activePlayer).innerHTML = scores[activePlayer];
		//3. Check if a player won the game
		if (scores[activePlayer] >= winScore){
			document.getElementById('name-' + activePlayer).innerHTML = 'Winner';
			document.querySelector('.dice1').style.display = 'none';
			document.querySelector('.dice2').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gameIsAcitve = false;
		} else {
			// Next Player
			nextPlayer();
		}
	}	
});
// function that switches the player
function nextPlayer(){
		activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
		//update score	
		roundScore = 0;
		// resets the total score of a player if dice = 1
		document.getElementById('current-0').innerHTML = '0';
		document.getElementById('current-1').innerHTML = '0';
		// switches the style of the player background
		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');
		// hide the dice on player turn
		document.querySelector('.dice1').style.display = 'none';
		document.querySelector('.dice2').style.display = 'none';
};
// Listener for New Game button
document.querySelector('.btn-new').addEventListener('click', init);

function init(){
	scores = [0, 0];
	activePlayer = 0;
	roundScore = 0;
	gameIsAcitve = true;
	
	//document.querySelector('#current-' + activePlayer).textContent = dice;
	//hide the dice at the start
	document.querySelector('.dice1').style.display = 'none';
	document.querySelector('.dice2').style.display = 'none';
	// zero down initial values
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('name-0').innerHTML = 'Player 1';
	document.getElementById('name-1').innerHTML = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
}