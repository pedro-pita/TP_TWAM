import React,  { useState, Component, ToggleButtonGroup, ToggleButton } from 'react';
import DatePicker from './date_picker'
import Genres from './genres_filter_form'

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
    }

    buttonStyle= () => ({
        backgroundColor:"#2c254a",
        color:"white",
        textAlign:"center"
    });

    handleGenres (genres) {
        console.log("U:" + genres);
    }

    handleDatePicker (dates) {
        console.log("U:" + dates);
    }

    render(){
        return (
            <>
                <div className="row mt-2">
                    <p className="col-12 text-center">Genres:</p>
                    <Genres onChangeGenre={this.handleGenres} />
                </div>
                <div className="row mt-2">
                    <p className="col-12 text-center">Date:</p>
                    <form method="post">
                        <div className="col-12" align="center">
                            <DatePicker onChangeDatePicker={this.handleDatePicker}/>
                        </div>
                        <div class="form-group mt-3" align="center">
                            <button className="btn btn-light secondary-background-color" name="submit" type="submit" style={this.buttonStyle()}>Submit</button>
                        </div>
                    </form>
                </div> 
            </>
        )
    }
}

export default Filters;