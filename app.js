// A LIST OF THE CLASSES OF ALL THE CARDS
const all_the_classes =["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o",
"fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt",
"fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf",
"fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];

// THE DECK THAT CONTAIN ALL THE CARDS
const cards_container = document.querySelector('.deck');

// THE SHUFFLE FUNCTION? FOR SHUFLLING ALL THE CLASSES
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

//  THE FUNCTION THAT SHUFFLE THE CLASSES AND FROM THAT IT CREATE THE CARDS AND APPEND THEM TO THE DECK
function cards_append() {
    shuffle(all_the_classes);
    for (let i=0; i< all_the_classes.length; i++){
            const card=document.createElement("li");
            card.classList.add("card");
        card.innerHTML = "<i class= '" + all_the_classes[i] + "'</i>";
        cards_container.appendChild(card);
        card.addEventListener("click",game_engine);
        }
    }
    cards_append();
   

// GLOBAL VARIABLES / DOM VARIABLES
let startBtn = document.querySelector('.startBtn');

let moves = document.querySelector('.moves');
let secTimer = document.querySelector('.secTimer');
let milTimer = document.querySelector('.milTimer');

let starsNodes = document.querySelectorAll('.stars .fa');
let goldenStars= Array.from(starsNodes);


//  GLOBAL VARIABLES : CHANGEABLE VARIABLES
let counter =0;
let millisecond = 00;
let timer = 0;
let totalScore;


// THIS IS THE GAME IS MAIN FUNCTION - THE ENGINE
let firstOpening, secondOpening;
let opened_cards=[];
let first_time= true;
let second_time= true;
/* THIS FUNCTION SHOW THE CARD ON THE CLICK AND SAVE IT TO FIRSTOPENING AND SHOW THE SECOND CARD ON THE SECOND CLICK
 AND SAVE IT TO SECONDOPENING AND THAN CALLS THE MATCH_CHECK FUNCTION THAT COMPARE BETWEEN THE FIRSTOPENING AND SECONDOPENING
ALSO TRIGGER THE MOVES COUNTER AND THE STARS AS WELL
*/
function game_engine(){
    if(!first_time) return;
    if(this===firstOpening) return;
    this.classList.add('open','show');

    if(second_time){
        second_time = false ;
        firstOpening = this;
        return;
    }
        second_time = true;
        secondOpening = this; 

        counter_on();
        match_check();
        stars_lost();
        you_win();
}
//  CHECK IF THERE IS A MATCH BETWEEN THE TWO OPENED CARDS
function match_check(){
    let isMatch = firstOpening.firstElementChild.classList.item(1) === secondOpening.firstElementChild.classList.item(1);
        isMatch ? match_on() : match_off();
    }
//  BLOCK THE TWO CARDS THAT MATCH FROM INTERACTIVITY AND LET THEM ON
function match_on(){
    firstOpening.removeEventListener('click',game_engine);
    secondOpening.removeEventListener('click',game_engine);
    firstOpening.classList.add('match');
    secondOpening.classList.add('match');
    opened_cards.push(firstOpening);
    opened_cards.push(secondOpening);
}
//  FLIPP THE CARDS BACK OFF, BECAUSE THERE IS NO MATCH
function match_off(){
    first_time = false;
    setTimeout( () =>{
        firstOpening.classList.remove('open', 'show');
        secondOpening.classList.remove('open', 'show');
        first_time = true;
    }, 1000);
}
//  WHEN ALL THE CARDS ARE FLIPPED ON AND HAVE MATCH CLASS, THIS TRIGGER THE MODAL TO APPEAR AND MAKE THE TIMER TO STOP. 
function you_win(){
    if(opened_cards.length === 16){
        goldenStars[2].style.visibility="visible";
        modal_on();
        clearInterval(interval); 
        final_modal();    
    }
}
// COUNT THE MOVES YOU TAKE / 1 MOVE EQUAL 2 CARDS CLICKS 
function counter_on(){
    counter += 1 ;
    moves.innerHTML = counter;
}
// THIS RESET THE MOVES COUNTER TO ZERO
function reset_counter(){
    counter =0;
    moves.innerHTML = counter;
}
// THIS STARTS A TIMER/ THIS TIMER END WHEN YOU FLIP ON ALL THE CARDS
function timer_on(){
    millisecond ++;
    milTimer.innerHTML = millisecond;
    if(millisecond==10){
        millisecond=00;
        timer += 01;
        secTimer.innerHTML= timer;
    }
    ;}
//  THIS RESET THE TIMER TO ZERO
function reset_timer(){
    millisecond = 00;
    timer =0;
    clearInterval(interval);
    secTimer.innerHTML = timer;
    milTimer.innerHTML = millisecond;
}
//  THIS MAKE THE EVENT HANDLERS ON THE CARDS ACTIVE
function deck_on(){
    cards_container.style.pointerEvents="auto";
    startBtn.style.pointerEvents="none";
}
//  THE EVENT HANDLER ON THE START BUTTON THAT MAKE THE EVENT HANDLER ON THE CARDS ACTIVE
startBtn.addEventListener('click', deck_on);
//  THE EVENT HANDLER ON THE START BUTTON THAT MAKE THE TIMER START ON
 startBtn.addEventListener('click',()=>{interval = setInterval(timer_on, 100)});
 

// THE STARS
function stars_lost(){
    if(counter > 3 && opened_cards.length < 3){
        goldenStars[0].style.visibility="hidden";
    }
    if(counter > 6 && opened_cards.length <8){
        goldenStars[1].style.visibility="hidden";
    }
    if( counter > 12 && opened_cards.length < 14){
        goldenStars[2].style.visibility="hidden";
    }
    if(counter <= 10 && opened_cards.length >= 10){
        goldenStars[2].style.visibility="visible";
    }
    if(counter <= 13 && opened_cards.length >= 12){
        goldenStars[1].style.visibility="visible";
    }
    if( counter <= 15 && opened_cards.length >= 14){
        goldenStars[0].style.visibility="visible";
     }
}
function stars_reset(){
    goldenStars[0].style.visibility= "visible"
    goldenStars[1].style.visibility="visible";
    goldenStars[2].style.visibility="visible";
}


// MODAL SECTION
let modal = document.getElementById("modal");
function modal_on(){
    modal.style.display="block";
}
function modal_off(){
    modal.style.display="none";
}
//  MODAL CLOSING EVENT HANDLER
let closeBtn = document.querySelector('.closeBtn');
closeBtn.addEventListener('click', modal_off);

// MODAL VARIABLES / DOM
let movesCounter = document.querySelector('.movesCounter');
let finishTime = document.querySelector('.finishTime');
let winningMessage = document.getElementById("winningMessage");
let game_score = document.querySelector('.game_score');


//  THE SCORE ON THE FINAL MODAL
let modalStarsNodes = document.querySelectorAll(".modalStars li");
let modalStars = Array.from(modalStarsNodes);
function final_modal(){
    finishTime.innerHTML=timer + " seconds";
    movesCounter.innerHTML= counter+" moves";
    if(timer+counter<=20){totalScore=20;}
    else if (timer+counter<=25){totalScore = 20 -((timer+counter) - 20);}
    else if(timer+counter<=30){totalScore = 20 -((timer+counter) - 20 )}
    else if(timer+counter<=40){totalScore = 9;}
    else if(timer+counter<=45){totalScore = 8;}
    else if(timer+counter<=50){totalScore = 7;}
    else if(timer+counter<=55){totalScore = 6;}
    else if(timer+counter<=60){totalScore = 5}
    else if(timer+counter<=70){totalScore = 4}
    else if(timer+counter<=80){totalScore = 3}
    else if(timer+counter<=90){totalScore = 2}
    else{totalScore="You have found all the matchs, but you did it in a long time, your score is 1";}
    game_score.innerHTML = totalScore;
    if(totalScore<15){modalStars[2].style.visibility="hidden";}
    if(totalScore<=10){
        modalStars[1].style.visibility="hidden";
        winningMessage.innerText="But your score is'nt that good!"
}
    if(totalScore<=6){
        modalStars[0].style.visibility="hidden";
        winningMessage.innerText="You barely finish the game!"
    }
}
//  RESTART THE GAME
let restart_Btn = document.querySelector(".restart");
let modal_footer = document.getElementById('modal_footer');

function game_restart(){
    cards_container.innerHTML="";
    cards_append();
    opened_cards.length=0;
    firstOpening={};
    secondOpening={};
    reset_counter();
    reset_timer();
    stars_reset();
    cards_container.style.pointerEvents="none";
    startBtn.style.pointerEvents="auto";

}
//  THE EVENTS HANDLERS OF THE RESTART GAME 
restart_Btn.addEventListener('click',game_restart);
modal_footer.addEventListener('click',()=>{
    game_restart();
    modal_off()
});

    