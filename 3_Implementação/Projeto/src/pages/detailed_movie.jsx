import React, { Component } from 'react';
import Loading from '../components/loading';
import ReactNotification from 'react-notifications-component'
import { store } from "react-notifications-component"
import 'react-notifications-component/dist/theme.css'
import axios from 'axios';

class Movies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            item: [],
            favorite: false
        };
    }

    componentDidMount() {
        const requestMovie = axios.get("https://api.themoviedb.org/3/movie/" + this.props.match.params.value +"?api_key=85b7f5dbd764003e3e05f18df89ff387&language=en-US");
        const requesFavoriteStatus = axios.get("https://api.themoviedb.org/3/list/7080650/item_status?api_key=85b7f5dbd764003e3e05f18df89ff387&movie_id=" + this.props.match.params.value);
        axios.all([requestMovie, requesFavoriteStatus]).then(axios.spread((...result) => {
            console.log(result)
            console.log( result[1].data)
            this.setState({
                isLoaded: true,
                item: result[0].data,
                favorite: result[1].data.item_present
            });
          })).catch(error => {
            this.setState({
                isLoaded: true,
                error
            });
          })
    }

    GetButtonClass = () => {
        return this.state.favorite === true ? 'btn btn-danger' : 'btn btn-success' + " btn-sm m-2";
    }

    GetButtonText = () => {
        return this.state.favorite === true ? 'Remove Favorite' : 'Add Favorite';
    }

    swapFavoriteState = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ media_id: this.state.item.id })
        };
        if(this.state.favorite)
            var link = 'https://api.themoviedb.org/3/list/7080650/remove_item?api_key=85b7f5dbd764003e3e05f18df89ff387&session_id=10cc9fc7513f93faba96a3042d349cc6e2b5d498';
        else
            var link = 'https://api.themoviedb.org/3/list/7080650/add_item?api_key=85b7f5dbd764003e3e05f18df89ff387&session_id=10cc9fc7513f93faba96a3042d349cc6e2b5d498';

        fetch(link, requestOptions)
        .then(async response => {
            this.setState( {favorite: !this.state.favorite });
            this.notificationGo(this.state.favorite === true ?  'FILME ADICIONADO COM SUCCESSO!' : 'FILME REMOVIDO COM SUCCESSO!',this.state.favorite === true ? 'O filme ' + this.state.item.title +' foi adicionado ?? sua lista de favoritos' : 'O filme ' + this.state.item.title +' foi removido da sua lista de favoritos');
        })
        .catch(error => {
            this.setState({
                isLoaded: true,
                error
            });
        });
    }

    getStars = () => {
        var divStars = [];
        var stars = Math.round(this.state.item.vote_average/2)
        for (var i = 0; i < 5; i++) {
            if(i < stars)
                divStars.push(<i class="rating-check fas fa-star fa-lg" name="example" value={i} ></i>);
            else
                divStars.push(<i class="rating-non-check far fa-star fa-lg" name="example" value={i} ></i>);
        }
        return divStars
    } 

    getGenres = () => {
        var genres ="";
        this.state.item.genres.forEach(genre => {
            genres += " " + genre["name"] + ",";
        });
        return genres.slice(0, -1);
    } 

    notificationGo = (title, message) => store.addNotification({
        title: title,
        message: message,
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        width:300,
        dismiss: {
          duration: 5000,
          onScreen: true
        }
    });

    render() {
        const { error, isLoaded, item, favorite } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <Loading/>
        } else {
            return (
                <div>
                    <ReactNotification />
                    <div className="container d-flex align-items-center justify-content-center">
                        {
                            <div className="row" >
                                <div className="col-md-5">
                                    <img width="100%" src={ "https://image.tmdb.org/t/p/original/" + item.poster_path } alt={item.overview} />
                                </div>
                                <div className="col-md-7">
                                    <h1>{ item.title}</h1>
                                    <p>{ item.release_date }</p>
                                    <div className="genres">
                                        <p>{this.getGenres()}</p>
                                    </div>
                                    <div className="row">
                                        <div class="col-md-12">
                                            <p>{this.getStars()}</p>
                                            <button value={this.state.item.id} className={ this.GetButtonClass()} onClick={ () => {this.swapFavoriteState()}}> { this.GetButtonText() }</button>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-12">
                                            <h3>Overview</h3>
                                            <p>{ item.overview }</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            );
        }
    }
}
export default Movies;