export const randomInteger = (num) => Math.ceil(Math.random()*num);  //Создает рандомное число

export const createElement = (tag, className) => {  //Функция для создания тэгов и классов
    const $tag = document.createElement(tag);
    if(className) {
        $tag.classList.add(className);
      }
    return $tag
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