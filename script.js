const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

const quizQuestions = [
  { q: 'What should you do before clicking an unexpected link?', a: ['Click quickly before it expires', 'Check the sender and destination carefully', 'Forward it to all your friends', 'Enter your password to verify it'], correct: 1, why: 'Correct. Check unexpected links carefully and verify the sender through a trusted channel.' },
  { q: 'Which is the best password habit?', a: ['Use your birthday everywhere', 'Share it with a close friend', 'Use a unique, long password for each account', 'Use the word password'], correct: 2, why: 'Correct. Unique, long passwords reduce the risk that one compromised account affects others.' },
  { q: 'What is a digital footprint?', a: ['Only photos saved on your phone', 'The trail of information connected to your online activity', 'Your phone screen size', 'A type of antivirus'], correct: 1, why: 'Correct. Posts, comments, browsing activity, and other data can contribute to your digital footprint.' },
  { q: 'What is a safer way to share your live location?', a: ['Post it publicly for everyone', 'Share it only with trusted people when needed', 'Add it to every profile', 'Send it to strangers who ask'], correct: 1, why: 'Correct. Limit location sharing to trusted people and only when it is necessary.' },
  { q: 'What should you do if an account is harassing you?', a: ['Reply with private information', 'Share the person’s password', 'Save relevant evidence, block/report, and seek trusted help', 'Give the account more personal details'], correct: 2, why: 'Correct. Use platform reporting tools, block the account, and ask a trusted person for support.' }
];
let questionIndex = 0, score = 0, answered = false;
const questionText = document.getElementById('questionText');
const answerList = document.getElementById('answerList');
const questionCounter = document.getElementById('questionCounter');
const scoreLabel = document.getElementById('scoreLabel');
const progressBar = document.getElementById('progressBar');
const quizFeedback = document.getElementById('quizFeedback');
const nextQuestion = document.getElementById('nextQuestion');

function renderQuestion() {
  const item = quizQuestions[questionIndex];
  answered = false;
  questionCounter.textContent = `QUESTION ${questionIndex + 1} OF ${quizQuestions.length}`;
  scoreLabel.textContent = `Score: ${score}`;
  progressBar.style.width = `${(questionIndex / quizQuestions.length) * 100}%`;
  questionText.textContent = item.q;
  quizFeedback.textContent = '';
  answerList.innerHTML = '';
  item.a.forEach((answer, index) => {
    const button = document.createElement('button');
    button.className = 'answer-option';
    button.textContent = `${String.fromCharCode(65 + index)}. ${answer}`;
    button.addEventListener('click', () => chooseAnswer(index));
    answerList.appendChild(button);
  });
  nextQuestion.disabled = true;
  nextQuestion.textContent = questionIndex === quizQuestions.length - 1 ? 'See results' : 'Next question →';
}
function chooseAnswer(index) {
  if (answered) return;
  answered = true;
  const item = quizQuestions[questionIndex];
  const options = [...answerList.querySelectorAll('button')];
  options.forEach((button, i) => {
    button.disabled = true;
    if (i === item.correct) button.classList.add('correct');
    else if (i === index) button.classList.add('incorrect');
  });
  if (index === item.correct) {
    score++;
    quizFeedback.textContent = item.why;
  } else {
    quizFeedback.textContent = `Not quite. ${item.why}`;
  }
  scoreLabel.textContent = `Score: ${score}`;
  nextQuestion.disabled = false;
  nextQuestion.textContent = questionIndex === quizQuestions.length - 1 ? 'See results' : 'Next question →';
}
nextQuestion.addEventListener('click', () => {
  if (!answered) return;
  if (questionIndex < quizQuestions.length - 1) {
    questionIndex++;
    renderQuestion();
  } else {
    progressBar.style.width = '100%';
    questionCounter.textContent = 'CHALLENGE COMPLETE';
    questionText.textContent = `You scored ${score} out of ${quizQuestions.length}!`;
    answerList.innerHTML = '';
    quizFeedback.textContent = score === 5 ? 'Excellent work—you have a strong grasp of these safety basics.' : 'Good effort! Review the safety toolkit above and try again to reinforce what you learned.';
    nextQuestion.disabled = false;
    nextQuestion.textContent = 'Try again ↺';
    nextQuestion.onclick = () => {
      questionIndex = 0; score = 0; nextQuestion.onclick = null; renderQuestion();
    };
  }
});
renderQuestion();

const checkboxes = [...document.querySelectorAll('#checklistItems input[type="checkbox"]')];
const checkProgress = document.getElementById('checkProgress');
const checkCount = document.getElementById('checkCount');
const checkMessage = document.getElementById('checkMessage');
function updateChecklist() {
  const done = checkboxes.filter(input => input.checked).length;
  checkProgress.style.width = `${done / checkboxes.length * 100}%`;
  checkCount.textContent = `${done} of ${checkboxes.length} complete`;
  checkMessage.textContent = done === checkboxes.length ? 'Great work—you reviewed every item!' : done === 0 ? 'Every safe habit counts.' : 'Nice progress. Keep building safer habits.';
}
checkboxes.forEach(input => input.addEventListener('change', updateChecklist));
document.getElementById('resetChecklist').addEventListener('click', () => {
  checkboxes.forEach(input => input.checked = false);
  updateChecklist();
});
updateChecklist();

// Highlight the active navigation item as the visitor moves through the page.
const observedSections = [...document.querySelectorAll('main section[id]')];
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        mainNav.querySelectorAll('a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`));
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });
  observedSections.forEach(section => observer.observe(section));
}
