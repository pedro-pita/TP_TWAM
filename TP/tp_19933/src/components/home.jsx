import React, { Component } from 'react';
import Item_Movie from './item_movie';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        fetch("https://api.themoviedb.org/3/movie/775996/recommendations?api_key=85b7f5dbd764003e3e05f18df89ff387&language=en-US&page=1")
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
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div><h1>Loading...</h1></div>;
        } else {
            return (
                <div>
                    <h1>HOME - RECOMENDADOS</h1>
                    {
                        items.map(item => (
                            <div>
                                <Item_Movie 
                                    key      = { item.id } 
                                    id      = { item.id } 
                                    title    = { item.title} 
                                    imageURL = {"https://image.tmdb.org/t/p/original/" + item.poster_path }
                                    onDelete = {this.handleDelete }>
                                </Item_Movie>
                            </div>
                        ))
                    }
                </div>
            );
        }
    }
}

export default Home;