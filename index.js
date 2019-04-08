// html vars
var guessNum = document.getElementById('guess-num')
var clue = document.getElementById('clue')
var wordDash = document.getElementById('word-dash')
var wordInput = document.getElementById('word-input')
var wordSubmit = document.getElementById('word-submit')
var newWordBtn = document.getElementById('new-word-btn')
var usedLtrs = document.getElementById('used-ltrs')
var keyboardWrapper = document.getElementById('keyboard-wrapper')
var prize = document.getElementById('prize')
var prizeWon = document.getElementById('prizewon')
var cluebtn = document.getElementById('cluebtn')
var modal1 = document.getElementById('modal1')
var m1CloseBtn = document.getElementById('m1-closebtn')
var rulesBtn = document.getElementById('rules-btn')
var m1Heading = document.getElementById('m1-heading')
var m1para = document.getElementById('m1-para')
var p1 = document.getElementById('p1')
var p2 = document.getElementById('p2')
var p3 = document.getElementById('p3')
var m2CloseBtn = document.getElementById('m2-closebtn')
//hello/rules modal
function openModal1() {
  setTimeout(function() {
    modal1.style.display = "block";
  }, 1000);
}
openModal1()
// close modal buttons
m1CloseBtn.addEventListener('click', function(){
  modal1.style.display = 'none'
})
m2CloseBtn.addEventListener('click', function(){
  modal2.style.display = 'none'
})
// opens modal with only rules
rulesBtn.addEventListener('click', function() {
    modal1.style.display = "block";
    m1Heading.style.display = 'none';
})
// opens modal with try again
function tryAgainModal(){
  modal2.style.display = 'block';
}
// refresh button event listener
newWordBtn.addEventListener('click', refresh)
// chances
var chances = 5
guessNum.innerHTML = chances
// word/hints/prize
var wordArray = []
var hintArray = []
var prizeArray = [100,200,300,400,500,600,700,800,900,50,90]

function Word (word,hint){
  wordArray.push(word)
  hintArray.push(hint)
}

var one = new Word('hello','greeting')
var two = new Word('goodbye','leaving message')
var three = new Word('shoe','wear on feet')
var four = new Word('water','what rain is made of')
var five = new Word('ice','frozen water')
var six = new Word('cat','goes \"meow\"')
var seven = new Word('dog','goes \"woof\"')
var eight = new Word('jessica','creator\'s name')
var nine = new Word('food','what you eat')
var ten = new Word('zero','first index number of array')

// random number for choosing word/clues
function random(){
  return (Math.floor(Math.random()*10));
}
var randomNum = random()
//random prize amount from array pushed into div
var prizeChosen = prizeArray[randomNum]
prize.innerHTML = parseInt(prizeChosen)
prizeWon.innerHTML = 0

// word split into arrays for dash word and comparison
var splitWord = (wordArray[randomNum].split(''));
var splitWordCompare = (wordArray[randomNum].split(''));

// replaces letters with underscore and puts in div
function dash(){
    for (let i = 0; i < splitWord.length; i++) {
      splitWord.splice(i,1,"_")
      wordDash.innerHTML = splitWord.join('')
    }
  }
dash()
// clue button function
cluebtn.addEventListener('click', function(){
  if (parseInt(guessNum.innerText) > 1) {
    clue.innerHTML = hintArray[randomNum]
    chances = (chances-1)
    guessNum.innerHTML = chances
  } else {
    alert('only 1 life left!')
  }
})

// refresh page with new word
function refresh(){
  guessNum.innerHTML = chances
  usedLtrs.innerHTML = ''
  // refresh new prize
  prizeChosen = prizeArray[randomNum]
  prize.innerHTML = parseInt(prizeChosen)


  function random(){
    return (Math.floor(Math.random()*10))
  }
  randomNum = random()

  // word split into array for comparison
  splitWord = (wordArray[randomNum].split(''));
  splitWordCompare = (wordArray[randomNum].split(''));


  // replaces letters
  function dash(){
      for (let i = 0; i < splitWord.length; i++) {
        splitWord.splice(i,1,"_")
        wordDash.innerHTML = splitWord.join('')
      }
    }
    dash()
    // resets the clue box
    clue.innerHTML = ''
  }
// keyboard start
var alphabet = (['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'])

for (var i = 0; i < alphabet.length; i++) {
  var key = document.createElement('div')
  key.style.width = '20px'
  key.style.height = '20px'
  key.style.display = 'inline-block'
  key.classList.add('keys')
  key.innerHTML = alphabet[i]
  keyboardWrapper.appendChild(key)
  var boxes = document.getElementsByClassName('keys')

  boxes[i].addEventListener('click', function(event){
    usedLtrs.innerHTML += event.target.innerHTML;
    if (splitWordCompare.indexOf(event.target.innerHTML) < 0) {
      chances = (chances-1)
      guessNum.innerHTML =  chances

      if (parseInt(guessNum.innerText) == 0) {
        alert('Game Over! Final Score: '+prizewon.innerHTML+'. Click OK to play again')
        prizeWon.innerHTML = 0
        chances = 5
        refresh()
        }
      }
    for (var i = 0; i <splitWordCompare.length; i++) {
      if (event.target.innerHTML == splitWordCompare[i]) {
        splitWord.splice(i,1,event.target.innerHTML);
        wordDash.innerHTML = splitWord.join('')

          if (wordDash.innerHTML == splitWordCompare.join('')) {
            prizeWon.innerHTML = ((parseInt(prizeWon.innerText)) + (parseInt(prize.innerText)))
            alert('Good Job! Current Score: '+prizewon.innerHTML);
            refresh()
          }
        }
      }
    })
  }
//word submit
wordSubmit.addEventListener('click',function(){
  if (wordInput.value == splitWordCompare.join('')){
    prizeWon.innerHTML = ((parseInt(prizeWon.innerText)) + (parseInt(prize.innerText)))
    alert('Good Job! Current Score: '+prizewon.innerHTML)
    refresh()
    wordInput.value = ''
  } else {
      chances = (chances-1)
      guessNum.innerHTML = chances

      if (parseInt(guessNum.innerText) == 0) {
          alert('Game Over! Final Score: '+prizewon.innerHTML+'. Click OK to play again')
          prizeWon.innerHTML = 0
          chances = 5
          refresh()
        } else {
          tryAgainModal()
        }
      }
    })
