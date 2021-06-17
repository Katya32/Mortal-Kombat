export const playerAttack = () => {
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