export const randomInteger = (num) => Math.ceil(Math.random()*num);  //Создает рандомное число

export const createElement = (tag, className) => {  //Функция для создания тэгов и классов
    const $tag = document.createElement(tag);
    if(className) {
        $tag.classList.add(className);
      }
    return $tag
}

export function  elHP() {   //coздает ссылку на div c классом life у каждого игрока (шкала жизни)
  return  document.querySelector('.player' + this.player +' .life');
}

export function changeHP(randomInteger) { //При нажатии на кнопку Рандом у игрока отнимаеться рамдомное количество жизни. Если жизнь уйдет в минус, игроку запишется значение 0
  this.hp -= randomInteger;
  
  if(this.hp <= 0) {
      this.hp = 0;
  } 
  return this.hp
}

export function  renderHP() {  //ширина и количество шкалы жизни меняются в зависимости от hp
  this.elHP().style.width = this.hp +'%'; 
  const $playerName = document.querySelector('.player' + this.player +' .name');
  $playerName.innerText = this.name + ' ' +this.hp + '%';
}

export const playerWins = (name) => { // Создает тэг div с классом winTitlе и выводит имя победителя или ничью
    const  $winTitle = createElement('div', 'winTitle');
    if(name) {
     $winTitle.innerText = name + ' wins';
    } else {
     $winTitle.innerText = 'draw';
    }
    return $winTitle;
 }