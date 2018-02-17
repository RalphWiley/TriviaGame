
    const triviaQuestions = [
        {
          question: "Who is the fairest?",
          answerList: ["Snow White", "Cinderella", "Sleeping Beauty"],
          answer: 0
        },
        {
          question: "Who sent Harvey Weinstein a katana with a message of 'No Cuts' after hearing he wanted to edit the film?",
          answerList: ["Quentin Tarantino", "Martin Scorcese", "Hayao Miyazaki"],
          answer: 2
        },
        {
          question: "How many pairs of prop glasses did Daniel Radcliffe wear throughout the Harry Potter series?",
          answerList: ["55", "160", "322"],
          answer: 1
        },
        {
          question: "At 76%, The Presitige, is the lowest rated of Christopher Nolan's films on the website RottenTomatoes?",
          answerList: ["True", "False"],
          answer: 0
        },
        {
          question: "Michael Myer's mask in Halloween is acutally a slightly altered mask of which other famous icon?",
          answerList: ["Captain Kirk", "Michael Jackson", "Superman"],
          answer: 0
        },
        {
          question: "Who almost played the Terminator but James Cameron thought this person was too pleasant?",
          answerList: ["Sylvester Stallone", "Tom Hanks", "O.J. Simpson"],
          answer: 2
        },
        {
          question: "The sound of the velociraptors communicating with each other in Jurassic Park is actually the sound of what?",
          answerList: ["Elephants communicating", "Tortoises mating", "Lions roaring"],
          answer: 1
        },
        {
          question: "What is interesting about the scene in Pulp Fiction where Vincent stabs a needle into Mia's heart?",
          answerList: ["Scene was shot in reverse", "He actually stabs her", "Was originally the goriest scene ever filmed!"],
          answer: 0
        },
        {
          question: "In Gone With the Wind, how did they create the burning-of-Atlanta scene?",
          answerList: ["First use of CGI", "Burned down old sets", "Set fire to abandoned buildings in Atlanta"],
          answer: 1
        },
        {
          question: "Which two movies were originally supposed to be the same movie?",
          answerList: ["Star Wars/Empire Strikes Back", "Die Hard/Back to the Future", "Poltergeist/E.T."],
          answer: 2
        },
]; 

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9','question10'];
var currentQuestion;
var correctAnswer;
var incorrectAnswer;
var unanswered = 0;
var seconds;
var time;
var answered;
var userSelect;

var messages = {
    correct: "I dub thee Master of Film!",
    incorrect: "Nope!",
    endTime: "Bueller...Bueller",
    finished: "Alrighty, then!"
}

$('#startBtn').on('click', function() {
    $(this).hide();
    newGame();
});

$('#startOverBtn').on('click', function() {
    $(this).hide();
    newGame();
});

function newGame() {
    $('#finalMessage').empty();
    $('#correctAnswers').empty();
    $('#incorrectAnswers').empty();
    $('#unanswered').empty();
    currentQuestion = 0;
    correctAnswer = 0;
    incorrectAnswer = 0;
    newQuestion();
}

function newQuestion() {
    $('#message').empty();
    $('#correctedAnswer').empty();
    $('#gif').empty();
    answered = true;

    //sets up new questions and answerList
    $('#currentQuestion').html('Question #'+ (currentQuestion + 1) + '/' + triviaQuestions.length);
    $('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
    for(var i = 0; i < 4; i++) {
        var choices = $('<div>');
        choices.text(triviaQuestions[currentQuestion].answerList[i]);
        choices.attr({'data-index': i});
        choices.addClass('thisChoice');
        $('.answerList').append(choices);
    }
    countdown();
    //clicking an answer will pause the imte and setup answerPage
    $('.thisChoice').on('click', function() {
        userSelect = $(this).data('index');
        clearInterval(time);
        answerPage();
    });
}

function countdown() {
    seconds = 15;
    $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
    answered = true;
    //sets timer to go down
    time = setInterval(showCountdown, 1000);
}

function showCountdown() {
    seconds --;
    $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
    if(seconds < 1) {
        clearInterval(time);
        answered = false;
        answerPage();
    }
}

function answerPage() {
    $('#currentQuestion').empty();
    $('.thisChoice').empty(); // clears question page
    $('.question').empty();

    var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
    var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
    $('#gif').html('<img src = "assets/images/' + gifArray[currentQuestion] + '.gif" width = "400px">');
    //checks to see correct, incorrect, or unanswered
    if((userSelect === rightAnswerIndex) && (answered === true)) {
        correctAnswer ++;
        $('#message').html(messages.correct);
    } else if ((userSelect != rightAnswerIndex) && (answered === true)) {
        incorrectAnswer ++;
        $('#message').html(messages.incorrect);
        $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
    } else {
        unanswered ++;
        $('#message').html(messages.endTime);
        $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
        answered = true;
    }

    if(currentQuestion === (triviaQuestions.length - 1)) {
        setTimeout(scoreboard, 3000)
    } else {
        currentQuestion ++;
        setTimeout(newQuestion, 3000);
    }
}

function scoreboard() {
    $('#timeLeft').empty();
    $('#message').empty();
    $('#correctedAnswer').empty();
    $('#gif').empty();

    $('#finalMessage').html(messages.finished);
    $('#correctAnswers').html("Correct Answers: " + correctAnswer);
    $('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
    $('#unanswered').html("Unanswered: " + unanswered);
    $('#startOverBtn').addClass('reset');
    $('#startOverBtn').show();
    $('#startOverBtn').html('Start Over?');
}