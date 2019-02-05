document.querySelector("form").addEventListener("submit", function(event){
    event.preventDefault();
    let searchValue = event.target.elements[0].value;
    search(searchValue);
});

let myData=[];
function search(searchString){
    searchString = searchString.toLowerCase();
    let requestString = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyBS3H2dT37lO8RSEXjFkIC3g1cJNPdg8z4&cx=017576662512468239146:omuauf_lfve&q='+searchString;
    if(searchString){
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

