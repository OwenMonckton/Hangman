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
    let count = 0;
    guessedLetters = guessedLetters.split('')
    const letter = document.getElementById('userInput').value;
    for(let i=0; i<word.length; i++){
        if(word[i] === letter){
            guessedLetters[i] = letter;
            count = count+1;
            document.getElementById('incorrect').textContent= ""
        }else if(count<1){
            document.getElementById('incorrect').textContent= "WRONG!";
        }
    }
    guessedLetters = guessedLetters.join('');
    document.getElementById('hiddenWord').textContent=guessedLetters.split('').join(' ');
}