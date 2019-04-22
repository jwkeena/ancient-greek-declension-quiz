let correctAnswers = 0;
let incorrectAnswers = 0;
let trueAnswer = "";
let falseAnswers = [];
let isAnswerCorrect = true;

nounProperties = {
    declensions: ["second"],
    number: ["singular", "plural"],
    gender: ["masculine", "feminine", "neuter"],
    case: ["nominative", "genitive", "dative", "accusative", "vocative" ]
}

stems = {
    logos: ["λόγ", "masculine"],

},

declensions = {
    
    first : {},

    second : {
        
        masculine : {
            nominative: ["ος", "οι"],
            genitive: ["ου", "ων"],
            dative: ["ῳ", "οις"],
            accusative: ["ον", "ους"],
            vocative: ["ε", "οι"]
        },

        feminine : {
            nominative: ["ος", "οι"],
            genitive: ["ου", "ων"],
            dative: ["ῳ", "οις"],
            accusative: ["ον", "ους"],
            vocative: ["ε", "οι"]
        },

        neuter : {

        }

    },

    third : {}
}


gameFunctions = {
    startGame: function () {

    },
    pickNewWord: function () {
        //picks word plus stem from the declensions object
        gameFunctions.pickNewAnswers(answer);
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