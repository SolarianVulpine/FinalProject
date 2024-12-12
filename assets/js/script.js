let fetchedword = "";
let scrambledword = "";
let difficulty = "";
let testword = "racecar";

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
    let userGuess = document.getElementById("userGuess").value.toLowerCase();
    if (userGuess === fetchedword) {
        alert("You Win");
    }
    else{
        alert("Nope");
    }
    document.getElementById("userGuess").value="";
}



function scrambler(testword){
    const wordarray = testword.split('');
    for(let i = wordarray.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i +  1));
        [wordarray[i], wordarray[j]] = [wordarray[j], wordarray[i]];
    }
    return wordarray.join('');
}
scrambledword = scrambler(testword)
console.log(scrambledword);