import state from "./state";

export default function setLocalStorage() {
  localStorage.setItem('isPlay', state.isPlay);
}

window.addEventListener('beforeunload', setLocalStorage);