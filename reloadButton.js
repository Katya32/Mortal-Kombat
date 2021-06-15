export const createReloadButton = () => { /*Создает кнопку перезагрузки при завершении игры(если у одного из игроков hp = 0) 
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