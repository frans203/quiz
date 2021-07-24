// INITIAL DATA
let currentQuestion = 0;
let correctAnswers = 0;

// FUNCTIONS
function showQuestion() {
  if (questions[currentQuestion]) {
    let q = questions[currentQuestion];

    let pct = Math.floor((currentQuestion / questions.length) * 100);
    document.querySelector(".progress--bar").style.width = `${pct}%`;
    document.querySelector(".scoreArea").style.display = "none";
    document.querySelector(".questionArea").style.display = "block";
    document.querySelector(".question").innerHTML = q.question;
    document.querySelector(".options").innerHTML = "";

    let optionsHtml = "";

    q.options.forEach((option, i) => {
      optionsHtml += `<div data-op="${i}" class='option'><span>${
        i + 1
      }</span>${option}</div>`;
    });
    document.querySelector(".options").innerHTML = optionsHtml;
    document
      .querySelector(".questionArea")
      .addEventListener("click", optionClickEvent);
  } else {
    finishQuiz();
  }
}
showQuestion();

function optionClickEvent(e) {
  if (!e.target.classList.contains("option")) return;
  let clickedOption = Number(e.target.dataset.op);
  if (questions[currentQuestion].answer === clickedOption) {
    correctAnswers++;
  }

  currentQuestion++;
  showQuestion();
}

function finishQuiz() {
  let points = Math.floor((correctAnswers / questions.length) * 100);
  console.log(points);
  let scoreClass;

  if (points <= 30) {
    scoreClass = "scoreTxtRed";
  } else if (points > 30 && points <= 70) {
    scoreClass = "scoreTxtYellow";
  } else if (points > 70) {
    return;
  }
  document.querySelector(".scoreArea").innerHTML = ` 
  <img src="prize.png" class="prizeImage" />
    <div class="scoreText1 ${scoreClass}">${scoreText()}</div>

    <div class="scorePct ${scoreClass}">${points}% of hit rate</div>

    <div class="scoreText2">You correct answered ${correctAnswers} out of ${
    questions.length
  } questions</div>
  
  <button>Again!</button>
  `;
  document.querySelector(".scoreArea").style.display = "block";
  document.querySelector(".questionArea").style.display = "none";
  document.querySelector(".progress--bar").style.width = `100%`;
  document
    .querySelector(".scoreArea button")
    .addEventListener("click", resetEvent);
  function scoreText() {
    if (points <= 30) {
      return "You are a Looser :(";
    } else if (points > 30 && points <= 70) {
      return "Good!";
    } else if (points > 70) {
      return "Excellent!";
    }
  }
}

function resetEvent() {
  correctAnswers = 0;
  currentQuestion = 0;
  showQuestion();
}
