const els = {
    score: null,
    answer: null,
    choices: null
};

// const words = [
//     'JAVASCRIPT', // words[0]
//     'STYLESHEET', // words[1]
//     'LANGUAGE' // words[2]
// ];
let choices = [];
let word = '';
let wordMapping = [];
let choicesMapping = [];
let scoreCount = 0;
let maxScore = 8;


const init = () => {
    // console.log('>> #init');

    // elements attachés
    els.score = document.querySelector('#score');
    els.answer = document.querySelector('#answer');
    els.choices = document.querySelector('#choices');

    // Pick word
    word = pickWord();
    // console.log('word', word);
    //  - create word mapping
    wordMapping = getWordMapping(word);
    console.log('wordMapping', wordMapping);
    // Generate choices
    choices = generateChoices();
    // console.log(choices);
    //  - create choices mapping
    choicesMapping = getChoicesMapping(choices);
    // console.log(choicesMapping);
    // Display word
    displayWord(wordMapping);
    // Display choices
    displayChoices(choicesMapping);
    // Display score
    // displayScore();
    // Listen events
    //    - mouse events
    els.choices.addEventListener('click', ({ target }) => {
        // evt:MouseEvent evt.target => { target }
        if (target.matches('li')) {
            checkLetter(target.innerHTML);
        } 
    });
    //    - keyboard events
    document.addEventListener('keydown', ({ keyCode }) => {
        // evt:KeyboardEvent evt.keyCode => { keyCode }
        // console.log('keyCode', keyCode);
        const letter = String.fromCharCode(keyCode);
        // console.log('letter', letter);
        if (keyCode >= 65 && keyCode <= 90) {
            checkLetter(letter);
        }
    });


};

    // lettre de vérification
    // - si pas dans un mot : ajouter un score
    // - si dans un mot : lettre d'affichage
    //  - fin du jeu
    // - si score == max : perdJeu
    // - si la lettre est visible : winGame
const checkLetter = (letter) => {
    console.log(letter);
    let isLetterInWord = false;
    let isAllLettersFound = true;
    // console.log('isLetterWord before loop', isLetterInWord);
    wordMapping.forEach((letterMapping) => {
        // console.log('letterMapping.letter', letterMapping.letter);
        if (letterMapping.letter === letter) {
            letterMapping.isVisible = true;
            isLetterInWord = true;
        }
        if (!letterMapping.isVisible) {
            isAllLettersFound = false;
        }
    });
    choicesMapping.forEach((letterMapping) => {
        if (letterMapping.letter === letter) {
            letterMapping.isChosen = true;
        }
    });
    displayChoices(choicesMapping);
    if (isLetterInWord === true) {
        displayWord(wordMapping);
    } else {
        scoreCount++;
        displayScore();
    }

    if (scoreCount === maxScore) {
        endGame();
    }
    if (isAllLettersFound) {
        winGame();
    }
    // console.log('isLetterWord after loop', isLetterInWord);
};

const endGame = () => {
    wordMapping.forEach(w => w.isVisible = true);
    displayWord(wordMapping);
    document.querySelector('body').style.backgroundColor = 'red';
    els.choices.innerHTML = `<h1>You dead, bro!</h1>`;
};
const winGame = () => {
    els.choices.innerHTML = `<h1>You live!</h1>`;
}

// fonction rejouer
// donc réinitialisation de toutes les variables
function restart(){};


window.addEventListener('load', () => {
    init();
});
//Identique à #1
// window.onload = init;
// Identique à #2
// window.addEventListener('load', init);
// Identique à #3
// window.onload = () => {
// init();
// };

/**
 Renvoie un entier aléatoire entre min (inclus) et max (inclus).
 * La valeur n'est pas inférieure à min (ou le prochain entier supérieur à min
 * si min n'est pas un entier) et pas supérieur à max (ou à l'entier suivant
 * inférieur à max si max n'est pas un entier).
 * L'utilisation de Math.round() vous donnera une distribution non uniforme !
 */
const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}