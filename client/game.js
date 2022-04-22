window.addEventListener('load', loadWord);
//sets up global variables
let wrongCount = 0;
let score = 0;
let guessedLetters;
let word;
//fetches word to be used from server
async function loadWord(){
    const response = await fetch('petWords');
    let petWord = await response.json();
    let word = petWord;
    document.querySelector('#hiddenWord').textContent = word;
    init();
}
//initialises buttons and creates blanks for the user to guess
function init(){
    document.querySelector('#userInput').addEventListener('keyup', letterChecker);
    document.querySelector('#newWord').addEventListener('click', newWord);
    document.querySelector('#newWord').style.display = 'none';
    word = document.querySelector('#hiddenWord').textContent; 
    guessedLetters = '';
    for(let i=0;i<word.length;i++){
        guessedLetters = guessedLetters+'_';
    }
    document.querySelector('#hiddenWord').textContent = guessedLetters.split('').join(' ');
}
//checks letter user inputted
function letterChecker(){
    document.querySelector('#hiddenWord').textContent = guessedLetters.split('').join(' ');
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
        if(lettersGuessed.textContent.includes(letter) !== true){
            wrongCount = wrongCount+1;    
        }
        document.querySelector('#incorrect').textContent= "Incorrect!";
    }
    document.querySelector('#userInput').value = "";
    checkGuessedLetters(letter, lettersGuessed);
    lettersGuessed.textContent = lettersGuessed.textContent.split('').join(' ');
    guessedLetters = guessedLetters.join('');
    document.querySelector('#hiddenWord').textContent=guessedLetters.split('').join(' ');
    wrongCountCheck();
    winCheck(score);
}
//checks if letter guessed has already been inputted
function checkGuessedLetters(letter, lettersGuessed){
    if(lettersGuessed.textContent.includes(letter) === true){
        document.querySelector('#incorrect').textContent= "You have already guessed that!";
    }else{
        lettersGuessed.textContent= lettersGuessed.textContent + letter;
        score = score+1;
    }
}
//generates new word for user to guess and clears all fields
function newWord(){
    loadWord();
    document.querySelector('#incorrect').textContent= "";
    document.querySelector('#lettersGuessed').textContent= "";
    word = document.querySelector('#hiddenWord').textContent; 
    guessedLetters = '';
    for(let i=0;i<word.length;i++){
        guessedLetters = guessedLetters+'_';
    }
    document.querySelector('#hiddenWord').textContent = guessedLetters.split('').join(' ');
    const canvas = document.querySelector('canvas');
    const c = canvas.getContext('2d');
    c.clearRect(0,0,canvas.width,canvas.height);
    score = 0;
    wrongCount = 0;
    document.querySelector('#userInput').style.display="inline";
    document.querySelector('#newWord').style.display = 'none';
    document.querySelector('#guessedLetters').style.display = 'block';
    document.querySelector('#lettersGuessed').style.display = 'block';
    document.querySelector('#win').style.display = 'none';
}
//checks if user has guessed all the letters
function winCheck(score){
    let win;
    for(let i=0; i<guessedLetters.length; i++){
        if(guessedLetters[i]=== '_'){
            win = false;
            break;
        }else{
            win = true;
        }
    }
    if(win === true){
        document.querySelector('#newWord').style.display = 'inline';
        document.querySelector('#win').style.display = 'block';
        document.querySelector('#win').textContent = 'You Win! It took you '+score+' guesses.';
        document.querySelector('#userInput').style.display = 'none';
        document.querySelector('#guessedLetters').style.display = 'none';
        document.querySelector('#lettersGuessed').style.display = 'none';
    }
}
//takes in number of wrong guesses and uses that to draw hangman
function wrongCountCheck(){
    const canvas = document.querySelector('canvas');
    const c = canvas.getContext('2d');
    c.strokeStyle = '#ffffff';
    c.fillStyle = '#ffffff';
    switch(wrongCount){
        case 1:
            //base
            c.fillRect(0,190,150,10);
            break;
        case 2:
            //spine
            c.fillRect(130,190,10,-190);
            break;
        case 3:
            //bridge
            c.fillRect(35,0,105,10);
            break;
        case 4:
            //rope
            c.fillRect(55,10,5,30);
            break;
        case 5:
            //head
            c.beginPath();
            c.arc(57.5, 50, 10, 0, Math.PI * 2, true); // Outer circle
            c.stroke();
            break;
        case 6:
            //body
            c.beginPath();
            c.moveTo(57.5,60);
            c.lineTo(57.5,100);
            c.stroke();
            break;
        case 7:
            //arms
            c.beginPath();
            //left arm
            c.moveTo(57.5,65);
            c.lineTo(47.5,85);
            //right arm
            c.moveTo(57.5,65);
            c.lineTo(67.5,85);
            c.stroke();
            break;
        case 8:
            //legs
           c.beginPath();
            //left leg
            c.moveTo(57.5,100);
            c.lineTo(47.7,125);
            //right leg
            c.moveTo(57.5,100);
            c.lineTo(67.5,125);
            c.stroke();
            document.querySelector('#newWord').style.display = 'inline';
            document.querySelector('#incorrect').textContent = ('You lose! The word was '+word);
            document.querySelector('#userInput').style.display = 'none';
            document.querySelector('#guessedLetters').style.display = 'none';
            document.querySelector('#lettersGuessed').style.display = 'none';
            break;
    }
}
