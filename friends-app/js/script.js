window.onload = () => {
    const link = "https://randomuser.me/api/";
    let amount = 20;
    let data = [];
    let defaultSearch = 'results=70&inc=gender,name,picture,location,dob,phone';

    const cardContainer = document.querySelector(".container");
    function request(reqString){
        fetch("https://randomuser.me/api/?"+reqString)
            .then(function(response) {
                response.json()
                    .then(users => {
                        data = Array.from(users.results);
                        console.log(data);
                        insert(data);
                    });
            });
    }


    function insert(data){
        cardContainer.innerHTML = "";
        let fragment = document.createDocumentFragment();
        data.forEach(profile => {
            let user = document.createElement("div");
            user.classList.add(`flip-container`, `${profile.gender}`);
            user.innerHTML = `
              <div class="flipper">
                <div class="front">
                    <img class="avatar" src=${profile.picture.large} alt=${profile.gender}>
                </div>
                <div class="back"><h3 >${profile.name.first+" "+profile.name.last}</h3>
                    <h5 class="age">${profile.dob.age}</h5>
                    <h5>${profile.location.city}</h5>
                    <h5>${profile.phone}</h5>
                </div>
              </div>`;
            fragment.appendChild(user);
        });
        cardContainer.appendChild(fragment);
    }

    function searchName(){
        document.getElementById("form-search").addEventListener("submit", function(event){
            event.preventDefault();
            console.log('form is not submited');
        });
        let searchValue = document.getElementById("name-search").value;
        console.log(searchValue);
    }
    function filter() {
        document.getElementById("form-sort").addEventListener("change", function(event){
            event.preventDefault();
            console.log('sort is not submited');

        });
        var x = document.getElementById("").value;
        console.log(x);
    }

    request(defaultSearch);
    searchName();
    filter();

};
