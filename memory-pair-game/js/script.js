document.addEventListener("DOMContentLoaded", function(event) {
    const cards = [
        "images/1.png",
        "images/2.png",
        "images/3.png",
        "images/4.png",
        "images/5.png",
        "images/6.png"
    ];
    cards.forEach(function (item) {
        cards.push(item);
    });

    let newArr = cards.sort(function() { return 0.5 - Math.random() });

    const main = document.querySelector('.main');
    const back = document.querySelectorAll('.back');

    for (let i=0; i<newArr.length; i++){
            back[i].innerHTML = '<img src=' + cards[i] + '>';
    }

    main.addEventListener('click', (e) => {
        let activeCards = document.querySelectorAll('.flip-container.active');
        let card = e.target;
        if(activeCards.length===2){
            activeCards.forEach(function (card) {
                card.classList.remove('active');
            })
        }
        card.closest('.flip-container').classList.add('active');

    });





});