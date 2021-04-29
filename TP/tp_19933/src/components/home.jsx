import React, { Component } from 'react';
import Item_Movie from './item_movie';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            background: "https://image.tmdb.org/t/p/original"
        };
    }

    componentDidMount() {
        fetch("https://api.themoviedb.org/3/movie/775996/recommendations?api_key=85b7f5dbd764003e3e05f18df89ff387&language=en-US&page=1")
          .then(res => res.json())
          .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    items: result.results,
                    background: this.state.background + result.results[0].backdrop_path
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

    getBackgroundImageStyle = () => ({
        width: "100%",
        height: "400px",
        backgroundImage: `url(` + this.state.background + `)`,
        backgroundSize: "100% 100%"
    });

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div><h1>Loading...</h1></div>;
        } else {
            return (
                <div>
                    <div className="container">
                        <div className="row" style={ this.getBackgroundImageStyle() }>
                            <h1 style={{color:"white",verticalAlign: "bottom"} }>{this.state.items[0].title}</h1>
                        </div>
                        
                        <div class="row">
                            <h1>RECOMENDADOS</h1>
                            <div class="col-md-12">
                                {
                                    items.slice(1,5).map(item => (
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
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Home;