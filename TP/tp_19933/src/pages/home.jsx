import React, { Component } from 'react';
import Item_Movie from '../components/item_movie';

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
        backgroundSize: "cover",
        height: "550px",
        width: "100%",
        display: "inline-block",
        backgroundImage: `url(` + this.state.background + `)`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative"
    });

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div><h1>Loading...</h1></div>;
        } else {
            return (
                <div className="container mt-4">
                    <a href={ "/detailed/" + this.state.items[0].id}>
                        <div className="row ml-1" style={ this.getBackgroundImageStyle() }>
                            <div class="title-home">
                                <h1><span className="badge badge-warning">{this.state.items[0].title}</span></h1>
                            </div>
                        </div>
                    </a>
                    <div className="mt-3">
                        <h3>RECOMENDADOS</h3>
                        <div class="row mt-3">
                            {
                                items.slice(1,5).map(item => (
                                    <div class="col-sm-6 col-md-6 col-lg-3">
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
            );
        }
    }
}

export default Home;