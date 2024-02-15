var startQuizEl = document.getElementById("startQuiz");
var welcomeEl = document.getElementById("welcome");
var quizEl = document.getElementById("quiz");
var resultEl = document.getElementById("result");
var optionsEl = document.getElementById("options");
var messageEl = document.getElementById("message");
var summaryEl = document.getElementById("summary");
var initialsInput = document.getElementById("initials");
var timerEl = document.getElementById("timer");
var saveScoreBtn = document.getElementById("saveScore");
var playAgainBtn = document.getElementById("playAgain");
var highScoresPageEl = document.getElementById("highScoresPage");
var highScoresListEl = document.getElementById("highScoresList");

var secondsLeft;
var score = 0;
var currentQuestionIndex = 0;
var countdownTimer;
var questions = [
    {
        question: 'What does HTML stand for?',
        options: ['Hyper Text Markup Language', 'Hyperlinks and Text Markup Language', 'Home Tool Markup Language', 'Hyperlink Text Markup Language'],
        answer: 'Hyper Text Markup Language'
    },
    {
        question: 'What does CSS stand for?',
        options: ['Colorful Style Sheets', 'Cascading Style Sheets', 'Computer Style Sheets', 'Creative Style Sheets'],
        answer: 'Cascading Style Sheets'
    },
    {
        question: 'What does DOM stand for?',
        options: ['Document Oriented Model', 'Document Object Model', 'Document Object Material', 'Diamond Object Model'],
        answer: 'Document Object Model'
    },  
    {
        question: 'What does HTTP stand for?',
        options: ['Hyperlink Transfer Protocol', 'Hypertext Markup Language', 'Hypertext Transfer Project', 'Hypertext Transfer Protocol'],
        answer: 'Hypertext Transfer Protocol'
    } 
];

// This function ends the game, clears the timer, hides the quiz, and shows the result at th end. 
function stopGame() {      
    clearInterval(countdownTimer);
    timerEl.textContent = "";
    quizEl.style.display = 'none';
    resultEl.style.display = 'flex';
    summaryEl.textContent = "Your score is " + score;
}

//In this function it displays the question and the options and checks if there are more questions left and if the timer has run out.
function displayQuestion() {
    if (currentQuestionIndex >= questions.length || secondsLeft <= 0) {
        stopGame();
        return;
    }

    var question = questions[currentQuestionIndex];

    document.getElementById('question').textContent = question.question;

    optionsEl.innerHTML = "";

    question.options.forEach(function (option) {
        var button = document.createElement('button');
        button.textContent = option;
        button.addEventListener("click", onSelectAnswer);
        optionsEl.appendChild(button);
    });

    document.getElementById('nextQuestion').classList.add('hidden');
}

//In this function it checks if the selected answer is correct or wrong and shows the score.
function onSelectAnswer(e) {
    var correctAnswer = questions[currentQuestionIndex].answer;
    var userAnswer = e.target.textContent;

    if (correctAnswer === userAnswer) {
        score++;
        displayMessage('Correct!');
    } else {
        secondsLeft -= 10;
        displayMessage('Wrong!');
    }

    onNextQuestion();
}

// This function moves tot he next question.
function onNextQuestion() {
    currentQuestionIndex++;
    displayQuestion();
}

//This function sets the timer and score and displays the quiz.

function onStartGame() {
    secondsLeft = 50;
    score = 0;
    currentQuestionIndex = 0;

    countdownTimer = setInterval(function () {
        if (secondsLeft > 0) {
            timerEl.textContent = secondsLeft;
            secondsLeft--;
        } else {
            stopGame();
        }
    }, 1000);

    startQuizEl.style.display = 'none';
    welcomeEl.style.display = 'none';
    quizEl.style.display = 'block';
    resultEl.style.display = 'none';

    displayQuestion();
}

// This function saves the players score in the local storage. 
function saveScore() {
    var initials = initialsInput.value.trim();
    if (initials !== '') {
        var savedScores = JSON.parse(localStorage.getItem('highScores')) || [];
        savedScores.push({ initials: initials, score: score });
        localStorage.setItem('highScores', JSON.stringify(savedScores));
        displayHighScores();
    }
}


// This resets the game if the user chooses to play again.
function playAgain() {
    resultEl.style.display = 'none';
    welcomeEl.style.display = 'block';
}

// This function it displays the message to the user. 
function displayMessage(msg) {
    messageEl.textContent = msg;
}

// In this function it displays the hig scores from the local storage. 
function displayHighScores() {
    var highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    highScores.sort((a, b) => b.score - a.score); 

    highScoresListEl.innerHTML = ''; 

    highScores.forEach(function (score, index) {
        var listItem = document.createElement('div');
        listItem.textContent = (index + 1) + '. ' + score.initials + ': ' + score.score;
        highScoresListEl.appendChild(listItem);
    });

    highScoresPageEl.style.display = 'block';
}
startQuizEl.addEventListener("click", onStartGame);
saveScoreBtn.addEventListener("click", saveScore);
playAgainBtn.addEventListener("click", playAgain);
document.getElementById('nextQuestion').addEventListener('click', onNextQuestion);
