import { liuKang, subZero } from './player.js';
import { randomInteger, createElement, elHP, changeHP, renderHP, playerWins } from './utils.js';
import { logs } from './logs.js';
import { showResult } from './showResult';
import { createReloadButton } from './reloadButton';
import { playerAttack } from './attack';


const $arenas = document.querySelector('.arenas');
const $fightButton = document.querySelector('.button');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');


const {player, name, hp, img, weapon} = liuKang;

const {player:player2, name:name2, hp:hp2, img:img2, weapon:weapon2} = subZero;

const createPlayer = (character) => {  //Функция создает тэги с классами и вставляет их в $player
    const $player = createElement('div', 'player' + character.player);
    const $progressbar = createElement('div', 'progressbar');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $character = createElement('div', 'character');
    const $img = createElement('img');

    $life.style.width = character.hp + '%';
    $name.innerText = character.name + ' ' + character.hp + '%';

    $img.src = character.img;
    
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $player.appendChild($progressbar);
    $player.appendChild($character);
    $character.appendChild($img);
    
    return $player;
}


$arenas.appendChild(createPlayer(liuKang));
$arenas.appendChild(createPlayer(subZero));

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}

//const [head, body, foot] = HIT;

const ATTACK = ['head', 'body', 'foot'];


const generateLogs = (type, liuKang, subZero, hp) => {
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
            el = `<p>${time} - ${text} - ${hp} [${subZero.hp}/100]</p>`;
            break;
        case 'defence':
            text = logs[type][randomInteger(logs[type].length -1)].replace('[playerKick]', name).replace('[playerDefence]', name2);
            el = `<p>${time} - ${text} - ${hp} [${subZero.hp}/100]</p>`;
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
generateLogs('start', liuKang, subZero, 0);

$formFight.addEventListener('submit', function(event) { /*Вешаем слушателя событий на кнопку Fight. Выводим наши чекбоксы*/
    event.preventDefault();
    const enemy = enemyAttack(); 
    const player = playerAttack();

    if (player.defence !== enemy.hit) {
        liuKang.changeHP(enemy.value);
        liuKang.renderHP();
        generateLogs('hit', subZero, liuKang, player.value)
    } else {
        generateLogs('defence', subZero, liuKang, 0)
    }
    if (enemy.defence !== player.hit) {
        subZero.changeHP(player.value);
        subZero.renderHP();   
        generateLogs('hit', liuKang, subZero, enemy.value)
    }  else {
        generateLogs('defence', liuKang, subZero, 0)
    }

    showResult()
})