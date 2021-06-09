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
    changeHP,
    elHP,
    renderHP,
    attack,
}

const subZero = {
    player: 2,
    name: 'Sub Zero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Sword', 'Snow ball'],
    changeHP,
    elHP,
    renderHP,
    attack,
}

function attack() {
    console.log(this.name + ' ' + 'Fight...');
}

function createElement(tag, className) {  //Функция для создания тэгов и классов
    const $tag = document.createElement(tag);
    if(className) {
        $tag.classList.add(className);
      }
    return $tag
}

function createPlayer(character) {  //Функция создает тэги с классами и вставляет их в $player
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

    $name.innerText = character.name + ' ' + character.hp + '%';

    $name.innerText = character.name;

    $img.src = character.img;

    
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $player.appendChild($progressbar);
    $player.appendChild($character);
    $character.appendChild($img);
    
    return $player;
}

function  elHP() {   //coздает ссылку на div c классом life у каждого игрока (шкала жизни)
    return  document.querySelector('.player' + this.player +' .life');
}

function changeHP(randomInteger) { //При нажатии на кнопку Рандом у игрока отнимаеться рамдомное количество жизни. Если жизнь уйдет в минус, игроку запишется значение 0
    this.hp -= randomInteger;
    
    if(this.hp <= 0) {
        this.hp = 0;
    } 
    return this.hp
}

function  renderHP() {  //ширина и количество шкалы жизни меняются в зависимости от hp
    this.elHP().style.width = this.hp +'%'; 
    const $playerName = document.querySelector('.player' + this.player +' .name');
    $playerName.innerText = this.name + ' ' +this.hp + '%';
}

function playerWins(name){ // Создает тэг div с классом winTitlе и выводит имя победителя или ничью
    const  $winTitle = createElement('div', 'winTitle');
    if(name) {
     $winTitle.innerText = name + ' wins';
    } else {
     $winTitle.innerText = 'draw';
    }
    return $winTitle;
 }

function randomInteger(min, max) { //Создает рандомное число от 1 до 20
    return Math.ceil(min + Math.random()*(max + 1 -min))
}

$randomButton.addEventListener('click', function() {  /*Вешает слушателя события на кнопку Рандом. При нажатии на кнопку вызываеться функция changeHP и 
                                                      отнимается количество жизни и отображаеться на шкале при вызове changeHP.
                                                      Если у одного из игроков hp = 0, кнопка не активна. Выводиться имя победителя или ничья.*/
    liuKang.changeHP(randomInteger(1, 20));
    liuKang.renderHP();

    subZero.changeHP(randomInteger(1, 20));
    subZero.renderHP();

    if (liuKang.hp === 0 || subZero.hp === 0) {
        $randomButton.disabled = true;
        createReloadButton()
    }

    if (liuKang.hp === 0 && liuKang.hp < subZero.hp) {
        $arenas.appendChild(playerWins(subZero.name));
    } else if (subZero.hp === 0 && subZero.hp < liuKang.hp) {
        $arenas.appendChild(playerWins(liuKang.name));
    } else if (liuKang.hp === 0 && subZero.hp === 0) {
        $arenas.appendChild(playerWins());
    }
})

function createReloadButton() { /*Создает кнопку перезагрузки при завершении игры(если у одного из игроков hp = 0) 
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

$arenas.appendChild(createPlayer(liuKang));
$arenas.appendChild(createPlayer(subZero));

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
