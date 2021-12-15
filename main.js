let question = 0;
const rightAnswers = [1, 3, 2]; 
let alreadyAnswered = false;
const players = [];

const btnHotel = document.getElementById('hotel-page');
const homeCountDown = document.getElementById('home-count');
const content = document.getElementById('content-main');
//const input = document.getElementById('enter');
let score = 0;

btnHotel.onclick = loadHTMLContentHotel;
timerHome(0)
.then((id) => {
  clearInterval(id);
  //alert("ready to play ?");
  btnHotel.click();
});

function loadHTMLContentHotel() {

  const input = document.getElementById("player-name");
  let inputValue = input.value;
  players.push(inputValue);
  console.log(players);
  axios
    .get("./templates/hotel.html")
    .then(getHotel)
    .catch(err => console.error(err));
}

function getHotel(res) {
  content.innerHTML = res.data;

  // const player = document.getElementById('player');
  //player.textContent = 'Hello ' + inputValue; 
  
  content.id = "content-hotel";
  const hotelCountDown = document.getElementById('question-hotel');
  //console.log(hotelCountDown);

  const btnBeach = document.getElementById('beach-page'); // screen suivant
  btnBeach.onclick = loadHTMLContentBeach;
  //remove button 1
  console.log("players in hotel", players);
  handleAnswers();  
  timerHotel(0).then(intervalId => {
    clearInterval(intervalId);
    hotelCountDown.textContent = 'Sorry, the delay is over, let\'s start the second level: Donde esta la playa';  
    //alert('Sorry, the delay is over, click ok to continue');
    btnBeach.click();
  });
}


function loadHTMLContentBeach() {
  alreadyAnswered = false;
  axios
    .get("./templates/beach.html")
    .then(getBeach)
    .catch(err => console.error(err));
}

function getBeach(res) {
  question = 1;
  content.id = 'content-beach';
  content.innerHTML = res.data;
  /*const btnCity = document.getElementById("city-page"); // screen suivant
  btnCity.onclick = loadHTMLContentCity;*/   
  content.id = 'content-beach';
  const beachCountDown = document.getElementById('beach-count');
  const header = document.getElementById('beach-header') ;
  header.style.backgroundImage = 'url("images/holidays-bg-2.jpg")';
  header.style.backgroundRepeat ="no-repeat";
  const btnNight = document.getElementById("night-page"); // screen suivant
  btnNight.onclick = loadHTMLContentNight;
  //remove button 1
  console.log("players in beach", players);
  handleAnswers();
  timerBeach(0).then(intervalId => {
    clearInterval(intervalId);
    alert('Sorry, the delay is over, click ok to continue');
    //btnCity.click();
    btnNight.click();
  });
}


/*function loadHTMLContentCity() {
  axios
    .get("./templates/city.html")
    .then(getCity)
    .catch(err => console.error(err));
}*/

/*function getCity(res) {
  question = 2;
  content.innerHTML = res.data;
  content.style.backgroundColor = "blue";
  content.style.color = "#FFF";
  const btnNight = document.getElementById("night-page");
  btnNight.onclick = loadHTMLContentNight;
  //remove button 1
  handleAnswers();
  timer(5).then(intervalId => {
    clearInterval(intervalId);
    alert('Sorry, the delay is over, click ok to continue');
    btnBeach.click();
  });
}*/


function loadHTMLContentNight() {
  alreadyAnswered = false;
  axios
    .get("./templates/night.html")
    .then(getNight)
    .catch(err => console.error(err));
}

function getNight(res) {
  question = 2;
  content.id = "content-night";
  content.innerHTML = res.data;
  content.id = 'content-night';
  const header = document.getElementById('night-header') ;
  header.style.backgroundImage = 'url("images/night-bg2.jpg")';
  header.style.backgroundRepeat ='no-repeat';
  header.style.backgroundPosition = 'left' ;
  const btnFinal = document.getElementById("final-page");
  btnFinal.onclick = loadHTMLContentFinal;   

  //remove button 1
  handleAnswers();
  timerNight(0).then(intervalId => {
    clearInterval(intervalId);
    //alert('Sorry, the delay is over, click ok to see the results');
    btnFinal.click();    
  })
}


function loadHTMLContentFinal() {
  axios
    .get("./templates/final.html")
    .then(getFinal)
    .catch(err => console.error(err));
}

function getFinal(res) {
  console.log("players in final", players);
  content.innerHTML = res.data;
  content.id = 'content-results';
  //const header = document.getElementById('results-header') ;
  //content.style.backgroundColor = '#e6e9ee';
  const player = document.getElementById("player");
  player.textContent = `Hey ${players[0]}, thanks for tying, your score is ${score}`;


  const results = document.getElementById("results");
  console.log(results);
  results.textContent =
    score <= 2
      ? `Sorry ${players[0]}, you might have a very bad trip ! ;)`
      : `Well done ${players[0]}, you're ready to travel`;

  const btnRestart = document.getElementById("restart");
  btnRestart.onclick = loadHTMLContentHome;
}

function loadHTMLContentHome() {
  axios
    .get("./index.html")
    .then(restart)
    .catch(err => console.error(err));
}

function restart(res) {
  content.innerHTML = res.data;
  console.log("je peux jouer de nouveau avec un nouveau pseudo");
}

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
  console.log('on whatever answer after click should be false :>> ', alreadyAnswered); 
    //alreadyAnswered = false;
    //console.log('on whatever turned to false :>> ', alreadyAnswered);
    const icon = e.target.previousElementSibling;
  if (e.target.id === `p${rightAnswers[question]}`) {  
    console.log('on the right answer before score should be false :>> ', alreadyAnswered);    
    icon.classList.add('fas','fa-check-circle','success');
    /*icon.classList.toggle('fas'); 
    icon.classList.toggle('fa-check-circle'); 
    icon.classList.toggle('success');*/
    e.target.disabled = true;
    if (alreadyAnswered === false)  {
      console.log('increase score if not already clicked on right answer, so if false :>> ', alreadyAnswered); 
      score++;
      alreadyAnswered = true;
      console.log('should be turned to true if already clicked on right answer after increasing score ?:>> ', alreadyAnswered); 
    } else {
      console.log(' don\'t change the score if already clicked so if true', alreadyAnswered); 
    }  
    const winSound = document.getElementById('win-sound');
    winSound.src = 'images/win.wav';
    console.log('score: ', score);
  } else { 
    console.log(' on the wrong answer after click can be true or false, but do nothing  :>> ', alreadyAnswered);     
    //icon.classList.add('fas','fa-times-circle','danger'); 
    icon.classList.toggle('fas'); 
    icon.classList.toggle('fa-times-circle'); 
    icon.classList.toggle('danger');  
    const loseSound = document.getElementById('loose-sound');
    loseSound.src = 'images/loose.wav';
  }
  console.log('on whatever after click and checking, should be true or false ? :>> ', alreadyAnswered); 
  console.log("score after checking", score);
  return score;
}

/*function timer(limit, callback) {
  let count = 0;
  let intervalId = setInterval(() => {
    count++;
    console.log(count);
    if (count === limit) callback();
  }, 1000);
  if (count > limit) clearInterval(intervalId);
}*/

function timerHome(limit) {
  return new Promise((resolve, reject) => {
    let count = 10;
    let id = setInterval(() => {
     count--;
     homeCountDown.textContent = count; 
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
     hotelCountDown.textContent = count;
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
     hotelCountDown.textContent = count;
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
     nightCountDown.textContent = count;
      if (count === limit) resolve(id);
    }, 1000);
  });
}




