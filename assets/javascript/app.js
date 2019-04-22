let correctAnswers = 0;
let incorrectAnswers = 0;
let trueAnswer = "";
let falseAnswers = [];
let isAnswerCorrect = true;

let greekStem = "";
let declension = "";
let gender = "";
let number = "";
let grammaticalCase = "";
let ending = "";
let greekWord = "";

nounProperties = {
    declensions: ["firstDeclension", "secondDeclension", "thirdDeclension"],
    number: [0, 1], //singulars are always at 0 in arrays below, plurals in 1
    gender: ["masculine", "feminine", "neuter"],
    case: ["nominative", "genitive", "dative", "accusative", "vocative" ]
}

words = {
    allWords: ["logos", "nesos", "ergon"],
    logos: ["λόγος", "λόγ", "secondDeclension", "masculine"],
    nesos: ["νῆσος", "ν", "secondDeclension", "feminine"],
    ergon: ["ἔργον", "ἔργ", "secondDeclension", "neuter"],
},

firstDeclension = {

},

secondDeclension = {
    masculine : {
        nominative: ["ος", "οι"],
        genitive: ["ου", "ων"],
        dative: ["ῳ", "οις"],
        accusative: ["ον", "ους"],
        vocative: ["ε", "οι"]
    },
    feminine : {
        nominative: ["ῆσος", "ῆσοι"],
        genitive: ["ήσου", "ήσων"],
        dative: ["ήσῳ", "ήσοις"],
        accusative: ["ῆσον", "ήσους"],
        vocative: ["ῆσε", "ῆσοι"]
    },
    neuter : {
        nominative: ["ον", "α"],
        genitive: ["ου", "ων"],
        dative: ["ῳ", "οις"],
        accusative: ["ον", "α"],
        vocative: ["ον", "α"],
    }
}

thirdDeclension = {

}

gameFunctions = {
    checkInfo: function () {
        console.log("greekWord: " + greekWord);
        console.log("greekStem: " + greekStem);
        console.log("declension: " + declension);
        console.log("gender: " + gender);
        console.log("grammaticalCase: " + grammaticalCase);
        console.log("number: " + number);
        console.log("greekWord: " + greekWord);
    },
    startGame: function () {

    },
    pickNewWord: function () {
        //selects random word from word object and passes each element of the corresponding array to the global scope
        random1 = Math.floor(Math.random()*words.allWords.length);
        newWord = words.allWords[random1];
        greekWord = words[newWord][0] //variable names for object properties MUST be in bracket notation
        greekStem = words[newWord][1];
        declension = words[newWord][2];
        gender = words[newWord][3]

        //selects a random case and number
        random2 = Math.floor(Math.random()*nounProperties.case.length);
        grammaticalCase = nounProperties.case[random2];
        
        random3 = Math.floor(Math.random()*nounProperties.number.length);
        number = nounProperties.number[random3];
        
        gameFunctions.checkInfo();

        //concatenates and displays full greekWord based on variables just picked
        //note that in order to refer to an object based on a variable, I am forced to reference the window to use bracket notation. In other words, console.log(secondDeclension), when a variable is involved, turns into console.log(window[declension])
        greekWord = greekStem + window[declension][gender][grammaticalCase][number]
        
        //gameFunctions.pickNewAnswers(answer);
    },
    pickNewAnswers: function (answer) {
        //grabs correct answer from pickNewWord function
        //randomly picks three false answers
        //puts all answers in random order
    },
    checkAnswer: function () {
        //if else block incrementing either correctAnswers or incorrectAnswers
    },
    showAnswer: function () {
        //displays screen with the correct answer, and whether the user got it right or wrong
    },
    calculatePercentage: function () {
        //tallies final score
    }

}

// nominative: "λόγος", λόγοι
// genitive: "λόγου", λόγων
// dative: "λόγῳ", λόγοις 
// accusative: "λόγον", λόγους
// vocative: "λόγε", λόγοι