console.log("This is index");


const playBtn = document.querySelector('.fa-play');
const forwardBtn = document.querySelector('#forward');
const backwardBtn = document.querySelector('#backward');
const title = document.querySelector('.title');
const sub_title = document.querySelector('.sub_title');
const cover_img = document.querySelector('.cover_img');
const main = document.querySelector('.main');
const progress_bar = document.querySelector('.progress_bar');
const progress = document.querySelector('.progress');
const sTime = document.querySelector('.sTime');
const dTime = document.querySelector('.dTime');


let index= 0;

const author = ['Avicii', 'Paresh Rawal', 'Vidya Vox'];
const song_name = ['heaven', 'Om Shanti Om', 'Something Just Like This'];
const songs = ['heaven', 'Om_Shanti_Om', 'Something_Just_Like_This'];

const audio = document.querySelector('.music_name');






// Functions
function toLoadSong(index) {
    // console.log(index);
    audio.src = `music/${songs[index]}.mp3`;
    title.innerText = `${author[index]}`;
    sub_title.innerText = `${song_name[index]}`;
    cover_img.src = `images/${songs[index]}.jpg`;
    main.style.backgroundImage = `url('images/${songs[index]}.jpg')`;
    // console.log(sub_title.innerText.length);
    if (sub_title.innerText.length > 12) {
        sub_title.style.fontSize = "20px"
    }else{
        sub_title.style.fontSize = "2em"
    }
    // console.log(audio.src);
}

function toPlaySong() {
    audio.play();
}

function toPauseSong() {
    audio.pause();
}

function changeBtn() {
    // console.log(playBtn.classList[1]);
    if (playBtn.classList[1] == 'fa-play') {
        // console.log("inside pause");
        playBtn.classList.remove('fa-play')
        playBtn.classList.add('fa-pause');
        // console.log(index);
        // toLoadSong(index);
        toPlaySong();

    } else {
        // console.log("inside play");
        playBtn.classList.remove('fa-pause')
        playBtn.classList.add('fa-play')
        toPauseSong();
    }
}

function changeSong(e) {
    playBtn.classList.remove('fa-play')
    playBtn.classList.add('fa-pause');
    // console.log("inside change Song");
    // console.log(e);
    if (this.id == 'forward' || e.type == 'ended') {
        // console.log("inside forward");
        // console.log(index);
        index++
        // console.log(index);
        if (index > songs.length - 1) {
            index = 0;
            // console.log(index);
        }
            toLoadSong(index)
            audio.play();
}
    else{
        index--;
        if (index < 0) {
            index = songs.length-1;
        }
        toLoadSong(index)
        audio.play();
        // console.log("inside backward");
    }
}

function progressBar() {
    // console.log("progress bar");
    // console.log(audio.duration);
    // console.log(audio.currentTime);
    // console.log(e.duration);
    currentWidth = (audio.currentTime/audio.duration) * 100;
    // console.log(currentWidth);
    // console.log(progress);
    progress.style.width = `${currentWidth}%`;
    // sTime.innerText = Math.round(audio.currentTime) + `:` ;

    
    // console.log(Math.floor(audio.duration/60));
    if (audio.duration) {
        // chcked if song is 4.10 then else part if song is 4.09 then if part
        if (Math.floor(audio.duration%60) <= 9) {
            dTime.innerText = `${Math.floor(audio.duration/60)}:0${Math.floor(audio.duration%60)}`;
        }else{
        dTime.innerText = `${Math.floor(audio.duration/60)}:${Math.floor(audio.duration%60)}`;
        }
        // console.log(Math.floor(audio.duration%60));
        // console.log(Math.floor(audio.duration/60));
    }
    if (audio.currentTime) {
        // console.log(audio.currentTime);
        // console.log(audio.currentTime/60);
        // console.log(audio.currentTime%60);
        if (Math.floor(audio.currentTime%60)<=9) {
            sTime.innerText = `${Math.floor(audio.currentTime/60)}:0${Math.floor(audio.currentTime%60)}`;
        }else{
            sTime.innerText = `${Math.floor(audio.currentTime/60)}:${Math.floor(audio.currentTime%60)}`;
        }
    }
    // console.log((audio.duration%60/10).toFixed(2)*100);
    // console.log(hr*60);
}
 
function updateSong(e) {
    console.log("update song");
    console.log(e);
//   total width of that line
    console.log(e.srcElement.clientWidth);
      // where the user click the mosue
    console.log(e.offsetX);
    // to get the % of width use normal formula to do that i.e ((marks obtain/total no of marks) * 100)
    widthOfProgress = (e.offsetX/e.srcElement.clientWidth)*100;
    console.log(widthOfProgress);
    progress.style.width = `${widthOfProgress}%`;

    // 5% of student want choco  of total 100 then 5*100 i.e 500/100= 5 students
    percentTime = (widthOfProgress*audio.duration)/100;
    console.log(percentTime);
    audio.currentTime = percentTime; 
}

// Event Listner
playBtn.addEventListener('click', changeBtn);
forwardBtn.addEventListener('click', changeSong);
backwardBtn.addEventListener('click', changeSong);
audio.addEventListener('timeupdate',progressBar);
audio.addEventListener('ended',changeSong);
progress_bar.addEventListener('click', updateSong);


window.onload = function(){ 
    console.log("load");
    toLoadSong(index);
}

