import React, { Component } from 'react';
import Item_Movie from './item_movie';
import axios from 'axios';

class Favorites extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        fetch("https://api.themoviedb.org/3/list/7080650?api_key=85b7f5dbd764003e3e05f18df89ff387")
          .then(res => res.json())
          .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    items: result.items
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
                    <h1>FILMES</h1>
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
                            /*<div>
                                <img src={ "https://image.tmdb.org/t/p/original/" + item.poster_path } alt="" width="200"/>
                                <h1>{item.title}</h1>
                                <p>{item.release_date}</p>
                                <p>{item.vote_average}</p>
                                <p>{item.overview}</p>
                            </div>*/
                        ))
                    }
                    {/*<ul>
                        {items.map(item => (
                            <h1>sadasd</h1>
                        ))}
                    </ul>
                    {
                        this.state.counters.map(counters => 
                            <Item_Movie 
                                key     = { counters.id } 
                                value   = {counters.value} 
                                countId = {counters.id}
                                onDelete= {this.handleDelete}>
                                <h3>Title</h3>
                            </Item_Movie>
                        )
                    }*/}
                </div>
            );
        }
    }
}

export default Favorites;