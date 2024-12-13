<<<<<<< HEAD
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


=======
import { easyAPIcall, normalAPIcall, hardAPIcall } from './api.js';

let fetchedword = "";
let scrambledword = "";
let difficulty = "easy";

async function fetchword(){
    let result;
    try{
    switch(difficulty){
        case 'easy':
            result = await easyAPIcall();
            break;
        case 'normal':
            result = await normalAPIcall();
            break;
        case 'hard':
            result = await hardAPIcall();
            break;
    }
    fetchedword = await result.text();
    scrambledword = scrambler(fetchedword);
    displayScramble();
    }
    catch (error){
        console.error("fetch is not gonna happen stop trying to make happen", error);
    }
}

function displayScramble(){
    document.getElementById("scrambledWord").innerText=scrambledword;
}
>>>>>>> 2384f7b974cf4cde4eef2c737fbf548631947ae0

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

<<<<<<< HEAD


function scrambler(testword){
    const wordarray = testword.split('');
=======
function scrambler(fetchedword){
    const wordarray = fetchedword.split('');
>>>>>>> 2384f7b974cf4cde4eef2c737fbf548631947ae0
    for(let i = wordarray.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i +  1));
        [wordarray[i], wordarray[j]] = [wordarray[j], wordarray[i]];
    }
<<<<<<< HEAD
    return wordarray.join('');
}
scrambledword = scrambler(testword)
console.log(scrambledword);
=======
    const scrambledword = wordarray.join('');
    return scrambledword;
}

document.addEventListener("DOMContentLoaded", function() {
    const easyBtn = document.getElementById('easy');
    const normalBtn = document.getElementById('normal');
    const hardBtn = document.getElementById('hard');
    const submitBtn = document.getElementById('submit');
    const resetBtn = document.getElementById('reset');
    const scrambledWord = document.getElementById('scrambledWord');
    const userGuess = document.getElementById('userGuess');

    easyBtn.addEventListener("click", () => {
        difficulty = "easy";
        fetchAndScrambleWord(difficulty);
    });
    
    normalBtn.addEventListener("click", () => {
        difficulty = "normal";
        fetchAndScrambleWord(difficulty);
    });
    
    hardBtn.addEventListener("click", () => {
        difficulty = "hard";
        fetchAndScrambleWord(difficulty);
    });

})
>>>>>>> 2384f7b974cf4cde4eef2c737fbf548631947ae0
