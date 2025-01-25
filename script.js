const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        correctAnswer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        correctAnswer: "Mars"
    },
    {
        question: "Which programming language is used for web development?",
        options: ["Python", "C++", "JavaScript", "Java"],
        correctAnswer: "JavaScript"
    },
    {
        question: "Who invented the telephone?",
        options: ["Alexander Graham Bell", "Thomas Edison", "Nikola Tesla", "Isaac Newton"],
        correctAnswer: "Alexander Graham Bell"
    },
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;

const questionContainer = document.getElementById('question');
const answersContainer = document.getElementById('answers');
const nextButton = document.getElementById('next-button');
const scoreContainer = document.getElementById('score-container');
const scoreDisplay = document.getElementById('score');
const totalQuestions = document.getElementById('total-questions');
const restartButton = document.getElementById('restart-button');
const progressBar = document.getElementById('progress-bar');
const timerDisplay = document.getElementById('timer');

// Load saved score from localStorage if any
const savedScore = localStorage.getItem('quizScore');
if (savedScore) {
    alert(`Your last saved score was: ${savedScore}`);
}

function loadQuestion() {
    if (currentQuestionIndex < quizData.length) {
        const currentQuestion = quizData[currentQuestionIndex];
        questionContainer.textContent = currentQuestion.question;

        answersContainer.innerHTML = '';
        currentQuestion.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.addEventListener('click', () => handleAnswer(option));
            answersContainer.appendChild(button);
        });

        nextButton.style.display = 'none'; // Hide next button initially

        // Start the timer for the current question
        startTimer();
    } else {
        showScore();
    }
}

function handleAnswer(selectedOption) {
    const currentQuestion = quizData[currentQuestionIndex];

    // Disable all buttons after an answer is selected
    const buttons = answersContainer.querySelectorAll('button');
    buttons.forEach(button => {
        button.disabled = true;
        if (button.textContent === selectedOption) {
            if (selectedOption === currentQuestion.correctAnswer) {
                button.style.backgroundColor = '#28a745'; // Correct answer color
            } else {
                button.style.backgroundColor = '#dc3545'; // Wrong answer color
            }
        }
    });

    if (selectedOption === currentQuestion.correctAnswer) {
        score++;
    }

    // Show the next button after an answer is selected
    nextButton.style.display = 'block';
    clearInterval(timer); // Stop the timer when an answer is selected
}

function startTimer() {
    timerDisplay.textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        progressBar.style.width = ((30 - timeLeft) / 30) * 100 + '%';

        if (timeLeft <= 0) {
            clearInterval(timer);
            timeLeft = 30; // Reset timer for the next question
            currentQuestionIndex++; // Automatically move to next question
            loadQuestion();
        }
    }, 1000);
}

function showScore() {
    questionContainer.textContent = 'Quiz Finished!';
    answersContainer.innerHTML = '';
    scoreContainer.classList.remove('hidden');
    scoreDisplay.textContent = score;
    totalQuestions.textContent = quizData.length;
    nextButton.style.display = 'none';

    // Save the score to localStorage
    localStorage.setItem('quizScore', score);
}

function restartQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    timeLeft = 30; // Reset timer
    scoreContainer.classList.add('hidden');
    loadQuestion();
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    loadQuestion();
});

restartButton.addEventListener('click', restartQuiz);

// Initialize the quiz
loadQuestion();


