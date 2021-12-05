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
const word = words[Math.floor(Math.random()*words.length)];
console.log(word);
let guessedLetters = '';
for(let i=0;i<word.length;i++){
    guessedLetters = guessedLetters+'_';
}

function startHm(){
    document.getElementById('hiddenWord').textContent=guessedLetters.split('').join(' ');
}

function letterChecker(){
    guessedLetters = guessedLetters.split('')
    const letter = document.getElementById('userInput').value;
    for(let i=0; i<word.length; i++){
        if(word[i] === letter){
            guessedLetters[i] = letter;
        }
    }
    guessedLetters = guessedLetters.join('');
    document.getElementById('hiddenWord').textContent=guessedLetters.split('').join(' ');
}