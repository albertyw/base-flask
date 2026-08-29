const keyHistory: string[] = [];

const navigationOptions: Record<string, string> = {};
const navigationOptionsText: Record<string, string> = {};
function generateNavigationOptions() {
  const links = document.querySelectorAll('.navbar a');
  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    const href = link.getAttribute('href');
    const text = link.textContent ?? '';
    const letter = findUnusedLetter(text, Object.keys(navigationOptions));
    if (letter === undefined || href === null) {
      continue;
    }
    navigationOptions[letter] = href;
    navigationOptionsText[text] = letter;
  }
}
function findUnusedLetter(text: string, usedLetters: string[]): string | undefined {
  for (let i = 0; i < text.length; i++) {
    const letter = text[i].toLowerCase();
    if (!usedLetters.includes(letter)) {
      return letter;
    }
  }
  return undefined;
}

function findLetterIndex(text: string, letter: string): number {
  for (let i = 0; i < text.length; i++) {
    if (text[i].toLowerCase() === letter) {
      return i;
    }
  }
  return -1;
}

// Link labels are rebuilt out of text nodes rather than by round-tripping
// innerHTML, so a label sourced from data can never be parsed as markup.
function underlineText() {
  const links = document.querySelectorAll('.navbar a');
  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    const text = link.textContent ?? '';
    const letter = navigationOptionsText[text];
    if (letter === undefined) {
      continue;
    }
    const index = findLetterIndex(text, letter);
    if (index === -1) {
      continue;
    }
    const underline = document.createElement('u');
    underline.textContent = text[index];
    link.textContent = '';
    link.appendChild(document.createTextNode(text.slice(0, index)));
    link.appendChild(underline);
    link.appendChild(document.createTextNode(text.slice(index + 1)));
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
