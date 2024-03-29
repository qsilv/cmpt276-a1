const questions = [
    { question: "What is 2 + 2?", answers: ["3", "4", "5", "6"], correct: "4" },
    { question: "What is the capital of France?", answers: ["Paris", "London", "Rome", "Berlin"], correct: "Paris" },
    { question: "What is the largest planet in our solar system?", answers: ["Earth", "Mars", "Jupiter", "Saturn"], correct: "Jupiter" },
    { question: "Who wrote 'Romeo and Juliet'?", answers: ["William Shakespeare", "Charles Dickens", "Jane Austen", "Ernest Hemingway"], correct: "William Shakespeare" },
    { question: "What is the boiling point of water?", answers: ["90°C", "100°C", "120°C", "80°C"], correct: "100°C" },
    { question: "Which element has the chemical symbol 'O'?", answers: ["Gold", "Oxygen", "Silver", "Iron"], correct: "Oxygen" },
    { question: "How many continents are there on Earth?", answers: ["5", "6", "7", "8"], correct: "7" },
    { question: "Who painted the Mona Lisa?", answers: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"], correct: "Leonardo da Vinci" },
    { question: "What is the largest mammal in the world?", answers: ["African Elephant", "Blue Whale", "Giraffe", "Great White Shark"], correct: "Blue Whale" },
    { question: "What is the main ingredient in guacamole?", answers: ["Tomato", "Onion", "Avocado", "Pepper"], correct: "Avocado" }
];


let currentQuestionIndex = 0;
let userAnswers = new Array(questions.length).fill(null);//array size of questions to store user answers filled with null
let answersSubmitted = false;

function showQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('question').textContent = (currentQuestionIndex+1)+". "+question.question;

    const answersList = document.getElementById('answer-list');
    answersList.innerHTML = '';//clear all

    question.answers.forEach((answer, index) => { //for each answer in answers make a button for it
        const li = document.createElement('li');
        li.textContent = answer;
        li.className = 'answer-choice';
        li.onclick = () => {
            if (!answersSubmitted) {
                userAnswers[currentQuestionIndex] = answer;
                highlightSelectedAnswer(index);
            }
        };
        answersList.appendChild(li);

        // correct answer highlighting based on submission state
        if (answersSubmitted) {
            if (answer === question.correct) {
                li.classList.add('correct-answer');
            } else if (answer === userAnswers[currentQuestionIndex]) {
                li.classList.add('wrong-answer');
            }
        }
    });
    if(!answersSubmitted){
    highlightExistingAnswer();}

}

function highlightSelectedAnswer(selectedIndex) { //when you select an answer it unhighlights all the other ones then highlights selects
    const listItems = document.getElementById('answer-list').children;
    for (let i = 0; i < listItems.length; i++) {
        listItems[i].classList.remove('selected');
    }
    listItems[selectedIndex].classList.add('selected');
}

function highlightExistingAnswer() { //when showquestion called this is called, checks and highlights prev chosen answer if any
    const existingAnswer = userAnswers[currentQuestionIndex];
    if (existingAnswer !== null) {
        const listItems = document.getElementById('answer-list').children;
        for (let i = 0; i < listItems.length; i++) {
            if (listItems[i].textContent === existingAnswer) {
                listItems[i].classList.add('selected');
                break;
            }
        }
    }
}

function calculateScore() {
    let score = 0; 

    // loop through each answer given by the user
    for (let i = 0; i < userAnswers.length; i++) {
        if (userAnswers[i] === questions[i].correct) {
            score++;
        }
        
    }

    return score; 
}

function displayCorrectAnswers() {
    const correctAnswersList = document.getElementById('correct-answers-list');
    correctAnswersList.innerHTML = ''; // clear previous results

    questions.forEach((question, index) => {
        const li = document.createElement('li');
        if(userAnswers[index]!=null){
        li.innerHTML = `<strong>Question ${index + 1}:</strong> ${question.question}<br><strong>Answer:</strong> ${question.correct} <strong>  Your Answer:</strong> ${userAnswers[index]} <br><br>`;
        }
        else{
            li.innerHTML = `<strong>Question ${index + 1}:</strong> ${question.question}<br><strong>Answer:</strong> ${question.correct} <strong>  Your Answer:</strong> None <br><br>`;
        }
        correctAnswersList.appendChild(li);
    });
}


document.getElementById('submit-answers').onclick = () => {
    answersSubmitted = true;
    displayCorrectAnswers();
    document.getElementById('results-container').style.display = 'block'; // show the results container

    showQuestion();//rerender with correct answers highlighted
    const score = calculateScore();
    document.getElementById('score-display').textContent = `Your score is: ${score}/${questions.length}`;
};

document.getElementById('next-question').onclick = () => { //wont work unless answer put or submit pressed
    if ((currentQuestionIndex < questions.length - 1)&&((userAnswers[currentQuestionIndex]!=null)||answersSubmitted)){
        currentQuestionIndex++;
        showQuestion();
    }
};

document.getElementById('prev-question').onclick = () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
    }
};

document.addEventListener("DOMContentLoaded", showQuestion);