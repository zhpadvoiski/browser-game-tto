const resultDiv = document.getElementById('result');

const colors = {
    x : '#05A8AA',
    o : '#DC602E',
    draw : '#8fff6d'
};

const ticTac = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

let steps = 0;
let player = 'x'; //first player X

const isWin = () => {
    // debugger
    if(ticTac[0][0] !== '' && ticTac[0][0] === ticTac[0][1] && ticTac[0][1] === ticTac[0][2]){//first raw
        return true;
    }
    if(ticTac[1][0] !== '' && ticTac[1][0] === ticTac[1][1] && ticTac[1][1] === ticTac[1][2]){//second raw
        return true;
    }
    if(ticTac[2][0] !== '' && ticTac[2][0] === ticTac[2][1] && ticTac[2][1] === ticTac[2][2]){//third raw
        return true;
    }
    if(ticTac[0][0] !== '' && ticTac[0][0] === ticTac[1][0] && ticTac[1][0] === ticTac[2][0]){//first column
        return true;
    }
    if(ticTac[0][1] !== '' && ticTac[0][1] === ticTac[1][1] && ticTac[1][1] === ticTac[2][1]){//second column
        return true;
    }
    if(ticTac[0][2] !== '' && ticTac[0][2] === ticTac[1][2] && ticTac[1][2] === ticTac[2][2]){//third column
        return true;
    }
    if(ticTac[0][0] !== '' && ticTac[0][0] === ticTac[1][1] && ticTac[1][1] === ticTac[2][2]){//left diagonale
        return true;
    }
    if(ticTac[0][2] !== '' && ticTac[0][2] === ticTac[1][1] && ticTac[1][1] === ticTac[2][0]){//right diagonale
        return true;
    }
}

const isEnd = () => {
    if(isWin()){
        resultDiv.innerText = `player ${player.toUpperCase()} WIN`;
        resultDiv.style.color = colors[player];
        return true;
    }else if(steps === 9){
        resultDiv.innerText = 'DRAW';
        resultDiv.style.color = colors['draw'];
        return true;
    }
    return false;
}

const game = (e) => {
    const clickedCell = e.target;
    player = steps++ % 2 === 0 ? 'x' : 'o';

    clickedCell.innerText = player;
    clickedCell.style.color = colors[player];
    clickedCell.style.opacity = '1';
    ticTac[clickedCell.parentNode.rowIndex][clickedCell.cellIndex] = player;

    if(isEnd()){
        document.querySelector('.tic-tac-toe').removeEventListener('click', game);
        document.querySelector('.container').appendChild(resultDiv);

        let timerContent = 5;
        const timer = document.createElement('div');    
        timer.className = 'timer';
        document.body.append(timer);
        

        setInterval(() => {
            timer.style.display = 'block';
            timer.innerHTML = `game reload in<div>${timerContent--}</div>`;
        }, 1000);
        
        setTimeout(() => location.reload(), 6000);
    };
    clickedCell.removeEventListener('click', game);
    clickedCell.removeEventListener('mouseover', mouseOverHandler);
    clickedCell.removeEventListener('mouseout', mouseOutHandler);
}

const  mouseOverHandler = (e) => {
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

document.querySelectorAll('td').forEach(td => {
                        td.addEventListener('click', game);
                        td.addEventListener('mouseover', mouseOverHandler);
                        td.addEventListener('mouseout', mouseOutHandler);
});