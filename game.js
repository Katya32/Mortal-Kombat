import { randomInteger, playerWins, createElement } from './utils.js';
import { LOGS, ATTACK, HIT } from './constants.js';
import Player from './player.js';


const $arenas = document.querySelector('.arenas');
const $fightButton = document.querySelector('.button');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');


class Game {
    
    start = () => {
        const player_1 = new Player({
            player: 1,
            name: 'Liu Kang',
            hp: 100,
            img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
            rootSelector: 'arenas',
        });
          
        const player_2 = new Player({
            player: 2,
            name: 'Sub Zero',
            hp: 100,
            img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
            rootSelector: 'arenas',
        });

        player_1.createPlayer();
        player_2.createPlayer();

        this.generateLogs('start', player_1, player_2, 0);

        $formFight.addEventListener('submit', (event) => { /*Вешаем слушателя событий на кнопку Fight. Выводим наши чекбоксы*/
            event.preventDefault();
            this.fight(player_1, player_2);
        })
    
    }

    showResult = () => {  /*При нажатии на кнопку вызываеться функция changeHP и отнимается количество жизни и отображаеться на шкале при вызове changeHP.
        Если у одного из игроков player_1.hp = 0, кнопка не активна. Выводиться имя победителя или ничья.*/
        if (player_1.hp === 0 || player_2.hp === 0) {
            $fightButton.disabled = true;
            createReloadButton()
        }
    
        if (player_1.hp === 0 && player_1.hp < player_2.hp) {
            $arenas.appendChild(playerWins(player_2.player_1.name));
            generateLogs('end', player_2, player_1, 0);
        } else if (player_2.hp === 0 && player_2.hp < player_1.hp) {
            $arenas.appendChild(playerWins(player_1.name));
            generateLogs('end', player_1, player_2, 0);
        } else if (player_1.hp === 0 && player_2.hp === 0) {
            $arenas.appendChild(playerWins());
            generateLogs('draw');
        }
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

    enemyAttack = () => { //Рандомный урон от врага
        const hit =  ATTACK[randomInteger(ATTACK.length-1)-1];
        const defence = ATTACK[randomInteger(ATTACK.length-1)-1];
        return {
             value: randomInteger(HIT[hit]), 
             hit, 
             defence,
        }
     }
    
    fight = (player_1, player_2) => { /*Вешаем слушателя событий на кнопку Fight. Выводим наши чекбоксы*/
        const enemy = this.enemyAttack(); 
        const player = this.playerAttack();
    
        if (player.defence !== enemy.hit) {
            player_1.changeHP(enemy.value);
            player_1.renderHP();
            this.generateLogs('hit', player_2, player_1, player.value);
        } else {
            this.generateLogs('defence', player_2, player_1, 0);
        }
    
        if (enemy.defence !== player.hit) {
            player_2.changeHP(player.value);
            player_2.renderHP();   
            this.generateLogs('hit', player_1, player_2, enemy.value);
        }  else {
            this.generateLogs('defence', player_1, player_2, 0);
        }
    
        this.showResult(player_1, player_2);
    }

    showResult = (player_1, player_2) => {  /*При нажатии на кнопку вызываеться функция changeHP и отнимается количество жизни и отображаеться на шкале при вызове changeHP.
        Если у одного из игроков player_1.hp = 0, кнопка не активна. Выводиться имя победителя или ничья.*/
        if (player_1.hp === 0 || player_2.hp === 0) {
            $fightButton.disabled = true;
            this.createReloadButton()
        }
    
        if (player_1.hp === 0 && player_1.hp < player_2.hp) {
            $arenas.appendChild(playerWins(player_2.name));
            this.generateLogs('end', player_2, player_1, 0);
        } else if (player_2.hp === 0 && player_2.hp < player_1.hp) {
            $arenas.appendChild(playerWins(player_1.name));
            this.generateLogs('end', player_1, player_2, 0);
        } else if (player_1.hp === 0 && player_2.hp === 0) {
            $arenas.appendChild(playerWins());
            this.generateLogs('draw');
        }
    }

    createReloadButton = () => { /*Создает кнопку перезагрузки при завершении игры(если у одного из игроков player_1.hp = 0) 
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

    generateLogs = (type, player_1, player_2, damage) => {
        let text = '';
        let time = new Date().getHours() + ':' + new Date().getMinutes();
        let el = `<p>${text}</p>`;
    
        switch (type) {
            case 'start': 
                text = LOGS[type].replace('[player1]', player_1.name).replace('[player2]', player_2.name).replace('[time]', time);
                el = `<p>${text}</p>`
                break; 
            case 'hit':
                text = LOGS[type][randomInteger(LOGS[type].length -1)].replace('[playerKick]', player_1.name).replace('[playerDefence]', player_2.name);
                el = `<p>${time} - ${text} - ${damage} [${player_1.hp}/100]</p>`;
                break;
            case 'defence':
                text = LOGS[type][randomInteger(LOGS[type].length -1)].replace('[playerKick]', player_1.name).replace('[playerDefence]', player_2.name);
                el = `<p>${time} - ${text} - ${damage} [${player_1.hp}/100]</p>`;
                break;
            case 'draw':
                text = LOGS[type][randomInteger(LOGS[type].length -1)];
                el = `<p>${time} - ${text}</p>`;
                break;
            case 'end':
                text = LOGS[type][randomInteger(LOGS[type].length -1)].replace('[playerWins]', player_1.name).replace('[playerLose]', player_2.name);
                el = `<p>${time} - ${text}</p>`;
                break;
            default:
                text = "You didn't press anything"; 
        }
        $chat.insertAdjacentHTML('afterbegin', el);
    }

  }
  
export default Game;
  