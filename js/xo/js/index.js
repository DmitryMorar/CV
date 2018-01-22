window.addEventListener('load', function () {

	var lastV = localStorage.getItem('lastV'),
		lastValue = JSON.parse(lastV);

	var	game = localStorage.getItem('game'),
		catArray = JSON.parse(game);

	drawFromStorage();

	var container = document.querySelector('.container');
	container.addEventListener('click', function (event) {

		var target = event.target,
			targetClass = event.target.classList;

		if (!targetClass.contains('x') && !targetClass.contains('o')) {

			if (lastValue === null) {
				lastValue = 'o';
			}

			if (lastValue === 'o') {
				targetClass.add('x');
				lastValue = 'x';

				saveInStorage(target, lastValue);

			} else {

				targetClass.add('o');
				lastValue = 'o';

				saveInStorage(target, lastValue);
			}
			showWhoWin();
		}
	});

	function showWhoWin() {

		var winner = getWinner();

		if (winner === 'x') {
			document.querySelector('.who-win').innerHTML = "Крестик победил";
			document.querySelector('.winner-message').style.opacity="1";
			document.querySelector('.winner-message').style.visibility="visible";
		}
		if (winner === 'o') {
			document.querySelector('.who-win').innerHTML = "Нолик победил";
			document.querySelector('.winner-message').style.opacity="1";
			document.querySelector('.winner-message').style.visibility="visible";
		}
	}

	function saveInStorage(target, lastValue) {

		var arrayCells = document.querySelectorAll('.cell'),
			indexTargets;

		localStorage.setItem('lastV', JSON.stringify(lastValue));

		indexTargets = Array.prototype.indexOf.call(arrayCells, target);

		if(catArray === null) {
			catArray = [];
		}

		catArray[indexTargets] = lastValue;

		localStorage.setItem('game', JSON.stringify(catArray));
	}

	function drawFromStorage() {

		var foo = localStorage.getItem('game'),
			bar = JSON.parse(foo),
			i = 0,
			max,
			cells = document.querySelectorAll('.cell');

		if (bar === null) {
			return;
		}

		for (i, max = bar.length; i < max; i++) {

			if (bar[i] === null) {
				continue;
			}

			cells[i].classList.add(bar[i]);
		}
	}

	var buttonNewGame = document.querySelector('.btn-new');
	buttonNewGame.addEventListener('click', function () {

		document.querySelector('.winner-message').style.display="none";

		localStorage.removeItem('game');
		localStorage.removeItem('lastV');

		location.reload();
	})
});


