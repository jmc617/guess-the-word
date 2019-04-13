//HTML elements
const easyBtn = document.getElementsByClassName('easy-btn')
const medBtn = document.getElementsByClassName('med-btn')
const hardBtn = document.getElementsByClassName('hard-btn')
const wordDisplay = document.getElementsByClassName('word-display')

//difficulty levels
const easy = 1
const medium = 5
const hard = 10

//array that holds word list pulled from API
let wordArray = []

// random number for choosing words
function randomNumGenerator(){
  return (Math.floor(Math.random()*100));
}
const randomNum = randomNumGenerator()
//word converted to dashes
let dashedWord = []

function dash(word){
  const letters = word.split('')
  console.log(letters)
  for (let i = 0; i < letters.length; i++) {
      dashedWord.push("_")
    }
  }

function playGame() {
  //player chances
  let chances = 6
  //random word
  const word = wordArray[randomNum] 
  //display random word as dashes
  dash(word)
  
  const displayWord = dashedWord.join('')

  for (let i = 0; i < wordDisplay.length; i++) {
    console.log(displayWord)
    wordDisplay[i].innerHTML = displayWord 
  }
}

function loadGame(difficulty) {
//prevents CORS error
const proxyurl = "https://cors-anywhere.herokuapp.com/";
//URL with difficulty,length,and count added
const url = `http://app.linkedin-reach.io/words?difficulty=${difficulty}&minLength=3&maxLength=8&count=100`; 
  
fetch(proxyurl + url)
.then(function(response) {
  return response.text()
})
.then(text => {
  console.log(text); 
  const wordList = text.split('\n')
  wordArray = wordList.slice()
  console.log(wordArray)
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

// // html vars

//REPLAVE VAR WITH CONST/LET
// const guessNum = document.getElementById('guess-num')
// const wordDash = document.getElementById('word-dash')
// const wordInput = document.getElementById('word-input')
// var wordSubmit = document.getElementById('word-submit')
// var newWordBtn = document.getElementById('new-word-btn')
// var usedLtrs = document.getElementById('used-ltrs')
// var keyboardWrapper = document.getElementById('keyboard-wrapper')
// var prize = document.getElementById('prize')
// var prizeWon = document.getElementById('prizewon')
// var cluebtn = document.getElementById('cluebtn')
// var modal1 = document.getElementById('modal1')
// var m1CloseBtn = document.getElementById('m1-closebtn')
// var rulesBtn = document.getElementById('rules-btn')
// var m1Heading = document.getElementById('m1-heading')
// var m1para = document.getElementById('m1-para')
// var p1 = document.getElementById('p1')
// var p2 = document.getElementById('p2')
// var p3 = document.getElementById('p3')
// var m2CloseBtn = document.getElementById('m2-closebtn')
// //hello/rules modal
// function openModal1() {
//   setTimeout(function() {
//     modal1.style.display = "block";
//   }, 1000);
// }
// openModal1()
// // close modal buttons
// m1CloseBtn.addEventListener('click', function(){
//   modal1.style.display = 'none'
// })
// m2CloseBtn.addEventListener('click', function(){
//   modal2.style.display = 'none'
// })
// // opens modal with only rules
// rulesBtn.addEventListener('click', function() {
//     modal1.style.display = "block";
//     m1Heading.style.display = 'none';
// })
// // opens modal with try again
// function tryAgainModal(){
//   modal2.style.display = 'block';
// }
// // refresh button event listener
// newWordBtn.addEventListener('click', refresh)
// // chances
// var chances = 6
// guessNum.innerHTML = chances



// var prizeArray = [100,200,300,400,500,600,700,800,900,50,90]


// // random number for choosing word/clues
// function randomNumGenerator(){
//   return (Math.floor(Math.random()*1000));
// }
// const randomNum = randomNumGenerator()

// function randomPrizeNumGenerator(){
//   return (Math.floor(Math.random()*10));
// }
//const randomPrizeNum = randomPrizeNumGenerator()

// //random prize amount from array pushed into div
// const prizeChosen = prizeArray[randomPrizeNum]
// prize.innerHTML = parseInt(prizeChosen)
// prizeWon.innerHTML = 0

// // word split into arrays for dash word and comparison
// var splitWord = (wordArray[randomNum].split(''));
// var splitWordCompare = (wordArray[randomNum].split(''));

// // replaces letters with underscore and puts in div
// function dash(){
//     for (let i = 0; i < splitWord.length; i++) {
//       splitWord.splice(i,1,"_")
//       wordDash.innerHTML = splitWord.join('')
//     }
//   }
// dash()

// // refresh page with new word CHANGE TO CHOOSE ESAY/MEDIUM/HARD AGAIN
// function refresh(){
//   guessNum.innerHTML = chances
//   usedLtrs.innerHTML = ''
//   // refresh new prize
//   prizeChosen = prizeArray[randomNum]
//   prize.innerHTML = parseInt(prizeChosen)

      //DELETE DUPLICATE RANDOM NUM
//   function random(){
//     return (Math.floor(Math.random()*10))
//   }
//   randomNum = random()

//   // word split into array for comparison
//   splitWord = (wordArray[randomNum].split(''));
//   splitWordCompare = (wordArray[randomNum].split(''));


//   // replaces letters
//   function dash(){
//       for (let i = 0; i < splitWord.length; i++) {
//         splitWord.splice(i,1,"_")
//         wordDash.innerHTML = splitWord.join('')
//       }
//     }
//     dash()
//   }
// // keyboard start
// var alphabet = (['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'])

// for (var i = 0; i < alphabet.length; i++) {
//   var key = document.createElement('div')
//   key.style.width = '20px'
//   key.style.height = '20px'
//   key.style.display = 'inline-block'
//   key.classList.add('keys')
//   key.innerHTML = alphabet[i]
//   keyboardWrapper.appendChild(key)
//   var boxes = document.getElementsByClassName('keys')
// WRITE FUNCTION TO CHECK IF LETTER INCORRECT AND UNIQYUE TO USED INCORRECT LETTERS ARRAY
//   boxes[i].addEventListener('click', function(event){
//     usedLtrs.innerHTML += event.target.innerHTML;
//     if (splitWordCompare.indexOf(event.target.innerHTML) < 0) {
//       chances = (chances-1)
//       guessNum.innerHTML =  chances
        //PUT USED LETTERS INJECTION HERE SO ONLY INCORRECT LETTERS ARE ADDED...also check for duplicates

//       if (parseInt(guessNum.innerText) == 0) {
//         alert('Game Over! Final Score: '+prizewon.innerHTML+'. Click OK to play again')
//         prizeWon.innerHTML = 0
//         chances = 5
//         refresh()
//         }
//       }
//     for (var i = 0; i <splitWordCompare.length; i++) {
//       if (event.target.innerHTML == splitWordCompare[i]) {
//         splitWord.splice(i,1,event.target.innerHTML);
//         wordDash.innerHTML = splitWord.join('')

//           if (wordDash.innerHTML == splitWordCompare.join('')) {
//             prizeWon.innerHTML = ((parseInt(prizeWon.innerText)) + (parseInt(prize.innerText)))
//             alert('Good Job! Current Score: '+prizewon.innerHTML);
//             refresh()
//           }
//         }
//       }
//     })
//   }
// //word submit
// wordSubmit.addEventListener('click',function(){
//   if (wordInput.value == splitWordCompare.join('')){
//     prizeWon.innerHTML = ((parseInt(prizeWon.innerText)) + (parseInt(prize.innerText)))
//     alert('Good Job! Current Score: '+prizewon.innerHTML)
//     refresh()
//     wordInput.value = ''
//   } else {
//       chances = (chances-1)
//       guessNum.innerHTML = chances

//       if (parseInt(guessNum.innerText) == 0) {
//           alert('Game Over! Final Score: '+prizewon.innerHTML+'. Click OK to play again')
//           prizeWon.innerHTML = 0
//           chances = 5
//           refresh()
//         } else {
//           tryAgainModal()
//         }
//       }
//     })

