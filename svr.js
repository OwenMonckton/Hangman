const express = require('express');

const app = express();

app.use(express.static('client'));
app.listen(8080);

let number;
const pets = ["cat", "dog", "rabbit", "hamster", "mouse", "parrot", "chipmunk", "fish", "turtle", "bird"];
const petHints = ["a furry animal that has a long tail and sharp claws", "mans best friend", "small fluffy animal with big ears", "a fluffy animal that fits in the palm of your hand", "very small animal that loves cheese", "a very talkative bird", "ALLLVIIIN", "they live in the ocean", "they live in the ocean and have a big shell", "they fly high in the sky"];

function numberGenerator(){
    number = Math.floor(Math.random()*pets.length)
}

app.get('/petWords', (req, res) =>{
    numberGenerator();
    let word = pets[number];
    res.json(word);
})

app.get('/petHints'), (req, res) =>{
    let hint = petHints[number];
    res.json(hint);
}

