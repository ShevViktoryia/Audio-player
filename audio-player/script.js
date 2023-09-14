import './index.html';
import './assets/sass/pages/_index.sass';
import playList from './assets/data/playList';
import play from './assets/svg/play.png';
import pauseBtn from './assets/svg/pause.png';
import backwardBtn from './assets/svg/backward.png';
import forwardBtn from './assets/svg/forward.png';

const body = document.body;
const bgImage = document.createElement('img');
bgImage.className = 'bgImage';
bgImage.setAttribute('src', playList[0].img);
bgImage.setAttribute('alt', playList[0].singer);
body.append(bgImage);

playList.forEach(item => {
  const playerCard = document.createElement('div');
  playerCard.className = 'player-card';

  const playerImg = document.createElement('img');
  playerImg.className = 'player-img';
  playerImg.setAttribute('src', item.img);
  playerImg.setAttribute('alt', item.singer);

  const playerBtm = document.createElement('div');
  playerBtm.className = 'player-btm';
  const playBtn = document.createElement('img');
  playBtn.className = 'play';
  !playBtn.classList.contains('pause') ? playBtn.setAttribute('src', play) : playBtn.setAttribute('src', pauseBtn);
  playBtn.setAttribute('alt', 'play_button');
  const songDesription = document.createElement('div');
  songDesription.className = 'song-desription';
  const singer = document.createElement('h2');
  singer.className = 'singer';
  singer.textContent = item.singer;
  const song = document.createElement('p');
  song.className = 'song';
  song.textContent = item.title;
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

  songDesription.append(singer);
  songDesription.append(song);
  btnWrapper.append(prevBtn);
  btnWrapper.append(nextBtn);
  playerBtm.append(playBtn);
  playerBtm.append(songDesription);
  playerBtm.append(btnWrapper);
  playerCard.append(playerImg);
  playerCard.append(playerBtm);
  body.append(playerCard);
});
