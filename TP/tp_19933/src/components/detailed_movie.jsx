import React, { Component } from 'react';
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
        fetch("https://api.themoviedb.org/3/movie/" + this.props.match.params.value +"?api_key=85b7f5dbd764003e3e05f18df89ff387&language=en-US")
          .then(res => res.json())
          .then(
            (result) => {
                this.setState({
                    item: result
                });
                this.loadFavorites()
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }

    loadFavorites = () => {
        fetch("https://api.themoviedb.org/3/list/7080650/item_status?api_key=85b7f5dbd764003e3e05f18df89ff387&movie_id=" + this.state.item.id)
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
                this.setState({
                    isLoaded: true,
                    favorite: result.item_present
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

    GetButtonClass = () => {
        console.log(this.state.favorite)
        let classes = "btn btn-"
        classes += this.state.favorite === true ? 'danger' : 'success';
        classes += " btn-sm m-2";
        return classes;
    }

    GetButtonText = () => {
        console.log(this.state.favorite)
        return this.state.favorite === true ? 'Remover Favorito' : 'Adicionar Favorito';
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
        })
        .catch(error => {
            this.setState({
                isLoaded: true,
                error
            });
        });
    }
    
    swapStyleButton = () => {
        if(this.state.favorite){
            
        }else{

        }
    }

    render() {
        const { error, isLoaded, item, favorite } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div><h1>Loading...</h1></div>;
        } else {
            return (
                <div style={{backgroundColor:'white'}}>
                    {
                        <div>
                            <h1>{ item.title}</h1>
                            <img width="200px" src={ "https://image.tmdb.org/t/p/original/" + item.poster_path } alt="" />
                            <p>{ item.release_date }</p>
                            <p>{ item.vote_average } estrelas</p>
                            <button value={this.state.item.id} className={ this.GetButtonClass()} onClick={ this.swapFavoriteState }>{ this.GetButtonText() }</button>
                            <h3>Sinopse</h3>
                            <p>{ item.overview }</p>
                        </div>
                    }
                </div>
            );
        }
    }
}

/*function swapFavoriteState(id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ media_id: id })
    };
    fetch('https://api.themoviedb.org/3/list/7080650/add_item?api_key=85b7f5dbd764003e3e05f18df89ff387&session_id=10cc9fc7513f93faba96a3042d349cc6e2b5d498', requestOptions)
    .then(async response => {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson && await response.json();

        // check for error response
    })
    .catch(error => {
        this.setState({ errorMessage: error.toString() });
        console.error('There was an error!', error);
    });
}*/
export default Movies;