import React, { Component } from 'react';

class Filters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            genres:[
                {
                    "id": 28,
                    "name": "Action"
                },
                {
                    "id": 12,
                    "name": "Adventure"
                },
                {
                    "id": 16,
                    "name": "Animation"
                },
                {
                    "id": 35,
                    "name": "Comedy"
                },
                {
                    "id": 99,
                    "name": "Documentary"
                },
                {
                    "id": 80,
                    "name": "Crime"
                },
                {
                    "id": 18,
                    "name": "Drama"
                },
                {
                    "id": 10751,
                    "name": "Family"
                },
                {
                    "id": 14,
                    "name": "Fantasy"
                },
                {
                    "id": 36,
                    "name": "History"
                },
                {
                    "id": 27,
                    "name": "Horror"
                },
                {
                    "id": 10402,
                    "name": "Music"
                },
                {
                    "id": 9648,
                    "name": "Mystery"
                },
                {
                    "id": 10749,
                    "name": "Romance"
                },
                {
                    "id": 53,
                    "name": "Thriller"
                },
                {
                    "id": 10752,
                    "name": "War"
                },
                {
                    "id": 37,
                    "name": "Western"
                }
            ],
            genresChecked:[]
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        var value = target.value;
        
        if(target.checked)
            this.state.genresChecked.push(value);   
        else
            this.state.genresChecked = this.state.genresChecked.filter( e => e !== value);
        
        this.props.onChangeGenre(this.state.genresChecked);            
    }

    render(){
        return (
            <>
                {
                this.state.genres.map(item => (
                    <div className="col-6 col-xs-4 col-sm-4 col-md-4 col-lg-6 col-xl-6">
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value={item.id} onChange={this.handleChange}/>
                            <label class="form-check-label" for="inlineCheckbox1">{item.name}</label>
                        </div>
                    </div>
                ))
                }
            </>
        )
    }
}

export default Filters;