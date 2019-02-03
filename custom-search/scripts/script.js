window.onload = () => {
    function hndlr(response) {
        for (var i = 0; i < response.items.length; i++) {
            var item = response.items[i];
            // in production code, item.htmlTitle should have the HTML entities escaped.
            document.querySelector(".result").innerHTML += "<br>" + item.htmlTitle;
        }
    }
};