class GameFeature {
    constructor(limit) {
        this.limit = limit;
        this.current = 0;
        this.quizs = [];
        this.score=0;
        this.countNQ=1;
        this.countBonus=0;
        this.count5050=1;

    }

    checkAnswer(ans){ //kiểm tra câu trả lời đúng hay sai
        if(ans===this.quizs[this.current].correct){
            return true
        }
        else {
            return false
        }
    }
    bonusScore(val){
        switch (this.current){
            case 0:
                this.score+=(100*val);
                break;
            case 1:
                this.score+=(200*val);
                break;
            case 2:
                this.score+=(300*val);
                break;
            case 3:
                this.score+=(400*val);
                break;
            case 4:
                this.score+=(500*val);
                break;
            case 5:
                this.score+=(600*val);
                break;
            case 6:
                this.score+=(700*val);
                break;
            case 7:
                this.score+=(800*val);
                break;
            case 8:
                this.score+=(900*val);
                break;
            case 9:
                this.score+=(1000*val);
                break;
        }
    }
    chooseAnswer(ans){ // hiển thị kết quả kiểm tra đáp án
        if (this.checkAnswer(ans)&&this.countBonus<this.limit){
            this.countBonus++;
            // alert("bạn đã trả lời đúng !!!");
            this.bonusScore(1);
            document.getElementById("show").innerHTML="bạn đã trả lời đúng câu số "+(this.current+1)+" tổng tiền thường: "+this.score+" USD!!";
        }
        else {
            document.getElementById("show").innerHTML="bạn đã trả lời sai, vui lòng chơi lại từ đầu!!";
        }
    }
    nextQuiz(){// chuyển câu trả lời khi dùng nextQuiz
        if(this.countNQ==1){

            if(this.current<this.limit-1&&this.countBonus<this.limit){
                this.countBonus++;
                this.bonusScore(0.5);
                this.current++;
                document.getElementById("show").innerHTML="Bạn đã bỏ qua câu "+(this.current)+"  tổng tiền thường: "+this.score+" USD!!";
            }
            else {
                this.stopGame();
                return true
            }
            this.countNQ++;
        }
        else{
            document.getElementById("show").innerHTML="Xin lỗi bạn đã hết lượt bỏ qua";
        }


    }
    nextQuizWin(){ //chuyển câu trả lời trong trường hợp thắng
        if(this.current<this.limit-1){
            this.current++;

        }
        else {
            this.stopGame();
            return true
        }
    }
    halfQuestion(){
        let count = 0;
        if(this.count5050==1){
            this.count5050++;
            for (let i = 0; i < 4; i++) {
                if ((this.quizs[this.current].answer[i] !== this.quizs[this.current].correct)&&count<2) {
                    this.quizs[this.current].answer.splice(i, 1,"X")
                    count++;
                }
            }
            displayQuiz(this.current);
            document.getElementById("show").innerHTML="Đã bỏ đi 2 phương án sai!!";
        }
        document.getElementById("show").innerHTML="Bạn đã hết lượt sử dụng sự trợ giúp 50/50!!"


    }
    stopGame(){
        document.getElementById("show").innerHTML="CHÚC MỪNG BẠN ĐÃ CHIẾN THẮNG BẠN ĐƯỢC THƯỞNG: "+this.score+" USD";

    }


    endGame(){// kết thúc
        this.current=0;
        this.score=0;
        this.countNQ=1;
        this.countBonus=0;
        this.count5050=1;
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