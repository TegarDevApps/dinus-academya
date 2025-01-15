
document.addEventListener("DOMContentLoaded", () => {
  const timerElement = document.getElementById("timer");
  const closeBtn = document.getElementById("closeBtn");
  const scoreElement = document.getElementById("score");
  const questionElement = document.getElementById("question");
  const questionNumberElement = document.getElementById("questionNumber");
  const optionElements = [
      document.getElementById("option"),
      document.getElementById("option1"),
      document.getElementById("option2"),
      document.getElementById("option3")
  ];
  const nextBtn = document.getElementById("nextBtn");

  let timeLeft = 9 * 60 + 15;
  let questionsAnswered = 0;
  let score = 0;
  let currentQuestion = 0;

  scoreElement.textContent = score;

  function updateTimer() {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      if (timeLeft > 0) {
          timeLeft--;
      } else {
          alert("Time's up! The quiz will end now.");
          endQuiz();
      }
  }

  closeBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to exit the quiz?")) {
          endQuiz();
      }
  });

  function endQuiz() {
      alert(`Thank you for taking the quiz! Your final score is: ${score}`);
      localStorage.setItem("quizScore", score);
      localStorage.setItem("timeLeft", timeLeft);
      window.location.href = "/certii.html";
  }

  function updateScore(isCorrect) {
      if (isCorrect) {
          score += 10;
      }
      scoreElement.textContent = score;
  }

  const questions = [
    {
      question:
        "What is the primary purpose of introducing digital tools in teaching?",
      options: [
        "To reduce interaction with students",
        "To simplify the teaching and learning process",
        "To completely replace traditional methods",
        "To replace the teacher's role",
      ],
      correctAnswer: 2,
    },
    {
      question:
        "Which of the following is an example of a digital tool commonly used in teaching?",
      options: [
        "Manual calculator",
        "Chalkboard",
        "Learning Management System (LMS)",
        "Printed books",
      ],
      correctAnswer: 3,
    },
    {
      question:
        "What is the first step in integrating digital tools into the teaching process?",
      options: [
        "Using tools without any training",
        "Understanding the needs students and curriculum",
        "Removing manual teaching methods",
        "Using digital tools only during exams",
      ],
      correctAnswer: 2,
    },
    {
      question:
        "What is the main benefit of using strategies to enhance student interaction with digital tools?",
      options: [
        "Reducing student participation",
        "Improving student engagement and understanding",
        "Limiting student creativity",
        "Reducing the use of technology",
      ],
      correctAnswer: 2,
    },
    {
      question:
        "Why are Learning Management Systems (LMS) important in digital learning?",
      options: [
        "To store digital textbooks",
        "To track student progress and organize materials",
        "To replace teachers' presence in the classroom",
        "To increase student assignments without a clear goal",
      ],
      correctAnswer: 2,
    },
    {
      question:
        "What does collaboration in teaching with technology mean?",
      options: [
        "Teachers working alone with technology",
        "Students and teachers collaborating digitally.",
        "Removing interaction among students",
        "Using tools only for entertainmen",
      ],
      correctAnswer: 2,
    },
    {
      question:
        "Which is an example of a collaborative activity with technology?",
      options: [
        "Individual assignments without digital tools",
        "Group projects using shared online documents",
        "Teachers lecturing without any digital aids",
        "Writing reports on paper",
      ],
      correctAnswer: 2,
    },
    {
      question:
        "What is the biggest challenge in managing a digital classroom?",
      options: [
        "Students being overly active",
        "Lack of technological tools ",
        "Ensuring students remain focused and engaged ",
        "Teachers not needing to manage the class",
      ],
      correctAnswer: 3,
    },
    {
      question: "What is an effective way to manage a digital classroom?",
      options: [
        "Setting clear rules for using digital tools",
        "Allowing students to freely use technology",
        "Completely removing technology from the classroom",
        "Giving assignments without guidance",
      ],
      correctAnswer: 1,
    },
    {
      question:
        "What is an essential step in evaluating learning with digital tools?",
      options: [
        "Assigning grades without analysis",
        "Using data to understand student learning outcomes",
        "Ignoring student progress",
        "Grading based only on manual tasks",
      ],
      correctAnswer: 2,
    },
  ];

  function checkAnswer() {
      const selectedOption = optionElements.find(option => option.checked);
      if (!selectedOption) {
          alert("Please select an answer before proceeding.");
          return;
      }

      const selectedIndex = optionElements.indexOf(selectedOption);
      const isCorrect = selectedIndex === questions[currentQuestion].correctAnswer - 1;

      optionElements.forEach((option, index) => {
          const label = option.parentElement;
          label.classList.remove('bg-green-100', 'border-green-500', 'bg-red-100', 'border-red-500');
          if (index === questions[currentQuestion].correctAnswer - 1) {
              label.classList.add('bg-green-100', 'border-green-500');
          } else if (index === selectedIndex) {
              label.classList.add('bg-red-100', 'border-red-500');
          }
      });

      updateScore(isCorrect);
  }

  function showQuestion() {
      const question = questions[currentQuestion];
      questionElement.textContent = question.question;
      questionNumberElement.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;

      optionElements.forEach((optionElement, index) => {
          optionElement.checked = false;
          optionElement.nextElementSibling.textContent = question.options[index];
          optionElement.parentElement.classList.remove('bg-green-100', 'border-green-500', 'bg-red-100', 'border-red-500');
      });
  }

  nextBtn.addEventListener("click", () => {
      checkAnswer();
      setTimeout(() => {
          if (currentQuestion < questions.length - 1) {
              currentQuestion++;
              showQuestion();
          } else {
              endQuiz();
          }
      }, 1000);
  });

  showQuestion();
  setInterval(updateTimer, 1000);
});
