const $arenas = document.querySelector('.arenas');
const $fightButton = document.querySelector('.button');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');

const liuKang = {
    player: 1,
    name: 'Liu Kang',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
    weapon: ['Dragon sword', 'Nunchucks', 'Fire ball'],

    changeHP,
    elHP,
    renderHP,
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
<<<<<<< Updated upstream
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

=======
>>>>>>> Stashed changes
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

const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};

function enemyAttack() { //Рандомный урон от врага
    const hit =  ATTACK[randomInteger(ATTACK.length-1)-1];
    const defence = ATTACK[randomInteger(ATTACK.length-1)-1];
     return {
         value: randomInteger(HIT[hit]), 
         hit, 
         defence,
    }
 }

function playerAttack() {
    const attack = {};

    for(let item of $formFight) { //Перебираем все инпуты у формы
        if(item.checked && item.name === 'hit') { //Если выбран удар, то в обьект записываем куда бьем и какой урон
            attack.value = randomInteger(HIT[item.value]);
            attack.hit = item.value;
            }
        if(item.checked && item.name === 'defence') { //Если выбрана защита, то в обьект записываем что защищаем
            attack.defence = item.value;
        }
        item.checked = false;
    }  

    return attack;
}

function showResult() {  /*При нажатии на кнопку вызываеться функция changeHP и отнимается количество жизни и отображаеться на шкале при вызове changeHP.
    Если у одного из игроков hp = 0, кнопка не активна. Выводиться имя победителя или ничья.*/
    if (liuKang.hp === 0 || subZero.hp === 0) {
        $fightButton.disabled = true;
        createReloadButton()
    }

    if (liuKang.hp === 0 && liuKang.hp < subZero.hp) {
        $arenas.appendChild(playerWins(subZero.name));
        generateLogs('end', subZero, liuKang, 0);
    } else if (subZero.hp === 0 && subZero.hp < liuKang.hp) {
        $arenas.appendChild(playerWins(liuKang.name));
        generateLogs('end', liuKang, subZero, 0);
    } else if (liuKang.hp === 0 && subZero.hp === 0) {
        $arenas.appendChild(playerWins());
        generateLogs('draw');
    }
}

function generateLogs(type, liuKang, subZero, hp) {
    let text = '';
    let time = new Date().getHours() + ':' + new Date().getMinutes();
    let el = `<p>${text}</p>`;

    switch (type) {
        case 'start':
            text = logs[type].replace('[player1]', liuKang.name).replace('[player2]', subZero.name).replace('[time]', time);
            el = `<p>${text}</p>`
            break; 
        case 'hit':
            text = logs[type][randomInteger(logs[type].length -1)].replace('[playerKick]', liuKang.name).replace('[playerDefence]', subZero.name);
            el = `<p>${time} - ${text} - ${hp} [${subZero.hp}/100]</p>`;
            break;
        case 'defence':
            text = logs[type][randomInteger(logs[type].length -1)].replace('[playerKick]', liuKang.name).replace('[playerDefence]', subZero.name);
            el = `<p>${time} - ${text} - ${hp} [${subZero.hp}/100]</p>`;
            break;
        case 'draw':
            text = logs[type][randomInteger(logs[type].length -1)];
            el = `<p>${time} - ${text}</p>`;
            break;
        case 'end':
            text = logs[type][randomInteger(logs[type].length -1)].replace('[playerWins]', liuKang.name).replace('[playerLose]', subZero.name);
            el = `<p>${time} - ${text}</p>`;
            break;
    }
    $chat.insertAdjacentHTML('afterbegin', el);
}
generateLogs('start', liuKang, subZero, 0);

$formFight.addEventListener('submit', function(event) { /*Вешаем слушателя событий на кнопку Fight. Выводим наши чекбоксы*/
    event.preventDefault();
    const enemy = enemyAttack(); 
    const player = playerAttack();

    if (player.defence !== enemy.hit) {
        liuKang.changeHP(enemy.value);
        liuKang.renderHP();
        generateLogs('hit', subZero, liuKang, player.value)
    }
    if (enemy.defence !== player.hit) {
        subZero.changeHP(player.value);
        subZero.renderHP();   
        generateLogs('hit', liuKang, subZero, enemy.value)
    }  
    showResult()
})
