const liuKang = {
    name: 'Liu Kang',
    hp: 80,
    img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
    weapon: ['Dragon sword','Nunchucks','Fire ball'],
    attack: function () {
        console.log(liuKang.name + ' ' + 'Fight...');
    }
}
liuKang.attack()

const subZero = {
    name: 'Sub Zero',
    hp: 50,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Sword','Snow ball'],
    attack: function () {
        console.log(subZero.name + ' ' + 'Fight...');
    }
}
subZero.attack()

function createPlayer(player, character) {
    const $player = document.createElement('div');
    const $progressbar = document.createElement('div');
    const $life = document.createElement('div');
    const $name = document.createElement('div');
    const $character = document.createElement('div');
    const $img = document.createElement('img');

    $player.classList.add(player);      
    $progressbar.classList.add('progressbar');
    $life.classList.add('life');
    $name.classList.add(player);
    $character.classList.add('character');
    
    $player.appendChild($progressbar);  
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $player.appendChild($character);
    $character.appendChild($img);
    
    $life.style.width = character.hp;   
    $name.innerText = character.name; 
    $img.src = character.img;
    
    const $arenas = document.querySelector('.arenas');
    $arenas.appendChild($player);
}

createPlayer('player1', liuKang)
createPlayer('player2', subZero);