
const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button')
const $control = document.querySelector('.control');

const liuKang = {
    name: 'Liu Kang',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
    weapon: ['Dragon sword', 'Nunchucks', 'Fire ball'],
    attack: function () {
        console.log(liuKang.name + ' ' + 'Fight...');
    },
    player: 1,
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP,
}
liuKang.attack()

const subZero = {
    name: 'Sub Zero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Sword', 'Snow ball'],
    attack: function () {
        console.log(subZero.name + ' ' + 'Fight...');
    },
    player: 2,
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP,
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

    if (liuKang.hp === 0 || subZero.hp === 0) {
        $randomButton.disabled = true;
    }

    if (liuKang.hp === 0 && liuKang.hp < subZero.hp) {
        $arenas.appendChild(playerWins(subZero.name));
    } else if (subZero.hp === 0 && subZero.hp < liuKang.hp) {
        $arenas.appendChild(playerWins(liuKang.name));
    }

        liuKang.changeHP(randomInteger(1, 20));
        subZero.changeHP(randomInteger(1, 20));
        liuKang.elHP();
        subZero.elHP();
        liuKang.renderHP();
        subZero.renderHP();

        createReloadButton()
})

function changeHP(damage) {
    this.hp -= damage;
    
    if(this.hp <= 0) {
        this.hp = 0;
    } 
    return this.hp
}
 

function randomInteger(min, max) {
    return Math.ceil(min + Math.random()*(max + 1 -min))
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

function  elHP() {
    return  document.querySelector('.player' + this.player +' .life');
}

function  renderHP() {
    const $playerLife = document.querySelector('.player' + this.player +' .life');
    const $playerName = document.querySelector('.player' + this.player +' .name');
    console.log($playerName)
    $playerName.innerText = this.name + ' ' +this.hp + '%';
    
    if (this.hp >= 0) {
       $playerLife.style.width = this.hp +'%'; 
    } else {
        $playerLife.style.width = 0 + '%';
    }
    
    return $playerLife
}

function createReloadButton() {
    const $div = document.createElement("div");
    $div.classList.add("reloadWrap");
    const $button = document.createElement("button");
    $button.classList.add("button");
    $button.innerText = 'Restart';

    $div.append($button);
    $control.append($div);

    $div.addEventListener('click', function() {
        window.location.reload()
    })

    const hideButton = liuKang.hp === 0 || subZero.hp === 0 ? $div.style.display = 'none' : $div.style.display = ''
    
        return hideButton
}


$arenas.appendChild(createPlayer(liuKang));
$arenas.appendChild(createPlayer(subZero))