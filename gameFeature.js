class GameFeature {
    constructor(limit) {
        this.limit = limit;
        this.current = 0;
        this.quizs = [];
        this.score=0;
        this.countNQ=1;

    }
    checkWin(){ //kiểm tra đã chiến thắng chưa
        if(this.current==(nOfQ-1)){
            alert("Chúc mừng bạn đã dành chiến thắng, bạn được thưởng: "+this.score+" USD")
        }
    }
    checkAnswer(ans){ //kiểm tra câu trả lời đúng hay sai
        if(ans===this.quizs[this.current].correct){
            return true
        }
        else {
            return false
        }
    }
    chooseAnswer(ans){ // hiển thị kết quả kiểm tra đáp án
        if (this.checkAnswer(ans)){
            alert("bạn đã trả lời đúng !!!")
            this.score+=100;
        }
        else {
            alert("bạn đã trả lời sai, vui lòng chơi lại từ đầu!!")
        }
    }
    nextQuiz(){// chuyển câu trả lời khi dùng nextQuiz
        if(this.countNQ==1){
            alert("Bạn còn : "+(1-this.countNQ)+" lượt bỏ qua câu hỏi")
            if(this.current<this.limit-1){
                this.current++;
                this.score+=50;

            }
            else {
                alert("bạn đã đến câu hỏi cuối cùng !!!")
            }
            this.countNQ++;
        }
        else{
            alert("Xin lỗi bạn đã hết lượt bỏ qua")
        }


    }
    nextQuizWin(){ //chuyển câu trả lời trong trường hợp thắng
        if(this.current<this.limit-1){
            this.current++;

        }
        else {
            alert("bạn đã đến câu hỏi cuối cùng !!!")
        }
    }
    halfQuestion(){
        let count = 0;
        for (let i = 0; i < 4; i++) {
            if ((this.quizs[this.current].answer[i] !== this.quizs[this.current].correct)&&count<2) {
                this.quizs[this.current].answer.splice(i, 1,"X")
                count++;
            }
        }
        displayQuiz(this.current);
        alert("Đã bỏ đi 2 phương án sai!!");
    }
    stopGame(){
        alert("Chúc mừng bạn đã dành chiến thắng, bạn được thưởng: "+this.score+" USD");
    }


    endGame(){// kết thúc
        this.current=0;
        this.score=0;
        this.countNQ=1;

    }
    // nextGame(){
    //     this.current=0;
    //     this.score=0;
    //     this.cout=0;
    // }
    //CRUD quiz trong game
    //add quiz vào trong game
    addQuiz(quiz){
        this.quizs.push(quiz);
    }
    deleteQuiz(index){
        this.quizs.splice(index,1);
    }
}