class Player {
    constructor(props) {
        this.name = props.name;
        this.hp = props.hp;
        this.img = props.img;
        this.player = props.player;
        this.selector = `player${this.player}`;
        this.rootSelector = props.rootSelector;
    }

    elHP = () => {  //coздает ссылку на div c классом life у каждого игрока (шкала жизни)
        return document.querySelector(`.player${this.selector}.life`);
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

    createPlayer = () => {  //Функция создает тэги с классами и вставляет их в $player
        const $player = createElement('div', this.selector);
        const $progressbar = createElement('div', 'progressbar');
        const $life = createElement('div', 'life');
        const $name = createElement('div', 'name');
        const $character = createElement('div', 'character');
        const $img = createElement('img');
    
        $life.style.width = this.hp + '%';
        $name.innerText = this.name + ' ' + this.hp + '%';
    
        $img.src = this.img;
        
        $progressbar.appendChild($life);
        $progressbar.appendChild($name);
        $player.appendChild($progressbar);
        $player.appendChild($character);
        $character.appendChild($img);

        const $root = document.querySelector(`.${this.rootSelector}`);
        $root.appendChild($player);

        return $player;
    }
}

export default Player;