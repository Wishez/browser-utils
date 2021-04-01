!function(factory){var registeredInModuleLoader;if("function"==typeof define&&define.amd&&(define(factory),registeredInModuleLoader=!0),"object"==typeof exports&&(module.exports=factory(),registeredInModuleLoader=!0),!registeredInModuleLoader){var OldCookies=window.Cookies,api=window.Cookies=factory();api.noConflict=function(){return window.Cookies=OldCookies,api}}}((function(){function extend(){for(var i=0,result={};i<arguments.length;i++){var attributes=arguments[i];for(var key in attributes)result[key]=attributes[key]}return result}function decode(s){return s.replace(/(%[0-9A-Z]{2})+/g,decodeURIComponent)}function init(converter){function api(){}function set(key,value,attributes){if("undefined"!=typeof document){"number"==typeof(attributes=extend({path:"/"},api.defaults,attributes)).expires&&(attributes.expires=new Date(1*new Date+864e5*attributes.expires)),attributes.expires=attributes.expires?attributes.expires.toUTCString():"";try{var result=JSON.stringify(value);/^[\{\[]/.test(result)&&(value=result)}catch(e){}value=converter.write?converter.write(value,key):encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),key=encodeURIComponent(String(key)).replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent).replace(/[\(\)]/g,escape);var stringifiedAttributes="";for(var attributeName in attributes)attributes[attributeName]&&(stringifiedAttributes+="; "+attributeName,!0!==attributes[attributeName]&&(stringifiedAttributes+="="+attributes[attributeName].split(";")[0]));return document.cookie=key+"="+value+stringifiedAttributes}}function get(key,json){if("undefined"!=typeof document){for(var jar={},cookies=document.cookie?document.cookie.split("; "):[],i=0;i<cookies.length;i++){var parts=cookies[i].split("="),cookie=parts.slice(1).join("=");json||'"'!==cookie.charAt(0)||(cookie=cookie.slice(1,-1));try{var name=decode(parts[0]);if(cookie=(converter.read||converter)(cookie,name)||decode(cookie),json)try{cookie=JSON.parse(cookie)}catch(e){}if(jar[name]=cookie,key===name)break}catch(e){}}return key?jar[key]:jar}}return api.set=set,api.get=function(key){return get(key,!1)},api.getJSON=function(key){return get(key,!0)},api.remove=function(key,attributes){set(key,"",extend(attributes,{expires:-1}))},api.defaults={},api.withConverter=init,api}return init((function(){}))}));

const bindKey = (keyNumber, callback) => {
  window.addEventListener('keydown', (event) => {
    const { altKey, keyCode } = event
    if (altKey && keyCode === keyNumber) {
      setTimeout(() => callback(event), 1)
    }
  })
}

window.addEventListener('load', () => {
  bindKey(84, ({ path }) => fixFieldValue(path[0]))
  bindKey(65, () => setAccessToken())
  bindKey(222, () => clipboardQuotes())
  if (window.location.href.includes('telegram.org')) {
    highlightTelegramTopics()
    setInterval(highlightTelegramTopics, 3000)
  }
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
const tokenPayload = {
  "sub": "79109021752",
  "firstName": "Катя ",
  "lastName": "Катя",
  "iss": "https://agro-it.team",
  "fullName": "Катя  Катя",
  "display_name": "Катя  Катя",
  "exp": 1615780800,
  "first_name": "Катя ",
  "family_name": "Катя",
  "iat": 1614937115,
  "jti": "2f70264b-2ce0-40a5-bc81-43f38f2397cb",
  "email": "shiningfinger@list.ru",
  "organizationName": "ИП Кровавый Коммандос",
  "organizationInn": "2281488322"
}
function setAccessToken() {
  Cookies.set('access_token', 'eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI3OTE5ODk0MTIwMyIsImZpcnN0TmFtZSI6ItCk0LjQuyIsImxhc3ROYW1lIjoi0JbRg9GA0LDQstC70ZHQsiIsImlzcyI6Imh0dHBzOlwvXC9hZ3JvLWl0LnRlYW0iLCJmdWxsTmFtZSI6ItCk0LjQuyDQktC70LDQtNC40LzQuNGA0L7QstC40Ycg0JbRg9GA0LDQstC70ZHQsiIsIm1pZGRsZU5hbWUiOiLQktC70LDQtNC40LzQuNGA0L7QstC40YciLCJkaXNwbGF5X25hbWUiOiLQpNC40Lsg0JLQu9Cw0LTQuNC80LjRgNC-0LLQuNGHINCW0YPRgNCw0LLQu9GR0LIiLCJleHAiOjE2MTU5NTM2MDAsImZpcnN0X25hbWUiOiLQpNC40LsiLCJmYW1pbHlfbmFtZSI6ItCW0YPRgNCw0LLQu9GR0LIiLCJpYXQiOjE2MTUxNDAzOTgsImp0aSI6IjAyMTU3MTRmLTNmZjgtNDk4YS04MjAxLTM3YmFhODhlMGI2ZCJ9.Ngpg8EwO0ALVH5YxL6aP70A1PAGdr_QA7F7czUp8e5JK_qsKOTiKZCABPbool00H5xf683qwJQF7zfLXj8G1yM1DtBEDP7YkiXLhDP1rHxM_MT9qiyDhxqKb0DpJg4AS1ByQ2SKfa9FWl2DLMxFgoiZzY8U3wIWUW8bGMikErWJDdgO6aVKkBX0rvg0_06rytYENO0E-uUv7RMr8RU-KxQhInu4-tXwWkrG29qHtZ6-ZnuMaWmvqFPzQSns6Qtu1oDrK1qfepXpzXQvGB635sCrwWnG-uohPtaBjUwWPlgVsCE-cGd8hVwkTI1CmKTpLTt9jojqUBJfATzYGmWTXTA')
}

function clipboardQuotes() {
  navigator.clipboard.writeText("«»").then(
    () => console.log('Добавил кавычки-ёлочки в буффер:)'),
    (err) => console.error('Не получилось добавить кавычки в буффер: ', err)
  );
}

const topicsToHighlight = ['лига', 'liga', 'agro', 'маркет', 'Evgen', 'Kitty', 'Aziz', 'Дмитр', 'Виталий', 'Олег', 'Дима', 'Дашка', 'Ваня', 'Петя', 'Рус', 'Ревью']
function highlightTelegramTopics() {
  document.querySelectorAll('.im_dialog_peer').forEach((topic) => {
    const topicText = topic.textContent.trim().toLowerCase()
    if (topicsToHighlight.some(text => topicText.includes(text))) {
      topic.closest('.im_dialog_wrap').style = 'background-color: rgb(224 235 255)'
    }
  })
}