let correctAnswers = 0;
let incorrectAnswers = 0;
let answers = [];
let questionNumber = 0;

let greekStem = "";
let declension = "";
let gender = "";
let number = "";
let grammaticalCase = "";
let ending = "";
let greekWordDeclined = "";
let greekWordNominative = "";


//Fisher-Yates shuffle algorithm
Array.prototype.shuffle = function() {
    let i = this.length, j, temp;
    while(--i > 0) {
        j = Math.floor(Math.random()* (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
    return this;
}

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
        // console.log("greekWordNominative: " + greekWordNominative);
        // console.log("greekStem: " + greekStem);
        // console.log("declension: " + declension);
        // console.log("gender: " + gender);
        // console.log("grammaticalCase: " + grammaticalCase);
        // console.log("number: " + number);
        console.log("greekWordDeclined: " + greekWordDeclined);
    },
    startGame: function () {

    },
    questionSetup: function () {
        answers = [];
        gameFunctions.pickCorrectAnswer();
        gameFunctions.checkInfo();
        //prints question information to screen
            $('#case').text(grammaticalCase);
            $('#gender').text(gender);
            if (number === 0) {
                $('#number').text("singular");
            } else {
                $('#number').text("plural");
            }
            $('#word').text(greekWordNominative);
        
        //picks three wrong answers
        while (answers.length < 4) {
            gameFunctions.pickWrongAnswer();
        }
        
        //shuffles answers and then prints each to the screen
        answers.shuffle();
        $('#answer1').text(answers[0]);
        $('#answer2').text(answers[1]);
        $('#answer3').text(answers[2]);
        $('#answer4').text(answers[3]);
        
    },
    pickCorrectAnswer: function () {
        //selects random word from word object and stores each element of the corresponding array in global scope
        randomWordIndex = Math.floor(Math.random()*words.allWords.length);
        newWord = words.allWords[randomWordIndex];
        greekWordNominative = words[newWord][0] //variable names for object properties MUST be in bracket notation
        greekStem = words[newWord][1];
        declension = words[newWord][2];
        gender = words[newWord][3]

        //selects a random case and number
        randomCaseIndex = Math.floor(Math.random()*nounProperties.case.length);
        grammaticalCase = nounProperties.case[randomCaseIndex];
        randomNumberIndex = Math.floor(Math.random()*nounProperties.number.length);
        number = nounProperties.number[randomNumberIndex];
        
        //declines the new greek word based on variables just picked
        //note that in order to refer to an object based on a variable, I am forced to reference the window to use bracket notation. In other words, console.log(secondDeclension), when a variable is involved, turns into console.log(window[declension])
        greekWordDeclined = greekStem + window[declension][gender][grammaticalCase][number];
        answers.push(greekWordDeclined);
    },
    pickWrongAnswer: function () {
        randomCaseIndex = Math.floor(Math.random()*nounProperties.case.length);
        newGrammaticalCase = nounProperties.case[randomCaseIndex];
        randomNumberIndex = Math.floor(Math.random()*nounProperties.number.length);
        newNumber = nounProperties.number[randomNumberIndex];
        wrongAnswer = greekStem + window[declension][gender][newGrammaticalCase][newNumber];
        
        isDuplicate = gameFunctions.checkWrongAnswerForDuplicates(wrongAnswer);
        console.log("isDuplicate: " + isDuplicate);
        
        if (isDuplicate === true) {
            gameFunctions.pickWrongAnswer();
        } else {
            answers.push(wrongAnswer);
            console.log(answers);
        }
    },
    checkWrongAnswerForDuplicates(wrongAnswer) {
        for (i=0; i < answers.length; i++) {
            console.log("wrong answer: " + wrongAnswer + " answers[i]: " + answers[i])
            if (wrongAnswer === answers[i]) {
                return true;
            } 
        }
            return false; //this must be outside the for loop; otherwise duplicates will slip through. The for loop must run through EACH element in the array no matter what.
    },
    checkAnswer: function () {
        //compare user's choice with greekWordDeclined
        //if else block incrementing either correctAnswers or incorrectAnswers
        //gameFunctions.showAnswer();
    },
    showAnswer: function () {
        //displays screen with the correct answer, and whether the user got it right or wrong
    },
    calculatePercentage: function () {
        //tallies final score after questionNumber variable hits 10
    }

}

// nominative: "λόγος", λόγοι
// genitive: "λόγου", λόγων
// dative: "λόγῳ", λόγοις 
// accusative: "λόγον", λόγους
// vocative: "λόγε", λόγοι