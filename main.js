const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button')

const liuKang = {
    player: 1,
    name: 'Liu Kang',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
    weapon: ['Dragon sword', 'Nunchucks', 'Fire ball'],
    attack: function () {
        console.log(liuKang.name + ' ' + 'Fight...');
    },
    
}
liuKang.attack()

const subZero = {
    player: 2,
    name: 'Sub Zero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Sword', 'Snow ball'],
    attack: function () {
        console.log(subZero.name + ' ' + 'Fight...');
    },
}
subZero.attack()

function createElement(tag, className) {
const $tag = document.createElement(tag);

if(className) {
    $tag.classList.add(className);
  }
return $tag
}

function createPlayer(character) {
    const $player = createElement('div', 'player' + character.player);
    const $progressbar = createElement('div', 'progressbar');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $character = createElement('div', 'character');
    const $img = createElement('img');


    $life.style.width = character.hp + '%';
    $name.innerText = character.name;
    $img.src = character.img;

    
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $player.appendChild($progressbar);
    $player.appendChild($character);
    $character.appendChild($img);
    
    return $player;
}

$randomButton.addEventListener('click', function() {
    changeHP(liuKang);
    changeHP(subZero);
})

function changeHP(player) {
    const $playerHP = document.querySelector('.player' + player.player +' .name');
    const $playerLife = document.querySelector('.player' + player.player +' .life');
    $playerLife.style.width = player.hp +'%';   
    player.hp -= randomInteger(1, 20);

    if(player.hp <= 0) {
        player.hp = 0;
        $playerLife.style.width = 0 + '%';
        $randomButton.disabled = true;
    } 
    
    if (player.hp >= 0) {
        $playerHP.innerText = player.name + ' ' +player.hp + '%';
    }

    function chooseWinner(player1, player2)  {
        if (player1.hp > 0 && player2.hp <= 0) {
            $arenas.appendChild(playerWin(player1.name));
        } 
        
        if (player1.hp <= 0 && player2.hp > 0) {
            $arenas.appendChild(playerWin(player2.name));
        }

        if (player1.hp <= 0 && player2.hp <= 0) {
            $arenas.appendChild(playerWin('No one'));
        }
    }
       chooseWinner(liuKang, subZero)
}

function randomInteger(min, max) {
    let random = Math.ceil(min + Math.random()*(max + 1 -min))
    return random
}

function playerWin(name){
    $winTitle = createElement('div', 'winTitle');
    $winTitle.innerText = name + ' win';
    return $winTitle;
}

$arenas.appendChild(createPlayer(liuKang));
$arenas.appendChild(createPlayer(subZero))
