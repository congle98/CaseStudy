function soundFalse() {
    let audio = document.getElementById('false');
    audio.play();
}
function soundTrue() {
    let audio = document.getElementById('true');
    audio.play();
}
function soundWin() {
    let audio = document.getElementById('win');
    audio.play();
}
function soundAlert() {
    let audio = document.getElementById('alert');
    audio.play();
}
function soundStart() {
    let audio = document.getElementById('start');
    audio.play();
}
let countSound = 0;
function soundOff() {
    let audio = document.getElementById('audio');
    if (countSound==0){
        audio.pause();
        console.log(countSound)
        countSound++;
    }
    else if (countSound == 1){
        audio.play();
        countSound--;
    }

}