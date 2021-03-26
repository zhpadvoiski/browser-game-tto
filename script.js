const ticTacToe = document.querySelectorAll('td');
const resultDiv = document.getElementById('result');

const colors = {
    x : '#05A8AA',
    o : '#DC602E',
    draw : '#8fff6d'
};

const ticTacToeGameCheck = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

let steps = 0;
let player = 'x'; //first player X

const isWin = () => {
    // debugger
    if(ticTacToeGameCheck[0][0] !== '' && ticTacToeGameCheck[0][0] === ticTacToeGameCheck[0][1] && ticTacToeGameCheck[0][1] === ticTacToeGameCheck[0][2]){//first raw
        return true;
    }
    if(ticTacToeGameCheck[1][0] !== '' && ticTacToeGameCheck[1][0] === ticTacToeGameCheck[1][1] && ticTacToeGameCheck[1][1] === ticTacToeGameCheck[1][2]){//second raw
        return true;
    }
    if(ticTacToeGameCheck[2][0] !== '' && ticTacToeGameCheck[2][0] === ticTacToeGameCheck[2][1] && ticTacToeGameCheck[2][1] === ticTacToeGameCheck[2][2]){//third raw
        return true;
    }
    if(ticTacToeGameCheck[0][0] !== '' && ticTacToeGameCheck[0][0] === ticTacToeGameCheck[1][0] && ticTacToeGameCheck[1][0] === ticTacToeGameCheck[2][0]){//first column
        return true;
    }
    if(ticTacToeGameCheck[0][1] !== '' && ticTacToeGameCheck[0][1] === ticTacToeGameCheck[1][1] && ticTacToeGameCheck[1][1] === ticTacToeGameCheck[2][1]){//second column
        return true;
    }
    if(ticTacToeGameCheck[0][2] !== '' && ticTacToeGameCheck[0][2] === ticTacToeGameCheck[1][2] && ticTacToeGameCheck[1][2] === ticTacToeGameCheck[2][2]){//third column
        return true;
    }
    if(ticTacToeGameCheck[0][0] !== '' && ticTacToeGameCheck[0][0] === ticTacToeGameCheck[1][1] && ticTacToeGameCheck[1][1] === ticTacToeGameCheck[2][2]){//left diagonale
        return true;
    }
    if(ticTacToeGameCheck[0][2] !== '' && ticTacToeGameCheck[0][2] === ticTacToeGameCheck[1][1] && ticTacToeGameCheck[1][1] === ticTacToeGameCheck[2][0]){//right diagonale
        return true;
    }
}

const isDraw = () => {
    return steps === 9;
}

const isEnd = () => {
    if(isWin()){
        resultDiv.innerText = `player ${player.toUpperCase()} WIN`;
        resultDiv.style.color = colors[player];
        return true;
    }else if(isDraw()){
        resultDiv.innerText = 'DRAW';
        resultDiv.style.color = colors['draw'];
        return true;
    }
    return false;
}

let game = (e) => {
    const clickedCell = e.target;
    player = steps++ % 2 === 0 ? 'x' : 'o';

    clickedCell.innerText = player;
    clickedCell.style.color = colors[player];
    clickedCell.style.opacity = '1';
    ticTacToeGameCheck[clickedCell.parentNode.rowIndex][clickedCell.cellIndex] = player;

    if(isEnd()){
        document.querySelector('.container').appendChild(resultDiv);

        removeListeners();

        let timerContent = 5;
        const timer = document.createElement('div');    
        timer.className = 'timer';
        document.body.append(timer);
        

        setInterval(() => {
            timer.style.display = 'block';
            timer.innerHTML = `game reload in<div>${timerContent--}</div>`;
        }, 1000);
        
        setTimeout(() => location.reload(), 6000);
        
        return;
    };

    clickedCell.removeEventListener('click', game);
    clickedCell.removeEventListener('mouseover', mouseOverHandler);
    clickedCell.removeEventListener('mouseout', mouseOutHandler);
}

const mouseOverHandler = (e) => {
    const mouseOverTD = e.target;

    const nexPlayer = steps % 2 === 0 ? 'x' : 'o';
    mouseOverTD.innerText = nexPlayer;
    mouseOverTD.style.color = colors[nexPlayer];
    mouseOverTD.style.opacity = '0.6';
}
const mouseOutHandler = (e) => {
    const mouseOutTD = e.target;

    mouseOutTD.innerText = '';
    // mouseOutTD.style.opacity = '1';
}

const removeListeners = () =>{
    ticTacToe.forEach(td => {
        td.removeEventListener('click', game);
        td.removeEventListener('mouseover', mouseOverHandler);
        td.removeEventListener('mouseout', mouseOutHandler);
    })
}

ticTacToe.forEach(td => {
        td.addEventListener('click', game);
        td.addEventListener('mouseover', mouseOverHandler);
        td.addEventListener('mouseout', mouseOutHandler);
});