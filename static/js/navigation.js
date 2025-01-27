const keyHistory = [];

const navigationOptions = {};
const navigationOptionsText = {};
function generateNavigationOptions() {
  const links = document.querySelectorAll('.navbar a');
  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    const href = link.getAttribute('href');
    const text = link.innerHTML;
    const letter = findUnusedLetter(text, Object.keys(navigationOptions));
    if (letter === undefined) {
      continue;
    }
    navigationOptions[letter] = href;
    navigationOptionsText[text] = letter;
  }
}
function findUnusedLetter(text, usedLetters) {
  for (let i = 0; i < text.length; i++) {
    const letter = text[i].toLowerCase();
    if (!usedLetters.includes(letter)) {
      return letter;
    }
  }
  return undefined;
}

function underlineText() {
  const links = document.querySelectorAll('.navbar a');
  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    const letter = navigationOptionsText[link.innerHTML];
    let text = link.innerHTML;
    for (let j = 0; j < text.length; j++) {
      if (text[j].toLowerCase() === letter) {
        text = text.replace(text[j], '<u>' + text[j] + '</u>');
        break;
      }
    }
    link.innerHTML = text;
  }
}

function processKeyHistory() {
  if (keyHistory[0] !== 'g') {
    keyHistory.length = 0;
    return;
  }
  if (keyHistory.length < 2) {
    underlineText();
    return;
  }
  const action = keyHistory[1];
  keyHistory.length = 0;
  const navLocation = navigationOptions[action];
  if (navLocation !== undefined) {
    window.location.href = navLocation;
    return;
  }
}

export function watchKeyboardEvents() {
  generateNavigationOptions();
  window.addEventListener('keyup', (event) => {
    keyHistory.push(event.key);
    processKeyHistory();
  });
}

export function navbarBold() {
  const currentPage = window.location.pathname;
  for (const link of document.getElementsByClassName('nav-link')) {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  }
}
