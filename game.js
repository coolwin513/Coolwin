let timer = 60;
let timerDiv = document.getElementById('timer');
setInterval(() => {
    if (timer > 0) {
        timer--;
        timerDiv.innerText = timer;
    } else {
        timer = 60;
    }
}, 1000);
