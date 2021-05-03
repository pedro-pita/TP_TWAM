import React, { Component } from 'react';
import Item_Movie from './item_movie';

class Movies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=85b7f5dbd764003e3e05f18df89ff387&language=en-US&page=2")
          .then(res => res.json())
          .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    items: result.results
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }
    
    handleDelete = (id) => {
        const newCounters = this.state.counters.filter(c => c.id !== id);
        this.setState({ counters: newCounters });
    }

    render() {
        const { error, isLoaded, items } = this.state;
        return (
            <div className="row">
                <div class="col-lg-1">

                </div>
                <div class="col-lg-2">
                    <h2>Filters</h2>
                </div>
                <div class="col-lg-7 ">
                    <h2>Movies</h2>
                    <div className="row box-items">
                        {items.map(item => (
                            <div className="col-lg-3">
                                <Item_Movie 
                                    key      = { item.id } 
                                    id      =  { item.id } 
                                    title    = { item.title} 
                                    imageURL = {"https://image.tmdb.org/t/p/original/" + item.poster_path }
                                    onDelete = {this.handleDelete }>
                                </Item_Movie>
                            </div>
                        ))}
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-6">
                                <nav aria-label="...">
                                    <ul class="pagination">
                                        <li class="page-item disabled">
                                        <a class="page-link" href="#" tabindex="-1">Previous</a>
                                        </li>
                                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                                        <li class="page-item active">
                                        <a class="page-link" href="#">2 <span class="sr-only">(current)</span></a>
                                        </li>
                                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                                        <li class="page-item">
                                        <a class="page-link" href="#">Next</a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

        {/*const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div><h1>Loading...</h1></div>;
        } else {
            return (
                <div>
                    <h1>FILMES</h1>
                    
                        items.map(item => (
                            <div>
                                <Item_Movie 
                                    key      = { item.id } 
                                    id      =  { item.id } 
                                    title    = { item.title} 
                                    imageURL = {"https://image.tmdb.org/t/p/original/" + item.poster_path }
                                    onDelete = {this.handleDelete }>
                                </Item_Movie>
                            </div>
                        ))
                    
                </div>
            );
        }*/}
    }
}

export default Movies;