// Define your CSS styles as a string
const observeStyles = `
[data-observe="up"] .phrase, [data-observe="down"] .phrase {
  visibility: hidden;
}

[data-observe].in-viewport .phrase {
  visibility: visible;
}

[data-observe] .phrase .space {
  margin-left: .35em;
}

[data-observe] .phrase .word {
  overflow: hidden;
  display: inline-block;
  line-height: initial;
}

[data-observe] .phrase .word .char {
  display: inline-block;
  line-height: initial;
}

[data-observe="up"] .phrase .word .char {
  transform: translateY(100%);
}

[data-observe="down"] .phrase .word .char {
  transform: translateY(-100%);
}

[data-observe="fade-opacity"] .phrase .word .char {
  opacity: .2;
}

.in-viewport[data-observe="up"] .phrase .word .char {
  animation: fade-up calc(.3s * var(--char-vitess)) cubic-bezier(0.25, 0, 0.7, 1) forwards calc(10ms * var(--char-index) * var(--char-vitess));
}


.in-viewport[data-observe="down"] .phrase .word .char {
  animation: fade-down calc(.3s * var(--char-vitess)) cubic-bezier(0.25, 0, 0.7, 1) forwards calc(10ms * var(--char-index) * var(--char-vitess));

}

.in-viewport[data-observe="fade-opacity"] .phrase .word .char {
  animation: fade-opacity calc(.3s * var(--char-vitess)) cubic-bezier(0.25, 0, 0.7, 1) forwards calc(30ms * var(--char-index) * var(--char-vitess));

}

[data-observe] .hidden {
  display: none !important;
}


@keyframes fade-up {
  from {
    transform: translateY(100%);
    opacity: 0;
  }


  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes fade-down {
  from {
    transform: translateY(-110%);
    opacity: 0;
  }


  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes fade-opacity {
  from {
    opacity: 0.2;
  }

  to {
    opacity: 1;
  }
}
`;

// Create a <style> element and inject the CSS styles
const styleElement = document.createElement('style');
styleElement.textContent = observeStyles;
document.head.appendChild(styleElement);

const observeElements = document.querySelectorAll(`[data-observe]`);
const root = document.documentElement;
let charIndex = 0;



// Call the initial function

document.addEventListener("DOMContentLoaded", function () {

  splitPhraseToWords(observeElements);

})

const observer = new IntersectionObserver(handleIntersection, {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
});

observeElements.forEach(observeElement => observer.observe(observeElement));

function handleIntersection(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-viewport');
    } else if (entry.target.getAttribute('data-observe-forwards') === 'true') {
      entry.target.classList.remove('in-viewport');
    }
  });
}


function splitPhraseToWords(elements) {
  elements.forEach(element => {
    const words = element.innerText.split(" ");
    splitWordToSpans(words, element);
    charIndex_set(0); // initial char-index
  });
}

function splitWordToSpans(words, element) {
  const phrase = document.createElement("span");
  phrase.classList.add('phrase');
  phrase.setAttribute('aria-hidden', 'true');
  let vitess = element.getAttribute('data-observe-vitess') ?? 1;
  vitess = vitess <= 0 ? .5 : (vitess > 3 ? 3 : vitess); // keep the vitess value between 1 and 4

  words.forEach((word, index) => {
    const spanElement = document.createElement("span");
    spanElement.textContent = word;
    spanElement.classList.add('word');
    spanElement.dataset.index = index;

    if (index) {
      const spaceElement = document.createElement("span");
      spaceElement.textContent = '';
      spaceElement.classList.add('space');
      phrase.appendChild(spaceElement);
    }

    phrase.appendChild(splitWordToCharacters(spanElement, vitess));
  });

  const hiddenPhraseSpan = document.createElement('span');
  hiddenPhraseSpan.textContent = element.innerText;
  hiddenPhraseSpan.classList.add('hidden', 'seo-text');

  element.innerHTML = '';
  element.appendChild(hiddenPhraseSpan);
  element.appendChild(phrase);
}

function splitWordToCharacters(word, vitess) {
  const text = word.innerText;
  word.innerHTML = '';

  for (let i = 0; i < text.length; i++) {
    charIndex_set();
    const char = text[i];
    const charSpan = document.createElement('span');
    charSpan.classList.add('char');
    charSpan.textContent = char;
    charSpan.style = `--char-index: ${parseInt(charIndex_get())};
    --char-vitess: ${vitess};`;

    word.appendChild(charSpan);
  }

  return word;
}

function charIndex_get() {
  const rs = getComputedStyle(root);
  return rs.getPropertyValue('--char-index');
}

function charIndex_set(initialIndex) {
  charIndex = initialIndex ?? charIndex;
  root.style.setProperty('--char-index', charIndex);
  charIndex++;
}


