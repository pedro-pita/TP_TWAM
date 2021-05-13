import React,  { Component } from 'react';
import DatePicker from './date_picker'
import Genres from './genres_filter_form'
import Sort from './sort_filter'

class Filters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            dates: undefined,
            genres: undefined
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleGenres = this.handleGenres.bind(this)
        this.handleDatePicker = this.handleDatePicker.bind(this)
        this.handleSort = this.handleSort.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    buttonStyle= () => ({
        backgroundColor:"#2c254a",
        color:"white",
        textAlign:"center"
    });

    handleSort (sortBy) {
        switch(sortBy){
            case "1":
                sortBy = "vote_average.asc"
                break;
            case "2":
                sortBy = "vote_average.desc"
                break;
            case "3":
                sortBy = "release_date.asc"
                break;
            case "4":
                sortBy = "release_date.desc"
                break;
            case "5":
                sortBy = "original_title.asc"
                break;
            case "6":
                sortBy = "original_title.desc"
                break;
            default:
                sortBy = "release_date.desc"
        }
        this.setState({sortBy:sortBy})
    }

    handleGenres (genres) {
        console.log(genres)
        if(genres.length > 0)
            this.setState({genres:genres})
        else
            this.setState({genres:undefined})
    }

    handleDatePicker (dates) {
        if(dates[0] != undefined && dates[1] != undefined){
            for(var i = 0; i < 2; i++)
                dates[i] = new Date(dates[i].getTime() - (dates[i].getTimezoneOffset() * 60000 )).toISOString().split("T")[0];
            this.setState({dates:dates});
            console.log(dates)
        }
    }

    handleSubmit () {
        this.props.onSubmitFilters(this.state.sortBy, this.state.genres, this.state.dates);
    }

    render(){
        return (
            <>
                <div className="row mt-2">
                    <p className="col-12 text-center">Sort Results By:</p>
                    <Sort onChangeSort={this.handleSort} />
                </div>
                <div className="row mt-2">
                    <p className="col-12 text-center">Genres:</p>
                    <Genres onChangeGenre={this.handleGenres} />
                </div>
                <div className="row mt-2">
                    <p className="col-12 text-center">Date:</p>
                    <div className="col-12" align="center">
                        <DatePicker onChangeDatePicker={this.handleDatePicker}/>
                    </div>
                    <div class="form-group mt-3" align="center">
                        <input onClick={this.handleSubmit} className="btn btn-light secondary-background-color" name="submit" type="submit" value="Submit" style={this.buttonStyle()}/>
                    </div>
                </div> 
            </>
        )
    }
}

export default Filters;