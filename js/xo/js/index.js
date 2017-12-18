function removeClass() {
    var cells = document.getElementsByClassName('cell');
    for (var i = 0; i < cells.length; i++) {
        cells[i].classList.remove('x', 'o');
    }
    var winMessage = document.querySelector('.winner-message');
    winMessage.innerHTML = '';
}

window.addEventListener('load', function () {
    var cells = document.getElementsByClassName('cell');
    var lastValue = 'o';
    for (var i = 0; i < cells.length; i++) {
        cells[i].addEventListener('click', function (event) {
            if (!event.target.classList.contains('x') && !event.target.classList.contains('o')) {
                if (lastValue == 'x') {
                    event.target.classList.add('o');
                    lastValue = 'o';
                } else {
                    event.target.classList.add('x');
                    lastValue = 'x';
                }
                if (getWinner() == 'x') {
                    document.querySelector('.winner-message').innerHTML = "Крестик победил";
                }
                if (getWinner() == 'o') {
                    document.querySelector('.winner-message').innerHTML = "Нолик победил";
                }
            }
        })
    }

    function getWinner() {
        var cellsD = document.querySelectorAll('.cell');
        var cells = [[], [], []];
        var i;
        for (i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                var el = cellsD[i * 3 + j];
                if (el.classList.contains('x')) {
                    cells[i][j] = 'x';
                }
                if (el.classList.contains('o')) {
                    cells[i][j] = 'o';
                }
            }
        }
        if (
            ((cells[0][0] === cells[1][1]) && (cells[1][1] === cells[2][2])) ||
            ((cells[2][0] === cells[1][1]) && (cells[1][1] === cells[0][2]))
        ) {
            return cells[1][1];
        }
        for (i = 0; i < 2; i++) {
            if ((cells[0][i] === cells[1][i]) && (cells[1][i] === cells[2][i])) {
                return cells[0][i];
            }
            if ((cells[i][0] === cells[i][1]) && (cells[i][1] === cells[i][2])) {
                return cells[i][0];
            }
        }
    }
});