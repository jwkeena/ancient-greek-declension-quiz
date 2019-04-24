let correctAnswers = 0;
let incorrectAnswers = 0;
let answers = [];
let questionNumber = 0;
let secondsRemaining = 8;

let declension = "";
let gender = "";
let number = "";
let grammaticalCase = "";
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

words = {
    allWords: ["logos", "nesos", "ergon", "polites", "psyche", "daimon", "charis"],
    logos: ["λόγος", "secondDeclension", "masculine", "2nd, declined the same as masculine nouns"],
    nesos: ["νῆσος", "secondDeclension", "feminine", "2nd, declined the same as feminine nouns"],
    ergon: ["ἔργον", "secondDeclension", "neuter", "2nd, remember nom/acc rule"],
    polites: ["πολίτης", "firstDeclension", "masculine", "1st, declined the same as -ας nouns"],
    psyche: ["ψυχή", "firstDeclension", "feminine", "1st, declined the same as long -α nouns"],
    daimon: ["δαίμων", "thirdDeclension", "masculine", "3rd, note the unique vocative in the singular"],
    charis: ["χάρις", "thirdDeclension", "feminine", "3rd, note unique vocative in the singular"],
    genos: ["γένος", "thirdDeclension", "neuter", "3rd, remember nom/acc rule"]
}

nounProperties = {
    declensions: ["firstDeclension", "secondDeclension", "thirdDeclension"],
    numbers: ["singular", "plural"], 
    genders: ["masculine", "feminine", "neuter"],
    cases: ["nominative", "genitive", "dative", "accusative", "vocative" ]
}


firstDeclension = {
    masculine: {
        singular: {
            nominative: "πολίτης",
            genitive: "πολίτου",
            dative: "πολίτῃ",
            accusative: "πολίτην",
            vocative: "πολῖτα",
        },
        plural: {
            nominative: "πολῖται",
            genitive: "πολιτῶν",
            dative: "πολίταις",
            accusative: "πολίτᾶς",
            vocative: "πολῖται",
        }
    },
    feminine: {
        singular: {
            nominative: "ψυχή",
            genitive: "ψυχῆς",
            dative: "ψυχῃ",
            accusative: "ψυχήν",
            vocative: "ψυχή",
        },
        plural: {
            nominative: "ψυχαί",
            genitive: "ψυχῶν",
            dative: "ψυχαῖς",
            accusative: "ψυχάς",
            vocative: "ψυχαί",
        }
    },

    //there is no neuter 1st declension noun

}

secondDeclension = {
    masculine: {
        singular: {
            nominative: "λόγος",
            genitive: "λόγου",
            dative: "λόγῳ",
            accusative: "λόγον",
            vocative: "λόγε",
        },
        plural: {
            nominative: "λόγοι",
            genitive: "λόγων",
            dative: "λόγοις",
            accusative: "λόγους",
            vocative: "λόγοι",
        }
    },
    feminine: {
        singular: {
            nominative: "νῆσος",
            genitive: "νήσου",
            dative: "νήσῳ",
            accusative: "νῆσον",
            vocative: "νῆσε",
        },
        plural: {
            nominative: "νῆσοι",
            genitive: "νήσων",
            dative: "νήσοις",
            accusative: "νήσους",
            vocative: "νῆσοι",
        },
    },
    neuter: {
        singular: {
            nominative: "ἔργον",
            genitive: "ἔργου",
            dative: "ἔργῳ",
            accusative: "ἔργον",
            vocative: "ἔργον",
        },
        plural: {
            nominative: "ἔργα",
            genitive: "ἔργων",
            dative: "ἔργοις",
            accusative: "ἔργα",
            vocative: "ἔργα",
        }
    }
}

thirdDeclension = {
    masculine: {
        singular: {
            nominative: "δαίμων",
            genitive: "δαίμονος",
            dative: "δαίμονι",
            accusative: "δαίμονα",
            vocative: "δαῖμον",
        },
        plural: {
            nominative: "δαίμονες",
            genitive: "δαιμόνων",
            dative: "δαίμοσι",
            accusative: "δαίμονας",
            vocative: "δαίμονες",
        }
    },
    feminine: {
        singular: {
            nominative: "χάρις",
            genitive: "χάριτος",
            dative: "χάριτι",
            accusative: "χάριν",
            vocative: "χάρι",
        },
        plural: {
            nominative: "χάριτες",
            genitive: "χαρίτων",
            dative: "χάρισι",
            accusative: "χάριτας",
            vocative: "χάριτες",
        }
    },
    neuter: {
        singular: {
            nominative: "γένος",
            genitive: "γένους",
            dative: "γένει",
            accusative: "γένος",
            vocative: "γένος",
        },
        plural: {
            nominative: "γένη",
            genitive: "γενῶν",
            dative: "γένεσι",
            accusative: "γένη",
            vocative: "γένη",
        }
    }

    // singular: {
    //     nominative: "",
    //     genitive: "",
    //     dative: "",
    //     accusative: "",
    //     vocative: "",
    // },
    // plural: {
    //     nominative: "",
    //     genitive: "",
    //     dative: "",
    //     accusative: "",
    //     vocative: "",
    // }

}

gameFunctions = {
    //I put the timer variables in the gameFunctions scope so that they don't initialize immediately upon the page loading
    answerTimer: setInterval(this.decrementSecond, 1000),
    questionTimer: setInterval(this.questionSetup, 8000),
    
    checkInfo: function () {
        // console.log("greekWordNominative: " + greekWordNominative);
        // console.log("greekStem: " + greekStem);
        // console.log("declension: " + declension);
        // console.log("gender: " + gender);
        // console.log("grammaticalCase: " + grammaticalCase);
        // console.log("number: " + number);
        console.log("answer: " + greekWordDeclined);
        console.log(answers);
    },
    decrementSecond: function () {
        --secondsRemaining;
        $('#timer').text(secondsRemaining)
        if (secondsRemaining === 0) {
            ++incorrectAnswers;
            $('#incorrect-answers').text(incorrectAnswers);
            gameFunctions.questionSetup();
        }
    },
    resetVariables: function () {
        //resets variables
        secondsRemaining = 8;
        $('#timer').text(secondsRemaining);
        answers = [];

        //resets timers
        clearInterval(gameFunctions.answerTimer);
        clearInterval(gameFunctions.questionTimer);
        gameFunctions.answerTimer = setInterval(this.decrementSecond, 1000);
        gameFunctions.questionTimer = setInterval(this.questionSetup, 8000);

    },
    questionSetup: function () {
        gameFunctions.resetVariables();
        
        //retrieves answer and prints question information to screen
        gameFunctions.pickCorrectAnswer();
        $('#case').text(grammaticalCase);
        $('#gender').text(gender);
        $('#number').text(number);
        $('#word').text(greekWordNominative);
    
        //picks three wrong answers
        while (answers.length < 4) {
            gameFunctions.pickWrongAnswer();
        }
        
        //shuffles all possible answers and then prints each to the screen
        answers.shuffle();
        $('#answer1').text(answers[0]);
        $('#answer2').text(answers[1]);
        $('#answer3').text(answers[2]);
        $('#answer4').text(answers[3]);
        
        gameFunctions.checkInfo();
    },
    pickCorrectAnswer: function () {
        //selects random word from word object and stores each element of the corresponding array in global scope
        randomWordIndex = Math.floor(Math.random()*words.allWords.length);
        newWord = words.allWords[randomWordIndex];
        greekWordNominative = words[newWord][0] //variable names for object properties MUST be in bracket notation
        declension = words[newWord][1];
        gender = words[newWord][2]

        //selects a random case and number from nounProperties
        randomCaseIndex = Math.floor(Math.random()*nounProperties.cases.length);
        grammaticalCase = nounProperties.cases[randomCaseIndex];
        randomNumberIndex = Math.floor(Math.random()*nounProperties.numbers.length);
        number = nounProperties.numbers[randomNumberIndex];
        
        //declines the new greek word based on variables just picked
        //note that in order to refer to an object based on a variable, I am forced to reference the window to use bracket notation. In other words, console.log(secondDeclension), when a variable is involved instead of secondDeclension, turns into console.log(window[variable])
        greekWordDeclined = window[declension][gender][number][grammaticalCase];
        answers.push(greekWordDeclined);
    },
    pickWrongAnswer: function () {
        randomCaseIndex = Math.floor(Math.random()*nounProperties.cases.length);
        newGrammaticalCase = nounProperties.cases[randomCaseIndex];
        randomNumberIndex = Math.floor(Math.random()*nounProperties.numbers.length);
        newNumber = nounProperties.numbers[randomNumberIndex];
        wrongAnswer = window[declension][gender][newNumber][newGrammaticalCase];
        
        isDuplicate = gameFunctions.checkWrongAnswerForDuplicates(wrongAnswer);
        
        if (isDuplicate === true) {
            gameFunctions.pickWrongAnswer();
        } else {
            answers.push(wrongAnswer);
        }
    },
    checkWrongAnswerForDuplicates(wrongAnswer) {
        for (i=0; i < answers.length; i++) {
            if (wrongAnswer === answers[i]) {
                return true;
            } 
        }
            return false; //this must be outside the for loop; otherwise duplicates will slip through. The for loop must run through EACH element in the array no matter what.
    },
    showAnswer: function () {
        //displays screen with the correct answer, and whether the user got it right or wrong
    },
    calculatePercentage: function () {
        //tallies final score after questionNumber variable hits 10
    }
}

//answer event listener
$('.answer').on('click', function () {
  let choice = $(this).text();
  if (choice === greekWordDeclined) {
    ++correctAnswers;
    $('#correct-answers').text(correctAnswers);
    gameFunctions.questionSetup();
  } else {
    ++incorrectAnswers;
    $('#incorrect-answers').text(incorrectAnswers);
    gameFunctions.questionSetup();
  }
  //reset timer
})

// singular: {
//     nominative: "",
//     genitive: "",
//     dative: "",
//     accusative: "",
//     vocative: "",
// },
// plural: {
//     nominative: "",
//     genitive: "",
//     dative: "",
//     accusative: "",
//     vocative: "",
// }