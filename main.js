import { liuKang, subZero } from './player.js';
import { randomInteger, createElement, elHP, changeHP, renderHP, playerWins } from './utils.js';
import { logs, HIT, ATTACK } from './logs.js';
import { showResult } from './showResult';
import { createReloadButton } from './reloadButton';
import { playerAttack } from './attack';
import { generateLogs } from './generateLogs';
import { createPlayer } from './createPlayer';

const $arenas = document.querySelector('.arenas');
const $fightButton = document.querySelector('.button');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');

const {player, name, hp, img, weapon} = liuKang;
const {player:player2, name:name2, hp:hp2, img:img2, weapon:weapon2} = subZero;

$arenas.appendChild(createPlayer(liuKang));
$arenas.appendChild(createPlayer(subZero));

generateLogs('start', liuKang, subZero, 0);

$formFight.addEventListener('submit', function(event) { /*Вешаем слушателя событий на кнопку Fight. Выводим наши чекбоксы*/
    event.preventDefault();
    const enemy = enemyAttack(); 
    const player = playerAttack();

    if (player.defence !== enemy.hit) {
        liuKang.changeHP(enemy.value);
        liuKang.renderHP();
        generateLogs('hit', subZero, liuKang, player.value);
    } else {
        generateLogs('defence', subZero, liuKang, 0);
    }

    if (enemy.defence !== player.hit) {
        subZero.changeHP(player.value);
        subZero.renderHP();   
        generateLogs('hit', liuKang, subZero, enemy.value);
    }  else {
        generateLogs('defence', liuKang, subZero, 0);
    }

    showResult();
})