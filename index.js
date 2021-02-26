
window.addEventListener('load', () => {
  window.addEventListener('keydown', (event) => {
    const { altKey, keyCode, path } = event
    if (altKey && keyCode === 84) {
      setTimeout(() => fixFieldValue(path[0]), 1);
    }
  })
})

function fixFieldValue($targetElement) {
  const inputValue = $targetElement.value
  const value = inputValue || $targetElement.innerText
  const fixedText = getFixedText(value, /[а-я]/ig.test(value))

  if (inputValue) {
    $targetElement.value = fixedText
  } else {
    const isAllowChangeContent = confirm('I\'m not sure that\'s righ place to fix wrong words. Are you sure?🤔')
    if (isAllowChangeContent) {
      $targetElement.innerHTML = fixedText
    }
  }
}

const Alphabets = {
  EN: {
    "q": 'й',
    "w": 'ц',
    "e": 'у',
    "r": 'к',
    "t": 'е',
    "y": 'н',
    "u": 'г',
    "i": 'ш',
    "o": 'щ',
    "p": 'з',
    "[": 'х',
    "]": 'ъ',
    "a": 'ф',
    "s": 'ы',
    "d": 'в',
    "f": 'а',
    "g": 'п',
    "h": 'р',
    "j": 'о',
    "k": 'л',
    "l": 'д',
    ";": 'ж',
    "'": 'э',
    "z": 'я',
    "x": 'ч',
    "c": 'с',
    "v": 'м',
    "b": 'и',
    "n": 'т',
    "m": 'ь',
    ",": 'б',
    ".": 'ю',
    "`": 'ё'
  },
  RU: {},
}

for (const keyValuePair of Object.entries(Alphabets.EN)) {
  const [value, key] = keyValuePair
  Alphabets.RU[key] = value
}

function getFixedText(characters, isRussianLanguage) {
  let translateLanguage = 'EN'
  let charUppercaseRegexp = /[A-Z]/
  if (isRussianLanguage) {
    translateLanguage = 'RU'
    charUppercaseRegexp = /[А-Я]/
  }
  
  let fixedString = ''
  for (const char of characters) {
    const isUppercase = charUppercaseRegexp.test(char)
    const fixedChar = Alphabets[translateLanguage][char.toLowerCase()] || char
    fixedString += isUppercase ? fixedChar.toUpperCase() : fixedChar
  }

  return fixedString
}