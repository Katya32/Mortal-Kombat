export const generateLogs = (type, liuKang, subZero, damage) => {
    let text = '';
    let time = new Date().getHours() + ':' + new Date().getMinutes();
    let el = `<p>${text}</p>`;

    switch (type) {
        case 'start':
            text = logs[type].replace('[player1]', name).replace('[player2]', name2).replace('[time]', time);
            el = `<p>${text}</p>`
            break; 
        case 'hit':
            text = logs[type][randomInteger(logs[type].length -1)].replace('[playerKick]', name).replace('[playerDefence]', name2);
            el = `<p>${time} - ${text} - ${damage} [${hp}/100]</p>`;
            break;
        case 'defence':
            text = logs[type][randomInteger(logs[type].length -1)].replace('[playerKick]', name).replace('[playerDefence]', name2);
            el = `<p>${time} - ${text} - ${damage} [${hp}/100]</p>`;
            break;
        case 'draw':
            text = logs[type][randomInteger(logs[type].length -1)];
            el = `<p>${time} - ${text}</p>`;
            break;
        case 'end':
            text = logs[type][randomInteger(logs[type].length -1)].replace('[playerWins]', name).replace('[playerLose]', name2);
            el = `<p>${time} - ${text}</p>`;
            break;
        default:
            text = "You didn't press anything"; 
    }
    $chat.insertAdjacentHTML('afterbegin', el);
}