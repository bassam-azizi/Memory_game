/*
 * Create a list that holds all of your cards
 */
const cards = document.querySelectorAll('.card');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(cards) {
    var currentIndex = cards.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
    }

    return cards;
}
shuffle(cards);

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 */
function openCard(){
    this.classList.toggle('open');
}

cards.forEach(function(card){
    card.addEventListener('click',openCard);
})
/*
- add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
*  - if the list already has another card, check to see if the two cards match
*    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
*    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
*    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
*    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
*/
let card_on = false ;
let lock_deck = false ;
let firstOpening, secondOpening ;
var counter;
counter = 0;
let opened_cards =[];


function openCard(){

    if(lock_deck) return;
    if(this===firstOpening) return;
    this.classList.add('open','show');

    if(!card_on){
        card_on = true ;
        firstOpening = this;
        return;
    }
        card_on = false;
        secondOpening = this; 
        
        move_counter();
        stars_shows();
        match_check();
        you_win();
}
        
let reset_Opening = function(){
    [card_on, lock_deck] = [false, false];
    [firstOpening, secondOpening] = [null, null];
}

let match_check = function(){
    let isMatch = firstOpening.firstElementChild.classList.item(1) === secondOpening.firstElementChild.classList.item(1);
        isMatch ? match_on() : cards_off();
    }

let match_on = function(){
    firstOpening.removeEventListener('click',openCard);
    secondOpening.removeEventListener('click',openCard);
    firstOpening.classList.add('match');
    secondOpening.classList.add('match');
    opened_cards.push(firstOpening);
    opened_cards.push(secondOpening);
}
let cards_off = function(){
    lock_deck = true;
    setTimeout( () =>{
        firstOpening.classList.remove('open', 'show');
        secondOpening.classList.remove('open', 'show');
        lock_deck = false;
    }, 1500);
}

let move_counter = function(){
    counter += 1 ;
    let moves = document.querySelector('.moves');
    moves.innerHTML = counter;
}

let stars = document.querySelectorAll('.stars .fa');


stars[0].style.visibility="hidden";
stars[1].style.visibility="hidden";
stars[2].style.visibility="hidden";

let stars_shows = function(){
    if(opened_cards.length > 4){
        stars[0].style.visibility="visible";
    }
    if(opened_cards.length > 6){
        stars[1].style.visibility="visible";
    }
}



let you_win = function(){
    if(opened_cards.length === 16){
        stars[2].style.visibility="visible";
        alert('CONGRATULATION!  YOU WIN with '+ counter + ' moves ( ~.~ ) ');
    }
}


let restart_Btn = document.querySelector(".restart");
let unlock_re = true;

let remove_Classes = function() {
    document.location.reload();
}
restart_Btn.addEventListener("click", remove_Classes);

