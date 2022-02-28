//import * as canvas from './drawing.mjs';
window.addEventListener('load', init);
const words=[
    'cat',
    'dog',
    'rabbit',
    'hamster',
    'gerbil',
    'mouse',
    'parrot',
    'chipmunk',
]
//choosing the word for the user to guess
let word = words[Math.floor(Math.random()*words.length)];
console.log(word);
//creates underscores the same length as the word
let guessedLetters = '';
for(let i=0;i<word.length;i++){
    guessedLetters = guessedLetters+'_';
}
let wrongCount = 0;

function init(){
    document.querySelector('#hiddenWord').textContent = guessedLetters.split('').join(' ');
    document.querySelector('#userInput').addEventListener('keyup', letterChecker);
    document.querySelector('#newWord').addEventListener('click', newWord);
    document.querySelector('#newWord').style.display = 'none';
}

function letterChecker(){
    let lettersGuessed = document.querySelector('#lettersGuessed');
    let letterFound = false;
    guessedLetters = guessedLetters.split('')
    let letter = document.querySelector('#userInput').value;
    letter = letter.toLowerCase();
    for(let i=0; i<word.length; i++){
        if(word[i] === letter){
            guessedLetters[i] = letter;
            letterFound = true;
            document.querySelector('#incorrect').textContent= "";
        }
    }
    if(letterFound === false){
        document.querySelector('#incorrect').textContent= "WRONG!";
        wrongCount = wrongCount+1;
        wrongCountCheck();
    }
    document.querySelector('#userInput').value = "";
    lettersGuessed.textContent= lettersGuessed.textContent + letter;
    lettersGuessed.textContent= lettersGuessed.textContent.split('').join(' ');
    guessedLetters = guessedLetters.join('');
    document.querySelector('#hiddenWord').textContent=guessedLetters.split('').join(' ');
    winCheck();
}

function newWord(){
    document.querySelector('#incorrect').textContent= "";
    document.querySelector('#lettersGuessed').textContent= "";
    word = words[Math.floor(Math.random()*words.length)];
    console.log(word);
    guessedLetters = '';
    for(let i=0;i<word.length;i++){
        guessedLetters = guessedLetters+'_';
    }
    document.querySelector('#hiddenWord').textContent=guessedLetters.split('').join(' ');
    const canvas = document.querySelector('canvas');
    const c = canvas.getContext('2d');
    c.clearRect(0,0,canvas.width,canvas.height);
    wrongCount = 0;
    document.querySelector('#userInput').style.display="inline";
    document.querySelector('#newWord').style.display = 'none';
    document.querySelector('#guessedLetters').style.display = 'block';
    document.querySelector('#lettersGuessed').style.display = 'block';
}

function winCheck(){
    let win;
    for(let i=0; i<guessedLetters.length; i++){
        if(guessedLetters[i]=== '_'){
            win = false;
        }else{
            win = true;
        }
    }
    if(win === true){
        
    }
}

function wrongCountCheck(){
    const canvas = document.querySelector('canvas');
    const c = canvas.getContext('2d');
    switch(wrongCount){
        case 1:
            //base
            c.fillRect(250,180,150,10);
            break;
        case 2:
            //spine
            c.fillRect(380,180,10,-150);
            break;
        case 3:
            //bridge
            c.fillRect(250,15,140,15);
            break;
        case 4:
            //rope
            c.fillRect(265,30,5,30);
            break;
        case 5:
            //head
            c.beginPath();
            c.arc(267.5, 70, 10, 0, Math.PI * 2, true); // Outer circle
            c.stroke();
            break;
        case 6:
            //body
            c.beginPath();
            c.moveTo(267.5,80);
            c.lineTo(267.5,120);
            c.stroke();
            break;
        case 7:
            //arms
            c.beginPath();
            //left arm
            c.moveTo(267.5,85);
            c.lineTo(257.5,95);
            //right arm
            c.moveTo(267.5,85);
            c.lineTo(277.5,95);
            c.stroke();
            break;
        case 8:
            //legs
           c.beginPath();
            //left leg
            c.moveTo(267.5,120);
            c.lineTo(257.5,145);
            //right leg
            c.moveTo(267.5,120);
            c.lineTo(277.5,145);
            c.stroke();
            document.querySelector('#newWord').style.display = 'inline';
            document.querySelector('#incorrect').textContent = 'You lose!';
            document.querySelector('#userInput').style.display = 'none';
            document.querySelector('#guessedLetters').style.display = 'none';
            document.querySelector('#lettersGuessed').style.display = 'none';
            break;
    }
}
