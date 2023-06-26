

if (window.localStorage.getItem("username")) {

    document.getElementById("levelselect-area").style.display = "initial";
    document.getElementById("username-area").style.display = "none";
    let user = window.localStorage.getItem("username");
    document.getElementById("levelselect-heading").innerText = `Welcome to the game ${user}!`;

} else if (!window.localStorage.getItem("username")) {

    const submit = document.getElementById("submit");
    submit.addEventListener('click', validate);

}

/**
 * This function validates that a username was input. It shows an error message if not.
 * If a username is provided it saves it so it can be displayed throughout the game.
 * Adapted from https://www.freecodecamp.org/news/form-validation-with-html5-and-javascript/
 * @param {event} e - event of a click
 */
function validate(e) {
    e.preventDefault();

    const usernameField = document.getElementById("username");

    if (!usernameField.value) {
        const usernameError = document.getElementById("usernameError");
        usernameError.classList.add("visible");
        usernameError.setAttribute('aria-hidden', false);
        usernameError.setAttribute('aria-invalid', true);
        usernameError.innerText = "Please enter a username to proceed!";
    } else if (usernameField.value) {
        window.localStorage.setItem("username", usernameField.value);
        document.getElementById("levelselect-area").style.display = "initial";
        document.getElementById("username-area").style.display = "none";
        window.localStorage.setItem("username", usernameField.value);
    }

    let user = window.localStorage.getItem("username");
    document.getElementById("levelselect-heading").innerText = `Welcome to the game ${user}!`;

}

let questionArea = document.getElementById('question-area');
let answerArea = document.getElementById('answers-list');
let allQuestions;
let current = 0;
let score = 0;

function questionChoice(levelChoice, curr) {

    let userChoice = levelChoice.textContent;
    if (userChoice === 'Easy') {
        allQuestions = allQuestionsEasy;
    } else if (userChoice === 'Medium') {
        allQuestions = allQuestionsMedium;
    } else if (userChoice === 'Hard') {
        allQuestions = allQuestionsExpert;
    }

    // Start the quiz
    loadQuestion(curr);

    document.getElementById("total-questions").textContent = allQuestions.length;
    document.getElementById("level").textContent = userChoice;
    document.getElementById("game-area").style.display = "initial";
    document.getElementById("levelchoice-area").style.display = "none";
    localStorage.setItem("userLevel", userChoice);

    return allQuestions;

    function loadQuestion(curr) {

        let question = allQuestions[curr].question;

        questionArea.innerHTML = '';
        questionArea.innerHTML = question;

        let answers = allQuestions[curr].answers;

        answerArea.innerHTML = '';

        for (let i = 0; i < answers.length - 1; i += 1) {
            let createList = document.createElement('li');
            let text = document.createTextNode(answers[i]);

            createList.appendChild(text);
            createList.addEventListener("click", checkAnswer(i, answers));

            answerArea.appendChild(createList);
        }
    }
