import React, { Component } from 'react';

class Filters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
        this.props.onChangeSort(event.target.value);
    }

    render(){
        return (
            <>
                <form onChange={this.handleChange} className="row justify-content-center">
                    <div className="row">
                        <select class="custom-select col-12" onchange={this.handleChange}>
                            <option selected value="1">Rating (Descending)</option>
                            <option value="2">Rating (Ascending)</option>
                            <option value="3">Release Date (Ascending)</option>
                            <option value="4">Release Date (Descending)</option>
                            <option value="5">Title (A-Z)</option>
                            <option value="6">Title (Z-A)</option>
                        </select>
                    </div>
                </form>
            </>
        )
    }
}

export default Filters;