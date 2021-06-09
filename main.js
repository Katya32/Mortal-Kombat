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
    $img.src = character.img;

    
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $player.appendChild($progressbar);
    $player.appendChild($character);
    $character.appendChild($img);
    
    return $player;
}

function  elHP() {  
    return  document.querySelector('.player' + this.player +' .life');
}

function changeHP(randomInteger) {
    this.hp -= randomInteger;
    
    if(this.hp <= 0) {
        this.hp = 0;
    } 
    return this.hp
}

function  renderHP() {
    this.elHP().style.width = this.hp +'%'; 
    const $playerName = document.querySelector('.player' + this.player +' .name');
    $playerName.innerText = this.name + ' ' +this.hp + '%';
}

function playerWins(name){
    const  $winTitle = createElement('div', 'winTitle');
    if(name) {
     $winTitle.innerText = name + ' wins';
    } else {
     $winTitle.innerText = 'draw';
    }
    return $winTitle;
 }

function randomInteger(min, max) {
    return Math.ceil(min + Math.random()*(max + 1 -min))
}

$randomButton.addEventListener('click', function() {
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

function createReloadButton() {
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