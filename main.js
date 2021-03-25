let quiz1 = new Quiz("Ai là người tạo ra trò chơi này?",["Công chứ còn ai","Chú hàng xóm","Anh thợ điện","Bé phòng bên"],"Công chứ còn ai");
let quiz2 = new Quiz("Năm nay là năm bao nhiêu?",["2021","2019","2030","2025"],"2021");
let gameManager = new GameFeature(2);
gameManager.addQuiz(quiz1);
gameManager.addQuiz(quiz2);
console.log(gameManager)
function displayQuiz(index) {
    document.getElementById("question").innerHTML=gameManager.quizs[index].question;
    for (let i = 1;i <= gameManager.quizs[index].answer.length;i++){
        document.getElementById("ans"+i).innerHTML=gameManager.quizs[index].answer[i-1];
    }
    displayScore();
}
function displayScore() {
    document.getElementById("score").innerHTML="Score: "+gameManager.score;
}
displayQuiz(0)
// function nextQuiz() {
//    gameManager.nextQuiz()
//     displayQuiz(gameManager.current);
// }
function endGame() {
    gameManager.endGame();
    displayQuiz(gameManager.current);
    displayScore();
}
function resetQuiz() {
    gameManager.nextGame();
    displayQuiz(gameManager.current)
    displayScore();
}
function chooseAnswer(id) {
    let ans = document.getElementById(id).innerHTML;
    gameManager.chooseAnswer(ans);
    if (gameManager.checkAnswer(ans)){
        gameManager.nextQuiz();
        displayQuiz(gameManager.current)
        displayScore();
    }
    else{
        endGame()
        displayScore();
    }
}