const welcomeScreen = document.querySelector('.welcome-screen');
const topicScreen = document.querySelector('.topic-screen');
const quizScreen = document.querySelector('.quiz-screen');
const resultScreen = document.querySelector('.result-screen');

const startQuizBtn = document.getElementById('startQuiz');
const exitQuizBtn = document.getElementById('exitQuiz');

const timerDiv = document.getElementById('timer');
const questionDiv = document.getElementById('question');
const optionsDiv = document.getElementById('options');
const resultDiv = document.getElementById('result');

const topics = {
    html: [
        { question: 'What does HTML stand for?', options: ['Hyper Text Markup Language', 'High Text Markup Language', 'Hyperlink Text Mark Language'], correct: 0 },
        { question: 'Which tag is used for the largest heading?', options: ['<h1>', '<h6>', '<header>'], correct: 0 },
        { question: 'What is the correct format for a hyperlink?', options: ['<a href="url">link</a>', '<a>link</a>', '<link href="url">'], correct: 0 },
        { question: 'Which tag is used to create a table?', options: ['<table>', '<tab>', '<tr>'], correct: 0 },
        { question: 'How do you add a background color in HTML?', options: ['style="background-color:color;"', 'bgcolor=color;', 'color=color;'], correct: 0 }
    ],
    css: [
        { question: 'What does CSS stand for?', options: ['Cascading Style Sheets', 'Colorful Style Sheets', 'Creative Style Sheets'], correct: 0 },
        { question: 'Which property is used to change text color?', options: ['color', 'background-color', 'text-color'], correct: 0 },
        { question: 'What is the default position of an element in CSS?', options: ['static', 'relative', 'absolute'], correct: 0 },
        { question: 'Which property is used to set padding?', options: ['padding', 'margin', 'border'], correct: 0 },
        { question: 'How do you add a comment in CSS?', options: ['/* comment */', '// comment', '<!-- comment -->'], correct: 0 }
    ],
    javascript: [
        { question: 'What is JavaScript primarily used for?', options: ['Styling webpages', 'Making webpages interactive', 'Database management'], correct: 1 },
        { question: 'Which method is used to write to the console?', options: ['console.log()', 'print()', 'log.console()'], correct: 0 },
        { question: 'What does DOM stand for?', options: ['Document Object Model', 'Display Object Management', 'Digital Object Method'], correct: 0 },
        { question: 'Which keyword is used to define a variable in JavaScript?', options: ['var', 'let', 'Both'], correct: 2 },
        { question: 'What is the correct syntax for a function?', options: ['function name() {}', 'def name() {}', 'fn name {}'], correct: 0 }
    ]
};

let selectedTopic = '';
let currentQuestionIndex = 0;
let score = 0;
let timer;

const startTimer = () => {
    let time = 10;
    timerDiv.textContent = `Time left: ${time}s`;

    timer = setInterval(() => {
        time--;
        timerDiv.textContent = `Time left: ${time}s`;
        if (time === 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
};

const nextQuestion = () => {
    clearInterval(timer);
    currentQuestionIndex++;

    if (currentQuestionIndex < topics[selectedTopic].length) {
        loadQuestion();
    } else {
        showResultScreen();
    }
};

const loadQuestion = () => {
    const currentQuestion = topics[selectedTopic][currentQuestionIndex];
    questionDiv.textContent = currentQuestion.question;
    optionsDiv.innerHTML = '';

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.classList.add('option');
        button.textContent = option;
        button.onclick = () => {
            clearInterval(timer);
            if (index === currentQuestion.correct) {
                score++;
            }
            nextQuestion();
        };
        optionsDiv.appendChild(button);
    });

    startTimer();
};

const showResultScreen = () => {
    quizScreen.style.display = 'none';
    resultScreen.classList.add('active');
    resultDiv.textContent = `Your score: ${score}/${topics[selectedTopic].length}`;
};

startQuizBtn.onclick = () => {
    welcomeScreen.classList.remove('active');
    topicScreen.classList.add('active');
};

document.querySelectorAll('.box').forEach(box => {
    box.onclick = () => {
        selectedTopic = box.dataset.topic;
        topicScreen.classList.remove('active');
        quizScreen.classList.add('active');
        currentQuestionIndex = 0;
        score = 0;
        loadQuestion();
    };
});

exitQuizBtn.onclick = () => {
    resultScreen.classList.remove('active');
    welcomeScreen.classList.add('active');
};