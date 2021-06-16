export const createPlayer = (character) => {  //Функция создает тэги с классами и вставляет их в $player
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