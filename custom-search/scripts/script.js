document.querySelector("form").addEventListener("submit", function(event){
    event.preventDefault();
    let searchValue = event.target.elements[0].value;
    // search(searchValue);
    showSearchResults(myData);
});
let myData = {
	"kind": "customsearch#search",
	"url": {
		"type": "application/json",
		"template": "https://www.googleapis.com/customsearch/v1?q={searchTerms}&num={count?}&start={startIndex?}&lr={language?}&safe={safe?}&cx={cx?}&sort={sort?}&filter={filter?}&gl={gl?}&cr={cr?}&googlehost={googleHost?}&c2coff={disableCnTwTranslation?}&hq={hq?}&hl={hl?}&siteSearch={siteSearch?}&siteSearchFilter={siteSearchFilter?}&exactTerms={exactTerms?}&excludeTerms={excludeTerms?}&linkSite={linkSite?}&orTerms={orTerms?}&relatedSite={relatedSite?}&dateRestrict={dateRestrict?}&lowRange={lowRange?}&highRange={highRange?}&searchType={searchType}&fileType={fileType?}&rights={rights?}&imgSize={imgSize?}&imgType={imgType?}&imgColorType={imgColorType?}&imgDominantColor={imgDominantColor?}&alt=json"
	},
	"queries": {
		"request": [{
			"title": "Google Custom Search - cats",
			"totalResults": "4310000000",
			"searchTerms": "cats",
			"count": 10,
			"startIndex": 1,
			"inputEncoding": "utf8",
			"outputEncoding": "utf8",
			"safe": "off",
			"cx": "017576662512468239146:omuauf_lfve"
		}],
		"nextPage": [{
			"title": "Google Custom Search - cats",
			"totalResults": "4310000000",
			"searchTerms": "cats",
			"count": 10,
			"startIndex": 11,
			"inputEncoding": "utf8",
			"outputEncoding": "utf8",
			"safe": "off",
			"cx": "017576662512468239146:omuauf_lfve"
		}]
	},
	"context": {
		"title": "CS Curriculum",
		"facets": [
			[{
				"label": "lectures",
				"anchor": "Lectures",
				"label_with_op": "more:lectures"
			}],
			[{
				"label": "assignments",
				"anchor": "Assignments",
				"label_with_op": "more:assignments"
			}],
			[{
				"label": "reference",
				"anchor": "Reference",
				"label_with_op": "more:reference"
			}]
		]
	},
	"searchInformation": {
		"searchTime": 0.636884,
		"formattedSearchTime": "0.64",
		"totalResults": "4310000000",
		"formattedTotalResults": "4,310,000,000"
	},
	"items": [{
			"kind": "customsearch#result",
			"title": "EECS 111: Cat Exercises Self Review",
			"htmlTitle": "EECS 111: \u003cb\u003eCat\u003c/b\u003e Exercises Self Review",
			"link": "https://www.cs.northwestern.edu/academics/courses/111/cat-exercises-self-review.html",
			"displayLink": "www.cs.northwestern.edu",
			"snippet": "All your functions that deal with cats should be passed either a cat parameter \ncontaining one cat, or a cats parameter, containing a list of cats. The code inside\n ...",
			"htmlSnippet": "All your functions that deal with \u003cb\u003ecats\u003c/b\u003e should be passed either a \u003cb\u003ecat\u003c/b\u003e parameter \u003cbr\u003e\ncontaining one \u003cb\u003ecat\u003c/b\u003e, or a \u003cb\u003ecats\u003c/b\u003e parameter, containing a list of \u003cb\u003ecats\u003c/b\u003e. The code inside\u003cbr\u003e\n&nbsp;...",
			"cacheId": "SWJpM4Xg60cJ",
			"formattedUrl": "https://www.cs.northwestern.edu/.../cat-exercises-self-review.html",
			"htmlFormattedUrl": "https://www.cs.northwestern.edu/.../\u003cb\u003ecat\u003c/b\u003e-exercises-self-review.html"
		},
		{
			"kind": "customsearch#result",
			"title": "Haddad's Cats",
			"htmlTitle": "Haddad&#39;s \u003cb\u003eCats\u003c/b\u003e",
			"link": "http://www.ece.northwestern.edu/~ahaddad/cats.html",
			"displayLink": "www.ece.northwestern.edu",
			"snippet": "This is our cat Izzy. She ran away in July 2004. This is our new cat Tuffie. She \njoined us in November 2004. A picture of my daughter's cat (aka Chicka). Chica ...",
			"htmlSnippet": "This is our \u003cb\u003ecat\u003c/b\u003e Izzy. She ran away in July 2004. This is our new \u003cb\u003ecat\u003c/b\u003e Tuffie. She \u003cbr\u003e\njoined us in November 2004. A picture of my daughter&#39;s \u003cb\u003ecat\u003c/b\u003e (aka Chicka). Chica&nbsp;...",
			"cacheId": "KBg0TdVxi3UJ",
			"formattedUrl": "www.ece.northwestern.edu/~ahaddad/cats.html",
			"htmlFormattedUrl": "www.ece.northwestern.edu/~ahaddad/\u003cb\u003ecats\u003c/b\u003e.html",
			"pagemap": {
				"cse_thumbnail": [{
					"width": "259",
					"height": "194",
					"src": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQV--cBSFmrozGeRbkDaF9mut3aN7fnaxTOZKecJKYRtLfBlDX5_U3avg"
				}],
				"cse_image": [{
					"src": "http://www.ece.northwestern.edu/~ahaddad/s0117.JPG"
				}]
			}
		},
		{
			"kind": "customsearch#result",
			"title": "Index of /~cline/cats",
			"htmlTitle": "Index of /~cline/\u003cb\u003ecats\u003c/b\u003e",
			"link": "https://www.cs.utexas.edu/~cline/cats/",
			"displayLink": "www.cs.utexas.edu",
			"snippet": "Index of /~cline/cats. [ICO], Name · Last modified · Size · Description. [\nPARENTDIR], Parent Directory, -. [TXT], Agnes&Lucy.html, 2001-08-21 16:30, \n781. [IMG] ...",
			"htmlSnippet": "Index of /~cline/\u003cb\u003ecats\u003c/b\u003e. [ICO], Name &middot; Last modified &middot; Size &middot; Description. [\u003cbr\u003e\nPARENTDIR], Parent Directory, -. [TXT], Agnes&amp;Lucy.html, 2001-08-21 16:30, \u003cbr\u003e\n781. [IMG]&nbsp;...",
			"cacheId": "TwTRJkTMUXoJ",
			"formattedUrl": "https://www.cs.utexas.edu/~cline/cats/",
			"htmlFormattedUrl": "https://www.cs.utexas.edu/~cline/\u003cb\u003ecats\u003c/b\u003e/"
		},
		{
			"kind": "customsearch#result",
			"title": "Index of /users/cline/cats",
			"htmlTitle": "Index of /users/cline/\u003cb\u003ecats\u003c/b\u003e",
			"link": "http://www.cs.utexas.edu/users/cline/cats/?C=N;O=D",
			"displayLink": "www.cs.utexas.edu",
			"snippet": "Index of /users/cline/cats. [ICO], Name · Last modified · Size · Description. [\nPARENTDIR], Parent Directory, -. [DIR], WC_apt/, 2007-11-28 19:28, -. [ ] ...",
			"htmlSnippet": "Index of /users/cline/\u003cb\u003ecats\u003c/b\u003e. [ICO], Name &middot; Last modified &middot; Size &middot; Description. [\u003cbr\u003e\nPARENTDIR], Parent Directory, -. [DIR], WC_apt/, 2007-11-28 19:28, -. [ ]&nbsp;...",
			"cacheId": "x3Wk48Ngw3IJ",
			"formattedUrl": "www.cs.utexas.edu/users/cline/cats/?C=N;O=D",
			"htmlFormattedUrl": "www.cs.utexas.edu/users/cline/\u003cb\u003ecats\u003c/b\u003e/?C=N;O=D"
		},
		{
			"kind": "customsearch#result",
			"title": "Index of /users/cline/cats",
			"htmlTitle": "Index of /users/cline/\u003cb\u003ecats\u003c/b\u003e",
			"link": "http://www.cs.utexas.edu/users/cline/cats/?C=S;O=D",
			"displayLink": "www.cs.utexas.edu",
			"snippet": "Index of /users/cline/cats. [ICO], Name · Last modified · Size · Description. [\nPARENTDIR], Parent Directory, -. [ ], Prizes_Fall_2015_2PM.pptx, 2015-12-03 09\n:06 ...",
			"htmlSnippet": "Index of /users/cline/\u003cb\u003ecats\u003c/b\u003e. [ICO], Name &middot; Last modified &middot; Size &middot; Description. [\u003cbr\u003e\nPARENTDIR], Parent Directory, -. [ ], Prizes_Fall_2015_2PM.pptx, 2015-12-03 09\u003cbr\u003e\n:06&nbsp;...",
			"cacheId": "bs5I62y1bcgJ",
			"formattedUrl": "www.cs.utexas.edu/users/cline/cats/?C=S;O=D",
			"htmlFormattedUrl": "www.cs.utexas.edu/users/cline/\u003cb\u003ecats\u003c/b\u003e/?C=S;O=D"
		},
		{
			"kind": "customsearch#result",
			"title": "Index of /~cline/cats",
			"htmlTitle": "Index of /~cline/\u003cb\u003ecats\u003c/b\u003e",
			"link": "https://www.cs.utexas.edu/~cline/cats/?C=N;O=D",
			"displayLink": "www.cs.utexas.edu",
			"snippet": "Index of /~cline/cats. [ICO], Name · Last modified · Size · Description. [\nPARENTDIR], Parent Directory, -. [DIR], WC_apt/, 2007-11-28 19:28, -. [ ] ...",
			"htmlSnippet": "Index of /~cline/\u003cb\u003ecats\u003c/b\u003e. [ICO], Name &middot; Last modified &middot; Size &middot; Description. [\u003cbr\u003e\nPARENTDIR], Parent Directory, -. [DIR], WC_apt/, 2007-11-28 19:28, -. [ ]&nbsp;...",
			"cacheId": "YxCgS1DtAU0J",
			"formattedUrl": "https://www.cs.utexas.edu/~cline/cats/?C=N;O=D",
			"htmlFormattedUrl": "https://www.cs.utexas.edu/~cline/\u003cb\u003ecats\u003c/b\u003e/?C=N;O=D"
		},
		{
			"kind": "customsearch#result",
			"title": "Index of /~cline/cats",
			"htmlTitle": "Index of /~cline/\u003cb\u003ecats\u003c/b\u003e",
			"link": "https://www.cs.utexas.edu/~cline/cats/?C=M;O=A",
			"displayLink": "www.cs.utexas.edu",
			"snippet": "Index of /~cline/cats. [ICO], Name · Last modified · Size · Description. [\nPARENTDIR], Parent Directory, -. [IMG], Agnes_1.jpg, 2001-08-21 16:18, 21K. [\nIMG] ...",
			"htmlSnippet": "Index of /~cline/\u003cb\u003ecats\u003c/b\u003e. [ICO], Name &middot; Last modified &middot; Size &middot; Description. [\u003cbr\u003e\nPARENTDIR], Parent Directory, -. [IMG], Agnes_1.jpg, 2001-08-21 16:18, 21K. [\u003cbr\u003e\nIMG]&nbsp;...",
			"cacheId": "d4C87PZuc_0J",
			"formattedUrl": "https://www.cs.utexas.edu/~cline/cats/?C=M;O=A",
			"htmlFormattedUrl": "https://www.cs.utexas.edu/~cline/\u003cb\u003ecats\u003c/b\u003e/?C=M;O=A"
		},
		{
			"kind": "customsearch#result",
			"title": "Cats and Crafts l Extras",
			"htmlTitle": "\u003cb\u003eCats\u003c/b\u003e and Crafts l Extras",
			"link": "http://www.cs.ubc.ca/girlsmarts/2014-feb-01/Cats%20and%20Crafts%20l%20Extras.html",
			"displayLink": "www.cs.ubc.ca",
			"snippet": "(function() { var cx = '000643887206709656360:uhd3m_le4b8'; var gcse = \ndocument.createElement('script'); gcse.type = 'text/javascript'; gcse.async = true; ...",
			"htmlSnippet": "(function() { var cx = &#39;000643887206709656360:uhd3m_le4b8&#39;; var gcse = \u003cbr\u003e\ndocument.createElement(&#39;script&#39;); gcse.type = &#39;text/javascript&#39;; gcse.async = true;&nbsp;...",
			"cacheId": "vmeBuUxZ39YJ",
			"formattedUrl": "www.cs.ubc.ca/.../2014.../Cats%20and%20Crafts%20l%20Extras.html",
			"htmlFormattedUrl": "www.cs.ubc.ca/.../2014.../\u003cb\u003eCats\u003c/b\u003e%20and%20Crafts%20l%20Extras.html"
		},
		{
			"kind": "customsearch#result",
			"title": "My 2 Cats on their new Toy",
			"htmlTitle": "My 2 \u003cb\u003eCats\u003c/b\u003e on their new Toy",
			"link": "http://www.owlnet.rice.edu/~adehart/xanandash.html",
			"displayLink": "www.owlnet.rice.edu",
			"snippet": "My 2 Cats on their new Toy. Back To My Photo Gallery · Back To My Homepage.",
			"htmlSnippet": "My 2 \u003cb\u003eCats\u003c/b\u003e on their new Toy. Back To My Photo Gallery &middot; Back To My Homepage.",
			"cacheId": "pm-x_pNjYEMJ",
			"formattedUrl": "www.owlnet.rice.edu/~adehart/xanandash.html",
			"htmlFormattedUrl": "www.owlnet.rice.edu/~adehart/xanandash.html",
			"pagemap": {
				"cse_thumbnail": [{
					"width": "219",
					"height": "230",
					"src": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSiVMjvuqHL0K1tckS2zytxP8tc3JCxGZWN-gMa9JAmZ1tZjUIloX_3aIU"
				}],
				"cse_image": [{
					"src": "http://www.owlnet.rice.edu/~adehart/xanandash.jpg"
				}]
			}
		},
		{
			"kind": "customsearch#result",
			"title": "Re: Cats are Conservative!",
			"htmlTitle": "Re: \u003cb\u003eCats\u003c/b\u003e are Conservative!",
			"link": "http://www.cs.jhu.edu/~jonathan/debate/ceda-l/archive/CEDA-L-May-1996/msg00093.html",
			"displayLink": "www.cs.jhu.edu",
			"snippet": "May 3, 1996 ... To: WHITNEMR@snymorva.cs.snymor.edu; Subject: Re: Cats are Conservative! \nFrom: MICHELLE C CROWSON \u003cmichellc@utep.edu\u003e; Date: ...",
			"htmlSnippet": "May 3, 1996 \u003cb\u003e...\u003c/b\u003e To: WHITNEMR@snymorva.cs.snymor.edu; Subject: Re: \u003cb\u003eCats\u003c/b\u003e are Conservative! \u003cbr\u003e\nFrom: MICHELLE C CROWSON &lt;michellc@utep.edu&gt;; Date:&nbsp;...",
			"cacheId": "DerhooR-GA8J",
			"formattedUrl": "www.cs.jhu.edu/~jonathan/debate/ceda-l/...L.../msg00093.html",
			"htmlFormattedUrl": "www.cs.jhu.edu/~jonathan/debate/ceda-l/...L.../msg00093.html"
		}
	]

};

// function search(searchString){
//     searchString = searchString.toLowerCase();
//     let requestString = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyBS3H2dT37lO8RSEXjFkIC3g1cJNPdg8z4&cx=017576662512468239146:omuauf_lfve&q='+searchString;
//     fetch(requestString)
//         .then(function(response) {
//             response.json()
//                 .then(data => {
//                     myData = data;
//                     showSearchResults(data);
//                 });
//         }).catch(function (){
//         console.log("Oops! Looks like there is a problem");
//     });
// }
function showSearchResults(response) {
	let ul = document.createElement("ul");
	let all = response.items;
	all.forEach(function(val){
		let li = document.createElement("li");
		li.innerHTML = ('<h3><a href="' + val.link + '">' + val.title + '</a></h3><p class="siteURL">' + val.displayLink + '</p><p class="content">' + val.htmlSnippet + '</p>');
		ul.appendChild(li);
	});
	document.querySelector(".result").appendChild(ul);
	document.querySelector('.search-form').classList.add('full-height');
}

