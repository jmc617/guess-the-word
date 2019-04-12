function apiCall() {

//prevents CORS error
const proxyurl = "https://cors-anywhere.herokuapp.com/";
//change url to get appropriate smaller word list
const url = "http://app.linkedin-reach.io/words"; 

//move word array into other file where imported
let wordArray = []

fetch(proxyurl + url)
.then(function(response) {
    return response.text()
})
.then(text => {
    //remove logs
    console.log(text); 
    const wordList = text.split('\n')
    wordArray = wordList.slice()
    console.log(wordArray)
})
.catch(error => console.log(error))

}


