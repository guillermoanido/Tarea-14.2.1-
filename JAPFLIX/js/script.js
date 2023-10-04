var item =[]

function getJson() {
    fetch("https://japceibal.github.io/japflix_api/movies-data.json")
        .then(response => response.json())
        .then(x => {
            item = x;
            searchFilter(item)
        })
}
getJson()

function searchFilter(item) {
    let inputSearch = document.getElementById("inputBuscar");
    inputSearch.addEventListener("input", function () {
        let searched = inputSearch.value.toLowerCase();
        let pelis = document.getElementById("lista")
        console.log(searched);
        pelis.innerHTML = "";
        item.forEach(element => { 
            console.log(item)
            if ((element.title.toLowerCase().includes(searched)) || (element.tagline.toLowerCase().includes(searched)) || (element.overview.toLowerCase().includes(searched)) || (element.genres[0].name.toLowerCase().includes(searched))) {
                pelis.innerHTML += `
                    <li>${element.title} ${element.tagline}<span class="fa fa-star checked">${element.vote_average}</span></li>
                     `;
            }
        });
    })
}

