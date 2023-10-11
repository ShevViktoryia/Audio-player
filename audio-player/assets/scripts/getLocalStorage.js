import state from "./state";

export default function getLocalStorage() {
  if(localStorage.getItem('isPlay')) {
    state.isPlay = localStorage.getItem('isPlay');
  }
}

window.addEventListener('load', getLocalStorage);