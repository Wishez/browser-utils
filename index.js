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

function setAccessToken() {
  Cookies.set('access_token', 'eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI3OTEwOTAyMTc1MiIsImZpcnN0TmFtZSI6ItCV0LrQsNGC0LXRgNC40L3QsCIsImxhc3ROYW1lIjoi0JrQsNC70LjQvdC40L3QsCIsImlzcyI6Imh0dHBzOlwvXC9hZ3JvLWl0LnRlYW0iLCJmdWxsTmFtZSI6ItCV0LrQsNGC0LXRgNC40L3QsCDQm9C10L7QvdC40LTQvtCy0L3QsCDQmtCw0LvQuNC90LjQvdCwIiwibWlkZGxlTmFtZSI6ItCb0LXQvtC90LjQtNC-0LLQvdCwIiwiZGlzcGxheV9uYW1lIjoi0JXQutCw0YLQtdGA0LjQvdCwINCb0LXQvtC90LjQtNC-0LLQvdCwINCa0LDQu9C40L3QuNC90LAiLCJleHAiOjE2MTUwMDMyMDAsImZpcnN0X25hbWUiOiLQldC60LDRgtC10YDQuNC90LAiLCJmYW1pbHlfbmFtZSI6ItCa0LDQu9C40L3QuNC90LAiLCJpYXQiOjE2MTQxNjgwMDgsImp0aSI6IjljMjIyMjcxLWQzZTUtNGFkZS1iYzYwLTI1MmY5NDhiMjAxNSJ9.U-cWia3JHtvXGTs4DpBKGzzHEMpaqip5Yi_nRLdJtw-RN-xcsCqMTOxTD6SO8Yl8YgjX3ylQziIdgVYho2DkYMALBokfcvgjZs7bbwTwe6WALSN9x6BlpSmOXL1Jo1MqI2XOX7l2yUvaGnF5MQxGS2lSx1R_mtADrsANz_0Foi-r35p2f0MMN6avEXoDfZuYIaV4PMllBQzEX_RECp3-ZPplac3qI9HKyOr8l4FR2RyySpW-p0WPA2ASq8kvmns2F3xdQtWymr3ND_OHV0KYW2WApwJBSroeR3Ecdf65u1n-sDnJh0oDWVFdhtnVoHCETMEhatL5uuVg_mfG158EcQ')
}

function clipboardQuotes() {
  navigator.clipboard.writeText("«»").then(
    () => console.log('Добавил кавычки-ёлочки в буффер:)'),
    (err) => console.error('Не получилось добавить кавычки в буффер: ', err)
  );
}