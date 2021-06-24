import React, { Component } from 'react';
import Item_Movie from '../components/item_movie';
import Loading from '../components/loading';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            imageURL: "https://image.tmdb.org/t/p/original"
        };
    }

    componentDidMount() {
        fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=85b7f5dbd764003e3e05f18df89ff387&language=en-US&page=1")
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

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return (
                    <Loading/>
                );
        } else {
            return (
                <div className="container mt-4">
                        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                            <ol className="carousel-indicators">
                                <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                            </ol>
                            <div className="carousel-inner">
                                <div className="carousel-item active" >
                                    <a href={ "/detailed/" + items[1].id}>
                                        <div className="carousel-caption d-none d-md-block">
                                            <h2>{items[1].title}</h2>
                                            <p>{items[1].overview}</p>
                                        </div>
                                        <img alt={"Capa do filme" + items[1].title} className="d-block w-100" src={this.state.imageURL + items[1].backdrop_path} alt="First slide"/>
                                    </a>
                                </div>
                                {
                                    items.slice(2,4).map(item => (
                                        <div className="carousel-item" >
                                            <a href={ "/detailed/" + item.id}>
                                                <div className="carousel-caption d-none d-md-block">
                                                    <h2>{item.title}</h2>
                                                    <p>{item.overview}</p>
                                                </div>
                                                <img alt={"Capa do filme" + item.title} className="d-block w-100" src={this.state.imageURL + item.backdrop_path} alt="First slide"/>
                                            </a>
                                        </div>
                                    ))
                                }
                            </div>
                            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="sr-only">Previous</span>
                            </a>
                            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="sr-only">Next</span>
                            </a>
                        </div>
                    <div className="mt-3">
                        <h3>TOP RATED</h3>
                        <div className="row mt-3">
                            {
                                items.slice(5,9).map(item => (
                                    <div className="col-sm-6 col-md-6 col-lg-3">
                                        <Item_Movie 
                                            key      = { item.id } 
                                            id       = { item.id } 
                                            title    = { item.title} 
                                            imageURL = {"https://image.tmdb.org/t/p/original/" + item.poster_path} >
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