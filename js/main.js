let question = 0;
const rightAnswers = [1, 3, 2]; 
let alreadyAnswered = false;

 const players = [];

const input = document.getElementById('player-name'); 

const btnHotel = document.getElementById('hotel-page');
const homeCountDown = document.getElementById('home-count');
const content = document.getElementById('content-main');
let score = 0;

btnHotel.onclick = loadHTMLContentHotel;

timerHome(0)
.then((id) => {
  clearInterval(id);
  loadHTMLContentHotel();
  timerHotel(0)
  .then((id) => {
    clearInterval(id);
    loadHTMLContentBeach();
    timerBeach(0)
    .then((id) => {
      clearInterval(id);
      loadHTMLContentNight();
      timerNight(0)
      .then((id) => {
        clearInterval(id);
        loadHTMLContentFinal();
      });
  })
})
})


function loadHTMLContentHotel() {
 let inputValue = input.value;
 players.push(inputValue); 

  axios
    .get("../templates/hotel.html", {'crossdomain': true})
    .then(getHotel)
    .catch(err => console.error(err));
}

function getHotel(res) {
  content.innerHTML = res.data;  
  content.id = "content-hotel";

  const btnBeach = document.getElementById('beach-page'); 
  btnBeach.onclick = loadHTMLContentBeach;
  handleAnswers();  
}


function loadHTMLContentBeach() {
  alreadyAnswered = false;
  axios
    .get("../templates/beach.html")
    .then(getBeach)
    .catch(err => console.error(err));
}

function getBeach(res) {
  question = 1;
  content.id = 'content-beach';
  content.innerHTML = res.data;
  content.id = 'content-beach';
  const header = document.getElementById('beach-header') ;
  header.style.backgroundImage = 'url("../media/images/holidays-bg-2.jpg")';
  header.style.backgroundRepeat ="no-repeat";
  const btnNight = document.getElementById("night-page"); 
  btnNight.onclick = loadHTMLContentNight;
  handleAnswers();
}


function loadHTMLContentNight() {
  alreadyAnswered = false;
  axios
    .get("../templates/night.html")
    .then(getNight)
    .catch(err => console.error(err));
}

function getNight(res) {
  question = 2;
  content.innerHTML = res.data;
  content.id = 'content-night';
  const header = document.getElementById('night-header') ;
  header.style.backgroundImage = 'url("../media/images/night-bg2.jpg")';
  header.style.backgroundRepeat ='no-repeat';
  header.style.backgroundPosition = 'left' ;
  const btnFinal = document.getElementById("final-page");
  btnFinal.onclick = loadHTMLContentFinal;   
  handleAnswers();
}


function loadHTMLContentFinal() {
  axios
    .get("../templates/final.html")
    .then(getFinal)
    .catch(err => console.error(err));
}

function getFinal(res) {
  content.innerHTML = res.data;
  content.id = 'content-results'; 
  content.style.backgroundColor = '#e6e9ee';
  const player = document.getElementById("player");
  player.textContent = `Hey ${players[0]}, thanks for playing, your score is ${score}`;
  const results = document.getElementById("results");
  const applauseSound = document.getElementById('applause');
  const failSound = document.getElementById('fail');
  //const averageSound = document.getElementById('success');
  const averageSound = document.getElementById('average');
  if (score === 0 || score === 1) {
    results.textContent = `Sorry ${players[0]}, you might have a very bad trip ! ;)`;
    failSound.play();
  } else if (score === 2 ) {
    results.textContent = `hmmm, well done ${players[0]}, but you shoud practise a bit more ! `;
    averageSound.play();
    } else {
      results.textContent =  `Congrats ! We're very impressed :) ${players[0]}, you're ready to travel`;
      applauseSound.play();
    } 

  const btnRestart = document.getElementById("restart");
  btnRestart.onclick = loadHTMLContentHome;

}

function loadHTMLContentHome() {
  axios
    .get("../index.html")
    .then(restart)
    .catch(err => console.error(err));
}

function restart() {
  location.reload();}

function handleAnswers() {
  const answer1 = document.getElementById('p1');
  const answer2 = document.getElementById('p2');
  const answer3 = document.getElementById('p3');
  const answer4 = document.getElementById('p4');
  answer1.addEventListener("click", checkAnswer);
  answer2.addEventListener("click", checkAnswer);
  answer3.addEventListener("click", checkAnswer);
  answer4.addEventListener("click", checkAnswer);
}

function checkAnswer(e) {
    const icon = e.target.previousElementSibling;
  if (e.target.id === `p${rightAnswers[question]}`) {  
    /*icon.classList.add('fas','fa-check-circle','success');*/
    icon.classList.toggle('fas'); 
    icon.classList.toggle('fa-check-circle'); 
    icon.classList.toggle('success');
    e.target.disabled = true;
    if (alreadyAnswered === false)  {
      score++;
      alreadyAnswered = true;
    } else {
    }  
    const winSound = document.getElementById('win-sound');
    winSound.src = 'media/audios/win.wav';
  } else { 
    //icon.classList.add('fas','fa-times-circle','danger'); 
    icon.classList.toggle('fas'); 
    icon.classList.toggle('fa-times-circle'); 
    icon.classList.toggle('danger');  
    const loseSound = document.getElementById('lose-sound');
    loseSound.src = 'media/audios/lose.wav';  }
  return score;
}


function timerHome(limit) {
  return new Promise((resolve, reject) => {
    let count = 10;
    let id = setInterval(() => {
     count--;     
     homeCountDown.textContent = count;
      if (count === 5) btnHotel.style.display='block';
      if (count === limit) resolve(id);      
    }, 1000);
  });
}

function timerHotel(limit) {
  return new Promise((resolve, reject) => {
    let count = 30;
    let id = setInterval(() => {
     count--;
     const hotelCountDown = document.getElementById('hotel-count'); 
     const btnBeach = document.getElementById('beach-page');
     if (hotelCountDown !== null) {
     hotelCountDown.textContent = ' ' +count + ' ';
    } 
     if (count === 5 && btnBeach !==null) btnBeach.style.display='block';
      if (count === limit) resolve(id);
    }, 1000);
  });
}
function timerBeach(limit) {
  return new Promise((resolve, reject) => {
    let count = 30;
    let id = setInterval(() => {
     count--;
     const beachCountDown = document.getElementById('beach-count');
     const btnNight = document.getElementById('night-page');

     if (beachCountDown !== null) {
      beachCountDown.textContent = ' ' +count + ' ';
     } 
     if (count === 5 && btnNight !== null) btnNight.style.display='inline-block';
      if (count === limit) resolve(id);
    }, 1000);
  });
}

function timerNight(limit) {
  return new Promise((resolve, reject) => {
    let count = 30;
    let id = setInterval(() => {
     count--;
     const nightCountDown = document.getElementById('night-count');
     const btnFinal = document.getElementById('final-page');

     if (nightCountDown !== null) {
      nightCountDown.textContent = ' ' + count + ' ';
    }
    if (count === 5 && btnFinal !== null) btnFinal.style.display='block';

      if (count === limit) resolve(id);
    }, 1000);
  });
}