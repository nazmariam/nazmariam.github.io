document.querySelector("form").addEventListener("submit", function(event){
    event.preventDefault();
    let searchValue = event.target.elements[0].value;
    search(searchValue);
});
document.getElementById('rt').addEventListener('click', function (event){

	let searchValue = document.getElementById('search').value;

	if(searchValue){
        searchFirst(searchValue);
    }else{
        window.location.replace("https://www.google.com/doodles/");
    }

});
let myData=[];
function search(searchString){
    searchString = searchString.toLowerCase();
    let requestString = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyA6q0LrqOBAg0RyNnTf4p8lLiYVZ9LFdeU&cx=017576662512468239146:omuauf_lfve&q='+searchString;
    if(searchString){
		fetch(requestString)
            .then(function(response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
			.then(function(response) {
				response.json()
					.then(data => {
						myData = data;
						showSearchResults(myData);
					});
			}).catch(function (){
			console.log("Oops! Looks like there is a problem");
		});
	}
}
function searchFirst(searchString){
    searchString = searchString.toLowerCase();
    let requestString = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyA6q0LrqOBAg0RyNnTf4p8lLiYVZ9LFdeU&cx=017576662512468239146:omuauf_lfve&q='+searchString;
    if(searchString){
		fetch(requestString)
            .then(function(response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
			.then(function(response) {
				response.json()
					.then(data => {
						myData = data;
						showFirstResult(myData);
						return myData;
					});
			}).catch(function (){
			console.log("Oops! Looks like there is a problem");
		});
	}
}
function showSearchResults(response) {
	let ul = document.createElement("ul");
	let all = response.items;
	if(all){all.forEach(function(val){
		let li = document.createElement("li");
		li.innerHTML = ('<h3><a href="' + val.link + '">' + val.title + '</a></h3><p class="siteURL">' + val.displayLink + '</p><p class="content">' + val.htmlSnippet + '</p>');
		ul.appendChild(li);
	})}else{ul.innerHTML = "<h4>Nothing found</h4>"}
	let result = document.querySelector(".result");
	result.innerHTML = '';
	result.appendChild(ul);
	document.querySelector('.search-form').classList.add('full-height');
}
function showFirstResult(response) {
	let ul = document.createElement("ul");
	let all = response.items;
	if(all){
        window.location.replace(all[1].link);
	}

}

