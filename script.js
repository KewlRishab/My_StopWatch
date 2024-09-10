let running = false;
let [hour, min, sec] = [0, 0, 0];
let tInterval;

// let hour=0;
// let min=0;
// let sec=0;

//Dom fetch
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const display = document.getElementById('display');
const lapButton = document.getElementById('lap');
const lapDisplay=document.getElementById('timeList');

//EventListeners
startButton.addEventListener('click', start);
stopButton.addEventListener('click', stop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);

function start() {
    if (!running) {
        tInterval = setInterval(updateTime, 1000);
        running = true;
    }
}

function stop() {
    if (running) {
        clearInterval(tInterval);
        running = false;
    }
}
function reset() {
    [hour, min, sec] = [0, 0, 0];
    clearInterval(tInterval);
    display.innerHTML = "00.00.00";
    running = false;
    lapDisplay.innerHTML="";
}

function updateTime() {
    sec++;
    if (sec < 60) {
        const time = (hour < 10 ? "0" + hour : hour) + ":" + (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);
        display.innerHTML = time;
    }
    else if (sec >= 60) {
        sec = 0;
        min++;
        if (min < 60) {
            const time = ((hour < 10 ? "0" + hour : hour) + ":" + (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec));
            display.innerHTML = time;
        }
        else if (min >= 60) {
            min = 0;
            hour++;
            const time = ((hour < 10 ? "0" + hour : hour) + ":" + (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec));
            display.innerHTML = time;
        }
    }
}

//Lap Time:->

function lap(){
    if(running){
        // console.log(display.innerHTML);
        const time=display.innerHTML;
        const li=document.createElement('li');
        li.innerHTML=time;
        const button=document.createElement('button');
        button.innerHTML='\u00d7';
        li.appendChild(button);
        lapDisplay.appendChild(li);
    }
    else alert("Please Start the stopwatch in order to lap time!!");
}


lapDisplay.addEventListener('click',(e)=>{
    if(e.target.tagName ==='BUTTON' && window.confirm("Do you really want to delete this Flag")){
        e.target.parentElement.remove();
        alert("Tag Deleted SuccessFully!");
    }
})