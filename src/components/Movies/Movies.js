import React from 'react';
import MovieListItems from './MovieListItem/MovieListItem'
import './Movies.css';

class Movies extends React.Component {
    state = {
        movies : []
    }
    storeMovies = (data) =>{
        const movies = data.results.map((result)=>{
            const {vote_count, id, gendre_id, poster_path, title, vote_average, release_date} = result;
            return {vote_count, id, gendre_id, poster_path, title, vote_average, release_date}
        })
        this.setState({movies});
    }

    componentDidMount(){
        const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`    
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => this.storeMovies(data))
            .catch(error => console.log(error))

    }
    render() {
        return (
            <section >
                <ul className='movies'>
                {
               this.state.movies.map((movie, index) => (
                    <MovieListItems movie={movie} key={index.toString()} />
                ))
                }
                </ul>
            </section>
        )
    }
}
export default Movies;
