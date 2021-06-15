export const showResult = () => {  /*При нажатии на кнопку вызываеться функция changeHP и отнимается количество жизни и отображаеться на шкале при вызове changeHP.
    Если у одного из игроков hp = 0, кнопка не активна. Выводиться имя победителя или ничья.*/
    if (hp === 0 || hp2 === 0) {
        $fightButton.disabled = true;
        createReloadButton()
    }

    if (hp === 0 && hp < hp2) {
        $arenas.appendChild(playerWins(name2));
        generateLogs('end', subZero, liuKang, 0);
    } else if (hp2 === 0 && hp2 < hp) {
        $arenas.appendChild(playerWins(name));
        generateLogs('end', liuKang, subZero, 0);
    } else if (hp === 0 && hp2 === 0) {
        $arenas.appendChild(playerWins());
        generateLogs('draw');
    }
}