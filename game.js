class Game {

    start = () => {
        const player_1 = new Player ({
            player: 1,
            name: 'Liu Kang',
            hp: 100,
            img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
            rootSelector: 'arenas',
        })
        

        const player_2 = new Player ({
            player: 2,
            name: 'Sub Zero',
            hp: 100,
            img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
            rootSelector: 'arenas',
        })

        init();

        $formFight.addEventListener('submit', (event) => { /*Вешаем слушателя событий на кнопку Fight. Выводим наши чекбоксы*/
            event.preventDefault();
            this.fight($formFight);
        })
        

    }

    playerAttack = () => {
        const attack = {};
    
        for(let item of $formFight) { //Перебираем все инпуты у формы
            if(item.checked && item.name === 'hit') { //Если выбран удар, то в обьект записываем куда бьем и какой урон
                attack.value = randomInteger(HIT[item.value]);
                attack.hit = item.value;
                }
            if(item.checked && item.name === 'defence') { //Если выбрана защита, то в обьект записываем что защищаем
                attack.defence = item.value;
            }
            item.checked = false;
        }  
    
        return attack;
    } 

    fight = (player1, player2, hit, enemy) =>{
        const enemy = enemyAttack(); 
        const player = playerAttack();
    
        if (player.defence !== enemy.hit) {
            liuKang.changeHP(enemy.value);
            liuKang.renderHP();
            this.generateLogs('hit', subZero, liuKang, player.value);
        } else {
            this.generateLogs('defence', subZero, liuKang, 0);
        }
    
        if (enemy.defence !== player.hit) {
            subZero.changeHP(player.value);
            subZero.renderHP();   
            this.generateLogs('hit', liuKang, subZero, enemy.value);
        }  else {
            this.generateLogs('defence', liuKang, subZero, 0);
        }
    
        showResult(player_1, player_2);
    }
    
    generateLogs = (type, {name} ={}, {name: playerName2, hp} ={}, damage) => {
        let text = getTextLog(type, name, playerName2);
    
        switch(type) {
            case 'hit':
                text = `${getTime()} ${text} - ${damage} [${hp}/100]`;
                break;
            case 'defence':
                text = `${getTime()} ${text} - ${damage} [${hp}/100]`;
                break;
            case 'draw':
                text = `${getTime()} ${text}`;
                break; 
            case 'end':
                text = `${getTime()} ${text} - ${damage} [${hp}/100]`;
                break;     
    }
        const el = `<p>${text}</p>`;
        $chat.insertAdjacentHTML('afterbegin', el);
    }
    
    getTextLog = (type, liuKang, subZero) => {
        switch (type) {
            case 'start':
                return logs[type]
                .replace('[player1]', liuKang.name)
                .replace('[player2]', subZero.name)
                .replace('[time]', getTime());
                break; 
            case 'hit':
                return logs[type][randomInteger(logs[type].length -1)-1]
                .replace('[playerKick]', liuKang.name)
                .replace('[playerDefence]', subZero.name);
                break;
            case 'defence':
                return logs[type][randomInteger(logs[type].length -1)-1].replace('[playerKick]', liuKang.name).replace('[playerDefence]', subZero.name);
                break;
            case 'draw':
                return logs[type][randomInteger(logs[type].length -1)-1];
                break;
            case 'end':
                return logs[type][randomInteger(logs[type].length -1)-1].replace('[playerWins]', liuKang.name).replace('[playerLose]', subZero.name);
                break;
            default:
                text = "You didn't press anything";
                break; 
        }
    }
    
    init = () => {
        player1.createPlayer();
        player2.createPlayer();
        generateLogs('start', liuKang, subZero, 0);
    }
  

    showResult = (player1, player2) => {  /*При нажатии на кнопку вызываеться функция changeHP и отнимается количество жизни и отображаеться на шкале при вызове changeHP.
        Если у одного из игроков hp = 0, кнопка не активна. Выводиться имя победителя или ничья.*/
        if (player1.hp === 0 || player2.hp === 0) {
            $fightButton.disabled = true;
            createReloadButton()
        }
    
        if (player1.hp === 0 && player1.hp < player2.hp) {
            $arenas.appendChild(playerWins(player2.name));
            generateLogs('end', player1, player2, 0);
        } else if (player1.hp === 0 && player2.hp < player1.hp) {
            $arenas.appendChild(playerWins(player1.name));
            generateLogs('end', player1, player2, 0);
        } else if (player1.hp === 0 && player2.hp === 0) {
            $arenas.appendChild(playerWins());
            generateLogs('draw');
        }
    }

    playerWins = (name) => { // Создает тэг div с классом winTitlе и выводит имя победителя или ничью
        const  $winTitle = createElement('div', 'winTitle');
        if(name) {
         $winTitle.innerText = name + ' wins';
        } else {
         $winTitle.innerText = 'draw';
        }
        return $winTitle;
     }

    createReloadButton = () => { /*Создает кнопку перезагрузки при завершении игры(если у одного из игроков hp = 0) 
        и вешает на него слушателя событый с функцией перезагрузки*/
    const $div = createElement("div", "reloadWrap");
    const $button = createElement("button", "button");
    $button.innerText = 'Restart';
    
    $div.addEventListener('click', function() {
    window.location.reload()
    })
    
    $div.append($button);
    $arenas.append($div);
    }
}

