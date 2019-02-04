document.querySelector("form").addEventListener("submit", function(event){
    event.preventDefault();
    let searchValue = event.target.elements[0].value;
    search(searchValue);
});
let myData = [];
function search(searchString){
    searchString = searchString.toLowerCase();
    let requestString = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyBS3H2dT37lO8RSEXjFkIC3g1cJNPdg8z4&cx=017576662512468239146:omuauf_lfve&q='+searchString;
    fetch(requestString)
        .then(function(response) {
            response.json()
                .then(data => {
                    myData = data;
                    showSearchResults(data);
                });
        }).catch(function (){
        console.log("Oops! Looks like there is a problem");
    });
}
function showSearchResults(response) {
    console.log(response.items);
    for (let i = 0; i < response.items.length; i++) {

        let item = response.items[i];
        console.log(item);
        // in production code, item.htmlTitle should have the HTML entities escaped.
        document.getElementById("content").innerHTML += "<br>" + item.htmlTitle;
    }
}

