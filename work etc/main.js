const questions = [
    {
        question: "What does HTML stand for?",
        answer: [
            { text: "HyperText Markup Language", correct: true },
            { text: "HyperText Markdown Language", correct: false },
            { text: "HomeTool Markup Language", correct: false },
            { text: "HyperTool Markup Language", correct: false },
        ],
    },
    {
        question: "Which HTML tag is used to define a hyperlink?",
        answer: [
            { text: "<link>", correct: false },
            { text: "<a>", correct: true },
            { text: "<href>", correct: false },
            { text: "<hyper>", correct: false },
        ],
    },
    {
        question: "What is the purpose of the <head> tag in HTML?",
        answer: [
            { text: "To display content on the web page", correct: false },
            { text: "To store metadata and links to stylesheets/scripts", correct: true },
            { text: "To create a header section", correct: false },
            { text: "To add headings to the web page", correct: false },
        ],
    },
    {
        question: "Which attribute is used to provide an alternative text for an image in HTML?",
        answer: [
            { text: "title", correct: false },
            { text: "src", correct: false },
            { text: "alt", correct: true },
            { text: "href", correct: false },
        ],
    },
    {
        question: "Which HTML element is used to define the main heading of a page?",
        answer: [
            { text: "<heading>", correct: false },
            { text: "<main>", correct: false },
            { text: "<h1>", correct: true },
            { text: "<title>", correct: false },
        ],
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.style.display = "none";
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Restart";
    nextButton.style.display = "block";
    nextButton.addEventListener("click", startQuiz);
}

startQuiz();
