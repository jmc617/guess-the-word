const proxyurl = "https://cors-anywhere.herokuapp.com/";
const url = "http://app.linkedin-reach.io/words"; 



fetch(proxyurl + url)
.then(function(response) {
    return response.text()
})
.then(text => {
    console.log(text); 
    const wordList = text.split('\n')
    console.log(wordList)
})
.catch(error => console.log(error))

