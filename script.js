const questions = [
    {
        question: "Qual é o primeiro livro da Bíblia?",
        answers: [
            { text: "Gênesis", correct: true },
            { text: "Êxodo", correct: false },
            { text: "Levítico", correct: false },
            { text: "Números", correct: false }
        ]
    },
    {
        question: "Quem construiu a arca?",
        answers: [
            { text: "Moisés", correct: false },
            { text: "Noé", correct: true },
            { text: "Abraão", correct: false },
            { text: "Davi", correct: false }
        ]
    },
    {
        question: "Quantos discípulos Jesus tinha?",
        answers: [
            { text: "10", correct: false },
            { text: "11", correct: false },
            { text: "14", correct: false },
            { text: "12", correct: true }
        ]
    },
    {
        question: "Qual é o menor versículo da Bíblia?",
        answers: [
            { text: "Jesus chorou.", correct: true },
            { text: "Façam tudo com amor.", correct: false },
            { text: "O Senhor é meu pastor, nada me faltará.", correct: false },
            { text: "O Senhor te abençoe e te guarde.", correct: false }
        ]
    },
    {
        question: "Quem foi lançado na cova dos leões?",
        answers: [
            { text: "Daniel", correct: true },
            { text: "José", correct: false },
            { text: "Jonas", correct: false },
            { text: "Elias", correct: false }
        ]
    },
    {
        question: "Quem foi o primeiro rei de Israel?",
        answers: [
            { text: "Oséias", correct: false },
            { text: "Davi", correct: false },
            { text: "Salomão", correct: false },
            { text: "Saul", correct: true }
        ]
    },
    {
        question: "Qual é o último livro da Bíblia?",
        answers: [
            { text: "Tiago", correct: false },
            { text: "Judas", correct: false },
            { text: "Apocalipse", correct: true },
            { text: "Romanos", correct: false }
        ]
    },
    {
        question: "Quem foi engolido por um grande peixe?",
        answers: [
            { text: "Pedro", correct: false },
            { text: "Jonas", correct: true },
            { text: "Paulo", correct: false },
            { text: "Elias", correct: false }
        ]
    },
    {
        question: "Quem recebeu os Dez Mandamentos?",
        answers: [
            { text: "Josué", correct: false },
            { text: "Abraão", correct: false },
            { text: "Isaac", correct: false },
            { text: "Moisés", correct: true }
        ]
    },
    {
        question: "Qual era o nome do gigante derrotado por Davi?",
        answers: [
            { text: "Golias", correct: true },
            { text: "Sansão", correct: false },
            { text: "Nabucodonosor", correct: false },
            { text: "Herodes", correct: false }
        ]
    },
    {
        question: "Quem foi o traidor de Jesus?",
        answers: [
            { text: "Paulo", correct: false },
            { text: "Judas Iscariotes", correct: true },
            { text: "João", correct: false },
            { text: "Tomé", correct: false }
        ]
    },
    {
        question: "Quem foi jogado na fornalha ardente?",
        answers: [
            { text: "Sadraque, Mesaque e Abednego", correct: true },
            { text: "Daniel", correct: false },
            { text: "José", correct: false },
            { text: "Ananias e Safira", correct: false }
        ]
    },
    {
        question: "Quem foi o pai de Jacó?",
        answers: [
            { text: "Noé", correct: false },
            { text: "Abraão", correct: false },
            { text: "Isaac", correct: true },
            { text: "Moisés", correct: false }
        ]
    },
    {
        question: "Quem foi a mãe de Jesus?",
        answers: [
            { text: "Rebeca", correct: false },
            { text: "Marta", correct: false },
            { text: "Sara", correct: false },
            { text: "Maria", correct: true }
        ]
    },
    {
        question: "Quem foi o irmão de Moisés?",
        answers: [
            { text: "Josué", correct: false },
            { text: "Arão", correct: true },
            { text: "Calebe", correct: false },
            { text: "Davi", correct: false }
        ]
    },
    {
        question: "Quem foi o homem mais forte da Bíblia?",
        answers: [
            { text: "Davi", correct: false },
            { text: "Golias", correct: false },
            { text: "Sansão", correct: true },
            { text: "Saul", correct: false }
        ]
    }
];

const somAcerto = new Audio('acerto.mp3.mp3');
const somErro = new Audio('erro.mp3.mp3');

const startContainer = document.getElementById('start-container');
const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const resultText = document.getElementById('result-text');

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const startButton = document.getElementById('start-btn');
const restartButton = document.getElementById('restart-btn');
const nameInput = document.getElementById('player-name');
const body = document.body;

let currentQuestionIndex = 0;
let score = 0;
let playerName = "";

startButton.addEventListener('click', () => {
    const name = nameInput.value.trim();
    if (name === "") {
        alert("Por favor, digite seu nome.");
        return;
    }
    playerName = name;
    startContainer.classList.add('hide');
    quizContainer.classList.remove('hide');
    startGame();
});

restartButton.addEventListener('click', () => {
    resultContainer.classList.add('hide');
    startContainer.classList.remove('hide');
});

function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.classList.add('hide');
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    answerButtonsElement.innerHTML = '';
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer, question, button));
        answerButtonsElement.appendChild(button);
    });
}

function selectAnswer(answer, question, selectedButton) {
    const buttons = answerButtonsElement.querySelectorAll('.btn');

    buttons.forEach(button => {
        const answerText = button.innerText;
        const isCorrect = question.answers.find(a => a.text === answerText)?.correct;

        if (isCorrect) {
            button.classList.add('correct');
        } else {
            button.classList.add('wrong');
        }

        button.disabled = true;
    });

    if (answer.correct) {
        somAcerto.play();
        score++;
        body.style.backgroundColor = 'green';
        setTimeout(() => {
            body.style.backgroundColor = '';
            nextQuestion();
        }, 1000);
    } else {
        somErro.play();
        body.style.backgroundColor = 'red';
        const correct = question.answers.find(a => a.correct).text;
        setTimeout(() => {
            body.style.backgroundColor = '';
            alert(`Resposta errada! A correta é: ${correct}`);
            nextButton.classList.remove('hide');
        }, 1000);
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    nextButton.classList.add('hide');
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
    } else {
        showResults();
    }
}

function showResults() {
    quizContainer.classList.add('hide');
    resultContainer.classList.remove('hide');
    restartButton.classList.remove('hide'); // Mostra o botão só aqui

    const total = questions.length;
    const erros = total - score;

    resultText.innerText = `${playerName}, você acertou ${score} de ${total} perguntas.\nErros: ${erros}`;
}


nextButton.addEventListener('click', nextQuestion);
