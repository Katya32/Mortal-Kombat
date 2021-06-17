import { Game} from './game';
import { Player } from './player.js';
import { randomInteger, createElement} from './utils';
import { logs, HIT, ATTACK } from './logs.js';


const $arenas = document.querySelector('.arenas');
const $fightButton = document.querySelector('.button');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');



const game = new Game();
game.start();