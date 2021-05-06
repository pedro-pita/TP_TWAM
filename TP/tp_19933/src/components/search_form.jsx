import React, { Component } from 'react';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render(){
        return (
            <>
                <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" onSubmit={this.handleSubmit}/>
                <button id="search-btn" type="button" class="input-group-text border-0">
                    <i class="fas fa-search"></i>
                </button>
            </>
        )
    }
}

export default Search;