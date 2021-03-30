class GameFeature {
    constructor(limit) {
        this.limit = limit;
        this.current = 0;// số lượng câu hỏi ban đầu( biến đến, sau mỗi lần next hoặc trả lời đúng sẽ tăng lên 1)
        this.quizs = [];// mảng các câu hỏi ban đầu rỗng
        this.score=0; // số tiền thưởng ban đầu
        this.countNQ=1; // số lần sử dụng next quiz, chỉ được sử dụng 1 lần khi countNQ ==1
        this.countBonus=0;// số lần cộng thưởng, chỉ được = số lượng câu hỏi, tránh trường hợp hết câu hỏi rồi nhấn vào câu trả lời đúng vẫn dc cộng
        this.count5050=1;//số lần sử dụng 5050, chỉ được sử dụng 1 lần khi count5050 ==1
        this.countDS=0;// số lần hiển thị
        this.countAsk=1;
        this.inforPlayer=[];
        this.countTable=0;
        this.scores=[];
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
        switch (this.current){ // bảng + điểm thưởng ở mỗi câu hỏi
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
            this.bonusScore(1);// trả lời đúng thì tỉ lệ thưởng là 1
            document.getElementById("show").innerHTML="bạn đã trả lời đúng câu số "+(this.current+1)+" tổng tiền thưởng: "+this.score+" USD!!";
        }
        else {
            document.getElementById("show").innerHTML="bạn đã trả lời sai, vui lòng chơi lại từ đầu!!";
        }
    }
    nextQuiz(){// chuyển câu trả lời khi dùng nextQuiz
        if(this.countNQ==1){
            if(this.current<this.limit-1&&this.countBonus<=this.limit){//chỉ chuyển khi câu trả lời thứ nhỏ hơn hoặc limit và số lần cộng thưởng cũng phải nhỏ hơn limit
                    this.bonusScore(0.5);// dùng bỏ qua câu trả lời thì chỉ dc 1 nửa số điểm
                    this.countBonus++;
                    this.current++;
                    this.displayScore();
                    document.getElementById("show").innerHTML="Bạn đã bỏ qua câu "+(this.current)+"  tổng tiền thưởng: "+this.score+" USD!!" ;
            }
            else {

                this.stopGame();
                this.bonusScore(0.5);
            }
            this.countNQ++;
        }
        else{
            document.getElementById("show").innerHTML="Xin lỗi bạn đã hết lượt bỏ qua";
        }


    }
    nextQuizWin(){ //chuyển câu trả lời trong trường hợp thắng
        if(this.current<this.limit-1){ // chỉ chuyển khi câu trả lời thứ nhỏ hơn limit
            this.current++;

        }
        else {
            this.stopGame();
        }
    }
    halfQuestion(){
        let countXoa = 0; // đếm xoá 2 lần
        let countCheck = 0;// đếm thêm 2 câu sai vào mảng mới 2 lần
        let ans = []; // tạo 1 mảng khác để chứa 2 câu trả lời sai bị xoá
        let k =0; // đếm index của mảng ans
        if(this.current < this.limit){//
            if(this.count5050 == 1){
                this.count5050++;
                document.getElementById("show").innerHTML="Đã bỏ đi 2 phương án sai!!";
                for (let i = 0; i < 4; i++) {
                    if ((this.quizs[this.current].answer[i] !== this.quizs[this.current].correct)&&countCheck<2) { // thêm 2 câu trl sai vào mảng mới
                        countCheck++;
                        ans.push(this.quizs[this.current].answer[i]);
                    }
                }
                for (let i = 0; i < 4; i++) {
                    if ((this.quizs[this.current].answer[i] !== this.quizs[this.current].correct)&&countXoa<2) { // đổi 2 câu trả lời sai thành X
                        this.quizs[this.current].answer.splice(i, 1,"X")
                        countXoa++;
                    }
                }

                displayQuiz(this.current); //sau khi xoá 2 phần tử rồi thì phải hiển thị trên màn hình
                for (let i = 0; i < 4; i++) {
                    if (this.quizs[this.current].answer[i]=="X"){  // sau khi hiển thị rồi thì phải thêm 2 câu trả lời sai lại vào mảng cũ
                        for (let j = 0;j < 1;j++){
                            this.quizs[this.current].answer.splice(i, 1,ans[k]);
                            k++;
                        }
                    }
                }
            }
            else {
                document.getElementById("show").innerHTML="Bạn đã hết lượt sử dụng sự trợ giúp 50/50!!";// nếu hết lượt thì in ra cái này
            }
        }

    }
    stopGame(){// sau khi trả lời hết câu hỏi hoặc dừng cuộc chơi thì hiển thị
        soundWin();
        this.scores.push(this.score);
        document.getElementById("ansDiv4").innerHTML = "<button id='bAns2-1' onclick=\"start()\">Bắt đầu lại</button>";
        document.getElementById("show").innerHTML = "CHÚC MỪNG BẠN ĐÃ CHIẾN THẮNG BẠN ĐƯỢC THƯỞNG: "+this.score+" USD";
        document.getElementById("dInforPlayer").innerHTML="<input id=\"inforPlayer\" type=\"text\" style=\"visibility: visible\"  placeholder=\"Mời nhập tên!!\">"



    }
    displayScore(){
        if (this.countDS <= this.limit){ // vì số lần hiển thị tiển thưởng sẽ chỉ được nhỏ hơn bằng số lượng câu hỏi
            document.getElementById("score").innerHTML="Tiền thưởng: "+this.score+" USD";
            this.countDS++;
        }
    }

    askAudience() {
        if (this.current < this.limit) {
            if (this.countAsk == 1) {
                for (let i = 0; i < 4; i++) {
                    if ((this.quizs[this.current].answer[i] == this.quizs[this.current].correct) && i == 0) {
                        let check = true;
                        while (check) {
                            let a = Math.floor(Math.random() * 71) + 30;
                            let b = Math.floor(Math.random() * 101);
                            let c = Math.floor(Math.random() * 101);
                            let d = Math.floor(Math.random() * 101);
                            let sum = a + b + c + d;
                            if (sum == 100) {
                                document.getElementById("show").innerHTML = "Đáp án A: " + a + "%" + "</br>" +
                                    "Đáp án B: " + b + "%" + "</br>" + "Đáp án C: " + c + "%" + "</br>" + "Đáp án D: " + d + "%";
                                this.countAsk++;
                                check = false;
                            }
                        }
                    } else if ((this.quizs[this.current].answer[i] == this.quizs[this.current].correct) && i == 1) {
                        let check = true;
                        while (check) {
                            let a = Math.floor(Math.random() * 101);
                            let b = Math.floor(Math.random() * 71) + 30;
                            let c = Math.floor(Math.random() * 101);
                            let d = Math.floor(Math.random() * 101);
                            let sum = a + b + c + d;
                            if (sum == 100) {
                                document.getElementById("show").innerHTML = "Đáp án A: " + a + "%" + "</br>" +
                                    "Đáp án B: " + b + "%" + "</br>" + "Đáp án C: " + c + "%" + "</br>" + "Đáp án D: " + d + "%";
                                this.countAsk++;
                                check = false;
                            }
                        }
                    } else if ((this.quizs[this.current].answer[i] == this.quizs[this.current].correct) && i == 2) {
                        let check = true;
                        while (check) {
                            let a = Math.floor(Math.random() * 101);
                            let b = Math.floor(Math.random() * 101);
                            let c = Math.floor(Math.random() * 71) + 30;
                            let d = Math.floor(Math.random() * 101);
                            let sum = a + b + c + d;
                            if (sum == 100) {
                                document.getElementById("show").innerHTML = "Đáp án A: " + a + "%" + "</br>" +
                                    "Đáp án B: " + b + "%" + "</br>" + "Đáp án C: " + c + "%" + "</br>" + "Đáp án D: " + d + "%";
                                this.countAsk++;
                                check = false;
                            }
                        }
                    } else if ((this.quizs[this.current].answer[i] == this.quizs[this.current].correct) && i == 3) {
                        let check = true;
                        while (check) {
                            let a = Math.floor(Math.random() * 101);
                            let b = Math.floor(Math.random() * 101);
                            let c = Math.floor(Math.random() * 101);
                            let d = Math.floor(Math.random() * 71) + 30;
                            let sum = a + b + c + d;
                            if (sum == 100) {
                                document.getElementById("show").innerHTML = "Đáp án A: " + a + "%" + "</br>" +
                                    "Đáp án B: " + b + "%" + "</br>" + "Đáp án C: " + c + "%" + "</br>" + "Đáp án D: " + d + "%";
                                this.countAsk++;
                                check = false;
                            }
                        }
                    }
                }
            }
            else {
                document.getElementById("show").innerHTML="bạn đã hết lượt sự trợ giúp của khán giả!!"
            }
        }
    }
    getInforPlayer(){ // lấy tên người chơi
        let infor=document.getElementById("inforPlayer").value;
        this.inforPlayer.push(infor);
    }
    showTranscript(){ // hiển thị bang xếp hạng
        if(this.countTable==0){
            let table="<table id='tableScore' border='1'><tr><th>Người chơi</th><th>Điểm số</th></tr>"
            for(let i=0;i<this.inforPlayer.length;i++){
                table+="<tr><td>"+this.inforPlayer[i]+"</td>"+"<td>"+this.scores[i]+"</td></tr>"
            }
            table+="</table>";
            document.getElementById("showTable").innerHTML=table;
            this.countTable++;
            }
        else if(this.countTable==1) {
            document.getElementById("showTable").innerHTML = "";
            this.countTable--;
        }
    }


    endGame(){// kết thúc thì reset lại tất cả các biến đếm
        this.current=0;
        this.score=0;
        this.countNQ=1;
        this.countBonus=0;
        this.count5050=1;
        this.countDS=0;
        this.countAsk=1;
        this.countTable=0
    }
    addQuiz(quiz){
        this.quizs.push(quiz);
    }
}