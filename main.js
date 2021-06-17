import { Game} from './game';
import Player from './Player';
import { randomInteger, createElement,  getTime} from './utils';    //полний путь C:\Users\К\Desktop\Mortal-Kombat\utils
import { logs, HIT, ATTACK } from './constants';


const $arenas = document.querySelector('.arenas');
const $fightButton = document.querySelector('.button');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');



const game = new Game();
game.start();