import React, { Component } from 'react';
import Redirect from 'react'

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        window.location.href = "http://"+ (window.location.host + "/movies/search/" + this.state.value);
    }

    render(){
        return (
            <>
                <form onSubmit={this.handleSubmit} className="row">
                    <div class="col-8 col-sm-8 col-md-10 col-lg-11 col-xl-11" >
                        <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" value={this.state.value} onChange={this.handleChange}/>
                    </div>
                    <div class="col-2 col-sm-2 col-md-1 col-lg-1 col-xl-1" align="left">
                        <button type="button submit" class="btn btn-light" style={{marginLeft:"-20px"}}>
                            <i class="fas fa-search"></i>
                        </button>
                    </div>
                    <div class="col-2 col-sm-2 col-md-1 col-lg-1 col-xl-1" >
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                </form>
            </>
        )
    }
}

export default Search;