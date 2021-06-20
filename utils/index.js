export const randomInteger = (num) => Math.ceil(Math.random()*num);  //Создает рандомное число

export const createElement = (tag, className) => {  //Функция для создания тэгов и классов
    const $tag = document.createElement(tag);
    if(className) {
        $tag.classList.add(className);
      }
    return $tag
}

export const getTime = () => {
  const date = new Date();
  return `${data.getHours()} : ${data.getMinutes()}`
}