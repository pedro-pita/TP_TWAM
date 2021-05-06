import React, { Component } from 'react';
import Item_Movie from '../components/item_movie';

const itemsPerPage = 20; 

class Movies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            typeList: this.props.match.params.value,
            page: 1,
            totalPages: 0,
            isLoaded: false,
            items: [],
            allItemns:[],
            currentItems: [0, itemsPerPage]
        };
    }

    componentDidMount(page=this.state.page) {
        if(this.state.typeList === "favorites" && this.state.isLoaded){
            var start = (page-1) * itemsPerPage;
            var end = start + itemsPerPage;
            this.setState({
                currentItems: [start,end],
                isLoaded: true
            });
        }else{
            fetch(this.getLinkToRequest(page))
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: this.state.typeList !== "favorites" ? result.results : result.items
                    });
                    this.setState({
                        totalPages: this.state.typeList !== "favorites" ? result.total_pages : this.calculateTotalPageNumber((this.state.items.length / 20))
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
        }
    }

    getLinkToRequest = ( page = this.state.page, query = "Batman") => {
        switch(this.state.typeList){
            case "list":
                return "https://api.themoviedb.org/3/movie/popular?api_key=85b7f5dbd764003e3e05f18df89ff387&language=en-US&page=" + page;
            case "favorites":
                return "https://api.themoviedb.org/3/list/7080650?api_key=85b7f5dbd764003e3e05f18df89ff387";
            default:
                return "https://api.themoviedb.org/3/search/movie?api_key=85b7f5dbd764003e3e05f18df89ff387&page=" + page + "&query=" + this.state.typeList;
        }
    } 
    
    calculateTotalPageNumber = (pages) => (Math.floor(pages) + Math.ceil(pages % 1));

    changePage = (page) => {
        this.setState({
            page:page
        })
        this.componentDidMount(page);
    }

    getPagination = () => {
        var ulPagination = [];
        var page = this.state.page;
        var maxPages = this.state.totalPages;

        if(page > 1 ){
            ulPagination.push(
                <li class="page-item enable">
                    <a class="page-link" onClick={() => this.changePage(page-1)}>Previous</a>
                </li>
            );
            ulPagination.push(
                <li class="page-item enable">
                    <a class="page-link"  onClick={() => this.changePage(page-1)}>{page-1}</a>
                </li>
            );
        }
        
        ulPagination.push(
            <li class="page-item active">
                <a class="page-link" onClick={() => this.changePage(page)}>{page}</a>
            </li>
        );

        if(page < maxPages){
            ulPagination.push(
                <li class="page-item enable">
                    <a class="page-link" onClick={() => this.changePage(page+1)}>{page+1}</a>
                </li>
            );
            ulPagination.push(
                <li class="page-item">
                    <a class="page-link" onClick={() => this.changePage(page+1)}>Next</a>
                </li>
            );
        }
        return ulPagination
    }

    render() {
        const { error, typeList, page, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div><h1>Loading...</h1></div>;
        } else {
            return (
                <div className="container">
                    <div className="row mt-5">
                        <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 box-items">
                            <h2>Filters</h2>
                            <div className="row justify-content-center">
                                <p>asdasd</p>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 box-items">
                            <h2>{ typeList === "list" ? "Movies" : "Favorites" }</h2>
                            <div className="row">

                                {
                                items.slice(this.state.currentItems[0], this.state.currentItems[1]).map(item => (
                                    <div class="itens col-xs-11 col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-4">
                                        <Item_Movie 
                                            key      = { item.id } 
                                            id      =  { item.id } 
                                            title    = { item.title} 
                                            imageURL = {"https://image.tmdb.org/t/p/original/" + item.poster_path }
                                            onDelete = {this.handleDelete }>
                                        </Item_Movie>
                                    </div>
                                ))}
                            </div>
                            <div className="row justify-content-center">
                                <div className="row mt-4">
                                    <div className="col-lg-12">
                                        <nav aria-label="...">
                                            <ul class="pagination">
                                                { this.getPagination() }
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Movies;