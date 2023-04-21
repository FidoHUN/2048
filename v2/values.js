const value = document.querySelector("#value")
const input = document.querySelector("#slider")
value.textContent = input.value
window.mutationPercentage=input.value
input.addEventListener("input", (event) => {
  value.textContent = event.target.value
  window.mutationPercentage=event.target.value
})
const highScoreValue = document.querySelector('#highScoreValue');
let currentHighScore = 0;
if (!localStorage.getItem("bestScore")) {
    currentHighScore = 0;
}else{
    currentHighScore = localStorage.getItem("bestScore");
}
highScoreValue.innerHTML = currentHighScore;
