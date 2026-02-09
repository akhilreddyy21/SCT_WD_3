const quizData = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyperlinks and Text Markup Language",
      "Home Tool Markup Language"
    ],
    correct: 0
  },
  {
    question: "Which tag is used for hyperlinks?",
    options: ["<a> tag", "<link> tag", "<href> tag", "<p> tag"],
    correct: 0
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "CSS", "JavaScript", "Python"],
    correct: 1
  },
  {
    question: "Which input type allows single selection?",
    options: ["checkbox", "radio", "text", "select"],
    correct: 1
  },
  {
    question: "Which language runs in the browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    correct: 3
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionButtons = document.querySelectorAll(".option");
const nextBtn = document.getElementById("nextBtn");
const progress = document.getElementById("progress");

loadQuestion();

function loadQuestion() {
  resetOptions();
  const current = quizData[currentQuestion];
  questionEl.textContent = current.question;
  progress.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;

  optionButtons.forEach((btn, index) => {
    btn.textContent = current.options[index];
    btn.onclick = () => selectAnswer(index);
  });
}

function selectAnswer(selectedIndex) {
  const correctIndex = quizData[currentQuestion].correct;

  optionButtons.forEach(btn => btn.disabled = true);

  if (selectedIndex === correctIndex) {
    optionButtons[selectedIndex].classList.add("correct");
    score++;
  } else {
    optionButtons[selectedIndex].classList.add("wrong");
    optionButtons[correctIndex].classList.add("correct");
  }

  nextBtn.style.display = "block";
}

function resetOptions() {
  optionButtons.forEach(btn => {
    btn.classList.remove("correct", "wrong");
    btn.disabled = false;
  });
  nextBtn.style.display = "none";
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;

  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  document.querySelector(".quiz-container").innerHTML = `
    <h1>Quiz Completed 🎉</h1>
    <p>Your Score: <strong>${score} / ${quizData.length}</strong></p>
    <button onclick="location.reload()" id="nextBtn">Restart Quiz</button>
  `;
}
