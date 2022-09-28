window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);



// Previniendo envio del form al presionar enter en PC.
formInputs.forEach(input=>{
    input.addEventListener("keydown",(e)=>{
        if(e.key == "Enter"){
            e.preventDefault();
            return false;
        }
    })
});

// Botones de regreso hacia atras;
backButtons.forEach(btn=>{
    btn.addEventListener('click',()=>{
        history.back();
    });
})

// Formularios de busqueda;
formBtns.forEach(btn => {
    btn.addEventListener('click',()=>{
        let inputText = btn.previousElementSibling.value;
        if(inputText.trim() == ""){
            console.log("Inserte un valor valido para la busqueda");
        }else{
            location.hash = `#search=${inputText}`;
        }
    })
});


// Limpiar formularios;
function clearForms(forms){
    forms.forEach(input=>{
        input.value = "";
    });
}

// Funciones de botones;
homeTrendTitle.addEventListener('click',()=>{
    location.hash = "#trends";
});

function navigator(){
    if(location.hash.startsWith('#trends')){
        trendsPage();
    } else if (location.hash.startsWith('#search=')){
        searchPage();
    } else if (location.hash.startsWith('#movie=')){
        movieDetails();
    } else if (location.hash.startsWith('#category=')){
        categoriesPage();
    } else {
        homePage();
    }

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function homePage(){
    categoryContainer.classList.add("inactive");
    movieContainer.classList.add("inactive");
    searchContainer.classList.add("inactive");
    trendsContainer.classList.add("inactive");
    clearForms(formInputs);

    headerContainer.classList.remove("inactive");
    homeContainer.classList.remove("inactive");
    getCategoriesPreview();
    getTrendingMoviesPreview();
}

function movieDetails(){
    headerContainer.classList.add("inactive");
    homeContainer.classList.add("inactive");
    categoryContainer.classList.add("inactive");
    searchContainer.classList.add("inactive");
    trendsContainer.classList.add("inactive");

    movieContainer.classList.remove("inactive");
    
    // Conseguir el id de la pelicual mediante el hash;
    const [_, id] = location.hash.split('=');
    getMovieByID(id);
}

function categoriesPage(){
    homeContainer.classList.add("inactive");
    headerContainer.classList.add("inactive");
    movieContainer.classList.add("inactive");
    searchContainer.classList.add("inactive");
    trendsContainer.classList.add("inactive");
    clearForms(formInputs);

    categoryContainer.classList.remove("inactive");

    const [_, categoryData] = location.hash.split('=');
    const [categoryID, categoryName] = categoryData.split("-");
    getMoviesByCategory(categoryID, categoryName);
}

function searchPage(){
    homeContainer.classList.add("inactive");
    movieContainer.classList.add("inactive");
    headerContainer.classList.add("inactive");
    categoryContainer.classList.add("inactive");
    trendsContainer.classList.add("inactive");
    clearForms(formInputs);

    searchContainer.classList.remove("inactive");
    
    // ["#search", 'data buscada'];
    const [_, query] = location.hash.split('=');


    let trimmedQuery = query.trim();
    getMoviesBySearch(trimmedQuery.replace(/%20/g," "));
}


function trendsPage(){
    console.log("tendencias")
    homeContainer.classList.add("inactive");
    movieContainer.classList.add("inactive");
    headerContainer.classList.add("inactive");
    categoryContainer.classList.add("inactive");
    clearForms(formInputs);

    trendsContainer.classList.remove("inactive");
    getTrendingMovies();

}


