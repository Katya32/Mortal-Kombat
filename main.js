const $arenas = document.querySelector('.arenas');
const $fightButton = document.querySelector('.button');
const $formFight = document.querySelector('.control');

const liuKang = {
    player: 1,
    name: 'Liu Kang',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
    weapon: ['Dragon sword', 'Nunchucks', 'Fire ball'],
    changeHP,
    elHP,
    renderHP,
    //attack,
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
    //attack,
}

function createElement(tag, className) {  //Функция для создания тэгов и классов
    const $tag = document.createElement(tag);
    if(className) {
        $tag.classList.add(className);
      }
    return $tag
}

function createPlayer(character) {  //Функция создает тэги с классами и вставляет их в $player
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

function randomInteger(num) { //Создает рандомное число
    return Math.ceil(Math.random()*num)
}

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

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

function enemyAttack() { //Рандомный урон от врага
    const hit =  ATTACK[randomInteger(ATTACK.length-1)-1];
    const defence = ATTACK[randomInteger(ATTACK.length-1)-1];
     return {
         value: randomInteger(HIT[hit]), 
         hit, 
         defence,
    }
 }

$formFight.addEventListener('submit', function(event) { /*Вешаем слушателя событий на кнопку Fight. Выводим наши чекбоксы*/
    event.preventDefault();
    const enemy = enemyAttack(); 
    console.log('en :>> ', enemy);
    const attack = {};
    fight(enemy, attack) 

    for(let item of $formFight) { //Перебираем все инпуты у формы
        if(item.checked && item.name === 'hit') { //Если выбран удар, то в обьект записываем куда бьем и какой урон
            attack.value = randomInteger(HIT[item.value]);
            attack.hit = item.value;
            }
        if(item.checked && item.name === 'defence') { //Если выбрана защита, то в обьект записываем что защищаем
            attack.defence = item.value;
        }
        item.checked = false;
    }  console.log('at :>> ', attack);
       
     /*При нажатии на кнопку вызываеться функция changeHP и отнимается количество жизни и отображаеться на шкале при вызове changeHP.
       Если у одного из игроков hp = 0, кнопка не активна. Выводиться имя победителя или ничья.*/

    if (liuKang.hp === 0 || subZero.hp === 0) {
        $fightButton.disabled = true;
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

function fight(attack, enemy) { 
    if (attack.hit !== enemy.defence) {
        subZero.changeHP(attack.value);
        subZero.renderHP();
    } else {
        attack.value = 0;
    }
    
    if (enemy.hit !== attack.defence) {
        liuKang.changeHP(enemy.value);
        liuKang.renderHP();
    } else {
        enemy.value = 0;
    }
}
