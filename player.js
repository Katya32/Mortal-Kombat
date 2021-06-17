export class Player {
    constructor(props) {
        this.player = props.player;
        this.name = props.name;
        this.hp = props.hp;
        this.img = props.img;
        this.weapon = props.weapon;
    }

    elHP = () => {  //coздает ссылку на div c классом life у каждого игрока (шкала жизни)
        return document.querySelector('.player' + this.player +' .life');
    }

    renderHP = () => {//ширина и количество шкалы жизни меняются в зависимости от hp
        this.elHP().style.width = this.hp +'%'; 
        const $playerName = document.querySelector('.player' + this.player +' .name');
        $playerName.innerText = this.name + ' ' +this.hp + '%';
    }

    changeHP = (randomInteger) => {//При нажатии на кнопку Рандом у игрока отнимаеться рамдомное количество жизни. Если жизнь уйдет в минус, игроку запишется значение 0
        this.hp -= randomInteger;
        if(this.hp <= 0) {
            this.hp = 0;
        } 
        return this.hp
    }

    createPlayer = () => {//Функция создает тэги с классами и вставляет их в $player
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
}