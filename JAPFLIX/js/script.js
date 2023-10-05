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
                <li data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"> ${element.title}  ${element.tagline} 
                <span class="fa fa-star checked">${element.vote_average}</span></li>
               
                <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                  <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasRightLabel">${element.title}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                  </div>
                  <div class="offcanvas-body">
                  ${element.overview}
                  ${element.genres.name}
                  </div>
                </div>
                     `;
            }
        });
    })
}


  document.addEventListener("DOMContentLoaded", function () {
    const tagsList = document.getElementById("tagsList");

    // Function to fetch and display data
    function fetchAndDisplayData() {
      // Fetch data from the API
      fetch("https://japceibal.github.io/japflix_api/movies-data.json")
        .then((response) => response.json())
        .then((data) => {
          // Clear existing content
          tagsList.innerHTML = "";

          // Extract tags from the JSON
          const tags = [];
          data.forEach((movie) => {
            movie.tags.forEach((tag) => {
              if (!tags.includes(tag)) {
                tags.push(tag);
              }
            });
          });

          // Create list items for each tag and append to the list
          tags.forEach((tag) => {
            const listItem = document.createElement("li");
            listItem.className = "list-group-item";
            listItem.textContent = tag;
            tagsList.appendChild(listItem);
          });
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }

    // Attach event listener to the search button
    const btnBuscar = document.getElementById("btnBuscar");
    btnBuscar.addEventListener("click", fetchAndDisplayData);

    // Initial data load (you can remove this if not needed)
    fetchAndDisplayData();
  });

