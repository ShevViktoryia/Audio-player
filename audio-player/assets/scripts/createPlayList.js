import playList from '../data/playList';
import play from '../svg/play.png';
import pauseBtn from '../svg/pause.png';
import backwardBtn from '../svg/backward.png';
import forwardBtn from '../svg/forward.png';
import state from '../scripts/state';

const audio = new Audio();
let curItem = 0;

function playAudio(curItem) {
  audio.src = playList[curItem].src;
  audio.play();
}

function pauseAudio() {
  audio.pause();
}

function getTime(time) {
  let minutes = Math.floor((time / 60));
  let seconds = Math.floor(time - (minutes * 60));
  if(seconds < 10) {
    seconds = `0${seconds}`;
  }
  return `${minutes}:${seconds}`;
};

function createCard(curItem) {
  const body = document.body;
  const bgImage = document.createElement('img');

  body.innerHTML = '';

  bgImage.className = 'bgImage';
  bgImage.setAttribute('src', playList[curItem].img);
  bgImage.setAttribute('alt', playList[curItem].singer);
  body.append(bgImage);

  const playerCard = document.createElement('div');
  playerCard.className = 'player-card';

  const playerImg = document.createElement('img');
  playerImg.className = 'player-img';
  playerImg.setAttribute('src', playList[curItem].img);
  playerImg.setAttribute('alt', playList[curItem].singer);

  const btmPlayerWrap = document.createElement('div');
  btmPlayerWrap.className = 'player-btm-wrapper';

  const playerBtm = document.createElement('div');
  playerBtm.className = 'player-btm';
  const playBtn = document.createElement('img');
  playBtn.className = 'play';
  playBtn.setAttribute('src', play);
  playBtn.setAttribute('alt', 'play_button');

  const songDesription = document.createElement('div');
  songDesription.className = 'song-desription';
  const singer = document.createElement('h2');
  singer.className = 'singer';
  singer.textContent = playList[curItem].singer;
  const song = document.createElement('p');
  song.className = 'song';
  song.textContent = playList[curItem].title;

  const btnWrapper = document.createElement('div');
  btnWrapper.className = 'btn-wrapper';
  const prevBtn = document.createElement('img');
  prevBtn.className = 'prev-btn';
  prevBtn.setAttribute('src', backwardBtn);
  prevBtn.setAttribute('alt', 'backward_button');
  const nextBtn = document.createElement('img');
  nextBtn.className = 'next-btn';
  nextBtn.setAttribute('src', forwardBtn);
  nextBtn.setAttribute('alt', 'forward_button');

  const durationProgress = document.createElement('div');
  durationProgress.className = 'duration-progress';
  const audioDuration = document.createElement('div');
  audioDuration.className = 'audio-duration';
  audioDuration.textContent = playList[curItem].duration;
  const progressLine = document.createElement('input');
  progressLine.className = 'progress-line';
  progressLine.setAttribute('type', 'range');
  progressLine.setAttribute('step', '1');
  progressLine.value = 0;

  const currentTime = document.createElement('div');
  currentTime.className = 'current-time';
  currentTime.textContent = getTime(Math.floor(audio.currentTime));

  songDesription.append(singer);
  songDesription.append(song);
  btnWrapper.append(prevBtn);
  btnWrapper.append(nextBtn);
  playerBtm.append(playBtn);
  playerBtm.append(songDesription);
  playerBtm.append(btnWrapper);
  durationProgress.append(audioDuration);
  durationProgress.append(progressLine);
  durationProgress.append(currentTime);
  playerCard.append(playerImg);
  btmPlayerWrap.append(playerBtm);
  btmPlayerWrap.append(durationProgress);
  playerCard.append(btmPlayerWrap);
  body.append(playerCard);
}

function playMusic() {
  const playIcon = document.querySelector('.play');
  const currentTimeProgress = document.querySelector('.current-time');
  const progressLine = document.querySelector('.progress-line');

  if(state.isPlay == false) {
    state.isPlay = true;
    if(!playIcon.classList.contains('pause')) {
      playIcon.classList.add('pause');
      playIcon.setAttribute('src', pauseBtn);
      audio.ontimeupdate = () => {
        currentTimeProgress.textContent = getTime(Math.floor(audio.currentTime));
        progressLine.max = audio.duration;
        progressLine.value = audio.currentTime;
      }
      audio.onended = () => {
        curItem == playList.length-1 ? curItem = 0 : curItem++;
        createCard(curItem);
        state.isPlay = false;
        createPlayList();
        playMusic();
      }
      playAudio(curItem);
    }
    else {
      playIcon.classList.remove('pause');
      playIcon.setAttribute('src', play);
      pauseAudio();
    }
  }
  else {
    state.isPlay = false;
    playIcon.classList.toggle('pause');
    playIcon.setAttribute('src', play);
    pauseAudio();
  }

  progressLine.oninput = () => {
    audio.currentTime = progressLine.value;
  };
}

createCard(curItem);

export default function createPlayList() {
  const playIcon = document.querySelector('.play');

  playIcon.addEventListener('click', function() {
    playMusic();
  })

  const playPrev = document.querySelector('.prev-btn');
  const playNext = document.querySelector('.next-btn');

  playPrev.onclick = () => {
    if(curItem == 0) {
      curItem = playList.length-1;
      createCard(curItem);
      state.isPlay = false;
      createPlayList();
      playMusic();
    }
    else {
      curItem--;
      createCard(curItem);
      state.isPlay = false;
      createPlayList();
      playMusic();
    }
  }

  playNext.addEventListener('click', function() {
    if(curItem == playList.length-1) {
      curItem = 0;
      createCard(curItem);
      state.isPlay = false;
      createPlayList();
      playMusic();
    }
    else {
      curItem++;
      createCard(curItem);
      state.isPlay = false;
      createPlayList();
      playMusic();
    }
  });
}