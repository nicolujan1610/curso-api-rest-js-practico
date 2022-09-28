const apiURL = 'https://api.themoviedb.org/3';
const imgStartURL = 'https://image.tmdb.org/t/p/w300';
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
    }
});

// Utils

function createMovies(movies, container, classToAdd){
    container.innerHTML = "";
    movies.forEach(movie=>{ 
        const movieContainer = document.createElement('div');
        movieContainer.classList.add(classToAdd);
        movieContainer.style = "cursor: pointer";
        movieContainer.addEventListener('click', (e)=>{
            e.preventDefault();
            location.hash = `#movie=${movie.id}`;
        });
        
        const movieImg = document.createElement('img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', `${imgStartURL}${movie.poster_path}
        `);

        movieContainer.appendChild(movieImg);
        container.appendChild(movieContainer);

        
    });
}

function createCategories(categories, container, classToAdd){
    container.innerHTML = "";
    categories.forEach(category => {
        const listElement = document.createElement('li');
        const firstDiv = document.createElement('div');
        firstDiv.classList.add(classToAdd);

        const secondDiv = document.createElement('div');

        const spanCategory = document.createElement('span');
        spanCategory.innerText = category.name;

        listElement.addEventListener('click', ()=>{
            location.hash = `category=${category.id}-${category.name}`;
        });

        firstDiv.appendChild(secondDiv);
        firstDiv.appendChild(spanCategory);
        listElement.appendChild(firstDiv);

        container.appendChild(listElement);
    });
}

// Llamados a la API

async function getTrendingMoviesPreview(){
    const { data } = await api('/trending/movie/day');
    const movies = data.results;

    createMovies(movies, tendenciaContainer, 'tendencia-element');
}

async function getCategoriesPreview(){
    const {data} = await api('/genre/movie/list');
    const categories = data.genres;

    createCategories(categories, previewCategoriesContainer,'categories-list--element');
}

async function getMoviesByCategory(id, name){
    const { data } = await api(`/discover/movie`, {
        params: {
            with_genres: id,
        },
    });
    const movies = data.results;

    categoryTitle.innerText = name;
   
    createMovies(movies, categoryMoviesContainer, 'category-movie-element');
}

async function getMoviesBySearch(query){
    const { data } = await api(`/search/movie`, {
        params: {
            query,
        },
    });
    searchTitle.innerText = `Resultados que coinciden con: "${query.trim()}"`;
    const movies = data.results;
   
    createMovies(movies, searchMoviesContainer, 'search-movie-element');
}

async function getTrendingMovies(){
    const { data } = await api('/trending/movie/day');
    const movies = data.results;

    createMovies(movies, trendMoviesContainer, 'tendencia-element');
}

async function getMovieByID(id){
    const { data: movie } = await api(`/movie/${id}`);

    
    const movieImgUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    movieContainer.style.background = `url(${movieImgUrl})`;
    movieContainer.style.backgroundAttachment = 'fixed';
    movieContainer.style.backgroundRepeat = 'no-repeat';
    movieContainer.style.backgroundSize = "100% auto";

    movieTitle.textContent = movie.title;    
    movieDescription.textContent = movie.overview;
    movieRate.textContent = Number.parseFloat(movie.vote_average).toFixed(2);

    createCategories(movie.genres, movieRelatedCategories, 'categories-list--element');

    getRelatedMoviesByID(id);
}

async function getRelatedMoviesByID(id){
    const { data } = await api(`/movie/${id}/similar`);
    const relatedMovies = data.results;


    createMovies(relatedMovies, relatedMoviesContainer, 'tendencia-element');
    relatedMoviesContainer.scroll(0, 0);
};





