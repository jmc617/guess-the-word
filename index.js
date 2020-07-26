const easyBtn = document.querySelectorAll('.easy-btn');
const medBtn = document.querySelectorAll('.med-btn');
const hardBtn = document.querySelectorAll('.hard-btn');
const wordDisplay = document.querySelectorAll('.word-display');
const keyboardWrapper = document.querySelector('#keyboard-wrapper');
const usedLtrs = document.querySelector('#used-ltrs');
const chancesLeft = document.querySelector('#chances-left');
const prize = document.querySelector('#prize');
const prizeWon = document.querySelector('#prize-won');
const wordInput = document.querySelector('#word-input');
const wordSubmit = document.querySelector('#word-submit');

//difficulty levels for randomwords. Sort words into word list by length?
const easy = {level: 'easy', numOfLtrs: 5};
const medium = {level:'medium', numOfLtrs: 7};
const hard = {level:'hard', numOfLtrs: 9};
//number of random words to pull from API
arraySize = 500
//array that holds word list pulled from API
let wordArray = []
//random word
let word = ''

let displayWord = ''
//word converted to dashes
let dashedWord = []
//player chances
let chances = 6

let usedLtrsArray = []
//prize to be earned for current word,earned total,prize array for random selection
prizeWon.innerHTML = 0
const prizeArray = [100,200,300,400,500,600,700,800,900,50,90]

function randomPrize () {
  const randomPrizeNum = (Math.floor(Math.random()*10));
  prize.innerHTML = prizeArray[randomPrizeNum]
}
// random number for choosing words
function randomNumGenerator(){
  return (Math.floor(Math.random()*wordArray.length));
}
const randomNum = randomNumGenerator()

function dash(word){
  dashedWord = []
  const letters = word.split('')
  console.log(letters)
  letters.forEach( ()=> { dashedWord.push("-")});
  // for (let i = 0; i < letters.length; i++) {
  //     dashedWord.push("-")
  //   }
  }

function showWord() {
  displayWord = dashedWord.join('')
  
  for (let i = 0; i < wordDisplay.length; i++) {
    wordDisplay[i].innerHTML = displayWord 
  }
}

function newGame () {
  word = wordArray[randomNumGenerator()]
  console.log(word);
  chances = 6
  usedLtrsArray = []
  usedLtrs.innerHTML = ''
  dashedWord = []
  dash(word)
  showWord()
  randomPrize()
  

}

function playGame() {

  word = wordArray[randomNum] 
  //display random word as dashes
  dash(word)

  chancesLeft.innerHTML = chances

  prizeWon.innerHTML = 0

  showWord()

  randomPrize()

  // keyboard functionality
  const alphabet = (['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'])

  //keeps the keyboard from duplicating when difficulty selected
  keyboardWrapper.innerHTML = ''

  for (var i = 0; i < alphabet.length; i++) {
      const key = document.createElement('div')
      key.style.width = '20px'
      key.style.height = '20px'
      key.style.display = 'inline-block'
      key.classList.add('keys')
      key.innerHTML = alphabet[i]
      keyboardWrapper.appendChild(key)

      var boxes = document.getElementsByClassName('keys')

    
      boxes[i].addEventListener('click', function(event){
        
        const guess = event.target.innerHTML
        //if guessed letter doesn't match and has not been used before take away a chance and letter to used letters
        if (word.split('').indexOf(guess) < 0 && usedLtrsArray.indexOf(guess) < 0) {
          chances = chances--
          chancesLeft.innerHTML = chances
          usedLtrsArray.push(guess)
          usedLtrs.innerHTML += guess

          if (chances === 0) {
            alert(`Game Over! The word was "${word}". Final Score: ${prizeWon.innerHTML}. Click OK to play again`)
            prizeWon.innerHTML = 0
            newGame()
            }
        } 
        //replace correct guesses in display
        for (let i = 0; i <word.split('').length; i++) {
          if (event.target.innerHTML == word.split('')[i]) {
            dashedWord.splice(i,1,event.target.innerHTML);
            showWord()
            //alert triggers before last letter is replaced
            if (word == displayWord) {
              prizeWon.innerHTML = ((parseInt(prizeWon.innerText)) + (parseInt(prize.innerText)))
              alert(`Good Job! The word was "${word}". Current Score: ${prizeWon.innerHTML}`)
              newGame()
            }
          }
        }            
      })
    }
  }

function loadGame(difficulty) {
// //prevents CORS error
const proxyurl = "https://cors-anywhere.herokuapp.com/";

//random word list url with word count
const url = `https://random-word-api.herokuapp.com/word?number=${arraySize}`
  

fetch(proxyurl + url)
.then(function(response) {
  return response.json()
})
.then(apiArray => {
  console.log(apiArray);
  console.log(difficulty);
  if (difficulty.level === 'hard') {
    wordArray = apiArray.filter(word => word.length < difficulty.numOfLtrs && word.length >= medium.numOfLtrs );
    console.log(wordArray);
  } else if (difficulty.level === 'medium') {
    wordArray = apiArray.filter(word => word.length < difficulty.numOfLtrs && word.length >= easy.numOfLtrs );
    console.log(wordArray);
  } else {
    wordArray = apiArray.filter(word => word.length <= difficulty.numOfLtrs && word.length >= 1 );
    console.log(wordArray);
  }

  // const wordList = text.split(',')
  // console.log(wordList);
  // wordArray = wordList.slice()
  // console.log(wordArray)
  playGame()
})
.catch(error => console.log(error))
}

//loops in case other difficulty buttons need to be added (consolidate into one loop when possible)
for (let i = 0; i < easyBtn.length; i++) {
  easyBtn[i].addEventListener('click', function(){
    //if game already in progress confirm before starting new game with new difficulty
    if ( wordArray.length != 0 ) {
      if (confirm("Start over with selected difficulty?")) {
        loadGame(easy);
      }
    } else {
      loadGame(easy);
    }    
  })
}
for (let i = 0; i < medBtn.length; i++) {
  medBtn[i].addEventListener('click', function(){
    if ( wordArray.length != 0 ) {
      if (confirm("Start over with selected difficulty?")) {
        loadGame(medium);
      }
    } else {
      loadGame(medium);
    }
  })
}
for (let i = 0; i < hardBtn.length; i++) {
  hardBtn[i].addEventListener('click', function(){
    if ( wordArray.length != 0 ) {
      if (confirm("Start over with selected difficulty?")) {
        loadGame(hard);
      }
    } else {
      loadGame(hard);
    }
  })
}
//word submit
wordSubmit.addEventListener('click',function(){
  if (wordInput.value == word){
    prizeWon.innerHTML = ((parseInt(prizeWon.innerText)) + (parseInt(prize.innerText)))
    alert(`Good Job! The word was "${word}". Current Score: ${prizeWon.innerHTML}`)
    wordInput.value = ''
    newGame()
  } else {
      chances = (chances-1)
      chancesLeft.innerHTML = chances
      alert('Try again!')

      if (chances === 0) {
          alert(`Game Over! The word was "${word}". Final Score: ${prizeWon.innerHTML}. Click OK to play again`)
          prizeWon.innerHTML = 0
          chances = 6
          newGame()
      } 
    }
  })

