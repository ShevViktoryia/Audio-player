import firstImage from '../img/lemonade.png';
import firstSong from '../audio/beyonce.mp3';
import secondImage from '../img/dontstartnow.png';
import secondSong from '../audio/dontstartnow.mp3';

const playList = [
  {
    id: 0,
    singer: 'Beyonce',
    title: 'Don\'t hurt yourself',
    img: firstImage,
    src: firstSong,
    duration: '03:53'
  },
  {
    id: 1,
    singer: 'Dua Lipa',
    title: 'Don\'t start now',
    img: secondImage,
    src: secondSong,
    duration: '03:23'
  }
]

export default playList;