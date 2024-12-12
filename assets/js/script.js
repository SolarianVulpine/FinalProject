let fetchedword = "";
let scrambledword = "";
let difficulty = "";

function ScrambledWord(fetchedword){

}

function fetchword(){
    switch(difficulty){
        case 'easy':

            break;
        case 'normal':

            break;
        case 'hard':

            break;
        }
}

function checkSubmit(){
    let userGuess = document.getElementById("userGuess").ariaValueMax.toLowerCase();
    if (userGuess === fetchedword) {
        alert("You Win");
    }
    else{
        alert("Nope");
    }
}

