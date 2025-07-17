let timerDiv = document.getElementById('timer');
let counter = 60;
setInterval(() => {
    timerDiv.innerText = counter + "s";
    counter--;
}, 1000);
