import React, { Component } from 'react';
import Item_Movie from '../components/item_movie';
import Filters from '../components/filters_form';
import Loading from '../components/loading';

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
            currentItems: [0, itemsPerPage],
            conditions: ""
        };
        this.handleSubmitFilters = this.handleSubmitFilters.bind(this)
    }

    componentDidMount(page=this.state.page, conditions="&vote_average.desc") {
        fetch(this.getLinkToRequest(page, conditions))
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    items: result.results
                });
                console.log( this.state.items.length)
                console.log(result.total_results)
                this.setState({
                    totalPages: (this.state.items.length >= 20) ? result.total_pages : 1 
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

    getLinkToRequest = ( page = this.state.page, conditions="&sort_by=vote_average.desc") => {
        console.log("https://api.themoviedb.org/3/search/movie?api_key=85b7f5dbd764003e3e05f18df89ff387&page=" + page + "&query=" + this.state.typeList + conditions)
        switch(this.state.typeList){
            case "list":
                return "https://api.themoviedb.org/3/discover/movie?api_key=85b7f5dbd764003e3e05f18df89ff387&language=en-US&page=" + page + conditions;
            case "favorites":
                return "https://api.themoviedb.org/4/list/7080650?api_key=85b7f5dbd764003e3e05f18df89ff387&page=" + page + conditions;
            default:
                return "https://api.themoviedb.org/3/search/movie?api_key=85b7f5dbd764003e3e05f18df89ff387&page=" + page + "&query=" + this.state.typeList;
        }
    }

    changePage = (page) => {
        this.setState({
            page:page
        })
        this.componentDidMount(page, this.state.conditions);
    }
    
    getTitle = () => {
        switch(this.state.typeList){
            case "list":
                return "Movies";
            case "favorites":
                return "Favorites";
            default:
                return 'Search "' + this.state.typeList + '"';
        }
    }

    getPagination = () => {
        var ulPagination = [];
        var page = this.state.page;
        var maxPages = this.state.totalPages;

        if(page > 1 ){
            ulPagination.push(
                <li className="page-item enable">
                    <a className="page-link" onClick={() => this.changePage(page-1)}>Previous</a>
                </li>
            );
            ulPagination.push(
                <li className="page-item enable">
                    <a className="page-link"  onClick={() => this.changePage(page-1)}>{page-1}</a>
                </li>
            );
        }
        
        ulPagination.push(
            <li className="page-item active">
                <a className="page-link" onClick={() => this.changePage(page)}>{page}</a>
            </li>
        );

        if(page < maxPages){
            ulPagination.push(
                <li className="page-item enable">
                    <a className="page-link" onClick={() => this.changePage(page+1)}>{page+1}</a>
                </li>
            );
            ulPagination.push(
                <li className="page-item">
                    <a className="page-link" onClick={() => this.changePage(page+1)}>Next</a>
                </li>
            );
        }
        return ulPagination
    }

    handleSubmitFilters(sort_by, genres, dates) {
        /*
        &sort_by= 
        &release_date.gte=
        &release_date.lte=
        &with_genres=
        &page=
        */
        var conditions = "";
        if(sort_by != undefined)
            conditions += "&sort_by=" + sort_by
        if(dates != undefined)
            conditions +=  "&release_date.gte=" + dates[0] + "&release_date.lte=" + dates[1]
        if(genres != undefined)
            conditions += "&with_genres=" + genres.join()
        
        console.log(conditions)
        this.setState({page:1, conditions:conditions})
        this.componentDidMount(1, conditions)
    }

    render() {
        const { error, typeList, page, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <Loading/>
        } else {
            return (
                <div className="container">
                    <div className="row mt-5">
                        {(typeList == "list" || typeList == "favorites") ?
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3 box-items">
                                <h2 className="mt-3 mb-3">Filters</h2>
                                <Filters onSubmitFilters={this.handleSubmitFilters} typeList={this.state.typeList}/>
                            </div>
                            :
                            ""
                        }
                        <div className={(typeList == "list" || typeList == "favorites") ? "col-xs-12 col-sm-12 col-md-12 col-lg-9 col-xl-9 box-items" : "col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 box-items" } >
                            <h2 className="mt-3">{ this.getTitle() }</h2>
                            <div className="row d-flex justify-content-center" >
                                {
                                    (items.length > 0) 
                                    ? 
                                        items.slice(this.state.currentItems[0], this.state.currentItems[1]).map(item => (
                                            <div className={(typeList == "list" || typeList == "favorites") ? "itens col-9 col-xs-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 mt-4" : "itens col-9 col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-3 mt-4 " }>
                                                <Item_Movie 
                                                    key      = { item.id } 
                                                    id      =  { item.id } 
                                                    title    = { item.title} 
                                                    imageURL = {"https://image.tmdb.org/t/p/original/" + item.poster_path }
                                                    onDelete = {this.handleDelete }>
                                                </Item_Movie>
                                            </div>
                                        ))
                                    :
                                        <div className="text-center align-middle" >
                                            <h2> Movies not found </h2>
                                        </div>
                                }
                            </div>
                            {
                                (items.length > 0) 
                                ? 
                                    <div className="row justify-content-center mt-3">
                                        <div className="col-12 d-flex justify-content-center">
                                            <ul className="pagination">
                                                { this.getPagination() }
                                            </ul>
                                        </div>
                                    </div>
                                :
                                    <div/>
                            }
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Movies;