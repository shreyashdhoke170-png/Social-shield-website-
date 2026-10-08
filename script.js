const menu=document.querySelector(".menu"), nav=document.querySelector(".navbar");
menu.addEventListener("click",()=>nav.classList.toggle("open"));
document.querySelectorAll("nav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const questions=[
 {q:"Which is the safest password practice?",a:["Use your birthday","Use the same password everywhere","Use a unique, strong password","Share it with a friend"],correct:2},
 {q:"What is an active digital footprint?",a:["Information you intentionally post online","Only data stored on your phone","A computer virus","Your internet speed"],correct:0},
 {q:"What should you do with a suspicious login link?",a:["Click quickly","Forward it to friends","Ignore/check it through an official source","Enter your password first"],correct:2},
 {q:"Which adds an extra layer of account security?",a:["Public profile","Two-factor authentication","Using a short password","Sharing recovery codes"],correct:1},
 {q:"Before posting personal information, you should:",a:["Post immediately","Think about who can see it and future consequences","Ask a stranger","Turn off your phone"],correct:1}
];

const box=document.getElementById("quizBox"); let current=0,score=0;
function renderQuiz(){
 if(current>=questions.length){
  box.innerHTML=`<div class="result"><p class="eyebrow">QUIZ COMPLETE</p><h3>Your awareness score</h3><div class="score">${score}/${questions.length}</div><p>${score>=4?"Excellent! You show strong digital safety awareness.":"Good start! Review the safety tips above and try again."}</p><br><button class="btn primary" onclick="restartQuiz()">Try Again</button></div>`;
  return;
 }
 const x=questions[current];
 box.innerHTML=`<div class="progress">Question ${current+1} of ${questions.length}</div><div class="question active"><h3>${x.q}</h3><div class="answers">${x.a.map((v,i)=>`<button class="answer" onclick="answer(${i})">${v}</button>`).join("")}</div></div>`;
}
function answer(i){
 const q=questions[current], buttons=document.querySelectorAll(".answer");
 buttons.forEach(b=>b.disabled=true);
 buttons[q.correct].classList.add("correct");
 if(i===q.correct)score++; else buttons[i].classList.add("wrong");
 setTimeout(()=>{current++;renderQuiz()},700);
}
function restartQuiz(){current=0;score=0;renderQuiz()}
renderQuiz();
